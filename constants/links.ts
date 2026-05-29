/**
 * Centralized configuration for all external links and URLs
 * This ensures consistency across the application and makes updates easier
 */

export const APP_STORE_LINKS = {
  ios: 'https://apps.apple.com/us/app/interview-pilot-ai-copilot/id6743263009',
  android: 'https://play.google.com/store/apps/details?id=com.liberace.interviewpilot',
} as const

export const DESKTOP_DOWNLOAD_LINKS = {
  macos: 'https://downloads.interviewpilot.app/macos/latest.dmg',
  macosMetadata: 'https://downloads.interviewpilot.app/macos/latest.json',
  windows: 'https://downloads.interviewpilot.app/windows/latest.exe',
  windowsMetadata: 'https://downloads.interviewpilot.app/windows/latest.json',
} as const

export const PLATFORM_LINKS = {
  site:
    process.env.NEXT_PUBLIC_PLATFORM_SITE_URL ||
    'https://platform.interviewpilot.app',
  desktopDownload:
    `${
      process.env.NEXT_PUBLIC_PLATFORM_SITE_URL ||
      'https://platform.interviewpilot.app'
    }/desktop-download?download=1&source=landing`,
  macDesktopDownload:
    `${
      process.env.NEXT_PUBLIC_PLATFORM_SITE_URL ||
      'https://platform.interviewpilot.app'
    }/desktop-download?download=1&platform=macos&source=landing`,
  windowsDesktopDownload:
    `${
      process.env.NEXT_PUBLIC_PLATFORM_SITE_URL ||
      'https://platform.interviewpilot.app'
    }/desktop-download?download=1&platform=windows&source=landing`,
} as const

export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/company/interview-pilot',
  x: 'https://x.com/interview_pilot',
  tiktok: 'https://www.tiktok.com/@interview_pilot',
  instagram: 'https://www.instagram.com/interview_pilot',
  youtube: 'https://www.youtube.com/@InterviewPilot',
} as const

export const SUPPORT_EMAIL = 'Support@LiberaceAI.com'

export const COMPANY_LINKS = {
  website: 'https://www.liberaceai.com',
} as const

export const INTERNAL_ROUTES = {
  home: '/',
  blog: '/blog',
  downloads: '/downloads',
  pricing: '/pricing',
  interviewCopilot: '/interview-copilot',
  aiMockInterview: '/ai-mock-interview',
  questionBank: '/question-bank',
  interviewQuestions: '/interview-questions',
  terms: '/terms',
  privacy: '/privacy',
  communityGuidelines: '/community-guidelines',
  downloadHero: '/download/hero',
  downloadMobile: '/download/mobile',
  downloadOptions: '/downloads',
} as const

export const ASSETS = {
  images: {
    logo: '/static/images/interview_pilot_logo_ui.png',
    openAiLogo: '/static/images/openailogo.png',
    whisperLogo: '/static/images/whisperlogo.png',
    appStoreBadge: '/static/images/appstore_badge.png',
    androidBadge: '/static/images/android_badge.png',
  },
  screenshots: {
    heroHand: '/static/screenshots/hand1.webp',
  },
} as const
