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
  const logos = items.filter((item) => hasRenderableMedia(item.logo))

  if (logos.length === 0) {
    return null
  }

  return (
    <div>
      {title?.trim() ? <h2 className="text-[18px] font-bold text-white">{title}</h2> : null}
      <ul className={title?.trim() ? 'mt-5 flex flex-wrap items-center gap-x-6 gap-y-4' : 'flex flex-wrap items-center gap-x-6 gap-y-4'}>
        {logos.map((item) => (
          <li
            key={item.id ?? (typeof item.logo === 'object' ? item.logo.id : item.logo)}
            className="flex items-center"
          >
            <MediaImage
              media={item.logo}
              alt=""
              width={80}
              height={30}
              className="h-[30px] w-auto max-h-[30px] object-contain"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
