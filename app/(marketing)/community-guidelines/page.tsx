'use client'

import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react'

export default function CommunityGuidelinesPage() {
  return (
    <Container maxW="container.md" py={16} mt={10}>
      <Heading as="h1" size="xl" mb={6} pt={8}>
        Community Guidelines
      </Heading>
      <VStack spacing={6} align="stretch">

        <Text fontWeight="bold">
          Welcome to the Interview Pilot community! These guidelines help ensure a positive, supportive, and respectful environment for all members.
        </Text>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            1. Be Respectful
          </Heading>
          <Text>
            Treat all community members with respect and kindness. We welcome people from all backgrounds, experience levels, and career stages. Personal attacks, harassment, bullying, or discriminatory language of any kind will not be tolerated.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            2. Keep Content Relevant
          </Heading>
          <Text>
            Focus discussions on interview preparation, career development, and professional growth. Off-topic content, spam, or promotional material unrelated to the community&apos;s purpose may be removed.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            3. Share Authentically
          </Heading>
          <Text>
            When sharing interview experiences or questions, be honest and accurate. Do not fabricate experiences or misrepresent information. Sharing genuine insights helps everyone in the community learn and grow.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            4. Protect Confidentiality
          </Heading>
          <Text>
            Do not share confidential or proprietary information from employers, including trade secrets, internal processes, or information obtained under NDA. Respect the boundaries set by companies and interviewers.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            5. No Harmful Content
          </Heading>
          <Text>
            Do not post content that is illegal, harmful, threatening, abusive, defamatory, or otherwise objectionable. This includes but is not limited to hate speech, violent content, sexually explicit material, or content that promotes illegal activities.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            6. Give Credit
          </Heading>
          <Text>
            When sharing resources, tips, or content created by others, give appropriate credit to the original source. Do not plagiarize or claim others&apos; work as your own.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            7. No Spam or Self-Promotion
          </Heading>
          <Text>
            Avoid excessive self-promotion, advertising, or spamming. Limited sharing of relevant personal projects or resources is acceptable, but the community should not be used primarily as a marketing platform.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            8. Report Violations
          </Heading>
          <Text>
            If you see content that violates these guidelines, please report it. Do not engage with or escalate conflicts. Our moderation team will review reports and take appropriate action.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            9. Consequences
          </Heading>
          <Text>
            Violations of these guidelines may result in content removal, temporary suspension, or permanent ban from the community, depending on the severity and frequency of violations. We reserve the right to take action at our discretion to maintain a healthy community environment.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            10. Contact Us
          </Heading>
          <Text>
            If you have questions about these guidelines or need to report an issue, please contact us at Support@LiberaceAI.com.
          </Text>
        </Box>

        <Text fontStyle="italic" mt={4} color="gray.600">
          Last updated: December 21, 2025
        </Text>
      </VStack>
    </Container>
  )
}
