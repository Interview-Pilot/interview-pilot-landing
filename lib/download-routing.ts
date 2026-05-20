import {
  APP_STORE_LINKS,
  INTERNAL_ROUTES,
  PLATFORM_LINKS,
} from '#constants'

export type DownloadPlatform =
  | 'ios'
  | 'android'
  | 'macos'
  | 'windows'
  | 'unknown'

export function detectPlatformFromUserAgent(userAgent: string): DownloadPlatform {
  const normalizedUserAgent = userAgent.toLowerCase()

  if (/ipad|iphone|ipod/.test(normalizedUserAgent)) {
    return 'ios'
  }

  if (/android/.test(normalizedUserAgent)) {
    return 'android'
  }

  if (/windows/.test(normalizedUserAgent)) {
    return 'windows'
  }

  if (
    /macintosh|macintel|macppc|mac68k|mac os x/.test(normalizedUserAgent)
  ) {
    return 'macos'
  }

  return 'unknown'
}

export function getPrimaryDownloadHref(platform: DownloadPlatform): string {
  switch (platform) {
    case 'ios':
      return APP_STORE_LINKS.ios
    case 'android':
      return APP_STORE_LINKS.android
    case 'macos':
      return PLATFORM_LINKS.macDesktopDownload
    case 'windows':
      return PLATFORM_LINKS.windowsDesktopDownload
    case 'unknown':
    default:
      return INTERNAL_ROUTES.downloads
  }
}

export function isMobileDownloadPlatform(
  platform: DownloadPlatform,
): boolean {
  return platform === 'ios' || platform === 'android'
}
