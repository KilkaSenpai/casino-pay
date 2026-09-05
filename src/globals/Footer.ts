import type { Field, GlobalConfig } from 'payload'

type LinkTypeSibling = {
  linkType?: 'reference' | 'custom'
}

const linkFields = [
  {
    name: 'linkType',
    type: 'radio',
    options: [
      {
        label: 'Internal page',
        value: 'reference',
      },
      {
        label: 'Custom URL',
        value: 'custom',
      },
    ],
    defaultValue: 'reference',
    admin: {
      layout: 'horizontal',
    },
  },
  {
    name: 'page',
    type: 'relationship',
    relationTo: 'pages',
    admin: {
      condition: (_data: unknown, siblingData: LinkTypeSibling) =>
        siblingData.linkType === 'reference',
    },
  },
  {
    name: 'url',
    type: 'text',
    admin: {
      condition: (_data: unknown, siblingData: LinkTypeSibling) => siblingData.linkType === 'custom',
    },
  },
] as Field[]

export const Footer: GlobalConfig = {
  slug: 'footer',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General & Legal',
          fields: [
            {
              name: 'topDisclaimer',
              type: 'group',
              label: 'Disclaimer 18+',
              fields: [
                {
                  name: 'warningText',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'regulatorLogo',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Disclaimer Logo',
                },
              ],
            },
            {
              name: 'legalBottom',
              type: 'group',
              fields: [
                {
                  name: 'copyright',
                  type: 'text',
                },
                {
                  name: 'licenseText',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Navigation',
          fields: [
            {
              name: 'navigationColumn',
              type: 'group',
              fields: [
                {
                  name: 'columnTitle',
                  type: 'text',
                },
                {
                  name: 'links',
                  type: 'array',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                    },
                    ...linkFields,
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Partners',
          fields: [
            {
              name: 'providersSection',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'providersList',
                  type: 'array',
                  labels: {
                    singular: 'Provider logo',
                    plural: 'Provider logos',
                  },
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                    },
                    {
                      name: 'logo',
                      type: 'upload',
                      relationTo: 'media',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Payments',
          fields: [
            {
              name: 'paymentSection',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'paymentLogos',
                  type: 'array',
                  labels: {
                    singular: 'Payment method',
                    plural: 'Payment methods',
                  },
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                    },
                    {
                      name: 'logo',
                      type: 'upload',
                      relationTo: 'media',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Languages',
          fields: [
            {
              name: 'languageSwitcher',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'languages',
                  type: 'array',
                  admin: {
                    initCollapsed: false,
                    description: 'External language domains. Drag to reorder.',
                  },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'flag',
                          type: 'upload',
                          relationTo: 'media',
                          admin: {
                            width: '30%',
                          },
                        },
                        {
                          name: 'name',
                          type: 'text',
                          admin: {
                            width: '35%',
                          },
                        },
                        {
                          name: 'url',
                          type: 'text',
                          admin: {
                            width: '35%',
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
