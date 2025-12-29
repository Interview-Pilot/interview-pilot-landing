'use client'
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react'
export default function PrivacyPage() {
return (
<Container maxW="container.md" py={16} mt={10}>
<Heading as="h1" size="xl" mb={6} pt={8}>
 Privacy Policy
</Heading>
<VStack spacing={6} align="stretch">
<Text>
 Interview Pilot values your privacy and is committed to protecting your personal data. This Privacy Policy explains how we handle your information when you use our mobile application (iOS and Android).
</Text>
<Box>
<Heading as="h2" size="md" mb={2}>
 No Collection of Personal Data
</Heading>
<Text>
 We do not collect, store, or process any personal data from our users.
</Text>
</Box>
<Box>
<Heading as="h2" size="md" mb={2}>
 Analytics
</Heading>
<Text>
 We use Firebase Analytics to collect limited anonymous usage data only during your initial app setup and onboarding process. This helps us improve the user experience and understand how users discover and set up our app. 
</Text>
<Text mt={2}>
 The data collected is limited to basic onboarding interactions and preferences. No personally identifiable information, job details, employment history, or documents are collected. No analytics data is collected during your actual use of the app after completing the onboarding process.
</Text>
<Text mt={2}>
 This anonymous data is transmitted to and stored on Google&apos;s Firebase servers in accordance with Google&apos;s privacy policy. You can learn more about how Google processes this data at https://policies.google.com/privacy.
</Text>
</Box>
<Box>
<Heading as="h2" size="md" mb={2}>
 Data Security
</Heading>
<Text>
 Processing of your interview questions is handled securely by our AI provider using industry-standard encryption. No personal data or content is stored in our servers. Any data stored in files remains local to your device or within your iCloud (iOS only), depending on your storage settings.
</Text>
<Text mt={2}>
 We implement industry-standard security measures to protect any data that may be processed through our service. However, as no system is completely secure, we recommend using strong security practices on your devices.
</Text>
</Box>
<Box>
<Heading as="h2" size="md" mb={2}>
 Device Permissions
</Heading>
<Text>
 Our app may request access to your device&apos;s microphone to enable interview recording functionality. We may also request access to your device storage to save interview recordings and responses locally. These permissions are only used for the core functionality of the app and not for collecting personal data.
</Text>
</Box>
<Box>
<Heading as="h2" size="md" mb={2}>
 Data Retention
</Heading>
<Text>
 Any data created while using our app (such as interview responses) is stored locally on your device and on iCloud (iOS only) and remains there until you choose to delete it. You can delete this data at any time by deleting the app from your device or by deleting the data from iCloud (iOS only).
</Text>
</Box>
<Box>
<Heading as="h2" size="md" mb={2}>
 Third-Party Services
</Heading>
<Text>
 Our app uses Google Firebase for anonymous analytics during the onboarding process only. We also use third-party services for specific functionality. These services have their own privacy policies, and we encourage you to review them.
</Text>
</Box>
<Box>
<Heading as="h2" size="md" mb={2}>
 Google User Data
</Heading>
<Text>
 When you choose to connect your Gmail account to Interview Pilot, we request read-only access to your email messages to automatically detect interview invitations and add them to your calendar.
</Text>
<Text mt={2}>
 <strong>Data Accessed:</strong> We access your Gmail messages (read-only) using the Gmail API with the &quot;gmail.readonly&quot; scope. We also access your basic profile information (email address) to display which account is connected.
</Text>
<Text mt={2}>
 <strong>Data Usage:</strong> We scan your emails for keywords related to interview invitations (e.g., &quot;interview,&quot; &quot;schedule,&quot; &quot;calendar invite&quot;). When a potential interview email is detected, we extract the date, time, company name, and meeting details to create a calendar event in your Interview Pilot account.
</Text>
<Text mt={2}>
 <strong>Data Storage:</strong> We store encrypted OAuth tokens (using AES-256-GCM encryption) to maintain your Gmail connection. We also store the message IDs of emails we have already processed to prevent duplicate calendar entries. We do not permanently store the content of your emails.
</Text>
<Text mt={2}>
 <strong>Data Sharing:</strong> Your Gmail data is not shared with any third parties. Email content may be temporarily processed by our AI service (OpenAI) to extract interview details, but this content is not stored by the AI provider beyond the immediate processing request.
</Text>
<Text mt={2}>
 <strong>Revoking Access:</strong> You can disconnect your Gmail account at any time from the Interview Pilot app settings. You can also revoke access by visiting your Google Account permissions at https://myaccount.google.com/permissions. Upon disconnection, your stored OAuth tokens and processed email records are permanently deleted from our servers.
</Text>
</Box>
<Box>
<Heading as="h2" size="md" mb={2}>
 Your Rights
</Heading>
<Text>
 You have the right to access, modify, or delete any of your data that might be stored in the app. Since data is stored locally on your device or on iCloud (iOS only), you can exercise these rights directly by managing your device storage or iCloud storage (iOS only).
</Text>
</Box>
<Box>
<Heading as="h2" size="md" mb={2}>
 Children&apos;s Privacy
</Heading>
<Text>
 Our app is not directed to children under the age of 13, and we do not knowingly collect or store information from children under 13. If you believe we might have collected information from a child under 13, please contact us immediately.
</Text>
</Box>
<Box>
<Heading as="h2" size="md" mb={2}>
 Changes to This Policy
</Heading>
<Text>
 We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes through the app or via email if we have your contact information.
</Text>
</Box>
<Box>
<Heading as="h2" size="md" mb={2}>
 Contact Information
</Heading>
<Text>
 If you have any questions about our Privacy Policy, please contact us at Support@LiberaceAI.com.
</Text>
</Box>
<Text fontStyle="italic" mt={4} color="gray.600">
 Last updated: December 28, 2025
</Text>
</VStack>
</Container>
 )
}