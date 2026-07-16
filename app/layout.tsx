import { ColorModeScript } from '@chakra-ui/react'
import Script from 'next/script'

import { MetaPixel } from '#components/analytics/meta-pixel'
import { Provider } from './provider'
import { dmSans } from '#lib/fonts'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Interview Pilot',
  url: 'https://www.interviewpilot.app',
  logo: 'https://www.interviewpilot.app/static/images/interview_pilot_logo.png',
  description: 'AI-powered interview copilot that provides real-time answers during job interviews.',
  foundingDate: '2023',
  sameAs: [
    'https://linkedin.com/company/interview-pilot',
    'https://x.com/interview_pilot',
    'https://www.tiktok.com/@interview_pilot',
    'https://www.instagram.com/interview_pilot',
    'https://www.youtube.com/@InterviewPilot',
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
  url: 'https://www.interviewpilot.app',
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
  const colorMode = 'dark'

  return (
    <html lang="en" data-theme={colorMode} style={{ colorScheme: colorMode }} className={dmSans.variable}>
      <head>
        <meta name="color-scheme" content="dark" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/static/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          href="/static/favicons/favicon.ico"
          sizes="any"
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
        <link rel="manifest" href="/static/favicons/site.webmanifest" />
        {/* Preconnect hints for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-11564391709"
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-11564391709');
          `}
        </Script>
        <MetaPixel />
        <ColorModeScript initialColorMode={colorMode} />
        <Provider>{props.children}</Provider>
      </body>
    </html>
  )
}
