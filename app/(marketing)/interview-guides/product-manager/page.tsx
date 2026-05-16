import { GuidePageContent } from '#components/marketing/guide-page-content'
import { productManagerGuide } from '#data/guides/product-manager'
import { extractQuestions } from '#data/interview-guides'

export const metadata = {
  title: 'Product Manager Interview Guide: Questions, Metrics & Strategy',
  description: productManagerGuide.description,
  alternates: {
    canonical: '/interview-guides/product-manager',
  },
  openGraph: {
    title: 'Product Manager Interview Guide: Questions, Metrics & Strategy',
    description: productManagerGuide.description,
    url: '/interview-guides/product-manager',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Product Manager Interview Guide: Questions, Metrics & Strategy',
    description: productManagerGuide.description,
  },
}

export default function ProductManagerGuidePage() {
  const guide = productManagerGuide
  const questions = extractQuestions(guide)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: guide.title,
        description: guide.description,
        datePublished: guide.lastUpdated,
        dateModified: guide.lastUpdated,
        author: {
          '@type': 'Organization',
          name: 'Interview Pilot',
          url: 'https://www.interviewpilot.app',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Interview Pilot',
          url: 'https://www.interviewpilot.app',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: questions.map((q) => ({
          '@type': 'Question',
          name: q.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: q.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.interviewpilot.app' },
          { '@type': 'ListItem', position: 2, name: 'Interview Guides', item: 'https://www.interviewpilot.app/interview-guides' },
          { '@type': 'ListItem', position: 3, name: guide.title, item: `https://www.interviewpilot.app/interview-guides/${guide.slug}` },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GuidePageContent guide={guide} />
    </>
  )
}

