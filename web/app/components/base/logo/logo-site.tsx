'use client'
import type { FC } from 'react'
import { branding } from '@/app/branding'
import useTheme from '@/hooks/use-theme'
import { cn } from '@/utils/classnames'
import { basePath } from '@/utils/var'

type LogoSiteProps = {
  className?: string
}

const LogoSite: FC<LogoSiteProps> = ({
  className,
}) => {
  const { theme } = useTheme()
  const siteMarkPath = theme === 'dark' ? branding.siteMarkDarkPath : branding.siteMarkPath

  return (
    <img
      src={`${basePath}${siteMarkPath}`}
      className={cn('block h-[24.5px] w-[22.651px]', className)}
      alt="logo"
    />
  )
}

export default LogoSite
