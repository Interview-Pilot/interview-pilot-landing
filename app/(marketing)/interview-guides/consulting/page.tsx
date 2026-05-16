import { GuidePageContent } from '#components/marketing/guide-page-content'
import { consultingGuide } from '#data/guides/consulting'
import { extractQuestions } from '#data/interview-guides'

export const metadata = {
  title: 'Consulting Interview Guide: Cases, Market Sizing & Fit Questions',
  description: consultingGuide.description,
  alternates: {
    canonical: '/interview-guides/consulting',
  },
  openGraph: {
    title: 'Consulting Interview Guide: Cases, Market Sizing & Fit Questions',
    description: consultingGuide.description,
    url: '/interview-guides/consulting',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consulting Interview Guide: Cases, Market Sizing & Fit Questions',
    description: consultingGuide.description,
  },
}

export default function ConsultingGuidePage() {
  const guide = consultingGuide
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
