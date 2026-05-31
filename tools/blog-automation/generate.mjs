import path from 'node:path'

import { createMdx, normalizeMarkdownTables, slugify } from './lib/content.mjs'
import { reportsDir, repoRoot } from './lib/paths.mjs'
import { writeJson } from './lib/store.mjs'
import { generateWithOpenAI } from './model.mjs'

const ARTICLE_RESPONSE_FORMAT = {
  type: 'json_schema',
  name: 'blog_article',
  description: 'A complete Interview Pilot blog article with frontmatter metadata and MDX body.',
  strict: true,
  schema: {
    type: 'object',
    additionalProperties: false,
    required: ['frontmatter', 'body'],
    properties: {
      frontmatter: {
        type: 'object',
        additionalProperties: false,
        required: [
          'title',
          'date',
          'lastUpdated',
          'lastReviewedAt',
          'description',
          'author',
          'category',
          'contentType',
          'primaryKeyword',
          'secondaryKeywords',
          'searchIntent',
          'uniqueAngle',
          'freshnessType',
          'sources',
          'internalLinks',
          'tags',
          'published',
        ],
        properties: {
          title: { type: 'string' },
          date: { type: 'string' },
          lastUpdated: { type: 'string' },
          lastReviewedAt: { type: 'string' },
          description: { type: 'string' },
          author: { type: 'string' },
          category: { type: 'string' },
          contentType: { type: 'string' },
          primaryKeyword: { type: 'string' },
          secondaryKeywords: {
            type: 'array',
            items: { type: 'string' },
          },
          searchIntent: { type: 'string' },
          uniqueAngle: { type: 'string' },
          freshnessType: { type: 'string' },
          sources: {
            type: 'array',
            items: { type: 'string' },
          },
          internalLinks: {
            type: 'array',
            items: { type: 'string' },
          },
          tags: {
            type: 'array',
            items: { type: 'string' },
          },
          published: { type: 'boolean' },
        },
      },
        body: {
          type: 'string',
          description: 'Complete MDX article body with exactly one H1 and standard Markdown only. No custom MDX components.',
        },
    },
  },
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

function articleInstructions(settings) {
  return `You are the Interview Pilot editorial engine.

Write complete, publishable MDX blog articles for www.interviewpilot.app.

Hard requirements:
- Return ONLY valid JSON with keys: frontmatter, body.
- frontmatter must be an object.
- body must be a complete MDX markdown article.
- No placeholder text.
- No TODOs.
- No fake citations.
- No unsupported statistics.
- If sources are provided, use only those sources for current/news/data claims.
- If no sources are provided, write evergreen advice and avoid specific factual market claims.
- Include exactly one H1 at the top of body.
- Use practical candidate-facing advice.
- Use internal links naturally where relevant.
- Minimum body length target: ${settings.generation.minimumWordCount} words.
- Keep brand tone direct, useful, and credible.

Formatting requirements:
- Use clean standard Markdown only.
- Do not use custom MDX components.
- Do not use decorative callout boxes, cards, stat cards, custom checklists, or custom grids.
- Use normal paragraphs, H2/H3 headings, bullet lists, numbered lists, blockquotes, fenced code blocks, and Markdown tables.
- Use Markdown tables only where they genuinely improve clarity: comparisons, timelines, examples, mistakes vs fixes, or decision criteria.
- Keep formatting simple and readable. Do not add formatting just to make the page look busy.

SEO and structure requirements:
- Write for the exact primary keyword and search intent in the topic.
- Make the H1 closely match the article title and primary keyword.
- Start with a short direct answer or practical summary within the first 120 words.
- Use clear H2 sections that match likely sub-questions users search.
- Use H3s only when they make the article easier to scan.
- Prefer concrete examples, scripts, templates, checklists, tables, and sample answers over generic advice.
- Include a practical "quick answer" or "key takeaways" section near the top when appropriate.
- Include 5-10 specific sections for long utility articles.
- For list posts, make every item useful and specific, not filler.
- For examples/templates posts, include complete usable examples.
- For interview-question posts, include sample answers and explanation of why each answer works.
- Avoid abstract commentary, vague trends, motivational filler, and generic career advice.
- Do not over-promote Interview Pilot; mention it only where naturally useful.
- End with a concise next-step section that points to relevant internal links.`
}

function articleInput({ topic, research, settings }) {
  return JSON.stringify(
    {
      task: 'Generate one complete Interview Pilot blog post.',
      topic,
      research,
      siteContext: {
        product: 'Interview Pilot',
        audience:
          'job seekers preparing for interviews, students, professionals, and candidates improving resumes, applications, and interview performance',
        corePages: topic.internalLinks || [],
      },
      outputContract: {
        frontmatter: {
          title: 'string, <= 70 chars when possible',
          date: today(),
          lastUpdated: today(),
          lastReviewedAt: today(),
          description: 'string, 120-165 chars when possible',
          author: 'Interview Pilot Editorial Team',
          category: topic.category,
          contentType: topic.contentType,
          primaryKeyword: topic.primaryKeyword,
          secondaryKeywords: topic.secondaryKeywords || [],
          searchIntent: topic.searchIntent || 'informational',
          uniqueAngle: topic.uniqueAngle,
          freshnessType: topic.freshnessType || 'evergreen',
          sources: research.sources?.map((source) => source.url) || [],
          internalLinks: topic.internalLinks || [],
          tags: [topic.category, topic.contentType, ...(topic.secondaryKeywords || []).slice(0, 3)],
          published: true,
        },
        body:
          'complete MDX markdown article with exactly one H1, multiple search-intent H2 sections, concrete examples, practical lists, and Markdown tables only where useful',
      },
      settings: {
        minimumWordCount: settings.generation.minimumWordCount,
      },
    },
    null,
    2
  )
}

function parseJsonFromModel(output) {
  const trimmed = output.trim()
  const fenced = trimmed.match(/^```json\s*([\s\S]*?)```\s*$/i)
  const jsonText = fenced ? fenced[1] : trimmed
  return JSON.parse(jsonText)
}

function safeReportPart(value) {
  return String(value || 'unknown')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
}

async function writeModelFailureReport({ runId, topic, research, instructions, input, output, error }) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const fileName = `${timestamp}-${safeReportPart(runId)}-${safeReportPart(topic.id)}.json`
  const filePath = path.join(reportsDir, 'model-failures', fileName)

  await writeJson(filePath, {
    at: new Date().toISOString(),
    runId,
    topicId: topic.id,
    topic,
    research,
    error: {
      name: error?.name || 'Error',
      message: error?.message || String(error),
      stack: error?.stack || null,
    },
    request: {
      instructions,
      input,
    },
    rawOutput: output,
  })

  return path.relative(repoRoot, filePath)
}

