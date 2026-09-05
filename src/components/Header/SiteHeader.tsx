import config from '@payload-config'
import { getPayload } from 'payload'

import { Header } from './Header'

export async function SiteHeader() {
  const payload = await getPayload({ config })
  const data = await payload.findGlobal({
    slug: 'header',
    depth: 2,
  })

  return <Header data={data} />
}
