//app/(marketing)/layout.tsx

import { MarketingLayout } from '#components/layout'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import faq from '#data/faq'

const baseUrl = 'https://interviewpilot.app'

// FAQPage structured data for rich snippets
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
}

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Interview Pilot - Live AI Interview Copilot',
    template: '%s | Interview Pilot',
  },
  description: 'Get real-time interview answers during your interview with AI Copilot. Ace any technical or behavioral questions instantly.',
  keywords: ['interview', 'AI', 'copilot', 'interview assistance', 'job interview', 'AI assistant', 'interview preparation', 'behavioral interview', 'technical interview'],
  authors: [{ name: 'Interview Pilot' }],
  creator: 'Liberace Pte. Ltd.',
  publisher: 'Interview Pilot',
  openGraph: {
    title: 'Interview Pilot - Live AI Interview Copilot',
    description: 'Get real-time interview answers during your interview with AI Copilot. Ace any technical or behavioral questions instantly.',
    url: baseUrl,
    siteName: 'Interview Pilot',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/static/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Interview Pilot - Live AI Interview Copilot',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interview Pilot - Live AI Interview Copilot',
    description: 'Get real-time interview answers during your interview with AI Copilot. Ace any technical or behavioral questions instantly.',
    site: '@interview_pilot',
    creator: '@interview_pilot',
    images: ['/static/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <MarketingLayout
      announcementProps={{
        title: '🌸 Spring Back to School Offer',
        description:
          'LIMITED TIME ONLY!<span style="display:inline-flex;align-items:center;margin-left:12px;padding:2px 8px;border-radius:0;background:#000;color:#fff;font-weight:700;letter-spacing:0.02em;">50% OFF</span>',
        href: '/#pricing',
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      {props.children}
      <Analytics />
    </MarketingLayout>
  )
}