export async function generateArticle({ topic, research, settings, runId }) {
  const instructions = articleInstructions(settings)
  const input = articleInput({ topic, research, settings })
  const output = await generateWithOpenAI({
    settings,
    instructions,
    input,
    textFormat: ARTICLE_RESPONSE_FORMAT,
  })
  let parsed

  try {
    parsed = parseJsonFromModel(output)
  } catch (error) {
    const reportPath = await writeModelFailureReport({
      runId,
      topic,
      research,
      instructions,
      input,
      output,
      error,
    })
    const message = error instanceof Error ? error.message : String(error)
    throw new Error(`${message}. Full model failure report saved to ${reportPath}`)
  }

  if (!parsed.frontmatter || !parsed.body) {
    const reportPath = await writeModelFailureReport({
      runId,
      topic,
      research,
      instructions,
      input,
      output,
      error: new Error(`Model output missing frontmatter/body for topic: ${topic.id}`),
    })
    throw new Error(`Model output missing frontmatter/body for topic: ${topic.id}. Full model failure report saved to ${reportPath}`)
  }

  const slug = slugify(topic.slug || parsed.frontmatter.slug || topic.primaryKeyword || topic.topic)
  const frontmatter = {
    ...parsed.frontmatter,
    date: parsed.frontmatter.date || today(),
    lastUpdated: parsed.frontmatter.lastUpdated || today(),
    lastReviewedAt: parsed.frontmatter.lastReviewedAt || today(),
    author: parsed.frontmatter.author || 'Interview Pilot Editorial Team',
    category: topic.category,
    contentType: topic.contentType,
    primaryKeyword: topic.primaryKeyword,
    secondaryKeywords: topic.secondaryKeywords || [],
    searchIntent: topic.searchIntent || 'informational',
    uniqueAngle: topic.uniqueAngle,
    freshnessType: topic.freshnessType || 'evergreen',
    sources: research.sources?.map((source) => source.url) || [],
    internalLinks: topic.internalLinks || [],
    published: true,
  }

  const body = normalizeMarkdownTables(parsed.body)

  return {
    topicId: topic.id,
    slug,
    frontmatter,
    body,
    mdx: createMdx(frontmatter, body),
    modelOutput: output,
  }
}
