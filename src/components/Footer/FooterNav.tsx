import { CMSLink } from '@/components/CMSLink'
import { ChevronDownIcon } from '@/components/icons'
import type { Footer as FooterData } from '@/payload-types'

type FooterNavLink = NonNullable<NonNullable<FooterData['navigationColumn']>['links']>[number]

function FooterNavLinks({ links }: { links: FooterNavLink[] }) {
  if (links.length === 0) {
    return null
  }

  return (
    <ul className="mt-4 flex flex-col gap-0.5">
      {links.map((item) => (
        <li key={item.id ?? item.label}>
          <CMSLink
            link={item}
            className="text-[16px] font-semibold leading-8 text-white no-underline transition-opacity duration-200 hover:opacity-80"
          >
            {item.label}
          </CMSLink>
        </li>
      ))}
    </ul>
  )
}

export function FooterNav({
  title,
  links,
}: {
  title?: string | null
  links: FooterNavLink[]
}) {
  const visibleLinks = links.filter((item) => Boolean(item.label?.trim()))

  if (visibleLinks.length === 0) {
    return null
  }

  return (
    <nav>
      <div className="hidden lg:block">
        {title?.trim() ? <h2 className="text-[18px] font-bold text-white">{title}</h2> : null}
        <FooterNavLinks links={visibleLinks} />
      </div>

      <details className="footer-nav-mobile group lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between py-1 [&::-webkit-details-marker]:hidden">
          {title?.trim() ? <h2 className="text-[18px] font-bold text-white">{title}</h2> : <span />}
          <ChevronDownIcon className="h-3 w-3 text-[#f55561] transition-transform duration-300 ease-out group-open:rotate-180" />
        </summary>
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-open:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <FooterNavLinks links={visibleLinks} />
          </div>
        </div>
      </details>
    </nav>
  )
}
