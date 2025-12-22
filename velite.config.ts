import { defineConfig, defineCollection, s } from 'velite'

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
      published: s.boolean().default(true),
      author: s.string().default('Interview Pilot Team'),
      image: s.string().optional(),
      tags: s.array(s.string()).default([]),
      body: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      // Extract just the filename as slug (e.g., "posts/getting-started" -> "getting-started")
      slugAsParams: data.slug.split('/').pop() || data.slug,
      // Calculate reading time
      readingTime: Math.max(1, Math.ceil(data.body.split(/\s+/).length / 200)),
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
    remarkPlugins: [],
    rehypePlugins: [],
  },
})
