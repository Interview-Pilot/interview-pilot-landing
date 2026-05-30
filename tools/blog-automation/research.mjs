function decodeXml(value = '') {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

function stripHtml(value = '') {
  return decodeXml(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function extractTag(item, tag) {
  const match = item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'))
  return match ? decodeXml(match[1]).trim() : ''
}

function parseRss(xml) {
  const items = xml.match(/<item\b[\s\S]*?<\/item>/gi) || []
  return items.map((item) => {
    const title = stripHtml(extractTag(item, 'title'))
    const rawLink = stripHtml(extractTag(item, 'link'))
    const description = stripHtml(extractTag(item, 'description'))
    const source = stripHtml(extractTag(item, 'source')) || new URL(rawLink || 'https://news.google.com').hostname
    const publishedAt = new Date(stripHtml(extractTag(item, 'pubDate')) || Date.now()).toISOString()
    const url = normalizeGoogleNewsUrl(rawLink)

    return {
      title,
      url,
      source,
      publishedAt,
      summary: description,
    }
  })
}

function normalizeGoogleNewsUrl(url) {
  if (!url) return ''
  try {
    const parsed = new URL(url)
    const target = parsed.searchParams.get('url')
    return target || url
  } catch {
    return url
  }
}

function buildGoogleNewsRssUrl(query) {
  const params = new URLSearchParams({
    q: query,
    hl: 'en-US',
    gl: 'US',
    ceid: 'US:en',
  })
  return `https://news.google.com/rss/search?${params}`
}

export async function searchGoogleNews(query, settings) {
  const response = await fetch(buildGoogleNewsRssUrl(query), {
    headers: {
      'User-Agent':
        'InterviewPilotBlogAutomation/1.0 (+https://www.interviewpilot.app)',
    },
  })

  if (!response.ok) {
    throw new Error(`Research fetch failed for "${query}": ${response.status}`)
  }

  return parseRss(await response.text()).slice(0, settings.research.maxNewsItemsPerQuery)
}

function scoreItem(item, topic) {
  const haystack = `${item.title} ${item.summary}`.toLowerCase()
  const terms = [
    topic.primaryKeyword,
    ...(topic.secondaryKeywords || []),
    topic.category,
    topic.topic,
  ]
    .filter(Boolean)
    .flatMap((term) => String(term).toLowerCase().split(/\s+/))
    .filter((term) => term.length > 3)

  const uniqueTerms = new Set(terms)
  let score = 0
  for (const term of uniqueTerms) {
    if (haystack.includes(term)) score += 1
  }

  const publishedAt = Date.parse(item.publishedAt)
  const ageDays = Number.isFinite(publishedAt)
    ? (Date.now() - publishedAt) / (1000 * 60 * 60 * 24)
    : 999

  if (ageDays <= 3) score += 3
  else if (ageDays <= 14) score += 1

  return score
}

export function topicNeedsResearch(topic) {
  if (topic.researchRequired === true) return true
  if (topic.sourceDepth && topic.sourceDepth !== 'none') return true
  return ['news-analysis', 'research-report', 'trend-analysis'].includes(topic.contentType)
}

export async function researchTopic(topic, settings, researchSources) {
  if (!topicNeedsResearch(topic)) {
    return {
      topicId: topic.id,
      required: false,
      sources: [],
      searchedQueries: [],
    }
  }

  const queries = [
    topic.primaryKeyword,
    ...(topic.secondaryKeywords || []),
    ...researchSources
      .filter((source) => !source.category || source.category === topic.category)
      .map((source) => source.query),
  ].filter(Boolean)

  const uniqueQueries = [...new Set(queries)]
  const items = []

  for (const query of uniqueQueries) {
    const parsed = await searchGoogleNews(query, settings)
    items.push(
      ...parsed.map((item) => ({
        ...item,
        query,
        relevanceScore: scoreItem(item, topic),
      }))
    )
  }

  const sources = items
    .filter((item) => item.title && item.url)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .filter((item, index, all) => all.findIndex((candidate) => candidate.url === item.url) === index)
    .slice(0, settings.research.maxSourcesPerArticle)

  if (settings.safety.rejectIfSourcesMissing && sources.length === 0) {
    throw new Error(`No usable research sources found for topic: ${topic.id}`)
  }

  return {
    topicId: topic.id,
    required: true,
    searchedQueries: uniqueQueries,
    sources,
  }
}
