'use client'

import {
  Box,
  Container,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import {
  FiMessageSquare,
  FiMicOff,
  FiMonitor,
  FiMoreHorizontal,
  FiPhone,
  FiSettings,
  FiUser,
  FiVideo,
} from 'react-icons/fi'

import { sectionContentStyles } from '#theme/styles/section-styles'

const transcript = [
  {
    speaker: 'Sarah Chen · AI Interviewer',
    text: 'Walk me through why you want to pursue investment banking specifically.',
    isAI: true,
    isActive: false,
  },
  {
    speaker: 'You',
    text: "I'm drawn to the combination of high-stakes problem solving and direct client exposure.",
    isAI: false,
    isActive: false,
  },
  {
    speaker: 'Sarah Chen · AI Interviewer',
    text: 'Good start. Can you be more specific? Which experience shaped that view?',
    isAI: true,
    isActive: true,
  },
]

const scoreMetrics = [
  { label: 'Confidence', score: 82, color: '#4ade80' },
  { label: 'Specificity', score: 61, color: '#FFE500' },
  { label: 'Structure', score: 90, color: '#4ade80' },
]


const keyframeStyles = {
  '@keyframes waveBar': {
    '0%, 100%': { height: '3px' },
    '50%': { height: '14px' },
  },
  '@keyframes typingDot': {
    '0%, 60%, 100%': { opacity: 0.3, transform: 'translateY(0)' },
    '30%': { opacity: 1, transform: 'translateY(-3px)' },
  },
  '@keyframes speakerPulse': {
    '0%, 100%': { opacity: 0.5, transform: 'scale(1)' },
    '50%': { opacity: 0.15, transform: 'scale(1.08)' },
  },
}

export function AiMockInterviewPageContent() {
  return (
    <Box pt={{ base: 24, md: 28 }} sx={{ ...sectionContentStyles, ...keyframeStyles }}>
      <Box pt={16} pb={{ base: 16, md: 24 }} px={[4, null]}>
        <Container maxW="container.xl">
          <VStack spacing={{ base: 14, md: 20 }} align="stretch">

            {/* Hero */}
            <VStack spacing={5} align="center" textAlign="center">
              <Text
                as="h1"
                fontSize={{ base: '5xl', md: '7xl' }}
                fontWeight="bold"
                lineHeight="1"
                color="white"
              >
                AI Mock Interview
              </Text>

              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                color="whiteAlpha.600"
                maxW="640px"
                lineHeight="1.7"
              >
                Practice with a realistic AI interviewer. Get live transcript, instant feedback,
                and performance analytics — all in a real interview setting.
              </Text>
            </VStack>

            {/* Video conference mockup */}
            <Box
              borderRadius="2xl"
              overflow="hidden"
              border="1px solid"
              borderColor="rgba(255,255,255,0.08)"
              boxShadow="0 40px 120px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)"
              bg="#0a0a0a"
              position="relative"
            >
              {/* macOS-style window chrome */}
              <HStack
                px={5}
                h="44px"
                bg="#111111"
                borderBottom="1px solid"
                borderColor="rgba(255,255,255,0.07)"
                justify="space-between"
                flexShrink={0}
              >
                <HStack spacing="7px">
                  <Box w="12px" h="12px" borderRadius="full" bg="#ff5f57" />
                  <Box w="12px" h="12px" borderRadius="full" bg="#febc2e" />
                  <Box w="12px" h="12px" borderRadius="full" bg="#28c840" />
                </HStack>
                <HStack spacing={2}>
                  <Box w="7px" h="7px" borderRadius="full" bg="red.500" />
                  <Text fontSize="xs" color="whiteAlpha.400" fontWeight="600">
                    Mock Interview · Round 1 of 3
                  </Text>
                </HStack>
                <HStack spacing={2}>
                  <Box w="7px" h="7px" borderRadius="full" bg="green.400" />
                  <Text fontSize="xs" color="whiteAlpha.500" fontWeight="700" fontFamily="mono">
                    12:48
                  </Text>
                </HStack>
              </HStack>

              {/* Main content area */}
              <HStack align="stretch" spacing={0} minH={{ base: '460px', md: '560px' }}>

                {/* Video area */}
                <Box flex={1} position="relative" bg="black" overflow="hidden">
                  {/* AI interviewer background */}
                  <Box
                    position="absolute"
                    inset={0}
                    background="linear-gradient(160deg, #0d1117 0%, #13192a 50%, #0c1016 100%)"
                  >
                    {/* Subtle dot grid */}
                    <Box
                      position="absolute"
                      inset={0}
                      opacity={0.035}
                      backgroundImage="radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)"
                      backgroundSize="28px 28px"
                    />

                    {/* Centered avatar + waveform */}
                    <VStack
                      position="absolute"
                      inset={0}
                      justify="center"
                      align="center"
                      spacing={5}
                    >
                      {/* Avatar with speaking ring */}
                      <Box position="relative">
                        {/* Speaking ring */}
                        <Box
                          position="absolute"
                          top="-10px"
                          left="-10px"
                          right="-10px"
                          bottom="-10px"
                          borderRadius="full"
                          border="2px solid"
                          borderColor="primary.400"
                          sx={{ animation: 'speakerPulse 2s ease-in-out infinite' }}
                        />
                        <Box
                          position="absolute"
                          top="-20px"
                          left="-20px"
                          right="-20px"
                          bottom="-20px"
                          borderRadius="full"
                          border="1px solid"
                          borderColor="primary.400"
                          sx={{ animation: 'speakerPulse 2s ease-in-out 0.4s infinite' }}
                        />
                        {/* Avatar circle */}
                        <Box
                          w={{ base: '80px', md: '96px' }}
                          h={{ base: '80px', md: '96px' }}
                          borderRadius="full"
                          background="linear-gradient(135deg, #1c2640 0%, #2a3a60 100%)"
                          border="2px solid"
                          borderColor="rgba(255,255,255,0.12)"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          boxShadow="0 0 40px rgba(254, 204, 4, 0.12)"
                        >
                          <Text
                            fontSize={{ base: '2xl', md: '3xl' }}
                            fontWeight="800"
                            color="rgba(255,255,255,0.9)"
                            letterSpacing="-1px"
                          >
                            SC
                          </Text>
                        </Box>
                      </Box>

                      {/* Speaking waveform */}
                      <HStack spacing="3px" h="20px" align="flex-end">
                        {[0, 0.12, 0.05, 0.18, 0.08, 0.22, 0.03, 0.15, 0.1].map((delay, i) => (
                          <Box
                            key={i}
                            w="3px"
                            borderRadius="full"
                            bg="primary.400"
                            sx={{ animation: `waveBar 0.85s ease-in-out ${delay}s infinite` }}
                            style={{ height: '3px' }}
                          />
                        ))}
                      </HStack>
                    </VStack>

                    {/* Name tag overlay */}
                    <HStack
                      position="absolute"
                      bottom={4}
                      left={4}
                      px={3}
                      py={2}
                      bg="rgba(0,0,0,0.65)"
                      backdropFilter="blur(12px)"
                      borderRadius="10px"
                      border="1px solid"
                      borderColor="rgba(255,255,255,0.1)"
                      spacing={2}
                    >
                      <Box w="7px" h="7px" borderRadius="full" bg="green.400" flexShrink={0} />
                      <Text fontSize="sm" fontWeight="700" color="white">
                        Sarah Chen
                      </Text>
                      <Text fontSize="xs" color="whiteAlpha.500">
                        · AI Interviewer
                      </Text>
                    </HStack>

                    {/* HD badge */}
                    <Box
                      position="absolute"
                      top={4}
                      right={4}
                      px={2}
                      py={1}
                      bg="rgba(0,0,0,0.5)"
                      backdropFilter="blur(8px)"
                      borderRadius="6px"
                      border="1px solid"
                      borderColor="rgba(255,255,255,0.08)"
                    >
                      <Text fontSize="10px" fontWeight="800" color="whiteAlpha.500" letterSpacing="0.05em">
                        HD
                      </Text>
                    </Box>
                  </Box>

                  {/* User self-view PiP */}
                  <Box
                    position="absolute"
                    bottom={4}
                    right={4}
                    w={{ base: '100px', md: '136px' }}
                    h={{ base: '72px', md: '96px' }}
                    borderRadius="12px"
                    overflow="hidden"
                    border="1.5px solid"
                    borderColor="rgba(255,255,255,0.2)"
                    boxShadow="0 8px 32px rgba(0,0,0,0.6)"
                    bg="#111111"
                  >
                    <VStack h="full" justify="center" align="center" spacing={1}>
                      <Box
                        w="30px"
                        h="30px"
                        borderRadius="full"
                        bg="rgba(255,255,255,0.1)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon as={FiUser} color="whiteAlpha.500" boxSize="14px" />
                      </Box>
                      <Text fontSize="9px" color="whiteAlpha.400" fontWeight="600">
                        Camera Off
                      </Text>
                    </VStack>
                    <HStack
                      position="absolute"
                      bottom="6px"
                      left="6px"
                      px={1.5}
                      py="3px"
                      bg="rgba(0,0,0,0.7)"
                      borderRadius="6px"
                      spacing={1}
                    >
                      <Icon as={FiMicOff} color="red.400" boxSize="9px" />
                      <Text fontSize="9px" fontWeight="700" color="white">
                        You
                      </Text>
                    </HStack>
                  </Box>
                </Box>

                {/* Right sidebar — transcript + feedback */}
                <Box
                  w="300px"
                  display={{ base: 'none', lg: 'flex' }}
                  flexDir="column"
                  bg="#0d0d0d"
                  borderLeft="1px solid"
                  borderColor="rgba(255,255,255,0.07)"
                  overflow="hidden"
                >
                  {/* Sidebar header */}
                  <HStack
                    px={4}
                    h="44px"
                    borderBottom="1px solid"
                    borderColor="rgba(255,255,255,0.07)"
                    justify="space-between"
                    flexShrink={0}
                  >
                    <Text fontSize="xs" fontWeight="700" color="white" letterSpacing="0.04em">
                      LIVE TRANSCRIPT
                    </Text>
                    <Box
                      px={2}
                      py="3px"
                      borderRadius="full"
                      bg="rgba(255,255,255,0.07)"
                      border="1px solid"
                      borderColor="rgba(255,255,255,0.08)"
                    >
                      <Text fontSize="10px" color="whiteAlpha.500" fontWeight="700">
                        Q 2 / 6
                      </Text>
                    </Box>
                  </HStack>

                  {/* Transcript messages */}
                  <VStack flex={1} align="stretch" spacing={4} p={4} overflowY="auto">
                    {transcript.map((item, i) => (
                      <Box key={i}>
                        <Text
                          fontSize="10px"
                          fontWeight="700"
                          color={item.isAI ? 'primary.400' : 'whiteAlpha.400'}
                          textTransform="uppercase"
                          letterSpacing="0.07em"
                          mb={1.5}
                        >
                          {item.speaker}
                        </Text>
                        <Box
                          p={3}
                          borderRadius="10px"
                          bg={item.isActive ? 'rgba(255,229,0,0.07)' : 'rgba(255,255,255,0.04)'}
                          border="1px solid"
                          borderColor={item.isActive ? 'rgba(255,229,0,0.3)' : 'rgba(255,255,255,0.07)'}
                        >
                          <Text
                            fontSize="sm"
                            color={item.isActive ? 'white' : 'whiteAlpha.600'}
                            lineHeight="1.65"
                          >
                            {item.text}
                          </Text>
                        </Box>
                      </Box>
                    ))}

                    {/* Typing indicator */}
                    <Box>
                      <Text
                        fontSize="10px"
                        fontWeight="700"
                        color="whiteAlpha.400"
                        textTransform="uppercase"
                        letterSpacing="0.07em"
                        mb={1.5}
                      >
                        You
                      </Text>
                      <Box
                        p={3}
                        borderRadius="10px"
                        bg="rgba(255,255,255,0.04)"
                        border="1px solid"
                        borderColor="rgba(255,255,255,0.07)"
                      >
                        <HStack spacing={1}>
                          {[0, 0.2, 0.4].map((delay, i) => (
                            <Box
                              key={i}
                              w="6px"
                              h="6px"
                              borderRadius="full"
                              bg="whiteAlpha.300"
                              sx={{
                                animation: `typingDot 1.2s ease-in-out ${delay}s infinite`,
                              }}
                            />
                          ))}
                        </HStack>
                      </Box>
                    </Box>
                  </VStack>

                  {/* Live score section */}
                  <Box
                    px={4}
                    py={4}
                    borderTop="1px solid"
                    borderColor="rgba(255,255,255,0.07)"
                    bg="#0a0a0a"
                    flexShrink={0}
                  >
                    <HStack justify="space-between" mb={3}>
                      <Text fontSize="xs" fontWeight="700" color="whiteAlpha.500" textTransform="uppercase" letterSpacing="0.07em">
                        Live Score
                      </Text>
                      <Text fontSize="xl" fontWeight="900" color="primary.400">
                        86%
                      </Text>
                    </HStack>
                    <VStack align="stretch" spacing={2.5}>
                      {scoreMetrics.map((metric) => (
                        <Box key={metric.label}>
                          <HStack justify="space-between" mb={1}>
                            <Text fontSize="11px" color="whiteAlpha.500" fontWeight="600">
                              {metric.label}
                            </Text>
                            <Text fontSize="11px" color="whiteAlpha.500" fontWeight="600">
                              {metric.score}%
                            </Text>
                          </HStack>
                          <Box h="3px" bg="rgba(255,255,255,0.07)" borderRadius="full">
                            <Box
                              h="full"
                              w={`${metric.score}%`}
                              borderRadius="full"
                              bg={metric.color}
                              transition="width 0.6s ease"
                            />
                          </Box>
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                </Box>
              </HStack>

              {/* Bottom control bar */}
              <HStack
                px={{ base: 4, md: 6 }}
                h={{ base: '64px', md: '72px' }}
                bg="#111111"
                borderTop="1px solid"
                borderColor="rgba(255,255,255,0.07)"
                justify="space-between"
                flexShrink={0}
              >
                {/* Session info */}
                <HStack spacing={2} display={{ base: 'none', md: 'flex' }}>
                  <Box
                    px={3}
                    py={1.5}
                    borderRadius="8px"
                    bg="rgba(255,255,255,0.06)"
                    border="1px solid"
                    borderColor="rgba(255,255,255,0.08)"
                  >
                    <Text fontSize="xs" color="whiteAlpha.500" fontWeight="700">
                      IB Analyst · Behavioral
                    </Text>
                  </Box>
                </HStack>

                {/* Center controls */}
                <HStack spacing={{ base: 2, md: 3 }} justify="center">
                  {/* Mic off */}
                  <Box
                    as="button"
                    w={{ base: '40px', md: '44px' }}
                    h={{ base: '40px', md: '44px' }}
                    borderRadius="full"
                    bg="red.600"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    transition="all 0.15s"
                    _hover={{ bg: 'red.500' }}
                    title="Unmute"
                  >
                    <Icon as={FiMicOff} color="white" boxSize={{ base: '16px', md: '18px' }} />
                  </Box>

                  {/* Camera */}
                  <Box
                    as="button"
                    w={{ base: '40px', md: '44px' }}
                    h={{ base: '40px', md: '44px' }}
                    borderRadius="full"
                    bg="rgba(255,255,255,0.1)"
                    border="1px solid"
                    borderColor="rgba(255,255,255,0.12)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    transition="all 0.15s"
                    _hover={{ bg: 'rgba(255,255,255,0.15)' }}
                    title="Turn on camera"
                  >
                    <Icon as={FiVideo} color="white" boxSize={{ base: '16px', md: '18px' }} />
                  </Box>

                  {/* Share screen */}
                  <Box
                    as="button"
                    w={{ base: '40px', md: '44px' }}
                    h={{ base: '40px', md: '44px' }}
                    borderRadius="full"
                    bg="rgba(255,255,255,0.1)"
                    border="1px solid"
                    borderColor="rgba(255,255,255,0.12)"
                    display={{ base: 'none', sm: 'flex' }}
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    transition="all 0.15s"
                    _hover={{ bg: 'rgba(255,255,255,0.15)' }}
                    title="Share screen"
                  >
                    <Icon as={FiMonitor} color="white" boxSize="18px" />
                  </Box>

                  {/* More */}
                  <Box
                    as="button"
                    w={{ base: '40px', md: '44px' }}
                    h={{ base: '40px', md: '44px' }}
                    borderRadius="full"
                    bg="rgba(255,255,255,0.1)"
                    border="1px solid"
                    borderColor="rgba(255,255,255,0.12)"
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    transition="all 0.15s"
                    _hover={{ bg: 'rgba(255,255,255,0.15)' }}
                    title="More options"
                  >
                    <Icon as={FiMoreHorizontal} color="white" boxSize="18px" />
                  </Box>

                  {/* End session */}
                  <HStack
                    as="button"
                    h={{ base: '40px', md: '44px' }}
                    px={{ base: 4, md: 5 }}
                    borderRadius="full"
                    bg="#c0392b"
                    spacing={2}
                    cursor="pointer"
                    transition="all 0.15s"
                    _hover={{ bg: '#e74c3c' }}
                    title="End session"
                  >
                    <Icon
                      as={FiPhone}
                      color="white"
                      boxSize={{ base: '15px', md: '16px' }}
                      transform="rotate(135deg)"
                    />
                    <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="700" color="white">
                      End
                    </Text>
                  </HStack>
                </HStack>

                {/* Right controls */}
                <HStack spacing={2} display={{ base: 'none', md: 'flex' }}>
                  <Box
                    as="button"
                    w="36px"
                    h="36px"
                    borderRadius="9px"
                    bg="rgba(255,255,255,0.06)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    _hover={{ bg: 'rgba(255,255,255,0.1)' }}
                  >
                    <Icon as={FiMessageSquare} color="whiteAlpha.500" boxSize="15px" />
                  </Box>
                  <Box
                    as="button"
                    w="36px"
                    h="36px"
                    borderRadius="9px"
                    bg="rgba(255,255,255,0.06)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    _hover={{ bg: 'rgba(255,255,255,0.1)' }}
                  >
                    <Icon as={FiSettings} color="whiteAlpha.500" boxSize="15px" />
                  </Box>
                </HStack>
              </HStack>
            </Box>

            {/* Feature cards */}
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>

              {/* Card 1 — Answer scoring */}
              <Box
                borderRadius="2xl"
                border="1px solid"
                borderColor="rgba(255,255,255,0.08)"
                bg="rgba(255,255,255,0.02)"
                overflow="hidden"
              >
                {/* Mini UI preview */}
                <Box
                  p={5}
                  bg="#0d0d0d"
                  borderBottom="1px solid"
                  borderColor="rgba(255,255,255,0.07)"
                >
                  <HStack justify="space-between" align="flex-start" mb={4}>
                    <Box>
                      <Text fontSize="10px" fontWeight="700" color="whiteAlpha.400" textTransform="uppercase" letterSpacing="0.08em" mb={1}>
                        Answer Score
                      </Text>
                      <HStack align="baseline" spacing={1}>
                        <Text fontSize="4xl" fontWeight="900" color="primary.400" lineHeight="1">
                          86
                        </Text>
                        <Text fontSize="lg" fontWeight="700" color="whiteAlpha.400">/100</Text>
                      </HStack>
                    </Box>
                    <Box
                      px={2}
                      py={1}
                      borderRadius="6px"
                      bg="rgba(74,222,128,0.1)"
                      border="1px solid"
                      borderColor="rgba(74,222,128,0.2)"
                    >
                      <Text fontSize="11px" fontWeight="700" color="green.400">Strong</Text>
                    </Box>
                  </HStack>
                  <VStack align="stretch" spacing={2.5}>
                    {[
                      { label: 'Structure', score: 90, color: '#4ade80' },
                      { label: 'Specificity', score: 61, color: '#FFE500' },
                      { label: 'Confidence', score: 82, color: '#4ade80' },
                    ].map((m) => (
                      <Box key={m.label}>
                        <HStack justify="space-between" mb={1}>
                          <Text fontSize="11px" color="whiteAlpha.500" fontWeight="600">{m.label}</Text>
                          <Text fontSize="11px" color="whiteAlpha.500" fontWeight="600">{m.score}%</Text>
                        </HStack>
                        <Box h="3px" bg="rgba(255,255,255,0.07)" borderRadius="full">
                          <Box h="full" w={`${m.score}%`} bg={m.color} borderRadius="full" />
                        </Box>
                      </Box>
                    ))}
                  </VStack>
                  <Box
                    mt={4}
                    p={3}
                    borderRadius="9px"
                    bg="rgba(255,229,0,0.06)"
                    border="1px solid"
                    borderColor="rgba(255,229,0,0.15)"
                  >
                    <Text fontSize="xs" color="whiteAlpha.600" lineHeight="1.6">
                      <Box as="span" color="primary.400" fontWeight="700">Tip: </Box>
                      Add a specific deal or project example to improve your specificity score.
                    </Text>
                  </Box>
                </Box>
                {/* Card footer */}
                <Box p={5}>
                  <Text fontSize="md" fontWeight="800" color="white" mb={1.5}>
                    Instant Answer Scoring
                  </Text>
                  <Text fontSize="sm" color="whiteAlpha.500" lineHeight="1.7">
                    Every response is evaluated across 6 dimensions — structure, clarity, specificity, confidence, relevance, and conciseness.
                  </Text>
                </Box>
              </Box>

              {/* Card 2 — Progress tracking */}
              <Box
                borderRadius="2xl"
                border="1px solid"
                borderColor="rgba(255,255,255,0.08)"
                bg="rgba(255,255,255,0.02)"
                overflow="hidden"
              >
                <Box
                  p={5}
                  bg="#0d0d0d"
                  borderBottom="1px solid"
                  borderColor="rgba(255,255,255,0.07)"
                >
                  <HStack justify="space-between" align="center" mb={5}>
                    <Text fontSize="10px" fontWeight="700" color="whiteAlpha.400" textTransform="uppercase" letterSpacing="0.08em">
                      Score over sessions
                    </Text>
                    <HStack spacing={1}>
                      <Box w="6px" h="6px" borderRadius="full" bg="green.400" />
                      <Text fontSize="11px" fontWeight="700" color="green.400">↑ avg +18 pts</Text>
                    </HStack>
                  </HStack>
                  {/* Bar chart */}
                  <HStack align="flex-end" spacing={2} h="72px">
                    {[
                      { h: '30%', score: 54 },
                      { h: '42%', score: 61 },
                      { h: '50%', score: 67 },
                      { h: '62%', score: 72 },
                      { h: '78%', score: 79 },
                      { h: '96%', score: 86 },
                    ].map((bar, i) => (
                      <Box key={i} flex={1} display="flex" flexDirection="column" alignItems="center">
                        <Box
                          w="full"
                          h={bar.h}
                          borderRadius="5px 5px 3px 3px"
                          bg={i === 5 ? 'primary.400' : 'rgba(255,255,255,0.12)'}
                          position="relative"
                        >
                          {i === 5 && (
                            <Box
                              position="absolute"
                              top="-22px"
                              left="50%"
                              transform="translateX(-50%)"
                              px={1.5}
                              py="2px"
                              borderRadius="5px"
                              bg="primary.400"
                              whiteSpace="nowrap"
                            >
                              <Text fontSize="9px" fontWeight="800" color="black">{bar.score}</Text>
                            </Box>
                          )}
                        </Box>
                      </Box>
                    ))}
                  </HStack>
                  <HStack spacing={2} mt={2}>
                    {['S1', 'S2', 'S3', 'S4', 'S5', 'S6'].map((label, i) => (
                      <Box key={label} flex={1} textAlign="center">
                        <Text fontSize="10px" color={i === 5 ? 'primary.400' : 'whiteAlpha.300'} fontWeight="700">
                          {label}
                        </Text>
                      </Box>
                    ))}
                  </HStack>
                  <HStack
                    mt={4}
                    p={3}
                    borderRadius="9px"
                    bg="rgba(255,255,255,0.04)"
                    border="1px solid"
                    borderColor="rgba(255,255,255,0.07)"
                    justify="space-around"
                  >
                    {[
                      { label: 'Sessions', value: '6' },
                      { label: 'Best Score', value: '86' },
                      { label: 'Improvement', value: '+32pts' },
                    ].map((stat) => (
                      <Box key={stat.label} textAlign="center">
                        <Text fontSize="md" fontWeight="900" color="white">{stat.value}</Text>
                        <Text fontSize="10px" color="whiteAlpha.400" fontWeight="600">{stat.label}</Text>
                      </Box>
                    ))}
                  </HStack>
                </Box>
                <Box p={5}>
                  <Text fontSize="md" fontWeight="800" color="white" mb={1.5}>
                    Track Your Growth
                  </Text>
                  <Text fontSize="sm" color="whiteAlpha.500" lineHeight="1.7">
                    See how your performance trends across sessions. Identify weak spots and measure real improvement over time.
                  </Text>
                </Box>
              </Box>

              {/* Card 3 — Role templates */}
              <Box
                borderRadius="2xl"
                border="1px solid"
                borderColor="rgba(255,255,255,0.08)"
                bg="rgba(255,255,255,0.02)"
                overflow="hidden"
              >
                <Box
                  p={5}
                  bg="#0d0d0d"
                  borderBottom="1px solid"
                  borderColor="rgba(255,255,255,0.07)"
                >
                  <Text fontSize="10px" fontWeight="700" color="whiteAlpha.400" textTransform="uppercase" letterSpacing="0.08em" mb={4}>
                    Select your role
                  </Text>
                  <VStack align="stretch" spacing={2}>
                    {[
                      { label: 'Investment Banking', q: '48 questions', active: true },
                      { label: 'Management Consulting', q: '40 questions', active: false },
                      { label: 'Software Engineering', q: '52 questions', active: false },
                      { label: 'Product Management', q: '36 questions', active: false },
                      { label: 'Private Equity', q: '30 questions', active: false },
                    ].map((role) => (
                      <HStack
                        key={role.label}
                        px={3}
                        py={2.5}
                        borderRadius="9px"
                        bg={role.active ? 'rgba(255,229,0,0.1)' : 'rgba(255,255,255,0.04)'}
                        border="1px solid"
                        borderColor={role.active ? 'rgba(255,229,0,0.35)' : 'rgba(255,255,255,0.07)'}
                        justify="space-between"
                        cursor="pointer"
                      >
                        <Text fontSize="xs" fontWeight="700" color={role.active ? 'primary.400' : 'whiteAlpha.600'}>
                          {role.label}
                        </Text>
                        <Text fontSize="10px" fontWeight="600" color={role.active ? 'primary.400' : 'whiteAlpha.300'}>
                          {role.q}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                  <HStack mt={3} spacing={1.5}>
                    <Box flex={1} h="2px" borderRadius="full" bg="primary.400" />
                    <Box flex={1} h="2px" borderRadius="full" bg="rgba(255,255,255,0.1)" />
                    <Box flex={1} h="2px" borderRadius="full" bg="rgba(255,255,255,0.1)" />
                  </HStack>
                  <Text fontSize="10px" color="whiteAlpha.300" fontWeight="600" mt={2}>
                    Step 1 of 3 — Choose your role
                  </Text>
                </Box>
                <Box p={5}>
                  <Text fontSize="md" fontWeight="800" color="white" mb={1.5}>
                    Built for Your Role
                  </Text>
                  <Text fontSize="sm" color="whiteAlpha.500" lineHeight="1.7">
                    Start from a structured question set tuned to your target industry — behavioral, technical, and case formats included.
                  </Text>
                </Box>
              </Box>

            </SimpleGrid>

          </VStack>
        </Container>
      </Box>
    </Box>
  )
}
