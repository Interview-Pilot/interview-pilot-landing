'use client'

import { Box, SkipNavContent, SkipNavLink } from '@chakra-ui/react'

import { CSSProperties, ReactNode, useState } from 'react'

import {
  AnnouncementBanner,
  AnnouncementBannerProps,
} from '../announcement-banner'
import { Footer, FooterProps } from './footer'
import { Header, HeaderProps } from './header'

interface LayoutProps {
  children: ReactNode
  announcementProps?: AnnouncementBannerProps
  headerProps?: HeaderProps
  footerProps?: FooterProps
}

export const MarketingLayout: React.FC<LayoutProps> = (props) => {
  const { children, announcementProps, headerProps, footerProps } = props
  const [bannerDismissed, setBannerDismissed] = useState(false)

  const visibleAnnouncementProps =
    announcementProps && !bannerDismissed ? announcementProps : null
  const announcementOffset = visibleAnnouncementProps ? '42px' : '0px'

  const handleDismissAnnouncement = () => {
    setBannerDismissed(true)
  }

  return (
    <Box
      style={
        {
          '--announcement-offset': announcementOffset,
        } as CSSProperties
      }
    >
      <SkipNavLink>Skip to content</SkipNavLink>
      {visibleAnnouncementProps ? (
        <AnnouncementBanner
          {...visibleAnnouncementProps}
          onDismiss={handleDismissAnnouncement}
        />
      ) : null}
      <Header top={visibleAnnouncementProps ? '42px' : undefined} {...headerProps} />
      <Box as="main">
        <SkipNavContent />
        {children}
      </Box>
      <Footer {...footerProps} />
    </Box>
  )
}
