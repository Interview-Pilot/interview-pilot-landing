import { AiMockInterviewPageContent } from '#components/marketing/ai-mock-interview-page-content'

export const metadata = {
  title: 'AI Mock Interview',
  description:
    'Practice with AI Mock Interview flows built to help you sharpen behavioral and technical interview performance.',
  alternates: {
    canonical: '/ai-mock-interview',
  },
  openGraph: {
    title: 'AI Mock Interview',
    description:
      'Practice with AI Mock Interview flows built to help you sharpen behavioral and technical interview performance.',
    url: '/ai-mock-interview',
  },
}

export default function AiMockInterviewPage() {
  return <AiMockInterviewPageContent />
}
