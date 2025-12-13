//app/(marketing)/layout.tsx

import { MarketingLayout } from '#components/layout'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'

const baseUrl = 'https://interviewpilot.app'

// FAQPage structured data for rich snippets
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can I use Interview Pilot for free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! You can try Interview Pilot for free with full access to all features! No credit card or trial required. You only pay for the subscription if you like it.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Interview Pilot fully undetectable?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Interview Pilot is designed for your iOS and Android devices (mobile or tablet), and does not interact with your desktop interview application, making it completely undetectable by any programs.',
      },
    },
    {
      '@type': 'Question',
      name: 'What devices can I use Interview Pilot on?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Interview Pilot is designed for ALL iOS and Android devices, including iPhones, iPads and Android devices! Interview Pilot requires iOS 17.0 and above. The best way to check compatibility is to simply run the app and try all functions out for free!',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this considered cheating?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Interview Pilot is designed to be a full Copilot assistant for all your interview needs. If you prefer to only receive talking points to guide you along instead of full answers, simply choose "Key Points" in Copilot response settings. Since Interview Pilot is not linked to your computer, it is fully undetectable and safer than all other similar desktop-based software.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Interview Pilot detect accents?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes absolutely! Interview Pilot is developed with natural human voices in mind. It uses the latest and most advanced speech recognition (ASR) technology available in the world today, ranked No. 1 and supporting over 99 languages and thousands of accents!',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I request new features?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We have received many requests for new features, and would love to hear what ideas or needs you have! Our team is constantly in search of top new features to provide our users with the best interview experience.',
      },
    },
  ],
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
  alternates: {
    canonical: '/',
  },
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
    <MarketingLayout>
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