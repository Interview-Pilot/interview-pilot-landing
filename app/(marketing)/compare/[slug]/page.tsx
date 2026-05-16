import { notFound } from 'next/navigation'

import { ComparisonPageContent } from '#components/marketing/comparison-page-content'
import { comparisonPages, getComparisonPage } from '#data/comparisons'
import { getBaseUrl } from '#lib/utils'

interface ComparisonRouteProps {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return comparisonPages.map((page) => ({
    slug: page.slug,
  }))
}

export function generateMetadata({ params }: ComparisonRouteProps) {
  const page = getComparisonPage(params.slug)

  if (!page) {
    return {}
  }

  const path = `/compare/${page.slug}`
  const url = `${getBaseUrl()}${path}`

  return {
    title: page.title,
    description: page.description,
    keywords: [
      `${page.competitor} alternative`,
      `Interview Pilot vs ${page.competitor}`,
      `${page.competitor} comparison`,
      'AI interview copilot comparison',
      'copilot for interview',
    ],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${page.title} | Interview Pilot`,
      description: page.description,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page.title} | Interview Pilot`,
      description: page.description,
    },
  }
}

export default function ComparisonPage({ params }: ComparisonRouteProps) {
  const page = getComparisonPage(params.slug)

  if (!page) {
    notFound()
  }

  const url = `${getBaseUrl()}/compare/${page.slug}`
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${page.title} | Interview Pilot`,
    description: page.description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Interview Pilot',
      url: getBaseUrl(),
    },
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: getBaseUrl(),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: page.title,
        item: url,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ComparisonPageContent page={page} />
    </>
  )
}
