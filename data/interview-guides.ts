// ── Block types ────────────────────────────────────────────────────────────────

export type Difficulty = 'easy' | 'medium' | 'hard'

export interface ParagraphBlock {
  type: 'paragraph'
  text: string
}

export interface QuestionBlock {
  type: 'question'
  question: string
  difficulty: Difficulty
  /** Category tag shown on the card, e.g. "Accounting", "Valuation", "STAR" */
  category: string
  /** Short framework label shown as a highlighted callout, e.g. "STAR method" */
  framework?: string
  /** Full answer text. Use \n\n for paragraph breaks. */
  answer: string
  /** Follow-up questions the interviewer is likely to ask next */
  followUps?: string[]
}

export interface TipBlock {
  type: 'tip'
  title?: string
  text: string
}

export interface WarningBlock {
  type: 'warning'
  title?: string
  text: string
}

export interface BulletListBlock {
  type: 'bullets'
  title?: string
  items: string[]
}

export interface NumberedListBlock {
  type: 'numbered'
  title?: string
  items: string[]
}

export interface StatsBlock {
  type: 'stats'
  stats: Array<{ value: string; label: string }>
}

/** A named concept explanation — use to introduce a term or idea before diving in */
export interface ConceptBlock {
  type: 'concept'
  title: string
  body: string
}

/** A formula display with optional variable definitions and a footnote */
export interface FormulaBlock {
  type: 'formula'
  label: string
  formula: string
  variables?: Array<{ symbol: string; definition: string }>
  note?: string
}

/** Two-column do / don't list */
export interface DoDontBlock {
  type: 'dodont'
  dos: string[]
  donts: string[]
}

/** Side-by-side comparison table */
export interface ComparisonTableBlock {
  type: 'comparison-table'
  columnA: string
  columnB: string
  rows: Array<{ label: string; a: string; b: string }>
}

/** Glossary-style key terms */
export interface KeyTermBlock {
  type: 'key-term'
  title?: string
  terms: Array<{ term: string; definition: string }>
}

/** Annotated worked example with labelled steps */
export interface WorkedExampleBlock {
  type: 'worked-example'
  title: string
  scenario: string
  steps: Array<{ label: string; content: string }>
  result?: string
}

/** A standout summary callout at the end of a section */
export interface KeyTakeawayBlock {
  type: 'key-takeaway'
  text: string
}

export type GuideBlock =
  | ParagraphBlock
  | QuestionBlock
  | TipBlock
  | WarningBlock
  | BulletListBlock
  | NumberedListBlock
  | StatsBlock
  | ConceptBlock
  | FormulaBlock
  | DoDontBlock
  | ComparisonTableBlock
  | KeyTermBlock
  | WorkedExampleBlock
  | KeyTakeawayBlock

// ── Section ────────────────────────────────────────────────────────────────────

export interface GuideSection {
  /** Anchor ID used for TOC links, e.g. "accounting" */
  id: string
  title: string
  /**
   * Optional TOC group label. Consecutive sections sharing the same group
   * are rendered as a nested list under that group in the sidebar.
   * e.g. group: 'Technical Questions'
   */
  group?: string
  /** Short paragraph shown between the section heading and the first block */
  intro?: string
  blocks: GuideBlock[]
}

// ── Top-level guide ────────────────────────────────────────────────────────────

export interface InterviewGuide {
  slug: string
  title: string
  description: string
  /** Short role label, e.g. "Analyst / Associate" */
  role: string
  /** Industry label, e.g. "Finance" */
  industry: string
  /** ISO date string "YYYY-MM-DD" */
  lastUpdated: string
  readingTimeMinutes: number
  sections: GuideSection[]
}

// ── Lightweight registry (for listings, sitemaps, nav) ────────────────────────

export interface InterviewGuideRef {
  slug: string
  title: string
  linkLabel: string
  description: string
  role: string
  industry: string
  status: 'published' | 'draft'
}

