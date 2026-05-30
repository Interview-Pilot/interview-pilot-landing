import {
  BLOG_CATEGORIES,
  CONTENT_TYPES,
  FRESHNESS_TYPES,
  countWords,
  extractHeadings,
  jaccardSimilarity,
  readAllPosts,
  textFingerprint,
} from './lib/content.mjs'

const PLACEHOLDER_PATTERNS = [
  /\bTODO\b/i,
  /\bplaceholder\b/i,
  /\badd sources?\b/i,
  /\bcitation needed\b/i,
  /\binsert\b.+\bhere\b/i,
  /\blorem ipsum\b/i,
  /\[source\]/i,
  /\[link\]/i,
]

function createVirtualPost(article) {
  return {
    source: 'candidate',
    filePath: article.slug,
    slug: article.slug,
    frontmatter: article.frontmatter,
    body: article.body,
    raw: article.mdx,
    wordCount: countWords(article.mdx),
    headings: extractHeadings(article.body),
  }
}

function issue(level, code, message, context = {}) {
  return { level, code, message, context }
}

function countMarkdownTables(markdown) {
  const lines = String(markdown || '').split(/\r?\n/)
  let count = 0

  for (let index = 0; index < lines.length - 1; index += 1) {
    const header = lines[index].trim()
    const separator = lines[index + 1].trim()
    if (
      header.startsWith('|') &&
      header.endsWith('|') &&
      /^\|\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(separator)
    ) {
      count += 1
    }
  }

  return count
}

function countRichStructures(markdown) {
  const componentMatches = String(markdown || '').match(
    /<(Callout|AnswerBlock|TemplateBlock|Checklist|StepList|ExampleGrid|ExampleCard|StatCard)\b/g
  )

  return (componentMatches?.length || 0) + countMarkdownTables(markdown)
}

