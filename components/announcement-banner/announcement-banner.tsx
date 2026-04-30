import NextLink from "next/link";
import {
  Flex,
  HStack,
  Icon,
  Button,
  IconButton,
} from "@chakra-ui/react";
import {
  Banner,
  BannerActions,
  BannerDescription,
  BannerTitle,
} from "@saas-ui/react";
import { FiArrowRight, FiX } from "react-icons/fi";

export interface AnnouncementBannerProps {
  title: string;
  description: string;
  href: string;
  action?: string;
  onDismiss?: () => void;
}

export const AnnouncementBanner: React.FC<AnnouncementBannerProps> = (
  props
) => {
  const { title, description, href, action, onDismiss } = props;
  if (!title) {
    return null;
  }

  const handleDismiss = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onDismiss?.();
  };

  return (
    <Flex position="fixed" top="0" left="0" zIndex="20" width="100%">
      <Banner
        display="flex"
        width="100vw"
        justifyContent="center"
        alignItems="center"
        bg="primary.400"
        color="black"
        borderRadius="0"
        borderBottom="1px solid"
        borderColor="blackAlpha.200"
        position="relative"
        h="42px"
        minH="42px"
        py="0"
        px="4"
        overflow="hidden"
        transition="all .2s ease-out"
        _dark={{ bg: "primary.400", color: "black" }}
      >
        <NextLink href={href} legacyBehavior>
          <Flex
            as="a"
            flex="1"
            minW="0"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
            _hover={{
              filter: "brightness(1.03)",
            }}
          >
            <HStack zIndex="2" spacing="2" justify="center" width="100%" pr="10">
              <BannerTitle fontWeight="bold" noOfLines={1}>
                {title}
              </BannerTitle>
              <BannerDescription
                display={{ base: "none", md: "block" }}
                fontWeight="medium"
                dangerouslySetInnerHTML={{ __html: description }}
              />

              {action && (
                <BannerActions>
                  <Button
                    size="xs"
                    variant="link"
                    color="black"
                    _hover={{
                      textDecoration: "none",
                    }}
                    rightIcon={
                      <Icon
                        as={FiArrowRight}
                        transform="translate(-5px)"
                        transitionProperty="common"
                        transitionDuration="normal"
                      />
                    }
                  >
                    Read more
                  </Button>
                </BannerActions>
              )}
            </HStack>
          </Flex>
        </NextLink>
        {onDismiss ? (
          <IconButton
            aria-label="Dismiss announcement banner"
            icon={<FiX color="black" />}
            onClick={handleDismiss}
            type="button"
            position="absolute"
            right="2"
            top="50%"
            transform="translateY(-50%)"
            zIndex="3"
            pointerEvents="auto"
            size="sm"
            minW="32px"
            h="32px"
            variant="ghost"
            color="black"
            borderRadius="full"
            _hover={{ bg: "blackAlpha.100", color: "black" }}
            _active={{ bg: "blackAlpha.200", color: "black" }}
          />
        ) : null}
      </Banner>
    </Flex>
  );
};
