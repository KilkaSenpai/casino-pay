import { Container } from '@/components/Container'
import type { Footer as FooterData } from '@/payload-types'

import { FooterDisclaimer } from './FooterDisclaimer'
import { FooterLanguage } from './FooterLanguage'
import { FooterLegal } from './FooterLegal'
import { FooterNav } from './FooterNav'
import { FooterPayments } from './FooterPayments'
import { FooterProviders } from './FooterProviders'

export function Footer({ data }: { data: FooterData }) {
  const links = data.navigationColumn?.links ?? []
  const providers = data.providersSection?.providersList ?? []
  const payments = data.paymentSection?.paymentLogos ?? []
  const languages = data.languageSwitcher?.languages ?? []

  const hasMain =
    Boolean(data.navigationColumn?.columnTitle) ||
    links.length > 0 ||
    Boolean(data.providersSection?.title) ||
    providers.length > 0 ||
    Boolean(data.paymentSection?.title) ||
    payments.length > 0

  return (
    <footer className="bg-[#001829] text-white">
      <Container>
        <FooterDisclaimer disclaimer={data.topDisclaimer} />

        {hasMain ? (
          <div className="grid gap-10 py-10 lg:grid-cols-[minmax(220px,0.9fr)_minmax(0,2.1fr)] lg:gap-16">
            <FooterNav title={data.navigationColumn?.columnTitle} links={links} />
            <div className="flex flex-col gap-10">
              <FooterProviders title={data.providersSection?.title} items={providers} />
              <FooterPayments title={data.paymentSection?.title} items={payments} />
            </div>
          </div>
        ) : null}

        <FooterLanguage title={data.languageSwitcher?.title} languages={languages} />
        <FooterLegal legal={data.legalBottom} />
      </Container>
    </footer>
  )
}
