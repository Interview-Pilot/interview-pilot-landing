import { investmentBankingGuide } from '#data/guides/investment-banking'
import { productManagerGuide } from '#data/guides/product-manager'
import { softwareEngineerGuide } from '#data/guides/software-engineer'
import { dataAnalystGuide } from '#data/guides/data-analyst'
import { dataScientistGuide } from '#data/guides/data-scientist'
import { consultingGuide } from '#data/guides/consulting'
import { businessAnalystGuide } from '#data/guides/business-analyst'
import { financialAnalystGuide } from '#data/guides/financial-analyst'
import { dataEngineerGuide } from '#data/guides/data-engineer'
import { projectManagerGuide } from '#data/guides/project-manager'
import type { InterviewGuide, QuestionBlock } from '#data/interview-guides'
import {
  interviewQuestionRefs,
  type InterviewQuestionRef,
} from '#data/interview-question-refs'

export type { InterviewQuestionRef } from '#data/interview-question-refs'
export {
  getInterviewQuestionPageRef,
  publishedInterviewQuestionRefs,
} from '#data/interview-question-refs'

export interface InterviewQuestionPage extends InterviewQuestionRef {
  sourceGuide: InterviewGuide
}

export interface InterviewQuestionSection {
  id: string
  title: string
  intro?: string
  questions: QuestionBlock[]
}

const sourceGuides: Record<string, InterviewGuide> = {
  'investment-banking': investmentBankingGuide,
  'product-manager': productManagerGuide,
  'software-engineer': softwareEngineerGuide,
  'data-analyst': dataAnalystGuide,
  'data-scientist': dataScientistGuide,
  consulting: consultingGuide,
  'business-analyst': businessAnalystGuide,
  'financial-analyst': financialAnalystGuide,
  'data-engineer': dataEngineerGuide,
  'project-manager': projectManagerGuide,
}

export const interviewQuestionPages: InterviewQuestionPage[] = interviewQuestionRefs.map((page) => {
  const sourceGuide = sourceGuides[page.slug]

  if (!sourceGuide) {
    throw new Error(`Missing source guide for interview question page: ${page.slug}`)
  }

  return {
    ...page,
    sourceGuide,
  }
})

export const publishedInterviewQuestionPages = interviewQuestionPages.filter(
  (page) => page.status === 'published'
)

export function getInterviewQuestionPage(slug: string) {
  return interviewQuestionPages.find((page) => page.slug === slug)
}

export function getQuestionSections(page: InterviewQuestionPage): InterviewQuestionSection[] {
  return page.sourceGuide.sections
    .map((section) => ({
      id: section.id,
      title: section.title,
      intro: section.intro,
      questions: section.blocks.filter((block): block is QuestionBlock => block.type === 'question'),
    }))
    .filter((section) => section.questions.length > 0)
}

export function getQuestionCount(page: InterviewQuestionPage) {
  return getQuestionSections(page).reduce((total, section) => total + section.questions.length, 0)
}