export const interviewGuideRefs: InterviewGuideRef[] = [
  {
    slug: 'investment-banking',
    title: 'Investment Banking Interview Guide',
    linkLabel: 'Investment Banking Guide',
    description:
      'Prepare for investment banking interviews with technical questions, behavioral questions, and a structured prep plan.',
    role: 'Analyst / Associate',
    industry: 'Finance',
    status: 'published',
  },
  {
    slug: 'product-manager',
    title: 'Product Manager Interview Guide',
    linkLabel: 'Product Manager Guide',
    description:
      'Prepare for product manager interviews with product sense, execution, metrics, strategy, analytical, technical, and behavioral questions.',
    role: 'Product Manager',
    industry: 'Product',
    status: 'published',
  },
  {
    slug: 'software-engineer',
    title: 'Software Engineer Interview Guide',
    linkLabel: 'Software Engineer Guide',
    description:
      'Prepare for software engineer interviews with coding patterns, data structures, algorithms, system design, debugging, testing, and behavioral questions.',
    role: 'Software Engineer',
    industry: 'Engineering',
    status: 'published',
  },
  {
    slug: 'data-analyst',
    title: 'Data Analyst Interview Guide',
    linkLabel: 'Data Analyst Guide',
    description:
      'Prepare for data analyst interviews with SQL, dashboards, metrics, Excel, analytics case studies, experimentation, data quality, and stakeholder communication questions.',
    role: 'Data Analyst',
    industry: 'Data',
    status: 'published',
  },
  {
    slug: 'data-scientist',
    title: 'Data Scientist Interview Guide',
    linkLabel: 'Data Scientist Guide',
    description:
      'Prepare for data scientist interviews with statistics, machine learning, experimentation, SQL, Python, product metrics, model evaluation, and behavioral questions.',
    role: 'Data Scientist',
    industry: 'Data',
    status: 'published',
  },
  {
    slug: 'consulting',
    title: 'Consulting Interview Guide',
    linkLabel: 'Consulting Guide',
    description:
      'Prepare for consulting interviews with case frameworks, profitability, market sizing, market entry, growth strategy, operations, charts, mental math, and fit questions.',
    role: 'Consultant',
    industry: 'Consulting',
    status: 'published',
  },
  {
    slug: 'business-analyst',
    title: 'Business Analyst Interview Guide',
    linkLabel: 'Business Analyst Guide',
    description:
      'Prepare for business analyst interviews with requirements gathering, process mapping, stakeholder management, SQL, metrics, user stories, UAT, and behavioral questions.',
    role: 'Business Analyst',
    industry: 'Business',
    status: 'published',
  },
  {
    slug: 'financial-analyst',
    title: 'Financial Analyst Interview Guide',
    linkLabel: 'Financial Analyst Guide',
    description:
      'Prepare for financial analyst interviews with accounting, financial statements, forecasting, budgeting, variance analysis, Excel modeling, valuation, FP&A, and behavioral questions.',
    role: 'Financial Analyst',
    industry: 'Finance',
    status: 'published',
  },
  {
    slug: 'data-engineer',
    title: 'Data Engineer Interview Guide',
    linkLabel: 'Data Engineer Guide',
    description:
      'Prepare for data engineer interviews with SQL, data modeling, ETL pipelines, batch and streaming systems, Spark, orchestration, warehouses, data quality, and system design questions.',
    role: 'Data Engineer',
    industry: 'Data',
    status: 'published',
  },
  {
    slug: 'project-manager',
    title: 'Project Manager Interview Guide',
    linkLabel: 'Project Manager Guide',
    description:
      'Prepare for project manager interviews with scope, schedule, risk, stakeholder management, Agile, waterfall, status reporting, delivery recovery, and behavioral questions.',
    role: 'Project Manager',
    industry: 'Project Management',
    status: 'published',
  },
]

export const publishedInterviewGuideRefs = interviewGuideRefs.filter(
  (guide) => guide.status === 'published'
)

export function getInterviewGuideRef(slug: string): InterviewGuideRef | undefined {
  return interviewGuideRefs.find((g) => g.slug === slug)
}

// ── Helper: extract all question blocks across a guide (for JSON-LD / search) ──

export function extractQuestions(guide: InterviewGuide): QuestionBlock[] {
  return guide.sections
    .flatMap((s) => s.blocks)
    .filter((b): b is QuestionBlock => b.type === 'question')
}
