import type { Field, GlobalConfig } from 'payload'

type LinkTypeSibling = {
  linkType?: 'reference' | 'custom'
}

type DropdownSibling = {
  hasDropdown?: boolean | null
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

export const Header: GlobalConfig = {
  slug: 'header',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Navigation',
          fields: [
            {
              name: 'navItems',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                },
                ...linkFields,
                {
                  name: 'hasDropdown',
                  type: 'checkbox',
                },
                {
                  name: 'dropdownItems',
                  type: 'array',
                  admin: {
                    condition: (_data, siblingData: DropdownSibling) =>
                      Boolean(siblingData.hasDropdown),
                  },
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
          label: 'Actions',
          fields: [
            {
              name: 'login',
              type: 'group',
              label: 'Login button',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'loginText',
                      type: 'text',
                      required: true,
                      admin: {
                        width: '50%',
                      },
                    },
                    {
                      name: 'loginUrl',
                      type: 'text',
                      admin: {
                        width: '50%',
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'register',
              type: 'group',
              label: 'Register button',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'registerText',
                      type: 'text',
                      required: true,
                      admin: {
                        width: '50%',
                      },
                    },
                    {
                      name: 'registerUrl',
                      type: 'text',
                      admin: {
                        width: '50%',
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
}
