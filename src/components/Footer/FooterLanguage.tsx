import { ChevronDownIcon } from '@/components/icons'
import type { Footer as FooterData } from '@/payload-types'

import { MediaImage } from './media'

type LanguageItem = NonNullable<NonNullable<FooterData['languageSwitcher']>['languages']>[number]

export function FooterLanguage({
  title,
  languages,
}: {
  title?: string | null
  languages: LanguageItem[]
}) {
  const usable = languages.filter((lang) => Boolean(lang.url?.trim() && lang.name?.trim()))
  const current = usable[0]

  if (!current) {
    return null
  }

  return (
    <div className="py-8 max-[1024px]:pt-0">
      {title?.trim() ? <h2 className="text-[18px] font-bold text-white">{title}</h2> : null}
      <details className={`group relative w-fit ${title?.trim() ? 'mt-4' : ''}`}>
        <summary className="flex cursor-pointer list-none items-center gap-2 [&::-webkit-details-marker]:hidden">
          <MediaImage
            media={current.flag}
            alt={current.name ?? ''}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
          <ChevronDownIcon className="h-2.5 w-2.5 text-[#f55561]" />
        </summary>
        <ul className="absolute top-full left-0 z-10 mt-2 min-w-[180px] rounded-[3px] bg-[#011c38] py-2 shadow-lg">
          {usable.map((lang) => {
            const href = lang.url?.trim() ?? ''
            const name = lang.name?.trim() ?? ''

            return (
              <li key={lang.id ?? name}>
                <a
                  href={href}
                  className="flex items-center gap-2 px-3 py-1.5 text-[14px] font-semibold leading-6 text-white no-underline transition-opacity duration-200 hover:opacity-80"
                >
                  <MediaImage
                    media={lang.flag}
                    alt={name}
                    width={24}
                    height={24}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                  {name}
                </a>
              </li>
            )
          })}
        </ul>
      </details>
    </div>
  )
}
