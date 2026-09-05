import config from '@payload-config'
import { getPayload } from 'payload'

import { Footer } from './Footer'

export async function SiteFooter() {
  const payload = await getPayload({ config })
  const data = await payload.findGlobal({
    slug: 'footer',
    depth: 2,
  })

  return <Footer data={data} />
}
