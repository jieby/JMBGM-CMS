import type { CollectionConfig } from 'payload'

export const Outreaches: CollectionConfig = {
  slug: 'outreaches',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'branchType', 'city', 'leadPastor', 'featured', '_status'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return {
        _status: {
          equals: 'published',
        },
      }
    },
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Official church campus / branch name (e.g. JMBGM - Metro Manila Main Sanctuary)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly unique identifier (e.g. metro-manila-main, cebu-campus)',
        position: 'sidebar',
      },
    },
    {
      name: 'branchType',
      type: 'select',
      required: true,
      defaultValue: 'Planted Campus',
      options: [
        { label: 'Main Sanctuary', value: 'Main Sanctuary' },
        { label: 'Planted Campus', value: 'Planted Campus' },
        { label: 'Pioneering Outreach', value: 'Pioneering Outreach' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'leadPastor',
      type: 'text',
      required: true,
      admin: {
        description: 'Lead Pastors / Campus Directors (e.g. Pastor David & Sarah Santos)',
      },
    },
    {
      name: 'address',
      type: 'text',
      required: true,
      admin: {
        description: 'Physical venue / street address',
      },
    },
    {
      name: 'city',
      type: 'text',
      required: true,
      admin: {
        description: 'City / Municipality (e.g. Quezon City, Cebu City, Davao City)',
      },
    },
    {
      name: 'country',
      type: 'text',
      required: true,
      defaultValue: 'Philippines',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'latitude',
      type: 'number',
      required: true,
      admin: {
        description: 'Geographic latitude coordinate for 3D globe (e.g. 14.5995)',
      },
    },
    {
      name: 'longitude',
      type: 'number',
      required: true,
      admin: {
        description: 'Geographic longitude coordinate for 3D globe (e.g. 120.9842)',
      },
    },
    {
      name: 'serviceTimes',
      type: 'array',
      fields: [
        {
          name: 'day',
          type: 'text',
          required: true,
          defaultValue: 'Sunday',
        },
        {
          name: 'time',
          type: 'text',
          required: true,
          defaultValue: '10:00 AM',
        },
        {
          name: 'serviceName',
          type: 'text',
          required: true,
          defaultValue: 'Worship & Word Celebration',
        },
      ],
      admin: {
        description: 'Weekly scheduled services and prayer gatherings at this campus',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'High-resolution photo of the campus sanctuary, congregation, or building',
      },
    },
    {
      name: 'contactPhone',
      type: 'text',
      admin: {
        description: 'Campus helpline or pastoral office phone',
      },
    },
    {
      name: 'contactEmail',
      type: 'text',
      admin: {
        description: 'Campus inquiry email',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Highlight prominently in the Interactive 3D Globe directory',
      },
    },
  ],
}
