import type { Footer as FooterData } from '@/payload-types'

export function FooterLegal({ legal }: { legal: FooterData['legalBottom'] | null | undefined }) {
  const copyright = legal?.copyright?.trim() ?? ''
  const licenseText = legal?.licenseText?.trim() ?? ''

  if (!copyright && !licenseText) {
    return null
  }

  const both = Boolean(copyright && licenseText)

  return (
    <div
      className={
        both
          ? 'grid grid-cols-1 gap-3 border-t border-white/10 py-8 lg:grid-cols-[1fr_3fr] lg:gap-8'
          : 'border-t border-white/10 py-8'
      }
    >
      {copyright ? (
        <p className={`m-0 text-[13px] leading-6 text-[#c8d2dc] ${both ? 'max-w-[200px]' : ''}`}>
          {copyright}
        </p>
      ) : null}
      {licenseText ? (
        <p className="m-0 text-[13px] leading-6 text-[#c8d2dc]">{licenseText}</p>
      ) : null}
    </div>
  )
}
