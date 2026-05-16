export interface InterviewQuestionRef {
  slug: string
  title: string
  linkLabel: string
  description: string
  role: string
  industry: string
  guideSlug: string
  guideTitle: string
  lastUpdated: string
  readingTimeMinutes: number
  status: 'published' | 'draft'
}

export const interviewQuestionRefs: InterviewQuestionRef[] = [
  {
    slug: 'investment-banking',
    title: 'Investment Banking Interview Questions',
    linkLabel: 'Investment Banking Questions',
    description:
      'Practice investment banking interview questions across accounting, valuation, DCF, M&A, LBO, behavioral, and deal discussion topics.',
    role: 'Analyst / Associate',
    industry: 'Finance',
    guideSlug: 'investment-banking',
    guideTitle: 'Investment Banking Interview Guide',
    lastUpdated: '2026-05-15',
    readingTimeMinutes: 18,
    status: 'published',
  },
  {
    slug: 'product-manager',
    title: 'Product Manager Interview Questions',
    linkLabel: 'Product Manager Questions',
    description:
      'Practice product manager interview questions across product sense, execution, metrics, analytics, experimentation, strategy, technical collaboration, and behavioral leadership.',
    role: 'Product Manager',
    industry: 'Product',
    guideSlug: 'product-manager',
    guideTitle: 'Product Manager Interview Guide',
    lastUpdated: '2026-05-16',
    readingTimeMinutes: 16,
    status: 'published',
  },
  {
    slug: 'software-engineer',
    title: 'Software Engineer Interview Questions',
    linkLabel: 'Software Engineer Questions',
    description:
      'Practice software engineer interview questions across coding patterns, data structures, algorithms, system design, debugging, testing, production judgment, and behavioral collaboration.',
    role: 'Software Engineer',
    industry: 'Engineering',
    guideSlug: 'software-engineer',
    guideTitle: 'Software Engineer Interview Guide',
    lastUpdated: '2026-05-16',
    readingTimeMinutes: 17,
    status: 'published',
  },
  {
    slug: 'data-analyst',
    title: 'Data Analyst Interview Questions',
    linkLabel: 'Data Analyst Questions',
    description:
      'Practice data analyst interview questions across SQL, metrics, analytics cases, dashboards, Excel, experimentation, data quality, and stakeholder communication.',
    role: 'Data Analyst',
    industry: 'Data',
    guideSlug: 'data-analyst',
    guideTitle: 'Data Analyst Interview Guide',
    lastUpdated: '2026-05-16',
    readingTimeMinutes: 16,
    status: 'published',
  },
  {
    slug: 'data-scientist',
    title: 'Data Scientist Interview Questions',
    linkLabel: 'Data Scientist Questions',
    description:
      'Practice data scientist interview questions across statistics, probability, experimentation, causal inference, machine learning, model evaluation, SQL, Python, product analytics, and behavioral communication.',
    role: 'Data Scientist',
    industry: 'Data',
    guideSlug: 'data-scientist',
    guideTitle: 'Data Scientist Interview Guide',
    lastUpdated: '2026-05-16',
    readingTimeMinutes: 18,
    status: 'published',
  },
  {
    slug: 'consulting',
    title: 'Consulting Interview Questions',
    linkLabel: 'Consulting Questions',
    description:
      'Practice consulting interview questions across case interviews, profitability, market sizing, market entry, growth strategy, operations, exhibits, mental math, synthesis, and fit.',
    role: 'Consultant',
    industry: 'Consulting',
    guideSlug: 'consulting',
    guideTitle: 'Consulting Interview Guide',
    lastUpdated: '2026-05-16',
    readingTimeMinutes: 16,
    status: 'published',
  },
  {
    slug: 'business-analyst',
    title: 'Business Analyst Interview Questions',
    linkLabel: 'Business Analyst Questions',
    description:
      'Practice business analyst interview questions across requirements gathering, process mapping, SQL, metrics, documentation, user stories, acceptance criteria, UAT, prioritization, stakeholder management, and behavioral scenarios.',
    role: 'Business Analyst',
    industry: 'Business',
    guideSlug: 'business-analyst',
    guideTitle: 'Business Analyst Interview Guide',
    lastUpdated: '2026-05-16',
    readingTimeMinutes: 17,
    status: 'published',
  },
  {
    slug: 'financial-analyst',
    title: 'Financial Analyst Interview Questions',
    linkLabel: 'Financial Analyst Questions',
    description:
      'Practice financial analyst interview questions across accounting, financial statements, forecasting, budgeting, variance analysis, Excel modeling, valuation, FP&A, KPIs, and behavioral scenarios.',
    role: 'Financial Analyst',
    industry: 'Finance',
    guideSlug: 'financial-analyst',
    guideTitle: 'Financial Analyst Interview Guide',
    lastUpdated: '2026-05-16',
    readingTimeMinutes: 17,
    status: 'published',
  },
  {
    slug: 'data-engineer',
    title: 'Data Engineer Interview Questions',
    linkLabel: 'Data Engineer Questions',
    description:
      'Practice data engineer interview questions across SQL transformations, data modeling, ETL pipelines, orchestration, batch and streaming systems, Spark, data quality, observability, system design, and behavioral collaboration.',
    role: 'Data Engineer',
    industry: 'Data',
    guideSlug: 'data-engineer',
    guideTitle: 'Data Engineer Interview Guide',
    lastUpdated: '2026-05-16',
    readingTimeMinutes: 17,
    status: 'published',
  },
  {
    slug: 'project-manager',
    title: 'Project Manager Interview Questions',
    linkLabel: 'Project Manager Questions',
    description:
      'Practice project manager interview questions across scope, planning, schedules, resources, dependencies, risk, change management, Agile, waterfall, stakeholder communication, delivery recovery, governance, and behavioral scenarios.',
    role: 'Project Manager',
    industry: 'Project Management',
    guideSlug: 'project-manager',
    guideTitle: 'Project Manager Interview Guide',
    lastUpdated: '2026-05-16',
    readingTimeMinutes: 17,
    status: 'published',
  },
]

export const publishedInterviewQuestionRefs = interviewQuestionRefs.filter(
  (page) => page.status === 'published'
)

export function getInterviewQuestionPageRef(slug: string) {
  return publishedInterviewQuestionRefs.find((page) => page.slug === slug)
}
