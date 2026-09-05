'use client'

import { CMSLink } from '@/components/CMSLink'
import { Container } from '@/components/Container'
import { MenuIcon } from '@/components/icons'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import type { Header as HeaderData, Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { DesktopNav } from './DesktopNav'
import { MobileMenu } from './MobileMenu'
import { getNavKey, type NavItem } from './nav'

function useDesktopDropdown(navItems: NavItem[]) {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
  const [panelItem, setPanelItem] = useState<NavItem | null>(
    () =>
      navItems.find((item) => item.hasDropdown && (item.dropdownItems?.length ?? 0) > 0) ?? null,
  )

  const activeDesktopItem = navItems.find((item) => getNavKey(item) === openDropdownId)
  const dropdownOpen = Boolean(
    activeDesktopItem?.hasDropdown && (activeDesktopItem.dropdownItems?.length ?? 0) > 0,
  )

  useEffect(() => {
    if (dropdownOpen && activeDesktopItem) {
      setPanelItem(activeDesktopItem)
    }
  }, [activeDesktopItem, dropdownOpen])

  return {
    openDropdownId,
    dropdownOpen,
    dropdownItem: (dropdownOpen ? activeDesktopItem : panelItem) ?? null,
    openDesktopItem: (item: NavItem) => {
      setOpenDropdownId(item.hasDropdown ? getNavKey(item) : null)
    },
    closeDesktopDropdown: () => setOpenDropdownId(null),
  }
}

export function Header({ data }: { data: HeaderData }) {
  const navItems = data.navItems ?? []
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileTabId, setMobileTabId] = useState<string | null>(getNavKey(navItems[0]))
  const dropdown = useDesktopDropdown(navItems)

  useBodyScrollLock(mobileOpen)

  const activeMobileItem = navItems.find((item) => getNavKey(item) === mobileTabId) ?? navItems[0]

  return (
    <header
      className="header sticky top-0 z-50"
      style={{
        background: 'linear-gradient(180deg,#011c38 0%,#011c38cc 48.8%,#011c3894 68.95%,#011c3800 100%)',
      }}
      onMouseLeave={dropdown.closeDesktopDropdown}
    >
      <Container>
        <div className="header__inner flex min-h-[64px] items-center justify-between gap-4 py-3 max-[575px]:min-h-[52px] max-[575px]:gap-2">
          <div className="flex shrink-0 items-center gap-3 max-[575px]:gap-1.5">
            <button
              type="button"
              className="text-[#FF4B6B] lg:hidden max-[575px]:scale-90"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon className="h-5 w-7" />
            </button>
            <HeaderLogo logo={data.logo} />
          </div>

          <DesktopNav
            navItems={navItems}
            openDropdownId={dropdown.openDropdownId}
            dropdownOpen={dropdown.dropdownOpen}
            dropdownItem={dropdown.dropdownItem}
            onOpenItem={dropdown.openDesktopItem}
            onCloseDropdown={dropdown.closeDesktopDropdown}
          />

          <div className="flex items-center gap-3">
            <div className="lg:hidden">
              <HeaderActions login={data.login} register={data.register} compact />
            </div>
            <div className="hidden lg:block">
              <HeaderActions login={data.login} register={data.register} />
            </div>
          </div>
        </div>
      </Container>

      <MobileMenu
        navItems={navItems}
        mobileOpen={mobileOpen}
        activeMobileItem={activeMobileItem}
        brand={<HeaderLogo logo={data.logo} />}
        actions={<HeaderActions login={data.login} register={data.register} compact />}
        onClose={() => setMobileOpen(false)}
        onTabChange={setMobileTabId}
      />
    </header>
  )
}

function isMedia(logo: HeaderData['logo']): logo is Media {
  return typeof logo === 'object' && logo !== null
}

function HeaderLogo({ logo }: { logo: HeaderData['logo'] }) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  if (!isMedia(logo)) {
    return null
  }

  const src = logo.url || (logo.filename ? `/api/media/file/${logo.filename}` : null)

  if (!src) {
    return null
  }

  const isSvg = src.endsWith('.svg') || logo.mimeType === 'image/svg+xml'

  const image = (
    <Image
      src={src}
      alt={logo.alt}
      width={logo.width ?? 180}
      height={logo.height ?? 48}
      className="h-10 w-auto max-w-none max-[575px]:h-7 md:h-11"
      unoptimized={isSvg}
      priority
    />
  )

  if (isHome) {
    return <span className="header__logo relative z-10 block shrink-0">{image}</span>
  }

  return (
    <Link href="/" className="header__logo relative z-10 block shrink-0">
      {image}
    </Link>
  )
}

function HeaderActions({
  login,
  register,
  compact = false,
}: {
  login: HeaderData['login']
  register: HeaderData['register']
  compact?: boolean
}) {
  const pad = compact
    ? 'px-[15px] py-[5px] text-[13px] min-h-[36px] max-[575px]:px-2 max-[575px]:py-1 max-[575px]:text-[11px]'
    : 'px-[24px] py-[8px] text-[14px] leading-[24px] min-h-[42px]'

  return (
    <div className="header__actions flex items-center gap-4 max-[575px]:gap-1.5">
      {login.loginText ? (
        <CMSLink
          link={{ linkType: 'custom', url: login.loginUrl }}
          className={`${pad} rounded-[3px] border border-white font-bold text-white uppercase no-underline bg-[#ffffff1a]`}
        >
          {login.loginText}
        </CMSLink>
      ) : null}
      {register.registerText ? (
        <CMSLink
          link={{ linkType: 'custom', url: register.registerUrl }}
          className={`${pad} rounded-[3px] bg-linear-to-r from-[#FF2D78] to-[#FF8C52] font-bold text-white uppercase no-underline`}
        >
          {register.registerText}
        </CMSLink>
      ) : null}
    </div>
  )
}
