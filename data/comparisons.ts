export const comparisonFeatureIds = [
  '1-second-answers',
  'latest-ai-models',
  'structured-talking-points',
  'usage-limit',
  'followup-prompts',
  'live-transcription',
  'full-mobile-app',
  'invisible-dock',
  'keyboard-shortcuts',
  'click-through',
  'user-count',
  'uptime',
  'star-rating',
  'macos-app',
  'ios-app',
  'android-app',
  'windows-app',
  'mock-interviews',
  'question-bank',
  'company-specific',
  'free-plan',
  'weekly-cost',
  'no-sessions-limit',
  'free-download',
  'refund-policy',
] as const

export type ComparisonFeatureId = (typeof comparisonFeatureIds)[number]
export type ComparisonFeatureValue = true | false | 'soon' | 'verify' | 'limited'

export interface ComparisonFeatureDetail {
  value: ComparisonFeatureValue
  text?: string
  subtext?: string
  href?: string
}

export interface ComparisonRisk {
  text: string
  linkText?: string
  href?: string
}

export interface ComparisonPage {
  slug: string
  competitor: string
  linkLabel: string
  title: string
  description: string
  focus: string
  bestFor: string
  /** 2–4 key risks / watch-outs for the competitor, shown above the comparison table */
  risks: Array<string | ComparisonRisk>
  /** Feature IDs the competitor appears to support. Omitted IDs render as "Check" instead of a negative claim. */
  competitorHasFeatures: ComparisonFeatureId[]
  competitorFeatureDetails?: Partial<Record<ComparisonFeatureId, ComparisonFeatureDetail>>
}

