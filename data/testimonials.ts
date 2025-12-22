import { ReactNode } from 'react'

/**
 * Testimonial data for the landing page
 */

interface TestimonialItem {
  name: string
  description: string
  children: ReactNode
}

interface TestimonialsData {
  title: string
  items: TestimonialItem[]
}

const testimonials: TestimonialsData = {
  title: '#interviewpilot: Our Success Stories',
  items: [
    {
      name: 'Ali K.',
      description: 'Tech Professional',
      children:
        "Got a new tech job after getting laid off in just 3 weeks of using this, without studying for technicals. Copilot use every week is basically unlimited. Don't know how they are offering so many.",
    },
    {
      name: 'Anonymous',
      description: 'Product Manager',
      children:
        'This app helped me nail my product manager interview at FAANG. Interview question transcriptions are super accurate and answers are basically perfect.',
    },
    {
      name: 'Anonymous',
      description: 'Career Switcher',
      children:
        "Best $ I've spent on my job search. The customized answers are soooo useful. Just landed a role with more pay just by reading off answers.",
    },
    {
      name: 'Eva',
      description: 'International Student',
      children:
        'Works very good even in Chinese. Practiced in both English and Mandarin. My interviews went so much better. App is very fast and smooth.',
    },
    {
      name: 'Anonymous',
      description: 'Finance Professional',
      children:
        'Incredible tool for non-native speakers. Used it to prep for finance interviews. It picks up any accents. Highly recommend.',
    },
    {
      name: 'K.O.',
      description: 'Job Seeker',
      children:
        'Incredibly fast answers, very smooth and easy to use. Answers are also very accurate, highly recommend.',
    },
  ],
}

export default testimonials
