import { notFound } from 'next/navigation'

import {
  InterviewQuestionPageContent,
  type InterviewQuestionPageView,
} from '#components/marketing/interview-question-page-content'
import {
  getInterviewQuestionPage,
  getQuestionCount,
  getQuestionSections,
  publishedInterviewQuestionPages,
} from '#data/interview-questions'
import { getBaseUrl } from '#lib/utils'

interface InterviewQuestionRouteProps {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return publishedInterviewQuestionPages.map((page) => ({
    slug: page.slug,
  }))
}

export function generateMetadata({ params }: InterviewQuestionRouteProps) {
  const page = getInterviewQuestionPage(params.slug)

  if (!page || page.status !== 'published') {
    return {}
  }

  const path = `/interview-questions/${page.slug}`
  const url = `${getBaseUrl()}${path}`

  return {
    title: page.title,
    description: page.description,
    keywords: [
      page.title.toLowerCase(),
      `${page.role.toLowerCase()} interview questions`,
      `${page.industry.toLowerCase()} interview questions`,
      'technical interview questions',
      'behavioral interview questions',
      'interview preparation',
    ],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${page.title} | Interview Pilot`,
      description: page.description,
      url,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page.title} | Interview Pilot`,
      description: page.description,
    },
  }
}

export default function InterviewQuestionPage({ params }: InterviewQuestionRouteProps) {
  const page = getInterviewQuestionPage(params.slug)

  if (!page || page.status !== 'published') {
    notFound()
  }

  const url = `${getBaseUrl()}/interview-questions/${page.slug}`
  const sections = getQuestionSections(page)
  const totalQuestions = getQuestionCount(page)
  const questions = sections.flatMap((section) => section.questions)
  const pageView: InterviewQuestionPageView = {
    slug: page.slug,
    title: page.title,
    description: page.description,
    role: page.role,
    guideSlug: page.guideSlug,
    guideTitle: page.guideTitle,
    lastUpdated: page.lastUpdated,
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: page.title,
        description: page.description,
        url,
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: totalQuestions,
          itemListElement: questions.map((question, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: question.question,
          })),
        },
        isPartOf: {
          '@type': 'WebSite',
          name: 'Interview Pilot',
          url: getBaseUrl(),
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: questions.map((question) => ({
          '@type': 'Question',
          name: question.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: question.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: getBaseUrl() },
          { '@type': 'ListItem', position: 2, name: 'Interview Questions', item: `${getBaseUrl()}/interview-questions` },
          { '@type': 'ListItem', position: 3, name: page.title, item: url },
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
      <InterviewQuestionPageContent
        page={pageView}
        sections={sections}
        totalQuestions={totalQuestions}
      />
    </>
  )
}
