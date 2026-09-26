import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Generosity & Giving',
          fields: [
            {
              name: 'givingQrCode',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Official QR Code image (GCash / Maya / QRPh / Bank Transfer)',
              },
            },
            {
              name: 'givingBankName',
              type: 'text',
              defaultValue: 'BDO Unibank / GCash / Maya',
              admin: {
                description: 'Bank or payment institution name',
              },
            },
            {
              name: 'givingAccountName',
              type: 'text',
              defaultValue: 'Jesus the Master Builder Global Ministry',
              admin: {
                description: 'Account holder name',
              },
            },
            {
              name: 'givingAccountNumber',
              type: 'text',
              defaultValue: '0012-3456-7890',
              admin: {
                description: 'Bank account number or mobile giving reference',
              },
            },
          ],
        },
        {
          label: 'Hero & Visuals',
          fields: [
            {
              name: 'missionHeroImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Hero feature image for Global Mission & Church Planting',
              },
            },
            {
              name: 'connectHeroImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Feature photo for Life Groups & Fellowship Gathering',
              },
            },
          ],
        },
        {
          label: 'Church Information',
          fields: [
            {
              name: 'churchAddress',
              type: 'text',
              defaultValue: 'JMBGM Main Campus Sanctuary, Metro Manila, Philippines',
            },
            {
              name: 'churchPhone',
              type: 'text',
              defaultValue: '+63 (02) 8123-4567 / +63 917 123 4567',
            },
            {
              name: 'churchEmail',
              type: 'text',
              defaultValue: 'info@jmbgm.org / connect@jmbgm.org',
            },
          ],
        },
      ],
    },
  ],
}
