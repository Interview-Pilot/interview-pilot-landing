import { MetadataRoute } from 'next'
import { posts } from '#content'
import { blogCategories } from '#data/blog'
import { getBaseUrl } from '#lib/utils'
import { comparisonPages } from '#data/comparisons'
import { publishedInterviewGuideRefs } from '#data/interview-guides'
import { publishedInterviewQuestionRefs } from '#data/interview-question-refs'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl()

  // Get all published blog posts
  const blogUrls = posts
    .filter((post) => post.published)
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slugAsParams}`,
      lastModified: new Date(post.lastUpdated || post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  const blogCategoryUrls = blogCategories.map((category) => ({
    url: `${baseUrl}/blog/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.65,
  }))

  const comparisonUrls = comparisonPages.map((page) => ({
    url: `${baseUrl}/compare/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const interviewGuideUrls = publishedInterviewGuideRefs.map((guide) => ({
    url: `${baseUrl}/interview-guides/${guide.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const interviewQuestionUrls = publishedInterviewQuestionRefs.map((page) => ({
    url: `${baseUrl}/interview-questions/${page.slug}`,
    lastModified: new Date(page.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/downloads`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/interview-copilot`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ai-mock-interview`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/question-bank`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/interview-guides`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/interview-questions`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...interviewGuideUrls,
    ...interviewQuestionUrls,
    ...comparisonUrls,
    ...blogCategoryUrls,
    ...blogUrls,
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/community-guidelines`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
