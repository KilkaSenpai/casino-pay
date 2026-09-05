'use client'

import { CMSLink } from '@/components/CMSLink'
import { Container } from '@/components/Container'
import { ChevronDownIcon, CloseIcon } from '@/components/icons'
import { useHorizontalOverflow } from '@/hooks/useHorizontalOverflow'

import { getNavKey, type NavItem } from './nav'

type DesktopNavProps = {
  navItems: NavItem[]
  openDropdownId: string | null
  dropdownOpen: boolean
  dropdownItem: NavItem | null
  onOpenItem: (item: NavItem) => void
  onCloseDropdown: () => void
}

export function DesktopNav({
  navItems,
  openDropdownId,
  dropdownOpen,
  dropdownItem,
  onOpenItem,
  onCloseDropdown,
}: DesktopNavProps) {
  const { scrollerRef, canScrollLeft, canScrollRight, overflowing } = useHorizontalOverflow(
    navItems.map((item) => getNavKey(item)).join(':'),
  )

  return (
    <>
      <nav className="header__desktop-nav relative hidden min-w-0 flex-1 lg:block">
        <div
          ref={scrollerRef}
          className={`header__desktop-nav-scroll flex items-center gap-10 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            overflowing ? 'justify-start' : 'justify-center'
          }`}
        >
          {navItems.map((item) => (
            <DesktopNavItem
              key={getNavKey(item) ?? item.label}
              item={item}
              isOpen={openDropdownId === getNavKey(item)}
              onOpen={() => onOpenItem(item)}
            />
          ))}
        </div>
        {canScrollLeft ? (
          <div
            className="header__desktop-nav-fade pointer-events-none absolute inset-y-0 left-0 w-12 bg-linear-to-r from-[#011c38] to-transparent"
            aria-hidden="true"
          />
        ) : null}
        {canScrollRight ? (
          <div
            className="header__desktop-nav-fade pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-[#011c38] to-transparent"
            aria-hidden="true"
          />
        ) : null}
      </nav>

      {dropdownItem?.hasDropdown && (dropdownItem.dropdownItems?.length ?? 0) > 0 ? (
        <div
          className={`absolute inset-x-0 top-full hidden border-t border-[#ffffff1a] bg-[#011c38] transition-opacity duration-300 ease-out lg:block ${
            dropdownOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <Container>
            <div className="header__dropdown-inner mx-auto w-full max-w-[848px] pt-4 pb-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-bold text-[#8B97AD]">{dropdownItem.label}</p>
                <button
                  type="button"
                  className="flex cursor-pointer items-center gap-2 text-xs leading-none text-white transition-colors duration-200 hover:text-[#f55561]"
                  onClick={onCloseDropdown}
                >
                  Sluiten
                  <CloseIcon className="h-3 w-3 text-[#f55561]" />
                </button>
              </div>
              <ul className="grid grid-cols-2 gap-x-12 gap-y-1">
                {dropdownItem.dropdownItems?.map((item) => (
                  <li key={item.id ?? item.label}>
                    <CMSLink
                      link={item}
                      className="text-[15px] font-semibold text-white no-underline transition-opacity duration-200 hover:opacity-80"
                      onClick={onCloseDropdown}
                    >
                      {item.label}
                    </CMSLink>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </div>
      ) : null}
    </>
  )
}

function DesktopNavItem({
  item,
  isOpen,
  onOpen,
}: {
  item: NavItem
  isOpen: boolean
  onOpen: () => void
}) {
  const labelClass = `header__nav-link shrink-0 whitespace-nowrap pb-1 text-[15px] font-semibold no-underline transition-colors duration-200 ${
    isOpen ? 'is-open text-[#f55561]' : 'text-white hover:text-[#f55561]'
  }`

  if (!item.hasDropdown) {
    return (
      <CMSLink link={item} className={labelClass} onMouseEnter={onOpen}>
        {item.label}
      </CMSLink>
    )
  }

  return (
    <div className="relative inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap" onMouseEnter={onOpen}>
      <CMSLink link={item} className={labelClass}>
        {item.label}
      </CMSLink>
      <ChevronDownIcon
        className={`h-1.5 w-2 origin-center transition-transform duration-300 ease-out ${
          isOpen ? 'rotate-180 text-[#f55561]' : 'rotate-0 text-[#f55561]'
        }`}
      />
    </div>
  )
}
