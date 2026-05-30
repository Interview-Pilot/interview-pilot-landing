import path from 'node:path'

import { topUpTopicQueue } from './discover-topics.mjs'
import { generateArticle } from './generate.mjs'
import { attachGeneratedImage } from './images.mjs'
import { logEvent } from './lib/log.mjs'
import {
  historyPath,
  researchSourcesPath,
  settingsPath,
  statePath,
  topicsPath,
  reportsDir,
} from './lib/paths.mjs'
import { readJson, writeJson } from './lib/store.mjs'
import { publishArticles } from './publish.mjs'
import { validateArticle, validateExistingContent } from './quality.mjs'
import { researchTopic } from './research.mjs'
import { readAllPosts, slugify } from './lib/content.mjs'

function nowIso() {
  return new Date().toISOString()
}

function nextRunIso(settings, from = new Date()) {
  const next = new Date(from)
  next.setHours(next.getHours() + settings.schedule.runEveryHours)
  return next.toISOString()
}

async function updateState(patch) {
  const state = await readJson(statePath, {})
  const next = { ...state, ...patch }
  await writeJson(statePath, next)
  return next
}

function progress(percent, label, detail = '') {
  return {
    percent: Math.max(0, Math.min(100, percent)),
    label,
    detail,
    updatedAt: nowIso(),
  }
}

function topicIsEligible(topic, settings) {
  if (!['queued', 'failed'].includes(topic.status)) return false
  if (!settings.categories?.[topic.category]) return false
  if (topic.contentType === 'news-analysis' && !settings.safety.allowNewsPosts) return false
  if (topic.competitorTopic && !settings.safety.allowCompetitorTopics) return false
  return true
}

function selectTopics(topics, settings) {
  const priorityRank = { high: 3, medium: 2, low: 1 }
  return topics
    .filter((topic) => topicIsEligible(topic, settings))
    .sort((a, b) => (priorityRank[b.priority] || 0) - (priorityRank[a.priority] || 0))
    .slice(0, settings.generation.postsPerRun)
}

async function updateTopics(updatedTopics) {
  await writeJson(topicsPath, updatedTopics)
}

function markTopic(topics, topicId, patch) {
  return topics.map((topic) => (topic.id === topicId ? { ...topic, ...patch } : topic))
}

function expectedTopicSlug(topic) {
  if (topic.generatedSlug) return topic.generatedSlug
  if (topic.slug) return topic.slug
  if (topic.draftPath) return path.basename(topic.draftPath, '.mdx')
  if (topic.publishedPath) return path.basename(topic.publishedPath, '.mdx')
  return slugify(topic.primaryKeyword || topic.topic || topic.id)
}

async function reconcileTopicStatuses(topics) {
  const posts = await readAllPosts()
  const postsBySlug = new Map(posts.map((post) => [post.slug, post]))

  return topics.map((topic) => {
    if (!['generated', 'drafted', 'published'].includes(topic.status)) return topic

    const post = postsBySlug.get(expectedTopicSlug(topic))
    if (post) {
      return {
        ...topic,
        status: post.source === 'published' ? 'published' : 'drafted',
        draftPath: post.source === 'draft' ? path.relative(process.cwd(), post.filePath) : topic.draftPath,
        publishedPath:
          post.source === 'published' ? path.relative(process.cwd(), post.filePath) : topic.publishedPath,
      }
    }

    return {
      ...topic,
      status: 'queued',
      lastError: 'Generated output file was missing; returned to queue.',
      repairedAt: nowIso(),
    }
  })
}

