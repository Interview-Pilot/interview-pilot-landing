import {
  Box,
  BoxProps,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

export interface TestimonialProps extends BoxProps {
  name: string;
  description: React.ReactNode;
  compact?: boolean;
  source?: 'app-store' | 'play-store';
  rating?: number;
  children?: React.ReactNode;
}

export const Testimonial = ({
  name,
  description,
  compact = false,
  source,
  rating = 5,
  children,
  ...rest
}: TestimonialProps) => {
  const sourceIcon =
    source === 'app-store'
      ? '/static/icons/platforms/app-store.svg'
      : source === 'play-store'
        ? '/static/icons/platforms/google-play.svg'
        : null;

  return (
    <Box position="relative" {...rest}>
      <Box pb={compact ? 1.5 : undefined} px={compact ? 4 : undefined} pt={compact ? 4 : undefined}>
        <Stack spacing={compact ? 1 : 1}>
          <Heading size="sm" noOfLines={1}>{name}</Heading>
          <HStack spacing="2">
            {sourceIcon ? (
              <Image
                src={sourceIcon}
                alt=""
                boxSize="13px"
                objectFit="contain"
              />
            ) : null}
            <Text color="muted" size="xs" noOfLines={1}>
              {description}
            </Text>
          </HStack>
          <HStack spacing="0.5" color="yellow.400" fontSize={compact ? '12px' : undefined}>
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar key={index} opacity={index < rating ? 1 : 0.28} />
            ))}
          </HStack>
        </Stack>
      </Box>
      <Box px={compact ? 4 : undefined} pt={compact ? 0 : undefined} pb={compact ? 4 : undefined}>
        <Text
          color="whiteAlpha.850"
          fontSize={compact ? 'sm' : undefined}
          lineHeight={compact ? '1.5' : undefined}
          noOfLines={compact ? 4 : undefined}
        >
          {children}
        </Text>
      </Box>
    </Box>
  );
};
