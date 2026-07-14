import { BLOG_CATEGORIES, CONTENT_TYPES, FRESHNESS_TYPES, slugify, readAllPosts } from './lib/content.mjs'
import { generateWithOpenAI } from './model.mjs'
import { searchGoogleNews } from './research.mjs'

const INTERNAL_LINKS_BY_CATEGORY = {
  interviews: ['/interview-copilot', '/interview-questions', '/interview-guides'],
  recruiting: ['/interview-guides', '/interview-copilot', '/question-bank'],
  'ai-tools': ['/interview-copilot', '/ai-mock-interview', '/downloads'],
  career: ['/interview-guides', '/interview-questions', '/downloads'],
  research: ['/interview-guides', '/question-bank', '/interview-copilot'],
  companies: ['/interview-questions', '/interview-guides', '/question-bank'],
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function topicFingerprint(topic) {
  return normalizeText([topic.topic, topic.primaryKeyword, topic.slug || topic.generatedSlug].filter(Boolean).join(' '))
}

function postFingerprint(post) {
  return normalizeText(
    [
      post.slug,
      post.frontmatter?.title,
      post.frontmatter?.primaryKeyword,
      post.frontmatter?.description,
    ]
      .filter(Boolean)
      .join(' ')
  )
}

function topicIdFrom(topic) {
  return slugify(topic.id || topic.primaryKeyword || topic.topic).slice(0, 80)
}

function defaultTopicDiscoverySettings(settings) {
  return {
    enabled: true,
    minQueuedTopics: 8,
    maxTopicsPerRun: 6,
    newsCandidatesPerRun: 8,
    evergreenCandidatesPerRun: 12,
    ...(settings.topicDiscovery || {}),
  }
}

function existingFingerprints({ topics, posts, history }) {
  return new Set(
    [
      ...topics.map(topicFingerprint),
      ...topics.map((topic) => normalizeText(topic.id)),
      ...topics.map((topic) => normalizeText(topic.slug || topic.generatedSlug)),
      ...posts.map(postFingerprint),
      ...posts.map((post) => normalizeText(post.slug)),
      ...history.map((entry) => normalizeText(entry.slug)),
      ...history.map((entry) => normalizeText(entry.topicId)),
    ].filter(Boolean)
  )
}

function hasOverlap(candidate, fingerprints) {
  const candidateValues = [
    topicFingerprint(candidate),
    normalizeText(topicIdFrom(candidate)),
    normalizeText(candidate.primaryKeyword),
  ].filter(Boolean)

  return candidateValues.some((value) => {
    if (fingerprints.has(value)) return true
    for (const existing of fingerprints) {
      if (!existing || !value) continue
      if (existing.includes(value) || value.includes(existing)) return true
    }
    return false
  })
}

function normalizeTopic(candidate, source) {
  const category = String(candidate.category || 'interviews')
  const contentType = String(candidate.contentType || 'how-to-guide')
  const freshnessType = String(candidate.freshnessType || (contentType === 'news-analysis' ? 'news-sensitive' : 'evergreen'))

  return {
    id: topicIdFrom(candidate),
    topic: String(candidate.topic || '').trim(),
    category,
    contentType,
    primaryKeyword: String(candidate.primaryKeyword || candidate.topic || '').trim(),
    secondaryKeywords: Array.isArray(candidate.secondaryKeywords)
      ? candidate.secondaryKeywords.map(String).filter(Boolean).slice(0, 5)
      : [],
    searchIntent: candidate.searchIntent || 'informational',
    uniqueAngle: String(candidate.uniqueAngle || '').trim(),
    freshnessType,
    researchRequired: Boolean(candidate.researchRequired ?? contentType === 'news-analysis'),
    sourceDepth: candidate.sourceDepth || (contentType === 'news-analysis' ? 'standard' : 'none'),
    priority: candidate.priority || (contentType === 'news-analysis' ? 'high' : 'medium'),
    status: 'queued',
    targetWordCount: Number(candidate.targetWordCount || 1800),
    createdAt: today(),
    internalLinks: Array.isArray(candidate.internalLinks) && candidate.internalLinks.length
      ? candidate.internalLinks.slice(0, 5)
      : INTERNAL_LINKS_BY_CATEGORY[category] || ['/interview-copilot', '/interview-guides'],
    requiredSourceTypes: Array.isArray(candidate.requiredSourceTypes)
      ? candidate.requiredSourceTypes.slice(0, 4)
      : contentType === 'news-analysis'
        ? ['news']
        : [],
    discoveredBy: source,
  }
}

function validateTopic(topic) {
  if (!topic.topic || topic.topic.length < 20) return false
  if (!topic.primaryKeyword || topic.primaryKeyword.length < 8) return false
  if (!topic.uniqueAngle || topic.uniqueAngle.length < 20) return false
  if (!BLOG_CATEGORIES.has(topic.category)) return false
  if (!CONTENT_TYPES.has(topic.contentType)) return false
  if (!FRESHNESS_TYPES.has(topic.freshnessType)) return false
  return true
}

async function collectNewsInputs({ settings, researchSources, discoverySettings }) {
  if (!settings.safety.allowNewsPosts) return []

  const queries = researchSources.map((source) => source.query).filter(Boolean)

  const items = []
  for (const query of [...new Set(queries)]) {
    try {
      const results = await searchGoogleNews(query, settings)
      items.push(...results.map((item) => ({ ...item, query })))
    } catch (error) {
      // A single source failure should not stop evergreen topic discovery.
      items.push({
        title: `Source fetch failed for ${query}`,
        summary: error instanceof Error ? error.message : String(error),
        query,
        failed: true,
      })
    }
  }

  return items
    .filter((item) => !item.failed && item.title && item.url)
    .filter((item, index, all) => all.findIndex((candidate) => candidate.url === item.url) === index)
    .slice(0, discoverySettings.newsCandidatesPerRun)
}

function topicDiscoveryInstructions() {
  return `You are the Interview Pilot editorial strategist.

Return ONLY valid JSON with key "topics".

Create specific, non-duplicative SEO blog topic objects for www.interviewpilot.app.

Primary objective:
- Generate topics that look like real Google search queries with clear search demand.
- Prioritize practical utility posts that solve a concrete job-search or interview-prep problem.
- The topic/title should be something a candidate would actually search, not an abstract editorial idea.

Requirements:
- Each topic must be useful to job candidates preparing for interviews.
- Prefer high-intent evergreen SEO topics over commentary.
- Prefer query-shaped formats:
  - numbered lists: "50 Common Interview Questions..."
  - examples: "LinkedIn Headline Examples..."
  - templates: "Letter of Recommendation Template..."
  - how-to guides: "How to Write a Cover Letter With No Experience..."
  - timing/process queries: "How Long to Hear Back After Applying..."
  - role/company interview questions: "[Role] Interview Questions and Answers..."
  - resume, cover letter, LinkedIn, job search, interview questions, and interview answer utility posts.
- Strong topics should include a clear primary keyword phrase a user would type into Google.
- Titles can use the current year when it naturally improves search intent.
- Use news inputs only for news-sensitive topics.
- Do not invent statistics, sources, company announcements, or facts.
- Avoid competitor attacks unless directly useful and accurate.
- Return topics that can become complete 1600+ word posts.
- Reject topics that sound like opinion columns, abstract trends, AI ethics commentary, generic thought leadership, or broad industry analysis.
- Keep Interview Pilot/product mentions mostly for internalLinks and article angle, not forced into every title.
- No placeholder text.
- No TODOs.
- No duplicate or near-duplicate topics.

Each topic object must include:
id, topic, category, contentType, primaryKeyword, secondaryKeywords, searchIntent,
uniqueAngle, freshnessType, researchRequired, sourceDepth, priority, targetWordCount,
internalLinks, requiredSourceTypes.`
}

function topicDiscoveryInput({ settings, topics, posts, history, newsItems, discoverySettings }) {
  return JSON.stringify(
    {
      task: 'Top up the Interview Pilot blog topic queue.',
      neededTopicCount: discoverySettings.maxTopicsPerRun,
      categoriesEnabled: settings.categories,
      contentTypesAllowed: [...CONTENT_TYPES],
      freshnessTypesAllowed: [...FRESHNESS_TYPES],
      preferredTopicPatterns: [
        '[number] [interview questions/resume examples/LinkedIn examples/templates] for [audience/use case] ([year])',
        'How to [complete a concrete job-search task] in [year]',
        'How to [answer/write/prepare/follow up/decline/negotiate] [specific scenario]',
        'Best [resume item/interview answer/job-search tactic] for [specific candidate type]',
        'What to Say When [specific interview/job-search situation]',
        '[role] Interview Questions and Answers',
        '[company] Interview Questions',
        '[resume/cover letter/LinkedIn] Examples for [role/situation]',
      ],
      poorTopicPatternsToAvoid: [
        'abstract AI ethics commentary',
        'generic trend analysis without a clear search phrase',
        'thought leadership about hiring markets',
        'broad commentary that does not solve a specific candidate problem',
        'topics that exist mainly to mention Interview Pilot',
      ],
      recentNewsInputs: newsItems.map((item) => ({
        title: item.title,
        source: item.source,
        publishedAt: item.publishedAt,
        url: item.url,
        query: item.query,
        summary: item.summary,
      })),
      existingTopics: topics.map((topic) => ({
        id: topic.id,
        topic: topic.topic,
        primaryKeyword: topic.primaryKeyword,
        category: topic.category,
        status: topic.status,
      })),
      existingPosts: posts.map((post) => ({
        slug: post.slug,
        title: post.frontmatter.title,
        primaryKeyword: post.frontmatter.primaryKeyword,
        category: post.frontmatter.category,
        source: post.source,
      })),
      recentHistory: history.slice(-50),
      sitePages: {
        interviewCopilot: '/interview-copilot',
        questionBank: '/question-bank',
        downloads: '/downloads',
        interviewGuides: '/interview-guides',
        interviewQuestions: '/interview-questions',
      },
    },
    null,
    2
  )
}

function parseTopicDiscoveryOutput(output) {
  const trimmed = output.trim()
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/)
  const jsonText = fenced ? fenced[1] : trimmed
  const parsed = JSON.parse(jsonText)
  if (!Array.isArray(parsed.topics)) {
    throw new Error('Topic discovery output missing topics array')
  }
  return parsed.topics
}

