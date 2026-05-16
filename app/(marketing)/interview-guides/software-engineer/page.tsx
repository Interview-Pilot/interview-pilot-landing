import { GuidePageContent } from '#components/marketing/guide-page-content'
import { softwareEngineerGuide } from '#data/guides/software-engineer'
import { extractQuestions } from '#data/interview-guides'

export const metadata = {
  title: 'Software Engineer Interview Guide: Coding, System Design & Behavioral',
  description: softwareEngineerGuide.description,
  alternates: {
    canonical: '/interview-guides/software-engineer',
  },
  openGraph: {
    title: 'Software Engineer Interview Guide: Coding, System Design & Behavioral',
    description: softwareEngineerGuide.description,
    url: '/interview-guides/software-engineer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software Engineer Interview Guide: Coding, System Design & Behavioral',
    description: softwareEngineerGuide.description,
  },
}

export default function SoftwareEngineerGuidePage() {
  const guide = softwareEngineerGuide
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
