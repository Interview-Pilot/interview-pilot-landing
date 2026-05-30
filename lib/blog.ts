import { posts } from '#content'
import {
  blogCategories,
  getBlogCategoryLabel,
  type BlogCategorySlug,
} from '#data/blog'

export type BlogPost = (typeof posts)[number]

export function getPublishedPosts() {
  return posts
    .filter((post) => post.published)
    .sort((a, b) => {
      const firstDate = new Date(b.lastUpdated || b.date).getTime()
      const secondDate = new Date(a.lastUpdated || a.date).getTime()
      return firstDate - secondDate
    })
}

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.published && post.slugAsParams === slug)
}

export function getBlogCategoryBySlug(slug: string) {
  return blogCategories.find((category) => category.slug === slug)
}

export function getPostsByCategory(categorySlug: BlogCategorySlug) {
  return getPublishedPosts().filter((post) => post.category === categorySlug)
}

export function getRelatedPosts(post: BlogPost, limit = 3) {
  const publishedPosts = getPublishedPosts().filter(
    (candidate) => candidate.slugAsParams !== post.slugAsParams
  )

  const sameCategory = publishedPosts.filter(
    (candidate) => candidate.category === post.category
  )
  const otherPosts = publishedPosts.filter(
    (candidate) => candidate.category !== post.category
  )

  return [...sameCategory, ...otherPosts].slice(0, limit)
}

export function getCategoryLabel(categorySlug: string) {
  return getBlogCategoryLabel(categorySlug)
}
