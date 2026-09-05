import { isExternalHref, resolveCMSHref, type CMSLinkData } from '@/utils/cmsHref'
import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

export type { CMSLinkData }

type CMSLinkProps = {
  link: CMSLinkData | null | undefined
  children: ReactNode
  className?: string
} & Omit<ComponentProps<typeof Link>, 'href'>

export function CMSLink({ link, children, className, ...rest }: CMSLinkProps) {
  const href = resolveCMSHref(link)

  if (isExternalHref(href)) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  )
}
