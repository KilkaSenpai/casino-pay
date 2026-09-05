import type { Footer as FooterData } from '@/payload-types'

import { hasRenderableMedia, MediaImage } from './media'

export function FooterDisclaimer({
  disclaimer,
}: {
  disclaimer: FooterData['topDisclaimer'] | null | undefined
}) {
  const warningText = disclaimer?.warningText?.trim() ?? ''
  const hasDisclaimerLogo = hasRenderableMedia(disclaimer?.regulatorLogo)
  const hasLicenseLogo = hasRenderableMedia(disclaimer?.licenseLogo)

  if (!warningText && !hasDisclaimerLogo && !hasLicenseLogo) {
    return null
  }

  return (
    <div className="flex flex-col items-center gap-5 border-b border-white/10 py-8 text-center lg:flex-row lg:justify-between lg:text-left">
      {warningText || hasDisclaimerLogo ? (
        <div className="flex items-center gap-3">
          {hasDisclaimerLogo ? (
            <MediaImage
              media={disclaimer?.regulatorLogo}
              alt=""
              width={40}
              height={40}
              className="h-13 w-13 shrink-0 object-contain"
            />
          ) : null}
          {warningText ? (
            <p className="m-0 text-left text-[16px] leading-7 font-bold">{warningText}</p>
          ) : null}
        </div>
      ) : null}

      {hasLicenseLogo ? (
        <div className="footer__license shrink-0">
          <MediaImage
            media={disclaimer?.licenseLogo}
            alt=""
            width={220}
            height={48}
            className="max-h-[50] object-contain"
          />
        </div>
      ) : null}
    </div>
  )
}