export async function runBlogAutomationOnce({ reason = 'manual' } = {}) {
  const runId = `run_${Date.now()}`
  const startedAt = nowIso()
  const settings = await readJson(settingsPath, null)
  if (!settings) throw new Error('Missing editorial/settings.json')

  await updateState({
    running: true,
    currentStep: 'starting',
    activeRunId: runId,
    lastError: null,
    progress: progress(2, 'Starting run', 'Preparing blog automation'),
  })
  await logEvent({ type: 'run_started', runId, reason })

  try {
    await updateState({
      currentStep: 'loading_topics',
      progress: progress(5, 'Loading topic queue', 'Reading configured topics'),
    })
    let topics = await readJson(topicsPath, [])
    const researchSources = await readJson(researchSourcesPath, [])
    const history = await readJson(historyPath, [])

    await updateState({
      currentStep: 'reconciling_topic_status',
      progress: progress(10, 'Reconciling topic status', 'Checking queue against generated files'),
    })
    topics = await reconcileTopicStatuses(topics)

    await updateState({
      currentStep: 'discovering_topics',
      progress: progress(18, 'Discovering topics', 'Keeping the queue topped up'),
    })
    const discoveryResult = await topUpTopicQueue({ topics, settings, researchSources, history })
    topics = discoveryResult.topics
    await updateTopics(topics)
    await logEvent({
      type: 'topic_discovery_completed',
      runId,
      added: discoveryResult.added.length,
      skipped: discoveryResult.skipped,
      reason: discoveryResult.reason,
      newsInputs: discoveryResult.newsInputs || 0,
    })

    const selectedTopics = selectTopics(topics, settings)

    if (selectedTopics.length === 0) {
      await logEvent({ type: 'run_skipped', runId, reason: 'no_eligible_topics' })
      await updateState({
        running: false,
        currentStep: 'idle',
        lastRunAt: startedAt,
        nextRunAt: nextRunIso(settings),
        activeRunId: null,
        progress: progress(100, 'No eligible topics', 'Run skipped'),
      })
      return {
        ok: true,
        runId,
        skipped: true,
        reason: 'no_eligible_topics',
        articles: [],
      }
    }

    const generatedArticles = []
    const runReport = {
      ok: true,
      runId,
      startedAt,
      finishedAt: null,
      reason,
      selectedTopics: selectedTopics.map((topic) => topic.id),
      articles: [],
      errors: [],
      discoveredTopics: discoveryResult.added.map((topic) => ({
        id: topic.id,
        topic: topic.topic,
        category: topic.category,
        primaryKeyword: topic.primaryKeyword,
      })),
    }

    for (const [index, topic] of selectedTopics.entries()) {
      const itemStart = 25 + Math.round((index / selectedTopics.length) * 55)
      const itemMiddle = 25 + Math.round(((index + 0.45) / selectedTopics.length) * 55)
      const itemValidated = 25 + Math.round(((index + 0.7) / selectedTopics.length) * 55)
      const itemEnd = 25 + Math.round(((index + 0.9) / selectedTopics.length) * 55)

      await updateState({
        currentStep: `researching:${topic.id}`,
        progress: progress(
          itemStart,
          `Researching ${index + 1} of ${selectedTopics.length}`,
          topic.topic
        ),
      })
      await logEvent({ type: 'topic_research_started', runId, topicId: topic.id })
      const research = await researchTopic(topic, settings, researchSources)

      await updateState({
        currentStep: `generating:${topic.id}`,
        progress: progress(
          itemMiddle,
          `Generating ${index + 1} of ${selectedTopics.length}`,
          topic.topic
        ),
      })
      await logEvent({ type: 'topic_generation_started', runId, topicId: topic.id })
      const article = await generateArticle({ topic, research, settings })

      await updateState({
        currentStep: `validating:${topic.id}`,
        progress: progress(
          itemValidated,
          `Validating ${index + 1} of ${selectedTopics.length}`,
          article.frontmatter.title || topic.topic
        ),
      })
      const textValidation = await validateArticle({
        article,
        topic,
        research,
        settings: {
          ...settings,
          images: {
            ...(settings.images || {}),
            enabled: false,
          },
        },
      })
      if (!textValidation.ok) {
        topics = markTopic(topics, topic.id, {
          status: 'failed',
          lastError: textValidation.errors.map((error) => error.message).join('; '),
          failedAt: nowIso(),
        })
        runReport.errors.push({ topicId: topic.id, validation: textValidation })
        await logEvent({ type: 'topic_validation_failed', runId, topicId: topic.id, validation: textValidation })
        continue
      }

      await updateState({
        currentStep: `generating_image:${topic.id}`,
        progress: progress(
          itemEnd,
          `Generating image ${index + 1} of ${selectedTopics.length}`,
          article.frontmatter.title || topic.topic
        ),
      })
      await logEvent({ type: 'topic_image_generation_started', runId, topicId: topic.id })
      const articleWithImage = await attachGeneratedImage({ article, topic, settings })
      const validation = await validateArticle({ article: articleWithImage, topic, research, settings })
      if (!validation.ok) {
        topics = markTopic(topics, topic.id, {
          status: 'failed',
          lastError: validation.errors.map((error) => error.message).join('; '),
          failedAt: nowIso(),
        })
        runReport.errors.push({ topicId: topic.id, validation })
        await logEvent({ type: 'topic_validation_failed', runId, topicId: topic.id, validation })
        continue
      }

      generatedArticles.push(articleWithImage)
      topics = markTopic(topics, topic.id, {
        status: 'generated',
        generatedSlug: articleWithImage.slug,
        generatedAt: nowIso(),
        lastError: null,
      })
      runReport.articles.push({
        topicId: topic.id,
        slug: articleWithImage.slug,
        title: articleWithImage.frontmatter.title,
        image: articleWithImage.frontmatter.image,
        imageModel: articleWithImage.frontmatter.imageModel,
        wordCount: validation.wordCount,
        sources: research.sources?.length || 0,
      })
      await logEvent({
        type: 'topic_generated',
        runId,
        topicId: topic.id,
        slug: articleWithImage.slug,
        image: articleWithImage.frontmatter.image,
      })
    }

    await updateTopics(topics)

    if (generatedArticles.length === 0) {
      throw new Error('No articles passed quality checks')
    }

    await updateState({
      currentStep: 'validating_existing_content',
      progress: progress(84, 'Validating existing content', 'Checking duplicates and content health'),
    })
    const existingValidation = await validateExistingContent(settings)
    if (!existingValidation.ok) {
      throw new Error(
        `Existing content validation failed: ${existingValidation.errors
          .map((error) => error.message)
          .join('; ')}`
      )
    }

    await updateState({
      currentStep: 'publishing',
      progress: progress(92, 'Writing drafts', 'Saving generated posts'),
    })
    const publishResult = await publishArticles({ articles: generatedArticles, settings })

    const nextTopicStatus = settings.publishing.mode === 'draft-only' ? 'drafted' : 'published'
    for (const article of generatedArticles) {
      const writtenFile = publishResult.writtenFiles.find((filePath) =>
        filePath.endsWith(`${article.slug}.mdx`)
      )
      topics = markTopic(topics, article.topicId, {
        status: nextTopicStatus,
        generatedSlug: article.slug,
        draftPath: nextTopicStatus === 'drafted' && writtenFile ? path.relative(process.cwd(), writtenFile) : undefined,
        publishedPath:
          nextTopicStatus === 'published' && writtenFile ? path.relative(process.cwd(), writtenFile) : undefined,
        draftedAt: nextTopicStatus === 'drafted' ? nowIso() : undefined,
        publishedAt: nextTopicStatus === 'published' ? nowIso() : undefined,
        lastError: null,
      })
    }
    await updateTopics(topics)

    const nextHistory = await readJson(historyPath, [])
    nextHistory.push({
      event: 'run_completed',
      runId,
      at: nowIso(),
      articles: runReport.articles,
      discoveredTopics: runReport.discoveredTopics,
      publishResult,
    })
    await writeJson(historyPath, nextHistory)

    runReport.finishedAt = nowIso()
    runReport.publishResult = publishResult
    await writeJson(path.join(reportsDir, 'run-latest.json'), runReport)

    await logEvent({ type: 'run_completed', runId, articles: runReport.articles.length, publishResult })
    await updateState({
      running: false,
      currentStep: 'idle',
      lastRunAt: startedAt,
      nextRunAt: nextRunIso(settings),
      postsGeneratedToday: generatedArticles.length,
      activeRunId: null,
      lastError: null,
      progress: progress(100, 'Completed', `${generatedArticles.length} post${generatedArticles.length === 1 ? '' : 's'} generated`),
    })

    return {
      ok: true,
      runId,
      skipped: false,
      articles: runReport.articles,
      publishResult,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    await logEvent({ type: 'run_failed', runId, error: message })
    await writeJson(path.join(reportsDir, 'run-latest.json'), {
      ok: false,
      runId,
      startedAt,
      finishedAt: nowIso(),
      error: message,
    })
    await updateState({
      running: false,
      currentStep: 'error',
      lastRunAt: startedAt,
      nextRunAt: nextRunIso(settings),
      activeRunId: null,
      lastError: message,
      progress: {
        ...progress(100, 'Failed', message),
        error: true,
      },
    })
    throw error
  }
}
