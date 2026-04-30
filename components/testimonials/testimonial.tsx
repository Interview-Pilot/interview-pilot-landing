import {
  Card,
  CardBody,
  CardHeader,
  CardProps,
  HStack,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "@saas-ui/react";
import { FaStar, FaTwitter } from "react-icons/fa";

export interface TestimonialProps extends CardProps {
  name: string;
  description: React.ReactNode;
  avatar?: string; // Made optional
  href?: string;
  children?: React.ReactNode;
}

export const Testimonial = ({
  name,
  description,
  href,
  children,
  ...rest
}: TestimonialProps) => {
  return (
    <Card position="relative" {...rest}>
      <CardHeader>
        <Stack spacing="1">
          <Heading size="sm">{name}</Heading>
          <Text color="muted" size="xs">
            {description}
          </Text>
          <HStack spacing="1" color="yellow.400">
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar key={index} />
            ))}
          </HStack>
        </Stack>
      </CardHeader>
      <CardBody>
        {children}
        {href && (
          <Link href={href} position="absolute" top="4" right="4">
            <FaTwitter />
          </Link>
        )}
      </CardBody>
    </Card>
  );
};