export async function topUpTopicQueue({ topics, settings, researchSources, history }) {
  const discoverySettings = defaultTopicDiscoverySettings(settings)
  if (!discoverySettings.enabled) {
    return { topics, added: [], skipped: true, reason: 'topic_discovery_disabled' }
  }

  const eligibleQueued = topics.filter((topic) => topic.status === 'queued' && settings.categories?.[topic.category])
  if (eligibleQueued.length >= discoverySettings.minQueuedTopics) {
    return { topics, added: [], skipped: true, reason: 'queue_above_threshold' }
  }

  const posts = await readAllPosts()
  const fingerprints = existingFingerprints({ topics, posts, history })
  const needed = Math.min(
    discoverySettings.maxTopicsPerRun,
    discoverySettings.minQueuedTopics - eligibleQueued.length
  )
  const added = []

  const newsItems = await collectNewsInputs({ settings, researchSources, discoverySettings })
  const output = await generateWithOpenAI({
    settings,
    instructions: topicDiscoveryInstructions(),
    input: topicDiscoveryInput({ settings, topics, posts, history, newsItems, discoverySettings }),
  })

  const candidates = parseTopicDiscoveryOutput(output).map((candidate) =>
    normalizeTopic(candidate, 'model-discovery')
  )

  for (const candidate of candidates) {
    if (added.length >= needed) break
    if (!validateTopic(candidate)) continue
    if (hasOverlap(candidate, fingerprints)) continue

    added.push(candidate)
    fingerprints.add(topicFingerprint(candidate))
    fingerprints.add(normalizeText(candidate.id))
    fingerprints.add(normalizeText(candidate.primaryKeyword))
  }

  if (added.length === 0 && needed > 0) {
    return {
      topics,
      added,
      skipped: true,
      reason: 'topic_discovery_no_unique_topics',
      newsInputs: newsItems.length,
    }
  }

  return {
    topics: [...topics, ...added],
    added,
    skipped: false,
    reason: 'queue_topped_up',
    newsInputs: newsItems.length,
  }
}
