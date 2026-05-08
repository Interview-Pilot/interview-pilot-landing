'use client'

import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react'

export default function TermsPage() {
  return (
    <Container maxW="container.md" py={16} mt={10}>
      <Heading as="h1" size="xl" mb={6} pt={8}>
        Terms of Service
      </Heading>

      <VStack spacing={6} align="stretch">
        <Text fontWeight="bold">
          Welcome to Interview Pilot. Please read these Terms of Service carefully
          before using our Services.
        </Text>

        <Text>
          Interview Pilot is a brand owned and operated by Liberace Pte. Ltd.
          (&quot;Liberace,&quot; &quot;we,&quot; &quot;us,&quot; or
          &quot;our&quot;). These Terms of Service (&quot;Terms&quot;)
          govern your access to and use of Interview Pilot, including our
          websites, mobile applications, desktop applications, platform website,
          and related products, features, and services (collectively, the
          &quot;Services&quot;).
        </Text>

        <Text>
          By downloading, installing, creating an account for, accessing, or
          using the Services, you agree to be bound by these Terms. If you do
          not agree to these Terms, you must not use the Services.
        </Text>

        <Text fontWeight="bold">
          ARBITRATION NOTICE AND CLASS ACTION WAIVER: EXCEPT FOR CERTAIN TYPES OF
          DISPUTES DESCRIBED BELOW, YOU AGREE THAT DISPUTES BETWEEN YOU AND US
          WILL BE RESOLVED BY BINDING INDIVIDUAL ARBITRATION, AND YOU WAIVE YOUR
          RIGHT TO PARTICIPATE IN A CLASS ACTION LAWSUIT OR CLASS-WIDE
          ARBITRATION.
        </Text>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            1. Service Overview
          </Heading>

          <Text fontWeight="bold" mt={3}>
            1.1 Description of the Services
          </Text>
          <Text>
            Interview Pilot provides AI-powered tools for interview preparation,
            practice, coaching, question review, account management, and related
            workflow support across supported devices and platforms. Features may
            include real-time assistance, interview question databases,
            AI-generated responses, analytics, feedback, subscription management,
            and desktop or platform onboarding experiences.
          </Text>
          <Text mt={2}>
            Certain Services may be offered through mobile applications, desktop
            software, or the Interview Pilot platform website, and some features
            or subscriptions may differ depending on which product surface you
            use.
          </Text>

          <Text fontWeight="bold" mt={3}>
            1.2 License Grant
          </Text>
          <Text>
            Subject to your compliance with these Terms, Liberace grants you a
            limited, non-exclusive, non-transferable, non-sublicensable,
            revocable license to access and use the Services for your personal,
            non-commercial use. The Services are licensed, not sold, to you.
          </Text>

          <Text fontWeight="bold" mt={3}>
            1.3 Availability and Changes
          </Text>
          <Text>
            We may modify, suspend, discontinue, or update any part of the
            Services at any time, including features, subscription offerings,
            availability, supported devices, or technical requirements.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            2. Eligibility and Accounts
          </Heading>

          <Text fontWeight="bold" mt={3}>
            2.1 Eligibility
          </Text>
          <Text>
            You may use the Services only if you are legally capable of entering
            into a binding agreement with us and your use does not violate any
            applicable law or regulation.
          </Text>

          <Text fontWeight="bold" mt={3}>
            2.2 Account Registration
          </Text>
          <Text>
            Some parts of the Services may require an account. Depending on the
            product surface, you may access the Services through an app store
            account, a direct platform account created with email and password,
            or third-party sign-in providers such as Google or Apple.
          </Text>

          <Text fontWeight="bold" mt={3}>
            2.3 Account Responsibility
          </Text>
          <Text>
            You are responsible for maintaining the confidentiality and security
            of your credentials and for all activity that occurs under your
            account. You must provide accurate information and promptly update it
            if it changes.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            3. Subscriptions, Billing, and Purchases
          </Heading>

          <Text fontWeight="bold" mt={3}>
            3.1 Separate Product Surfaces
          </Text>
          <Text>
            Interview Pilot may offer separate mobile and platform or desktop
            experiences. Access rights, subscription entitlements, billing
            providers, and available features may differ across product surfaces.
          </Text>

          <Text fontWeight="bold" mt={3}>
            3.2 Mobile Billing
          </Text>
          <Text>
            Mobile purchases and subscriptions may be processed through Apple&apos;s
            App Store or Google Play. Those purchases are subject to the
            applicable app store&apos;s payment terms, billing rules, cancellation
            processes, and refund policies.
          </Text>

          <Text fontWeight="bold" mt={3}>
            3.3 Platform and Desktop Billing
          </Text>
          <Text>
            Platform or desktop-related subscriptions may be sold separately from
            mobile subscriptions and may be processed through our web billing
            providers. By purchasing a platform subscription, you authorize the
            applicable payment provider to charge your selected payment method
            according to the subscription terms presented at checkout.
          </Text>

          <Text fontWeight="bold" mt={3}>
            3.4 Renewals and Cancellation
          </Text>
          <Text>
            Unless otherwise stated, subscriptions may renew automatically until
            cancelled. Cancellation and billing management may occur through the
            applicable app store, billing portal, or account interface depending
            on where you purchased your subscription.
          </Text>

          <Text fontWeight="bold" mt={3}>
            3.5 Pricing and Taxes
          </Text>
          <Text>
            Prices, billing intervals, available plans, and promotions may change
            from time to time. You are responsible for applicable taxes, duties,
            or governmental charges unless stated otherwise.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            4. Acceptable Use and Restrictions
          </Heading>

          <Text>You agree not to:</Text>
          <Text ml={5}>• violate any applicable law, regulation, or third-party right</Text>
          <Text ml={5}>• share your credentials or allow unauthorized access to your account</Text>
          <Text ml={5}>• copy, modify, reverse engineer, decompile, or attempt to extract source code or proprietary logic from the Services</Text>
          <Text ml={5}>• scrape, extract, copy, or build a competing database from our content, question bank, or Service outputs</Text>
          <Text ml={5}>• interfere with, disrupt, or degrade the performance, security, or integrity of the Services</Text>
          <Text ml={5}>• use the Services to violate employer, school, interviewer, recruiting, or platform rules that apply to you</Text>
          <Text ml={5}>• use the Services for unlawful, fraudulent, or deceptive purposes</Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            5. AI Outputs, Interview Content, and User Responsibility
          </Heading>

          <Text fontWeight="bold" mt={3}>
            5.1 AI Assistance
          </Text>
          <Text>
            The Services may generate suggestions, summaries, feedback, answers,
            or other AI-assisted outputs. These outputs are provided for
            informational, educational, and workflow-support purposes only. You
            remain solely responsible for how you use any output and for your own
            decisions, actions, statements, and outcomes.
          </Text>

          <Text fontWeight="bold" mt={3}>
            5.2 No Guarantee of Results
          </Text>
          <Text>
            We do not guarantee interview success, employment outcomes, improved
            performance, question accuracy, recruiter response, or any other
            result from use of the Services.
          </Text>

          <Text fontWeight="bold" mt={3}>
            5.3 No Guarantee of Stealth, Compatibility, or Non-Detection
          </Text>
          <Text>
            We do not guarantee that any part of the Services will be
            undetectable, invisible, uninterrupted, or compatible with every
            operating system, browser, conferencing tool, proctoring tool,
            employer system, or third-party software environment. You are solely
            responsible for evaluating whether your use of the Services complies
            with any policies, rules, or expectations that apply to you.
          </Text>

          <Text fontWeight="bold" mt={3}>
            5.4 Interview Question Content
          </Text>
          <Text>
            Questions or examples presented in the Services may be derived from
            public materials, user submissions, internal examples, generalized
            interview patterns, or other sources. We do not guarantee that any
            question displayed has been asked, or will be asked, by any specific
            company or interviewer.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            6. Intellectual Property
          </Heading>

          <Text>
            The Services, including software, branding, visual design, platform
            structure, databases, prompts, features, and related technology, are
            owned by Liberace or its licensors and are protected by intellectual
            property laws. Except for the limited rights expressly granted in
            these Terms, we reserve all rights in and to the Services.
          </Text>

          <Text mt={2}>
            To the extent you submit content or feedback to us, you grant us a
            non-exclusive, worldwide, royalty-free license to use it as necessary
            to operate, improve, secure, and support the Services. We may also
            use aggregated or de-identified information for analytics, quality
            improvement, and product development.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            7. Suspension and Termination
          </Heading>

          <Text>
            We may suspend, restrict, or terminate your access to some or all of
            the Services at any time if we believe you have violated these Terms,
            created risk for us or other users, or used the Services in a manner
            that may expose us to liability or harm.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            8. Disclaimers and Limitation of Liability
          </Heading>

          <Text fontWeight="bold" mt={3}>
            8.1 Disclaimer of Warranties
          </Text>
          <Text>
            THE SERVICES ARE PROVIDED ON AN &quot;AS IS,&quot; &quot;AS
            AVAILABLE,&quot; AND &quot;WITH ALL FAULTS&quot; BASIS TO THE FULLEST
            EXTENT PERMITTED BY LAW. LIBERACE DISCLAIMS ALL WARRANTIES, EXPRESS
            OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS
            FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ANY WARRANTIES ARISING
            OUT OF COURSE OF DEALING OR USAGE OF TRADE.
          </Text>

          <Text fontWeight="bold" mt={3}>
            8.2 Limitation of Liability
          </Text>
          <Text>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, LIBERACE AND ITS AFFILIATES,
            OFFICERS, DIRECTORS, EMPLOYEES, CONTRACTORS, AND AGENTS SHALL NOT BE
            LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
            EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE,
            DATA, GOODWILL, BUSINESS OPPORTUNITY, OR OTHER INTANGIBLE LOSSES
            ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICES.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            9. Arbitration and Class Action Waiver
          </Heading>

          <Text>
            All disputes arising out of or relating to these Terms or the
            Services shall be resolved by binding individual arbitration, except
            for claims seeking injunctive or equitable relief relating to misuse
            of intellectual property or unauthorized access to the Services.
          </Text>
          <Text mt={2}>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, ALL CLAIMS MUST BE BROUGHT IN
            AN INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY
            PURPORTED CLASS, COLLECTIVE, OR REPRESENTATIVE PROCEEDING.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            10. Changes to These Terms
          </Heading>

          <Text>
            We may update these Terms from time to time. If we make material
            changes, we may notify you through the Services, by email, or by
            updating the effective date below. Your continued use of the Services
            after updated Terms become effective constitutes your acceptance of
            the revised Terms.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            11. Contact Information
          </Heading>

          <Text>
            If you have questions about these Terms, please contact us at
            Support@LiberaceAI.com.
          </Text>
        </Box>

        <Text fontStyle="italic" mt={4} color="gray.600">
          Last updated: May 7, 2026
        </Text>
      </VStack>
    </Container>
  )
}
