export type BrandingLogoStyle = 'default' | 'monochromeWhite'

export const branding = {
  brandId: 'client-ready',
  applicationTitle: 'Dify Studio',
  themeColor: '#0f766e',
  manifestPath: '/manifest.json',
  browserConfigPath: '/browserconfig.xml',
  appleTouchIconPath: '/apple-touch-icon.png',
  icon192Path: '/icon-192x192.png',
  logoPathMap: {
    default: '/logo/logo.svg',
    monochromeWhite: '/logo/logo-monochrome-white.svg',
  } satisfies Record<BrandingLogoStyle, string>,
  siteMarkPath: '/logo/logo-site.png',
  siteMarkDarkPath: '/logo/logo-site-dark.png',
} as const

export const getBrandingTitle = (runtimeTitle?: string | null) => runtimeTitle || branding.applicationTitle
