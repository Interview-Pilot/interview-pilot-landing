import { ColorModeScript, theme } from '@chakra-ui/react'

import { Provider } from './provider'
import { dmSans } from '#lib/fonts'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Interview Pilot',
  url: 'https://interviewpilot.app',
  logo: 'https://interviewpilot.app/static/images/interviewpilot_newlogo.png',
  description: 'AI-powered interview copilot that provides real-time answers during job interviews.',
  foundingDate: '2023',
  sameAs: [
    'https://linkedin.com/company/interview-pilot',
    'https://x.com/interview_pilot',
    'https://www.tiktok.com/@interview_pilot',
    'https://www.instagram.com/interview_pilot',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'Support@LiberaceAI.com',
    contactType: 'customer support',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Interview Pilot',
  url: 'https://interviewpilot.app',
  description: 'Get real-time interview answers during your interview with AI Copilot.',
  publisher: {
    '@type': 'Organization',
    name: 'Interview Pilot',
  },
}

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Interview Pilot',
  operatingSystem: 'macOS, iOS, Android',
  applicationCategory: 'BusinessApplication',
  description: 'AI-powered interview copilot that provides real-time answers during job interviews.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free trial available',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '150',
  },
}

export default function Layout(props: { children: React.ReactNode }) {
  const colorMode = theme.config.initialColorMode

  return (
    <html lang="en" data-theme={colorMode} style={{ colorScheme: colorMode }} className={dmSans.variable}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/static/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/static/favicons/manifest.json" />
        {/* Preconnect hints for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareAppSchema),
          }}
        />
      </head>
      <body className={`chakra-ui-${colorMode}`}>
        <ColorModeScript initialColorMode={colorMode} />
        <Provider>{props.children}</Provider>
      </body>
    </html>
  )
}
