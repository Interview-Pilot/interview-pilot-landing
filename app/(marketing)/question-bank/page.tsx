import { QuestionBankPageContent } from '#components/marketing/question-bank-page-content'

export const metadata = {
  title: 'Question Bank',
  description:
    'Practice real interview questions across companies, roles, and categories with Interview Pilot Question Bank.',
  alternates: {
    canonical: '/question-bank',
  },
  openGraph: {
    title: 'Question Bank',
    description:
      'Practice real interview questions across companies, roles, and categories with Interview Pilot Question Bank.',
    url: '/question-bank',
  },
}

export default function QuestionBankPage() {
  return <QuestionBankPageContent />
}
