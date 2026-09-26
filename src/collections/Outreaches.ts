import type { CollectionConfig } from 'payload'

export const Outreaches: CollectionConfig = {
  slug: 'outreaches',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'volunteerSchedule', 'featured', '_status'],
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
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Food Pantry', value: 'Food Pantry' },
        { label: 'Community Care', value: 'Community Care' },
        { label: 'Prison Ministry', value: 'Prison Ministry' },
        { label: 'Youth Outreach', value: 'Youth Outreach' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'High-resolution outreach activity photo or banner',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Details of the outreach initiative, impact, and beneficiaries',
      },
    },
    {
      name: 'volunteerSchedule',
      type: 'text',
      admin: {
        description: 'Schedule for volunteers (e.g. Every 2nd & 4th Saturday, 8:00 AM)',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Pin to top of homepage outreaches section',
      },
    },
  ],
}
