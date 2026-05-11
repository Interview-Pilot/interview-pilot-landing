import { InterviewCopilotHero } from '#components/marketing/interview-copilot-hero'
export const metadata = {
  title: 'Interview Copilot',
  description:
    'Learn how Interview Pilot helps deliver real-time interview support with AI-powered Copilot guidance.',
  alternates: {
    canonical: '/interview-copilot',
  },
  openGraph: {
    title: 'Interview Copilot',
    description:
      'Learn how Interview Pilot helps deliver real-time interview support with AI-powered Copilot guidance.',
    url: '/interview-copilot',
  },
}

export default function InterviewCopilotPage() {
  return <InterviewCopilotHero />
}
