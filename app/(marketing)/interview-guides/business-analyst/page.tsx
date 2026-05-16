import { GuidePageContent } from '#components/marketing/guide-page-content'
import { businessAnalystGuide } from '#data/guides/business-analyst'
import { extractQuestions } from '#data/interview-guides'

export const metadata = {
  title: 'Business Analyst Interview Guide: Requirements, SQL, UAT & Cases',
  description: businessAnalystGuide.description,
  alternates: {
    canonical: '/interview-guides/business-analyst',
  },
  openGraph: {
    title: 'Business Analyst Interview Guide: Requirements, SQL, UAT & Cases',
    description: businessAnalystGuide.description,
    url: '/interview-guides/business-analyst',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Analyst Interview Guide: Requirements, SQL, UAT & Cases',
    description: businessAnalystGuide.description,
  },
}

export default function BusinessAnalystGuidePage() {
  const guide = businessAnalystGuide
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
