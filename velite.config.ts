import { defineConfig, defineCollection, s } from 'velite'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

/**
 * Velite configuration for type-safe content management
 * Transforms MDX files into typed JSON at build time
 */

/**
 * Blog posts collection
 * Stored in content/posts/*.mdx
 */
const posts = defineCollection({
  name: 'Post',
  pattern: 'posts/**/*.mdx',
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(150),
      description: s.string().max(500),
      date: s.isodate(),
      lastUpdated: s.isodate().optional(),
      lastReviewedAt: s.isodate().optional(),
      published: s.boolean().default(true),
      author: s.string().default('Interview Pilot Team'),
      image: s.string().optional(),
      imageAlt: s.string().optional(),
      imagePrompt: s.string().optional(),
      imageModel: s.string().optional(),
      generatedImages: s
        .array(
          s.object({
            type: s.string(),
            id: s.string().optional(),
            section: s.string().optional(),
            path: s.string(),
            alt: s.string(),
            model: s.string().optional(),
            prompt: s.string().optional(),
          })
        )
        .default([]),
      category: s.string().default('interviews'),
      contentType: s.string().default('article'),
      primaryKeyword: s.string().optional(),
      secondaryKeywords: s.array(s.string()).default([]),
      searchIntent: s.string().optional(),
      uniqueAngle: s.string().optional(),
      freshnessType: s.string().default('evergreen'),
      sources: s.array(s.string()).default([]),
      internalLinks: s.array(s.string()).default([]),
      tags: s.array(s.string()).default([]),
      tableOfContents: s
        .array(
          s.object({
            title: s.string(),
            id: s.string(),
            depth: s.number(),
          })
        )
        .default([]),
      body: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      // Extract just the filename as slug (e.g., "posts/getting-started" -> "getting-started")
      slugAsParams: data.slug.split('/').pop() || data.slug,
      // Calculate reading time
      readingTime: Math.max(1, Math.ceil(data.body.split(/\s+/).length / 200)),
      lastUpdated: data.lastUpdated || data.date,
    })),
})

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static/blog',
    base: '/static/blog/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { posts },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
})
