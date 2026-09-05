import type { Header } from '@/payload-types'

export type NavItem = NonNullable<Header['navItems']>[number]

export function getNavKey(item: Pick<NavItem, 'id' | 'label'> | undefined): string | null {
  if (!item) {
    return null
  }

  return item.id ?? item.label ?? null
}
