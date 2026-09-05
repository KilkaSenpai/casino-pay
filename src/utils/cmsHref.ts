import type { Page } from '@/payload-types'

export type CMSLinkData = {
  linkType?: 'reference' | 'custom' | null
  page?: (number | null) | Page
  url?: string | null
}

export function resolveCMSHref(link: CMSLinkData | null | undefined): string {
  if (!link) {
    return '#'
  }

  if (link.linkType === 'custom') {
    const url = link.url?.trim()
    return url && url.length > 0 ? url : '#'
  }

  if (link.linkType === 'reference') {
    const page = link.page
    if (page && typeof page === 'object' && typeof page.slug === 'string' && page.slug.length > 0) {
      const slug = page.slug.replace(/^\/+/, '')
      return slug === 'home' ? '/' : `/${slug}`
    }
  }

  return '#'
}

export function isExternalHref(href: string): boolean {
  return /^(https?:|mailto:|tel:)/i.test(href)
}
