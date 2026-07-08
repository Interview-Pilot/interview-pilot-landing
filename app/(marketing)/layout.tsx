//app/(marketing)/layout.tsx

import { MarketingLayout } from '#components/layout'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'

const baseUrl = 'https://www.interviewpilot.app'
const defaultTitle = 'Interview Pilot - #1 AI Interview Copilot & Prep Tool (120K+ Users)'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: defaultTitle,
    template: '%s | Interview Pilot',
  },
  description: 'Get real-time interview answers during your interview with AI Copilot. Ace any technical or behavioral questions instantly.',
  keywords: [
    'copilot for interview',
    'AI interview copilot',
    'live interview copilot',
    'real-time interview answers',
    'AI mock interview',
    'interview question bank',
    'interview preparation',
    'technical interview practice',
    'behavioral interview practice',
    'job interview assistant',
  ],
  authors: [{ name: 'Interview Pilot' }],
  creator: 'Liberace Pte. Ltd.',
  publisher: 'Interview Pilot',
  openGraph: {
    title: defaultTitle,
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
        alt: defaultTitle,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
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
        title: '🏖️ Summer Career Sprint',
        description:
          'LIMITED TIME ONLY!<span style="display:inline-flex;align-items:center;margin-left:12px;padding:2px 8px;border-radius:0;background:#000;color:#fff;font-weight:700;letter-spacing:0.02em;">60% OFF</span>',
        href: '/#pricing',
      }}
    >
      {props.children}
      <Analytics />
    </MarketingLayout>
  )
}
