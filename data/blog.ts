export type BlogCategorySlug =
  | 'interviews'
  | 'recruiting'
  | 'ai-tools'
  | 'career'
  | 'research'
  | 'companies'

export interface BlogCategory {
  slug: BlogCategorySlug
  label: string
  title: string
  h1: string
  description: string
  intro: string
  relatedLinks: Array<{
    label: string
    href: string
  }>
}

export const blogCategories: BlogCategory[] = [
  {
    slug: 'interviews',
    label: 'Interviews',
    title: 'Interview Prep Articles | Interview Pilot',
    h1: 'Interview Prep Articles',
    description:
      'Practical interview preparation articles covering answer frameworks, behavioral interviews, technical interviews, mock interviews, and real-time interview strategy.',
    intro:
      'Actionable interview preparation advice for candidates who want sharper answers, better structure, and stronger performance in live interviews.',
    relatedLinks: [
      { label: 'Interview Copilot', href: '/interview-copilot' },
      { label: 'AI Mock Interview', href: '/ai-mock-interview' },
      { label: 'Interview Questions', href: '/interview-questions' },
    ],
  },
  {
    slug: 'recruiting',
    label: 'Recruiting',
    title: 'Recruiting Trends & Hiring Insights | Interview Pilot',
    h1: 'Recruiting Trends & Hiring Insights',
    description:
      'Recruiting trend analysis, hiring market updates, interview timeline changes, and candidate strategy for competitive job searches.',
    intro:
      'Hiring markets move quickly. These articles explain what recruiting changes mean for candidates and how to adjust interview preparation accordingly.',
    relatedLinks: [
      { label: 'Interview Guides', href: '/interview-guides' },
      { label: 'Question Bank', href: '/question-bank' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    slug: 'ai-tools',
    label: 'AI Tools',
    title: 'AI Interview Tools & Interview Copilot Guides | Interview Pilot',
    h1: 'AI Interview Tools',
    description:
      'Guides and analysis on AI interview tools, interview copilots, mock interview systems, transcription, and AI-assisted interview preparation.',
    intro:
      'A practical look at AI interview tools: how they work, where they help, what candidates should know, and how to use them responsibly.',
    relatedLinks: [
      { label: 'Interview Copilot', href: '/interview-copilot' },
      { label: 'AI Mock Interview', href: '/ai-mock-interview' },
      { label: 'Downloads', href: '/downloads' },
    ],
  },
  {
    slug: 'career',
    label: 'Career',
    title: 'Career Advice for Job Seekers | Interview Pilot',
    h1: 'Career Advice for Job Seekers',
    description:
      'Career advice for students, international candidates, career switchers, and professionals preparing for interviews and job searches.',
    intro:
      'Career-focused guidance for candidates navigating applications, communication, confidence, transitions, and competitive hiring processes.',
    relatedLinks: [
      { label: 'Interview Guides', href: '/interview-guides' },
      { label: 'Interview Questions', href: '/interview-questions' },
      { label: 'Downloads', href: '/downloads' },
    ],
  },
  {
    slug: 'research',
    label: 'Research',
    title: 'Hiring Research, Interview Data & Job Market Insights | Interview Pilot',
    h1: 'Hiring Research & Interview Data',
    description:
      'Research-backed articles with interview statistics, hiring data, labor market trends, candidate benchmarks, and recruiting analysis.',
    intro:
      'Data-driven articles that turn hiring statistics, interview trends, and labor market signals into useful preparation guidance.',
    relatedLinks: [
      { label: 'Question Bank', href: '/question-bank' },
      { label: 'Interview Guides', href: '/interview-guides' },
      { label: 'AI Interview Tools', href: '/blog/ai-tools' },
    ],
  },
  {
    slug: 'companies',
    label: 'Companies',
    title: 'Company Interview Guides & Hiring Insights | Interview Pilot',
    h1: 'Company Interview Insights',
    description:
      'Company-specific interview insights, hiring process analysis, recruiting changes, and preparation advice for major employers.',
    intro:
      'Company-focused analysis for candidates preparing for specific employers, interview processes, and role expectations.',
    relatedLinks: [
      { label: 'Interview Questions', href: '/interview-questions' },
      { label: 'Interview Guides', href: '/interview-guides' },
      { label: 'Interview Copilot', href: '/interview-copilot' },
    ],
  },
]

export const blogCategorySlugs = blogCategories.map((category) => category.slug)

export function getBlogCategoryLabel(categorySlug: string) {
  return (
    blogCategories.find((category) => category.slug === categorySlug)?.label ||
    categorySlug
  )
}
