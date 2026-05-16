import { GuidePageContent } from '#components/marketing/guide-page-content'
import { projectManagerGuide } from '#data/guides/project-manager'
import { extractQuestions } from '#data/interview-guides'

export const metadata = {
  title: 'Project Manager Interview Guide: Scope, Risk, Agile & Delivery',
  description: projectManagerGuide.description,
  alternates: {
    canonical: '/interview-guides/project-manager',
  },
  openGraph: {
    title: 'Project Manager Interview Guide: Scope, Risk, Agile & Delivery',
    description: projectManagerGuide.description,
    url: '/interview-guides/project-manager',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Project Manager Interview Guide: Scope, Risk, Agile & Delivery',
    description: projectManagerGuide.description,
  },
}

export default function ProjectManagerGuidePage() {
  const guide = projectManagerGuide
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
