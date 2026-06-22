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

export type TrackedDownloadPlatform = Exclude<DownloadPlatform, 'unknown'> | 'auto'

const validTrackedPlatforms = new Set<TrackedDownloadPlatform>([
  'auto',
  'ios',
  'android',
  'macos',
  'windows',
])

function encodePathSegment(value: string): string {
  return encodeURIComponent(value.trim().toLowerCase().replace(/\s+/g, '-'))
}

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

export function getTrackedDownloadHref(
  source: string,
  platform: DownloadPlatform | TrackedDownloadPlatform = 'auto',
): string {
  const trackedPlatform =
    platform === 'unknown' || !validTrackedPlatforms.has(platform as TrackedDownloadPlatform)
      ? 'auto'
      : platform

  return `/download/${encodePathSegment(source)}/${trackedPlatform}`
}

export function resolveTrackedDownloadHref(
  platform: string,
  userAgent: string,
): string {
  const trackedPlatform = validTrackedPlatforms.has(platform as TrackedDownloadPlatform)
    ? (platform as TrackedDownloadPlatform)
    : 'auto'

  return getPrimaryDownloadHref(
    trackedPlatform === 'auto'
      ? detectPlatformFromUserAgent(userAgent)
      : trackedPlatform,
  )
}

export function isMobileDownloadPlatform(
  platform: DownloadPlatform,
): boolean {
  return platform === 'ios' || platform === 'android'
}
