'use client'

import { Box, Container, Heading, Link, Text, VStack } from '@chakra-ui/react'

export default function PrivacyPage() {
  return (
    <Container maxW="container.md" py={16} mt={10}>
      <Heading as="h1" size="xl" mb={6} pt={8}>
        Privacy Policy
      </Heading>

      <VStack spacing={6} align="stretch">
        <Text>
          Interview Pilot values your privacy and is committed to protecting your
          information. This Privacy Policy explains how Liberace Pte. Ltd.
          (&quot;Liberace,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
          collects, uses, discloses, and protects information when you use
          Interview Pilot, including our landing website, mobile applications,
          desktop application, platform website, and related services
          (collectively, the &quot;Services&quot;).
        </Text>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            Information We Collect
          </Heading>
          <Text>
            The information we collect depends on which Services you use and how
            you interact with them.
          </Text>
          <Text mt={2}>
            <strong>Account and authentication information.</strong> If you create
            an account on our platform, we may collect information such as your
            email address, password, account identifier, verification status, and
            authentication-related data. If you sign in with Google or Apple, we
            may receive information needed to authenticate your account from those
            providers.
          </Text>
          <Text mt={2}>
            <strong>Subscription and billing information.</strong> If you purchase
            or manage a platform subscription, we may collect and store
            subscription, entitlement, billing status, billing provider, and
            related transaction metadata. Payment card details for platform
            billing are processed by our payment processor rather than stored
            directly by us. Mobile purchases are processed through Apple&apos;s App
            Store or Google Play.
          </Text>
          <Text mt={2}>
            <strong>Usage and technical information.</strong> We may collect
            information about how you use the Services, such as onboarding
            interactions, account activity, subscription usage, browser or device
            information, and session-related information needed to operate and
            secure the platform.
          </Text>
          <Text mt={2}>
            <strong>Content and feature inputs.</strong> Depending on the feature,
            we may process interview-related inputs, recordings, transcripts,
            prompts, responses, or other content you choose to submit in order to
            provide AI-powered features and account functionality.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            How We Use Information
          </Heading>
          <Text>We may use information we collect to:</Text>
          <Text ml={5}>• provide, operate, maintain, and improve the Services</Text>
          <Text ml={5}>• create and manage accounts and authenticate users</Text>
          <Text ml={5}>• process subscriptions, entitlements, and billing workflows</Text>
          <Text ml={5}>• provide desktop download and onboarding flows</Text>
          <Text ml={5}>• send account-related notices such as verification, password reset, security, and billing communications</Text>
          <Text ml={5}>• monitor usage, analyze trends, and improve product performance</Text>
          <Text ml={5}>• protect the security and integrity of the Services and enforce our terms</Text>
          <Text ml={5}>• comply with legal obligations and resolve disputes</Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            Authentication, Cookies, and Sessions
          </Heading>
          <Text>
            Our platform uses cookies and session technologies to keep you signed
            in, authenticate requests, protect accounts, and maintain account
            sessions across visits. These technologies may include secure,
            HTTP-only authentication cookies and related session identifiers.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            Mobile Device Permissions and Local Storage
          </Heading>
          <Text>
            Our mobile applications may request access to your device&apos;s
            microphone and storage in order to provide core product functionality,
            such as capturing interview audio and saving responses or related
            files locally. Some locally generated data may also be stored through
            device or cloud backup systems you control, such as iCloud.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            Analytics
          </Heading>
          <Text>
            We use analytics and measurement tools to understand how users
            discover, onboard into, and use our Services. For example, our mobile
            app uses Firebase Analytics for onboarding and product-improvement
            purposes. Analytics providers may process technical and usage data
            under their own privacy policies.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            Third-Party Services and Providers
          </Heading>
          <Text>
            We may use third-party providers to support authentication, billing,
            analytics, hosting, desktop delivery, AI-powered functionality, and
            related product operations. Depending on the Service you use, those
            providers may include Apple, Google, Stripe, Firebase, and other
            infrastructure or service partners acting on our behalf.
          </Text>
          <Text mt={2}>
            We encourage you to review the privacy policies of relevant third
            parties, including{' '}
            <Link href="https://policies.google.com/privacy" isExternal textDecoration="underline">
              Google
            </Link>
            ,{' '}
            <Link href="https://www.apple.com/legal/privacy/" isExternal textDecoration="underline">
              Apple
            </Link>
            , and{' '}
            <Link href="https://stripe.com/privacy" isExternal textDecoration="underline">
              Stripe
            </Link>
            .
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            How We Share Information
          </Heading>
          <Text>
            We may share information with service providers and partners that help
            us operate the Services, process subscriptions, authenticate users,
            deliver product features, and secure the platform. We may also share
            information when required by law, to enforce our rights, to protect
            users or the Services, or in connection with a business transaction
            such as a merger, financing, acquisition, or sale of assets.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            Data Retention
          </Heading>
          <Text>
            We retain information for as long as reasonably necessary to provide
            the Services, maintain accounts, fulfill subscriptions, comply with
            legal obligations, resolve disputes, and enforce our agreements.
            Retention periods may vary depending on the type of information and
            the product surface involved.
          </Text>
          <Text mt={2}>
            Some content may remain stored locally on your device or within device
            backup systems you control until you delete it. Account and billing
            records associated with the platform may be retained for operational,
            security, legal, and financial recordkeeping purposes.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            Your Choices and Rights
          </Heading>
          <Text>
            Depending on the Services you use and where you are located, you may
            have the right to access, update, or delete certain information about
            you. You may also manage certain account information directly through
            the platform account settings. If you would like to request deletion
            of your platform account or have questions about your information,
            please contact us using the details below.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            Data Security
          </Heading>
          <Text>
            We use reasonable administrative, technical, and organizational
            safeguards designed to protect information under our control. However,
            no method of transmission over the Internet or method of electronic
            storage is completely secure, and we cannot guarantee absolute
            security.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            Children&apos;s Privacy
          </Heading>
          <Text>
            Our Services are not directed to children under the age of 13, and we
            do not knowingly collect personal information from children under 13.
            If you believe we may have collected information from a child under
            13, please contact us so we can investigate and take appropriate
            action.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            Changes to This Policy
          </Heading>
          <Text>
            We may update this Privacy Policy from time to time to reflect changes
            in our Services, practices, legal obligations, or operational needs.
            We may notify you of material changes through the Services, by email,
            or by updating the effective date below.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            Contact Information
          </Heading>
          <Text>
            If you have questions about this Privacy Policy or our privacy
            practices, please contact us at Support@LiberaceAI.com.
          </Text>
        </Box>

        <Text fontStyle="italic" mt={4} color="gray.600">
          Last updated: May 7, 2026
        </Text>
      </VStack>
    </Container>
  )
}
