'use client'

import { CMSLink } from '@/components/CMSLink'
import { CloseIcon } from '@/components/icons'
import { useEffect, useRef, useState, type ReactNode } from 'react'

import { getNavKey, type NavItem } from './nav'

type MobileMenuProps = {
  navItems: NavItem[]
  mobileOpen: boolean
  activeMobileItem: NavItem | undefined
  brand: ReactNode
  actions: ReactNode
  onClose: () => void
  onTabChange: (id: string | null) => void
}

export function MobileMenu({
  navItems,
  mobileOpen,
  activeMobileItem,
  brand,
  actions,
  onClose,
  onTabChange,
}: MobileMenuProps) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden={!mobileOpen}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-full max-w-full flex-col bg-[#0B1B3A] transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'pointer-events-none -translate-x-full'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="flex h-[72px] items-center justify-between gap-3 px-[15px] max-[575px]:h-[63px]">
          <div className="flex items-center gap-3">
            <button type="button" className="text-[#FF4B6B]" aria-label="Close menu" onClick={onClose}>
              <CloseIcon className="h-5 w-5" />
            </button>
            {brand}
          </div>
          {actions}
        </div>

        {navItems.length > 0 ? (
          <div className="header__tabs relative border-b border-white/10">
            <div className="header__tabs-scroll -mb-px flex overflow-x-auto pr-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {navItems.map((item) => {
                const isActive = getNavKey(item) === getNavKey(activeMobileItem)
                return (
                  <button
                    key={getNavKey(item) ?? item.label}
                    type="button"
                    className={`relative shrink-0 px-4 py-3 text-center text-[13px] leading-tight whitespace-nowrap ${
                      isActive ? 'text-white' : 'text-[#8B97AD]'
                    }`}
                    onClick={() => onTabChange(getNavKey(item))}
                  >
                    <span className="block">{item.label}</span>
                    <span
                      className={`absolute right-4 bottom-0 left-4 z-10 h-0.5 ${
                        isActive ? 'bg-[#FF4B6B]' : 'bg-transparent'
                      }`}
                    />
                  </button>
                )
              })}
            </div>
            <div
              className="header__tabs-fade pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-linear-to-l from-[#011c38] to-transparent"
              aria-hidden="true"
            />
          </div>
        ) : null}

        <nav className="header__pages relative min-h-0 flex-1 overflow-hidden">
          <MobileTabPages
            items={navItems}
            activeKey={getNavKey(activeMobileItem)}
            onLinkClick={onClose}
          />
        </nav>
      </aside>
    </>
  )
}

function useMobileTabs(activeIndex: number) {
  const shownIndexRef = useRef(activeIndex)
  const [shownIndex, setShownIndex] = useState(activeIndex)
  const [outgoingIndex, setOutgoingIndex] = useState<number | null>(null)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    const current = shownIndexRef.current
    if (activeIndex === current) {
      return
    }

    setDirection(activeIndex > current ? 'next' : 'prev')
    setOutgoingIndex(current)
    setShownIndex(activeIndex)
    shownIndexRef.current = activeIndex
    setAnimKey((key) => key + 1)

    const timeout = window.setTimeout(() => {
      setOutgoingIndex(null)
    }, 350)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [activeIndex])

  return { shownIndex, outgoingIndex, direction, animKey }
}

function MobileTabPages({
  items,
  activeKey,
  onLinkClick,
}: {
  items: NavItem[]
  activeKey: string | null
  onLinkClick: () => void
}) {
  const activeIndex = Math.max(
    items.findIndex((item) => getNavKey(item) === activeKey),
    0,
  )
  const { shownIndex, outgoingIndex, direction, animKey } = useMobileTabs(activeIndex)

  return (
    <>
      {outgoingIndex !== null ? (
        <div
          key={`out-${animKey}`}
          className={`header__page header__page--out-${direction} absolute inset-0 overflow-y-auto px-6 py-5`}
        >
          <MobileTabLinks item={items[outgoingIndex]} onLinkClick={onLinkClick} />
        </div>
      ) : null}
      <div
        key={`in-${animKey}`}
        className={`header__page h-full overflow-y-auto px-6 py-5 ${
          outgoingIndex !== null ? `header__page--in-${direction} absolute inset-0` : ''
        }`}
      >
        <MobileTabLinks item={items[shownIndex]} onLinkClick={onLinkClick} />
      </div>
    </>
  )
}

function MobileTabLinks({ item, onLinkClick }: { item: NavItem | undefined; onLinkClick: () => void }) {
  if (item?.hasDropdown && (item.dropdownItems?.length ?? 0) > 0) {
    return (
      <ul className="flex flex-col gap-5">
        {item.dropdownItems?.map((dropdownItem) => (
          <li key={dropdownItem.id ?? dropdownItem.label}>
            <CMSLink
              link={dropdownItem}
              className="text-[17px] font-bold text-white no-underline"
              onClick={onLinkClick}
            >
              {dropdownItem.label}
            </CMSLink>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <CMSLink link={item} className="text-[17px] font-bold text-white no-underline" onClick={onLinkClick}>
      {item?.label}
    </CMSLink>
  )
}
