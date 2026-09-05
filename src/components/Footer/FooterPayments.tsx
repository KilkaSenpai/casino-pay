import type { Footer as FooterData } from '@/payload-types'

import { hasRenderableMedia, MediaImage } from './media'

type PaymentItem = NonNullable<NonNullable<FooterData['paymentSection']>['paymentLogos']>[number]

export function FooterPayments({
  title,
  items,
}: {
  title?: string | null
  items: PaymentItem[]
}) {
  if (!title && items.length === 0) {
    return null
  }

  return (
    <section>
      {title ? <h2 className="text-[18px] font-bold text-white">{title}</h2> : null}
      <ul className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-4">
        {items.map((item) => {
          const label = item.name ?? ''
          const hasLogo = hasRenderableMedia(item.logo)

          if (!hasLogo && !label) {
            return null
          }

          return (
            <li key={item.id ?? label} className="flex items-center">
              {hasLogo ? (
                <MediaImage
                  media={item.logo}
                  alt={label}
                  width={80}
                  height={36}
                  className="h-8 w-auto max-w-[88px] object-contain"
                />
              ) : (
                <span className="text-[13px] text-[#c8d2dc]">{label}</span>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
