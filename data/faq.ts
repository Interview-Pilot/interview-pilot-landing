/**
 * FAQ data for the landing page
 * Note: Uses 'q' and 'a' to match the Faq component's expected interface
 */

interface FaqItem {
  q: string
  a: string
}

interface FaqData {
  title: string
  description?: string
  items: FaqItem[]
}

const faq: FaqData = {
  title: 'Frequently Asked Questions',
  items: [
    {
      q: 'Can I use Interview Pilot for free?',
      a: 'Yes! you can try Interview Pilot for free with full access to all features! No credit card or trial required.\n\nYou only pay for the subscription if you like it.',
    },
    {
      q: 'Is Interview Pilot fully undetectable?',
      a: 'Yes! Interview Pilot is designed for your iOS and Android devices (mobile or tablet), and does not interact with your desktop interview application, making it completely undetectable by any programs.',
    },
    {
      q: 'What devices can I use Interview Pilot on?',
      a: 'Interview Pilot is designed for ALL iOS and Android devices, including iPhones, iPads and Android devices! For a list of compatible devices see below.\n\nInterview Pilot requires iOS 17.0 and above. The best way to check compatibility is to simply run the app and try all functions out for free!',
    },
    {
      q: 'Is this considered cheating?',
      a: 'Interview Pilot is designed to be a full Copilot assistant for all your interview needs. If you prefer to only receive talking points to guide you along instead of full answers, simply choose "Key Points" in Copilot response settings.\n\nSince Interview Pilot is not linked to your computer, it is fully undetectable and safer than all other similar desktop-based software.',
    },
    {
      q: 'Can it detect accents?',
      a: 'Yes absolutely! Interview Pilot is developed with natural human voices in mind.\n\nIt uses the latest and most advanced speech recognition (ASR) technology available in the world today, ranked No. 1 and supporting over 99 languages and thousands of accents!',
    },
    {
      q: 'I love this app! Can I request new features?',
      a: 'Yes! We have received many requests for new features, and would love to hear what ideas or needs you have! Our team is constantly in search of top new features to provide our users with the best interview experience.',
    },
  ],
}

export default faq
