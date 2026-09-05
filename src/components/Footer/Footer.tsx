import { Container } from '@/components/Container'
import type { Footer as FooterData } from '@/payload-types'

import { FooterDisclaimer } from './FooterDisclaimer'
import { FooterLanguage } from './FooterLanguage'
import { FooterLegal } from './FooterLegal'
import { FooterNav } from './FooterNav'
import { FooterPayments } from './FooterPayments'
import { FooterProviders } from './FooterProviders'
import { hasRenderableMedia } from './media'

function hasLabelledLinks(
  links: NonNullable<NonNullable<FooterData['navigationColumn']>['links']>,
) {
  return links.some((item) => Boolean(item.label?.trim()))
}

function hasLogos(
  items: { logo?: unknown }[],
) {
  return items.some((item) => hasRenderableMedia(item.logo))
}

function hasUsableLanguages(
  languages: NonNullable<NonNullable<FooterData['languageSwitcher']>['languages']>,
) {
  return languages.some((lang) => Boolean(lang.url?.trim() && lang.name?.trim()))
}

export function Footer({ data }: { data: FooterData }) {
  const links = data.navigationColumn?.links ?? []
  const providers = data.providersSection?.providersList ?? []
  const payments = data.paymentSection?.paymentLogos ?? []
  const languages = data.languageSwitcher?.languages ?? []

  const showNav = hasLabelledLinks(links)
  const showProviders = hasLogos(providers)
  const showPayments = hasLogos(payments)
  const showLogos = showProviders || showPayments
  const showMain = showNav || showLogos

  return (
    <footer className="bg-[#001829] text-white">
      <Container>
        <FooterDisclaimer disclaimer={data.topDisclaimer} />

        {showMain ? (
          <div
            className={
              showNav && showLogos
                ? 'grid gap-10 py-10 lg:grid-cols-[minmax(220px,0.9fr)_minmax(0,2.1fr)] lg:gap-16'
                : 'py-10'
            }
          >
            {showNav ? <FooterNav title={data.navigationColumn?.columnTitle} links={links} /> : null}
            {showLogos ? (
              <div className="flex flex-col gap-10">
                {showProviders ? (
                  <FooterProviders title={data.providersSection?.title} items={providers} />
                ) : null}
                {showPayments ? (
                  <FooterPayments title={data.paymentSection?.title} items={payments} />
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}

        {hasUsableLanguages(languages) ? (
          <FooterLanguage title={data.languageSwitcher?.title} languages={languages} />
        ) : null}
        <FooterLegal legal={data.legalBottom} />
      </Container>
    </footer>
  )
}
