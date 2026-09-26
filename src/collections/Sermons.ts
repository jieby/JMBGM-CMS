import type { CollectionConfig } from 'payload'

export const Sermons: CollectionConfig = {
  slug: 'sermons',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'speaker', 'date', 'series', '_status'],
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
      name: 'speaker',
      type: 'text',
      required: true,
      defaultValue: 'Senior Pastor',
      admin: {
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
      name: 'scripture',
      type: 'text',
      admin: {
        description: 'Anchor scripture text (e.g. John 15:1-8, Matthew 28:19)',
      },
    },
    {
      name: 'series',
      type: 'text',
      admin: {
        description: 'Teaching series name (e.g. The Master Builder, Sacred Foundations)',
        position: 'sidebar',
      },
    },
    {
      name: 'videoUrl',
      type: 'text',
      admin: {
        description: 'YouTube, Vimeo, or video stream URL',
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Sermon title graphic or video thumbnail photo',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      admin: {
        description: 'Sermon summary, key takeaways, and reflection questions',
      },
    },
  ],
}
