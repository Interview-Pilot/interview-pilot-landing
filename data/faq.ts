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
      a: 'Interview Pilot for iOS and Android runs on a separate device and does not directly interact with your desktop interview application.\n\nFor Interview Pilot Desktop, we have advanced stealth features built in to be undetectable by most video conferencing software. Download the desktop app to test and learn more.',
    },
    {
      q: 'What devices can I use Interview Pilot on?',
      a: 'Interview Pilot is available on iOS, Android, macOS, and Windows. You can use it on iPhones, iPads, Android devices, Mac computers, and Windows PCs.',
    },
    {
      q: 'Is this considered cheating?',
      a: 'Interview Pilot is designed to be a full Copilot assistant for all your interview needs. If you prefer to only receive talking points to guide you along instead of full answers, simply choose "Key Points" in Copilot response settings.',
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
