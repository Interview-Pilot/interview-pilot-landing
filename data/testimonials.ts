import { ReactNode } from 'react'

/**
 * Testimonial data for the landing page
 */

interface TestimonialItem {
  name: string
  description: string
  source?: 'app-store' | 'play-store'
  rating?: number
  children: ReactNode
}

interface TestimonialsData {
  title: string
  description: string
  items: TestimonialItem[]
}

const testimonials: TestimonialsData = {
  title: 'Our testimonials',
  description: 'Real feedback from job seekers',
  items: [
    {
      name: 'Ali K.',
      description: 'Tech Professional',
      children:
        "Got a new tech job after getting laid off in just 3 weeks of using this, without studying for technicals. Copilot use every week is basically unlimited. Don't know how they are offering so many.",
    },
    {
      name: 'Anonymous',
      description: 'App Store Review',
      source: 'app-store',
      children:
        'Excellent tool. If you have the necessary knowledge for the job but English is not your native language, this app helps you sound professional.',
    },
    {
      name: 'kaye9776',
      description: 'App Store Review',
      source: 'app-store',
      children: 'Awesome. Great app.',
    },
    {
      name: 'Eva',
      description: 'Student',
      children:
        'Works very good even in Chinese. Practiced in both English and Mandarin. My interviews went so much better. App is very fast and smooth.',
    },
    {
      name: 'Tommavm',
      description: 'App Store Review',
      source: 'app-store',
      children: 'Fantastic. Quick responses tailored to job-specific questions.',
    },
    {
      name: 'Vikram Singh',
      description: 'Play Store Review',
      source: 'play-store',
      children: 'Great app.',
    },
    {
      name: 'Anonymous',
      description: 'Product Manager',
      children:
        'This app helped me nail my product manager interview at FAANG. Interview question transcriptions are super accurate and answers are basically perfect.',
    },
    {
      name: 'K.O.',
      description: 'Professional',
      children:
        'Incredibly fast answers, very smooth and easy to use. Answers are also very accurate, highly recommend.',
    },
    {
      name: 'budzwizer kenth',
      description: 'Play Store Review',
      source: 'play-store',
      children: 'Great apps.',
    },
    {
      name: 'Anonymous',
      description: 'Career Switcher',
      children:
        "Best $ I've spent on my job search. The customized answers are soooo useful. Just landed a role with more pay just by reading off answers.",
    },
    {
      name: 'Dalton3829',
      description: 'App Store Review',
      source: 'app-store',
      children:
        'Easy to use and quick to learn. It helps you modify and improve your interviewing skills.',
    },
    {
      name: 'Saifali Draxi',
      description: 'Play Store Review',
      source: 'play-store',
      children: 'Good.',
    },
    {
      name: 'Anonymous',
      description: 'Professional',
      children:
        'Incredible tool for non-native speakers. Used it to prep for finance interviews. It picks up any accents. Highly recommend.',
    },
    {
      name: 'Jenevie Curammeng',
      description: 'Play Store Review',
      source: 'play-store',
      children: 'I super love it. It was helpful.',
    },
    {
      name: 'Mazharul Islam',
      description: 'Play Store Review',
      source: 'play-store',
      children: 'Very helpful apps.',
    },
    {
      name: 'Zah Mohdisa',
      description: 'Play Store Review',
      source: 'play-store',
      rating: 4,
      children: 'Very useful.',
    },
    {
      name: 'Edna Galamiton',
      description: 'Play Store Review',
      source: 'play-store',
      children: 'Good.',
    },
    {
      name: 'Kuwait Kuwait',
      description: 'Play Store Review',
      source: 'play-store',
      children: 'Good app.',
    },
  ],
}

export default testimonials
