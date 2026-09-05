import { CMSLink } from '@/components/CMSLink'
import { ChevronDownIcon } from '@/components/icons'
import type { Footer as FooterData } from '@/payload-types'

type FooterNavLink = NonNullable<NonNullable<FooterData['navigationColumn']>['links']>[number]

function FooterNavLinks({ links }: { links: FooterNavLink[] }) {
  return (
    <ul className="mt-4 flex flex-col gap-0.5">
      {links.map((item) =>
        item.label ? (
          <li key={item.id ?? item.label}>
            <CMSLink
              link={item}
              className="text-[16px] leading-8 text-[#c8d2dc] no-underline hover:text-white"
            >
              {item.label}
            </CMSLink>
          </li>
        ) : null,
      )}
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
  if (!title && links.length === 0) {
    return null
  }

  return (
    <nav>
      <div className="hidden lg:block">
        {title ? <h2 className="text-[18px] font-bold text-white">{title}</h2> : null}
        <FooterNavLinks links={links} />
      </div>

      <details className="group lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between py-1 [&::-webkit-details-marker]:hidden">
          {title ? <h2 className="text-[18px] font-bold text-white">{title}</h2> : <span />}
          <ChevronDownIcon className="h-3 w-3 text-[#f55561] transition-transform group-open:rotate-180" />
        </summary>
        <FooterNavLinks links={links} />
      </details>
    </nav>
  )
}