export async function validateArticle({ article, topic, research, settings }) {
  const errors = []
  const warnings = []
  const post = createVirtualPost(article)
  const data = post.frontmatter

  const requiredFields = [
    'title',
    'description',
    'date',
    'lastUpdated',
    'category',
    'contentType',
    'primaryKeyword',
    'searchIntent',
    'uniqueAngle',
    'freshnessType',
  ]

  for (const field of requiredFields) {
    if (!data[field]) {
      errors.push(issue('error', 'missing_frontmatter', `Missing frontmatter field: ${field}`))
    }
  }

  if (!BLOG_CATEGORIES.has(data.category)) {
    errors.push(issue('error', 'invalid_category', `Invalid category: ${data.category}`))
  }

  if (!CONTENT_TYPES.has(data.contentType)) {
    errors.push(issue('error', 'invalid_content_type', `Invalid contentType: ${data.contentType}`))
  }

  if (!FRESHNESS_TYPES.has(data.freshnessType)) {
    errors.push(issue('error', 'invalid_freshness_type', `Invalid freshnessType: ${data.freshnessType}`))
  }

  const h1s = post.headings.filter((heading) => heading.depth === 1)
  if (h1s.length !== 1) {
    errors.push(issue('error', 'h1_count', `Expected exactly one H1, found ${h1s.length}`))
  }

  if (post.headings.filter((heading) => heading.depth === 2).length < 3) {
    warnings.push(issue('warning', 'few_h2s', 'Article has fewer than three H2 sections'))
  }

  if (post.wordCount < settings.generation.minimumWordCount) {
    errors.push(
      issue(
        'error',
        'word_count',
        `Article is ${post.wordCount} words; minimum is ${settings.generation.minimumWordCount}`
      )
    )
  }

  if (settings.safety.rejectIfPlaceholdersFound) {
    for (const pattern of PLACEHOLDER_PATTERNS) {
      if (pattern.test(article.mdx)) {
        errors.push(issue('error', 'placeholder_text', `Placeholder-like text matched: ${pattern}`))
      }
    }
  }

  const minRichStructures = settings.contentStructure?.minRichStructuresPerPost || 0
  const richStructures = countRichStructures(article.body)
  if (minRichStructures > 0 && richStructures < minRichStructures) {
    errors.push(
      issue(
        'error',
        'missing_rich_structures',
        `Article has ${richStructures} rich structures; minimum is ${minRichStructures}`
      )
    )
  }

  const needsSources =
    topic.researchRequired === true ||
    ['news-analysis', 'research-report', 'trend-analysis'].includes(topic.contentType)

  if (needsSources && settings.safety.rejectIfSourcesMissing && !research.sources?.length) {
    errors.push(issue('error', 'missing_sources', 'This topic requires sources but none were found'))
  }

  if (needsSources && !data.sources?.length) {
    errors.push(issue('error', 'missing_frontmatter_sources', 'Frontmatter missing sources'))
  }

  if (!data.internalLinks?.length) {
    warnings.push(issue('warning', 'missing_internal_links', 'Frontmatter missing internalLinks'))
  }

  if (settings.images?.enabled !== false && settings.images?.required !== false) {
    if (!data.image) {
      errors.push(issue('error', 'missing_image', 'Frontmatter missing generated image'))
    }
    if (!data.imageAlt) {
      errors.push(issue('error', 'missing_image_alt', 'Frontmatter missing generated image alt text'))
    }
    if ((data.generatedImages?.length || 0) < (settings.images?.minPerPost || 1)) {
      errors.push(
        issue(
          'error',
          'missing_generated_images',
          `Expected at least ${settings.images?.minPerPost || 1} generated image`
        )
      )
    }
  }

  const existingPosts = await readAllPosts()
  const duplicateSlug = existingPosts.find((existing) => existing.slug === article.slug)
  if (duplicateSlug) {
    errors.push(
      issue('error', 'duplicate_slug', `Slug already exists: ${duplicateSlug.filePath}`)
    )
  }

  const keyword = String(data.primaryKeyword || '').toLowerCase()
  const duplicateKeyword = existingPosts.find(
    (existing) => String(existing.frontmatter.primaryKeyword || '').toLowerCase() === keyword
  )
  if (keyword && duplicateKeyword) {
    errors.push(
      issue(
        'error',
        'duplicate_primary_keyword',
        `Primary keyword already exists: ${duplicateKeyword.filePath}`
      )
    )
  }

  const candidateFingerprint = textFingerprint(post)
  for (const existing of existingPosts) {
    const similarity = jaccardSimilarity(candidateFingerprint, textFingerprint(existing))
    if (similarity >= 0.85) {
      errors.push(
        issue(
          'error',
          'duplicate_content',
          `Article too similar to ${existing.filePath}: ${similarity.toFixed(2)}`
        )
      )
    } else if (similarity >= 0.7) {
      warnings.push(
        issue(
          'warning',
          'similar_content',
          `Article may overlap with ${existing.filePath}: ${similarity.toFixed(2)}`
        )
      )
    }
  }

  return {
    ok: errors.length === 0,
    errors,
    warnings,
    wordCount: post.wordCount,
    headings: post.headings,
  }
}

export async function validateExistingContent(settings) {
  const posts = await readAllPosts()
  const errors = []
  const warnings = []

  for (const post of posts) {
    const data = post.frontmatter
    if (!BLOG_CATEGORIES.has(data.category)) {
      errors.push(issue('error', 'invalid_category', `Invalid category in ${post.filePath}`))
    }
    if (!CONTENT_TYPES.has(data.contentType)) {
      errors.push(issue('error', 'invalid_content_type', `Invalid contentType in ${post.filePath}`))
    }
    if (post.wordCount < settings.generation.minimumWordCount && post.source === 'published') {
      warnings.push(issue('warning', 'short_published_post', `Short published post: ${post.filePath}`))
    }
  }

  return { ok: errors.length === 0, errors, warnings, posts: posts.length }
}
