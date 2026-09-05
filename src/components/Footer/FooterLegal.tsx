import type { Footer as FooterData } from '@/payload-types'

export function FooterLegal({ legal }: { legal: FooterData['legalBottom'] }) {
  if (!legal.copyright && !legal.licenseText) {
    return null
  }

  return (
    <div className="border-t border-white/10 py-8">
      {legal.copyright ? (
        <p className="m-0 text-[13px] leading-6 text-[#c8d2dc]">{legal.copyright}</p>
      ) : null}
      {legal.licenseText ? (
        <p className="mt-3 mb-0 text-[13px] leading-6 text-[#c8d2dc]">{legal.licenseText}</p>
      ) : null}
    </div>
  )
}
