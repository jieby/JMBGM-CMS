import type { CollectionConfig } from 'payload'

export const Announcements: CollectionConfig = {
  slug: 'announcements',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date', 'featured', 'status'],
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Event flyer or banner photo',
      },
    },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'Announcement',
      required: true,
      options: [
        { label: 'Announcement', value: 'Announcement' },
        { label: 'Sunday Service', value: 'Sunday Service' },
        { label: 'Event', value: 'Event' },
        { label: 'Ministry Update', value: 'Ministry Update' },
        { label: 'Community Outreach', value: 'Community Outreach' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'branch',
      type: 'relationship',
      relationTo: 'outreaches',
      admin: {
        description: 'Designate specific church branch (leave empty for All Campuses / Church-wide)',
        position: 'sidebar',
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'location',
      type: 'text',
      admin: {
        description: 'Physical venue, sanctuary, or online streaming link',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Pin to top of homepage announcements feed',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Brief summary displayed on cards and search results',
      },
    },
    {
      name: 'content',
      type: 'richText',
    },
  ],
}