export const comparisonPages: ComparisonPage[] = [
  {
    slug: 'final-round-ai-alternative',
    competitor: 'Final Round AI',
    linkLabel: 'Final Round AI Alternative',
    title: 'Final Round AI Alternative',
    description:
      'Compare Interview Pilot with Final Round AI for real-time interview support, mobile and desktop workflows, and interview preparation features.',
    focus:
      'real-time interview support across mobile and desktop, with Copilot answers, mock interview practice, and question bank prep in one product ecosystem',
    bestFor:
      'candidates who want interview help before and during live interviews instead of only practicing in advance',
    risks: [
      {
        text: '3.5 ★ verified Trustpilot rating',
        linkText: 'Trustpilot',
        href: 'https://www.trustpilot.com/review/finalroundai.com',
      },
      '$150 / month pricing',
      'Older GPT-4 / GPT-5.2 models',
    ],
    competitorHasFeatures: [
      'structured-talking-points',
      'usage-limit',
      'followup-prompts',
      'live-transcription',
      'invisible-dock',
      'macos-app',
      'windows-app',
      'mock-interviews',
      'company-specific',
      'free-plan',
    ],
    competitorFeatureDetails: {
      '1-second-answers': {
        value: 'limited',
        text: 'Within seconds',
        subtext: 'Not stated as 1 second',
      },
      'latest-ai-models': {
        value: 'limited',
        text: 'GPT-4 / GPT-5.2',
      },
      'live-transcription': {
        value: 'limited',
        text: 'Reported freezes',
      },
      'full-mobile-app': {
        value: false,
      },
      'ios-app': {
        value: false,
      },
      'android-app': {
        value: false,
      },
      'keyboard-shortcuts': {
        value: 'verify',
        text: '—',
      },
      'click-through': {
        value: 'verify',
        text: '—',
      },
      'usage-limit': {
        value: 'limited',
        text: 'Plan-dependent',
      },
      'user-count': {
        value: false,
      },
      uptime: {
        value: 'limited',
        text: 'Unverified',
      },
      'star-rating': {
        value: 'limited',
        text: '3.5 ★',
        subtext: 'Trustpilot (Verified)',
        href: 'https://www.trustpilot.com/review/finalroundai.com',
      },
      'question-bank': {
        value: 'limited',
        text: 'Unverified',
      },
      'company-specific': {
        value: 'limited',
        text: 'Unverified',
      },
      'weekly-cost': {
        value: 'limited',
        text: '$150 / month',
      },
      'free-plan': {
        value: 'limited',
        text: 'Limited',
      },
      'free-download': {
        value: true,
      },
      'no-sessions-limit': {
        value: 'limited',
        text: 'Unverified',
      },
      'refund-policy': {
        value: 'limited',
        text: 'Billing complaints reported',
      },
    },
  },
  {
    slug: 'lockedin-ai-alternative',
    competitor: 'LockedIn AI',
    linkLabel: 'LockedIn AI Alternative',
    title: 'LockedIn AI Alternative',
    description:
      'Compare Interview Pilot with LockedIn AI for AI interview assistance, live Copilot workflows, and interview preparation tools.',
    focus:
      'live Copilot assistance, structured talking points, desktop support, mobile support, and preparation tools for technical and behavioral interviews',
    bestFor:
      'users who want a flexible interview copilot that works across preparation, practice, and live interview workflows',
    risks: [
      'Only 20h usage over 3 months',
      '$119.99 / month pricing',
      {
        text: '4.1 ★ verified Trustpilot rating',
        linkText: 'Trustpilot',
        href: 'https://www.trustpilot.com/review/lockedinai.com',
      },
    ],
    competitorHasFeatures: [
      'live-transcription',
      'invisible-dock',
      'macos-app',
      'windows-app',
      'free-download',
    ],
    competitorFeatureDetails: {
      '1-second-answers': {
        value: 'limited',
        text: 'Within seconds',
        subtext: 'Not stated as 1 second',
      },
      'latest-ai-models': {
        value: false,
      },
      'structured-talking-points': {
        value: false,
      },
      'usage-limit': {
        value: 'limited',
        text: '20h / 3 months',
      },
      'followup-prompts': {
        value: false,
      },
      'full-mobile-app': {
        value: false,
      },
      'ios-app': {
        value: false,
      },
      'android-app': {
        value: false,
      },
      'keyboard-shortcuts': {
        value: 'verify',
        text: '—',
      },
      'click-through': {
        value: 'verify',
        text: '—',
      },
      'user-count': {
        value: 'limited',
        text: '58,000+ stated',
      },
      uptime: {
        value: 'limited',
        text: 'Unverified',
      },
      'star-rating': {
        value: 'limited',
        text: '4.1 ★',
        subtext: 'Trustpilot (Verified)',
        href: 'https://www.trustpilot.com/review/lockedinai.com',
      },
      'question-bank': {
        value: false,
      },
      'mock-interviews': {
        value: 'limited',
        text: 'Basic',
      },
      'company-specific': {
        value: false,
      },
      'weekly-cost': {
        value: 'limited',
        text: '$119.99 / month',
      },
      'free-plan': {
        value: false,
      },
      'no-sessions-limit': {
        value: 'limited',
        text: 'Credit-based',
      },
      'refund-policy': {
        value: 'limited',
        text: 'Billing complaints reported',
      },
    },
  },
  {
    slug: 'aiapply-alternative',
    competitor: 'AIApply',
    linkLabel: 'AIApply Alternative',
    title: 'AIApply Alternative',
    description:
      'Compare Interview Pilot with AIApply for interview preparation, AI interview answers, and role-specific practice.',
    focus:
      'interview-specific Copilot answers, AI mock interviews, and a dedicated question bank organized by company, role, and interview type',
    bestFor:
      'job seekers who want deeper support for the interview stage rather than a broad job-application workflow',
    risks: [
      {
        text: 'Trustpilot WARNING for breach of guidelines',
        linkText: 'Trustpilot',
        href: 'https://www.trustpilot.com/review/aiapply.co',
      },
      'Proceed at own risk',
    ],
    competitorHasFeatures: ['macos-app', 'windows-app', 'mock-interviews', 'company-specific'],
    competitorFeatureDetails: {
      '1-second-answers': {
        value: 'limited',
        text: 'Within seconds',
        subtext: 'Not stated as 1 second',
      },
      'latest-ai-models': {
        value: false,
      },
      'structured-talking-points': {
        value: false,
      },
      'usage-limit': {
        value: 'limited',
        text: 'Unverified',
      },
      'followup-prompts': {
        value: false,
      },
      'live-transcription': {
        value: 'limited',
        text: 'Reported issues',
      },
      'full-mobile-app': {
        value: false,
      },
      'invisible-dock': {
        value: false,
      },
      'keyboard-shortcuts': {
        value: false,
      },
      'click-through': {
        value: false,
      },
      'user-count': {
        value: false,
      },
      uptime: {
        value: 'limited',
        text: 'Unverified',
      },
      'star-rating': {
        value: 'limited',
        text: 'Trustpilot WARNING',
        subtext: 'Breach of guidelines',
        href: 'https://www.trustpilot.com/review/aiapply.co',
      },
      'ios-app': {
        value: false,
      },
      'android-app': {
        value: false,
      },
      'mock-interviews': {
        value: 'limited',
        text: 'Basic',
      },
      'question-bank': {
        value: false,
      },
      'weekly-cost': {
        value: 'limited',
        text: '~$29-50 / month',
      },
      'free-plan': {
        value: false,
      },
      'free-download': {
        value: false,
      },
      'no-sessions-limit': {
        value: 'limited',
        text: 'Unverified',
      },
      'refund-policy': {
        value: false,
      },
    },
  },
  {
    slug: 'interview-coder-alternative',
    competitor: 'Interview Coder',
    linkLabel: 'Interview Coder Alternative',
    title: 'Interview Coder Alternative',
    description:
      'Compare Interview Pilot with Interview Coder for live interview support, coding-focused workflows, pricing, and interview preparation coverage.',
    focus:
      'full interview support across behavioral, technical, company-specific, and live Copilot workflows instead of only coding-focused interview assistance',
    bestFor:
      'candidates who want help across the full interview loop, not only software engineering coding screens',
    risks: [
      'Coding-only interview support',
      '$499 / month pricing',
      'Strict no refund policy',
    ],
    competitorHasFeatures: ['live-transcription', 'invisible-dock', 'keyboard-shortcuts', 'click-through', 'user-count', 'macos-app', 'windows-app', 'no-sessions-limit', 'free-download'],
    competitorFeatureDetails: {
      '1-second-answers': {
        value: 'limited',
        text: 'Coding only',
      },
      'latest-ai-models': {
        value: 'limited',
        text: 'Unverified',
      },
      'structured-talking-points': {
        value: 'limited',
        text: 'Coding only',
      },
      'usage-limit': {
        value: 'limited',
        text: '1,000 Credits / mo',
      },
      'followup-prompts': {
        value: false,
      },
      'live-transcription': {
        value: true,
      },
      'full-mobile-app': {
        value: false,
      },
      'invisible-dock': {
        value: true,
      },
      'keyboard-shortcuts': {
        value: true,
      },
      'click-through': {
        value: true,
      },
      'user-count': {
        value: true,
        text: '100,000+ verified',
      },
      uptime: {
        value: 'limited',
        text: 'Unverified',
      },
      'star-rating': {
        value: 'limited',
        text: 'Unverified',
      },
      'ios-app': {
        value: false,
      },
      'android-app': {
        value: false,
      },
      'mock-interviews': {
        value: false,
      },
      'question-bank': {
        value: false,
      },
      'company-specific': {
        value: false,
      },
      'free-plan': {
        value: 'limited',
        text: 'Limited',
      },
      'weekly-cost': {
        value: 'limited',
        text: '$499 / month',
      },
      'no-sessions-limit': {
        value: true,
      },
      'free-download': {
        value: true,
      },
      'refund-policy': {
        value: 'limited',
        text: 'Strict no refund',
      },
    },
  },
  {
    slug: 'ultracode-alternative',
    competitor: 'UltraCode',
    linkLabel: 'UltraCode Alternative',
    title: 'UltraCode Alternative',
    description:
      'Compare Interview Pilot with UltraCode for technical interview practice, live interview support, and AI-powered answer guidance.',
    focus:
      'technical and behavioral interview support with real-time answers, follow-up suggestions, and role-specific preparation',
    bestFor:
      'candidates who want one interview copilot for coding, technical, behavioral, and role-specific interviews',
    risks: [
      'Coding-only interview support',
      '$1,799 pricing',
      'Strict no refund policy',
    ],
    competitorHasFeatures: ['macos-app', 'windows-app'],
    competitorFeatureDetails: {
      '1-second-answers': {
        value: 'limited',
        text: 'Coding only',
      },
      'latest-ai-models': {
        value: false,
      },
      'structured-talking-points': {
        value: false,
      },
      'usage-limit': {
        value: 'limited',
        text: 'Unverified',
      },
      'followup-prompts': {
        value: false,
      },
      'live-transcription': {
        value: 'limited',
        text: 'Reported issues',
      },
      'invisible-dock': {
        value: 'limited',
        text: 'Detection claims',
      },
      'keyboard-shortcuts': {
        value: 'verify',
        text: '—',
      },
      'full-mobile-app': {
        value: false,
      },
      'click-through': {
        value: 'verify',
        text: '—',
      },
      'user-count': {
        value: 'limited',
        text: 'Unverified',
      },
      uptime: {
        value: 'limited',
        text: 'Unverified',
      },
      'star-rating': {
        value: false,
      },
      'ios-app': {
        value: false,
      },
      'android-app': {
        value: false,
      },
      'mock-interviews': {
        value: false,
      },
      'question-bank': {
        value: false,
      },
      'company-specific': {
        value: false,
      },
      'free-plan': {
        value: false,
      },
      'free-download': {
        value: false,
      },
      'weekly-cost': {
        value: 'limited',
        text: '$1,799',
      },
      'no-sessions-limit': {
        value: 'limited',
        text: 'Unverified',
      },
      'refund-policy': {
        value: 'limited',
        text: 'Strict no refund',
      },
    },
  },
  {
    slug: 'offergoose-alternative',
    competitor: 'OfferGoose',
    linkLabel: 'OfferGoose Alternative',
    title: 'OfferGoose Alternative',
    description:
      'Compare Interview Pilot with OfferGoose for AI interview preparation, live interview assistance, and question practice.',
    focus:
      'real-time Copilot answers, mobile and desktop access, AI mock interview workflows, and interview question preparation',
    bestFor:
      'candidates who want practical support from interview prep through the live interview itself',
    risks: [
      'No stealth features at all',
      '$349.99 / 300 min pricing',
      'Minute-based session limits',
    ],
    competitorHasFeatures: [
      'live-transcription',
      'full-mobile-app',
      'macos-app',
      'windows-app',
      'ios-app',
      'android-app',
    ],
    competitorFeatureDetails: {
      '1-second-answers': {
        value: 'limited',
        text: 'Within seconds',
        subtext: 'Not stated as 1 second',
      },
      'latest-ai-models': {
        value: false,
      },
      'structured-talking-points': {
        value: false,
      },
      'usage-limit': {
        value: 'limited',
        text: 'Minute-based',
      },
      'followup-prompts': {
        value: 'limited',
        text: 'Mock interview only',
      },
      'invisible-dock': {
        value: false,
      },
      'keyboard-shortcuts': {
        value: false,
      },
      'click-through': {
        value: false,
      },
      'user-count': {
        value: false,
      },
      uptime: {
        value: 'limited',
        text: 'Unverified',
      },
      'star-rating': {
        value: 'limited',
        text: '4.5 ★',
        subtext: '74 App Store ratings',
        href: 'https://apps.apple.com/us/app/offergoose-land-your-dream-job/id6572284517',
      },
      'mock-interviews': {
        value: 'limited',
        text: 'Basic',
      },
      'question-bank': {
        value: false,
      },
      'company-specific': {
        value: 'limited',
        text: 'Basic',
      },
      'free-plan': {
        value: false,
      },
      'weekly-cost': {
        value: 'limited',
        text: '$349.99 / 300 min',
      },
      'free-download': {
        value: true,
      },
      'no-sessions-limit': {
        value: 'limited',
        text: 'Minute-based',
      },
      'refund-policy': {
        value: false,
      },
    },
  },
  {
    slug: 'verve-ai-alternative',
    competitor: 'Verve AI',
    linkLabel: 'Verve AI Alternative',
    title: 'Verve AI Alternative',
    description:
      'Compare Interview Pilot with Verve AI for live AI interview assistance, mock interviews, and preparation workflows.',
    focus:
      'live interview answer support, structured talking points, follow-up prompts, and preparation tools across supported devices',
    bestFor:
      'users who want both real-time interview support and structured practice in the same product',
    risks: [
      '60 min interview session limit',
      {
        text: '3.8 ★ Trustpilot rating',
        linkText: 'Trustpilot',
        href: 'https://www.trustpilot.com/review/vervecopilot.com',
      },
      '$69.99 / month pricing',
    ],
    competitorHasFeatures: ['macos-app', 'windows-app'],
    competitorFeatureDetails: {
      '1-second-answers': {
        value: 'limited',
        text: 'Within seconds',
        subtext: 'Not stated as 1 second',
      },
      'latest-ai-models': {
        value: false,
      },
      'structured-talking-points': {
        value: false,
      },
      'usage-limit': {
        value: 'limited',
        text: 'Credit-based',
      },
      'followup-prompts': {
        value: false,
      },
      'live-transcription': {
        value: 'limited',
        text: 'Reported issues',
      },
      'full-mobile-app': {
        value: false,
      },
      'invisible-dock': {
        value: true,
      },
      'keyboard-shortcuts': {
        value: false,
      },
      'click-through': {
        value: 'verify',
        text: '—',
      },
      'user-count': {
        value: false,
      },
      uptime: {
        value: 'limited',
        text: 'Unverified',
      },
      'star-rating': {
        value: 'limited',
        text: '3.8 ★',
        subtext: 'Trustpilot (Verified)',
        href: 'https://www.trustpilot.com/review/vervecopilot.com',
      },
      'ios-app': {
        value: false,
      },
      'android-app': {
        value: false,
      },
      'mock-interviews': {
        value: 'limited',
        text: 'Basic',
      },
      'question-bank': {
        value: false,
      },
      'company-specific': {
        value: false,
      },
      'free-plan': {
        value: 'limited',
        text: 'Limited',
      },
      'weekly-cost': {
        value: 'limited',
        text: '$69.99 / month',
      },
      'no-sessions-limit': {
        value: 'limited',
        text: '60 min session limit',
      },
      'free-download': {
        value: false,
      },
      'refund-policy': {
        value: true,
      },
    },
  },
  {
    slug: 'sensei-ai-alternative',
    competitor: 'Sensei AI',
    linkLabel: 'Sensei AI Alternative',
    title: 'Sensei AI Alternative',
    description:
      'Compare Interview Pilot with Sensei AI for AI interview copilot features, interview prep, and real-time answer guidance.',
    focus:
      'Copilot for Interview workflows, real-time answers, question-bank practice, and AI mock interviews for job seekers',
    bestFor:
      'candidates who want an interview-focused AI assistant with preparation and live support features',
    risks: [
      'Browser-based only',
      {
        text: '3.2 ★ Trustpilot rating',
        linkText: 'Trustpilot',
        href: 'https://www.trustpilot.com/review/www.senseicopilot.com',
      },
      '$89 / month pricing',
    ],
    competitorHasFeatures: [],
    competitorFeatureDetails: {
      '1-second-answers': {
        value: 'limited',
        text: 'Within seconds',
        subtext: 'Not stated as 1 second',
      },
      'latest-ai-models': {
        value: false,
      },
      'structured-talking-points': {
        value: 'limited',
        text: 'Basic',
      },
      'usage-limit': {
        value: 'limited',
        text: '15 min free sessions',
      },
      'followup-prompts': {
        value: false,
      },
      'live-transcription': {
        value: 'limited',
        text: 'Browser-based',
      },
      'full-mobile-app': {
        value: false,
      },
      'invisible-dock': {
        value: false,
      },
      'keyboard-shortcuts': {
        value: false,
      },
      'click-through': {
        value: false,
      },
      'user-count': {
        value: false,
      },
      uptime: {
        value: 'limited',
        text: 'Unverified',
      },
      'star-rating': {
        value: 'limited',
        text: '3.2 ★',
        subtext: 'Trustpilot (Verified)',
        href: 'https://www.trustpilot.com/review/www.senseicopilot.com',
      },
      'macos-app': {
        value: false,
      },
      'ios-app': {
        value: false,
      },
      'android-app': {
        value: false,
      },
      'windows-app': {
        value: false,
      },
      'mock-interviews': {
        value: 'limited',
        text: 'Playground only',
      },
      'question-bank': {
        value: 'limited',
        text: 'Add-ons only',
      },
      'company-specific': {
        value: 'limited',
        text: 'Basic',
      },
      'free-plan': {
        value: 'limited',
        text: '15 min only',
      },
      'weekly-cost': {
        value: 'limited',
        text: '$89 / month',
      },
      'no-sessions-limit': {
        value: 'limited',
        text: 'Paid only',
      },
      'free-download': {
        value: false,
      },
      'refund-policy': {
        value: 'limited',
        text: 'Partial only',
      },
    },
  },
  {
    slug: 'parakeet-ai-alternative',
    competitor: 'ParakeetAI',
    linkLabel: 'ParakeetAI Alternative',
    title: 'ParakeetAI Alternative',
    description:
      'Compare Interview Pilot with ParakeetAI for AI interview assistance, real-time answers, and interview preparation.',
    focus:
      'real-time interview answers, structured answer support, mobile app access, desktop app access, and role-specific preparation',
    bestFor:
      'job seekers who want a dedicated interview copilot for live interviews and ongoing interview practice',
    risks: [
      {
        text: '2.9 ★ Trustpilot rating',
        linkText: 'Trustpilot',
        href: 'https://www.trustpilot.com/review/parakeet-ai.com',
      },
      '$149.90 / month pricing',
      'Credit-based session limits',
    ],
    competitorHasFeatures: ['latest-ai-models', 'macos-app', 'windows-app'],
    competitorFeatureDetails: {
      '1-second-answers': {
        value: 'limited',
        text: 'Within seconds',
        subtext: 'Not stated as 1 second',
      },
      'latest-ai-models': {
        value: true,
      },
      'structured-talking-points': {
        value: 'limited',
        text: 'Basic',
      },
      'usage-limit': {
        value: 'limited',
        text: 'Credit-based',
      },
      'followup-prompts': {
        value: false,
      },
      'live-transcription': {
        value: 'limited',
        text: 'Browser-based',
      },
      'full-mobile-app': {
        value: false,
      },
      'invisible-dock': {
        value: false,
      },
      'keyboard-shortcuts': {
        value: false,
      },
      'click-through': {
        value: false,
      },
      'user-count': {
        value: false,
      },
      uptime: {
        value: 'limited',
        text: 'Unverified',
      },
      'star-rating': {
        value: 'limited',
        text: '2.9 ★',
        subtext: 'Trustpilot (Verified)',
        href: 'https://www.trustpilot.com/review/parakeet-ai.com',
      },
      'macos-app': {
        value: true,
      },
      'ios-app': {
        value: false,
      },
      'android-app': {
        value: false,
      },
      'windows-app': {
        value: true,
      },
      'mock-interviews': {
        value: false,
      },
      'question-bank': {
        value: false,
      },
      'company-specific': {
        value: false,
      },
      'free-plan': {
        value: 'limited',
        text: '10 min trial',
      },
      'weekly-cost': {
        value: 'limited',
        text: '$149.90 / month',
      },
      'no-sessions-limit': {
        value: 'limited',
        text: 'Credit-based',
      },
      'free-download': {
        value: false,
      },
      'refund-policy': {
        value: true,
      },
    },
  },
]

export function getComparisonPage(slug: string) {
  return comparisonPages.find((page) => page.slug === slug)
}
