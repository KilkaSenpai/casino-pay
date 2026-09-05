import { AgeEighteenBadge } from '@/components/icons'
import type { Footer as FooterData } from '@/payload-types'

import { hasRenderableMedia, MediaImage } from './media'

export function FooterDisclaimer({
  disclaimer,
}: {
  disclaimer: FooterData['topDisclaimer']
}) {
  const hasWarning = Boolean(disclaimer.warningText)
  const hasLogo = hasRenderableMedia(disclaimer.regulatorLogo)

  if (!hasWarning && !hasLogo) {
    return null
  }

  return (
    <div className="flex flex-col items-center gap-5 border-b border-white/10 py-8 text-center lg:flex-row lg:justify-between lg:text-left">
      {hasWarning ? (
        <div className="flex items-center gap-3">
          <AgeEighteenBadge className="h-10 w-10 shrink-0" />
          <p className="m-0 text-[16px] leading-7 text-white">{disclaimer.warningText}</p>
        </div>
      ) : null}

      {hasLogo ? (
        <div className="flex w-full max-w-md items-center gap-4 lg:w-auto lg:max-w-none">
          <span className="h-px flex-1 bg-white lg:hidden" />
          <div className="shrink-0 lg:border-b lg:border-white lg:pb-1">
            <MediaImage
              media={disclaimer.regulatorLogo}
              alt=""
              width={220}
              height={48}
              className="h-10 w-auto max-w-[240px] object-contain"
            />
          </div>
          <span className="h-px flex-1 bg-white lg:hidden" />
        </div>
      ) : null}
    </div>
  )
}
