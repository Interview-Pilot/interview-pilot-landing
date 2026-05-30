import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'

import { contentPostsDir, draftsDir } from './paths.mjs'
import { ensureDir } from './store.mjs'

export const BLOG_CATEGORIES = new Set([
  'interviews',
  'recruiting',
  'ai-tools',
  'career',
  'research',
  'companies',
])

export const CONTENT_TYPES = new Set([
  'research-report',
  'how-to-guide',
  'trend-analysis',
  'role-deep-dive',
  'candidate-playbook',
  'product-education',
  'news-analysis',
  'article',
])

export const FRESHNESS_TYPES = new Set(['evergreen', 'annual', 'news-sensitive'])

export function slugify(input) {
  return String(input)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function countWords(markdown) {
  return String(markdown)
    .replace(/^---[\s\S]*?---/, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/[#>*_`[\](){}]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length
}

export function extractHeadings(markdown) {
  return String(markdown)
    .split(/\r?\n/)
    .filter((line) => /^#{1,6}\s+/.test(line))
    .map((line) => {
      const [, depth, text] = line.match(/^(#{1,6})\s+(.+)$/) || []
      return { depth: depth?.length || 0, text: text || '' }
    })
}

export function headingId(input) {
  return slugify(input)
}

export function extractTableOfContents(markdown) {
  return extractHeadings(markdown)
    .filter((heading) => heading.depth === 2 || heading.depth === 3)
    .map((heading) => ({
      title: heading.text,
      id: headingId(heading.text),
      depth: heading.depth,
    }))
}

export function normalizeMarkdownTables(markdown) {
  let next = String(markdown || '')
  let previous

  do {
    previous = next
    next = next.replace(/(^\s*\|[^\n]+\|\s*)\n\s*\n(?=\s*\|)/gm, '$1\n')
  } while (next !== previous)

  return next
}

async function readMdxFiles(directory, source) {
  await ensureDir(directory)
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const files = entries.filter((entry) => entry.isFile() && entry.name.endsWith('.mdx'))

  return Promise.all(
    files.map(async (file) => {
      const filePath = path.join(directory, file.name)
      const raw = await fs.readFile(filePath, 'utf8')
      const parsed = matter(raw)
      return {
        source,
        filePath,
        fileName: file.name,
        slug: file.name.replace(/\.mdx$/, ''),
        frontmatter: parsed.data,
        body: parsed.content,
        raw,
        wordCount: countWords(raw),
        headings: extractHeadings(parsed.content),
      }
    })
  )
}

export async function readPublishedPosts() {
  return readMdxFiles(contentPostsDir, 'published')
}

export async function readDraftPosts() {
  return readMdxFiles(draftsDir, 'draft')
}

export async function readAllPosts() {
  const [published, drafts] = await Promise.all([readPublishedPosts(), readDraftPosts()])
  return [...published, ...drafts]
}

export function textFingerprint(post) {
  return [
    post.frontmatter.title,
    post.frontmatter.description,
    post.frontmatter.primaryKeyword,
    post.frontmatter.uniqueAngle,
    post.body,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 3)
}

export function jaccardSimilarity(first, second) {
  const firstSet = new Set(first)
  const secondSet = new Set(second)
  if (!firstSet.size || !secondSet.size) return 0
  let intersection = 0
  for (const value of firstSet) {
    if (secondSet.has(value)) intersection += 1
  }
  return intersection / new Set([...firstSet, ...secondSet]).size
}

export function createMdx(frontmatter, body) {
  const normalizedBody = normalizeMarkdownTables(body)
  const nextFrontmatter = {
    ...frontmatter,
    tableOfContents: frontmatter.tableOfContents || extractTableOfContents(normalizedBody),
  }

  return matter.stringify(normalizedBody.trim() + '\n', nextFrontmatter).replace(/---\n$/, '---\n\n')
}
