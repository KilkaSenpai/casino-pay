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
  const logos = items.filter((item) => hasRenderableMedia(item.logo))

  if (logos.length === 0) {
    return null
  }

  return (
    <div>
      {title?.trim() ? <h2 className="text-[18px] font-bold text-white">{title}</h2> : null}
      <ul className={title?.trim() ? 'mt-5 grid grid-cols-4 gap-x-4 gap-y-5 min-[480px]:grid-cols-6 lg:grid-cols-8' : 'grid grid-cols-4 gap-x-4 gap-y-5 min-[480px]:grid-cols-6 lg:grid-cols-8'}>
        {logos.map((item) => (
          <li
            key={item.id ?? (typeof item.logo === 'object' ? item.logo.id : item.logo)}
            className="flex items-center justify-center"
          >
            <MediaImage
              media={item.logo}
              alt=""
              width={96}
              height={32}
              className="h-7 w-auto max-w-[96px] object-contain opacity-80"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
