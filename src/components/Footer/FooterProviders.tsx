import type { Footer as FooterData } from '@/payload-types'

import { hasRenderableMedia, MediaImage } from './media'

type ProviderItem = NonNullable<NonNullable<FooterData['providersSection']>['providersList']>[number]

export function FooterProviders({
  title,
  items,
}: {
  title?: string | null
  items: ProviderItem[]
}) {
  if (!title && items.length === 0) {
    return null
  }

  return (
    <section>
      {title ? <h2 className="text-[18px] font-bold text-white">{title}</h2> : null}
      <ul className="mt-5 grid grid-cols-4 gap-x-4 gap-y-5 min-[480px]:grid-cols-6 lg:grid-cols-8">
        {items.map((item) => {
          const label = item.name ?? ''
          const hasLogo = hasRenderableMedia(item.logo)

          if (!hasLogo && !label) {
            return null
          }

          return (
            <li key={item.id ?? label} className="flex items-center justify-center">
              {hasLogo ? (
                <MediaImage
                  media={item.logo}
                  alt={label}
                  width={96}
                  height={32}
                  className="h-7 w-auto max-w-[96px] object-contain opacity-80"
                />
              ) : (
                <span className="text-[12px] text-[#c8d2dc]">{label}</span>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
