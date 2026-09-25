import type { CollectionConfig } from 'payload'

export const StoryChapters: CollectionConfig = {
  slug: 'story-chapters',
  labels: {
    singular: 'Story Chapter',
    plural: 'Story Chapters',
  },
  admin: {
    useAsTitle: 'headline',
    defaultColumns: ['order', 'chapterKey', 'pillarName', 'headline', 'scriptureRef', '_status'],
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
      name: 'order',
      type: 'number',
      required: true,
      min: 0,
      max: 4,
      index: true,
      admin: {
        description: 'Sequence order of the act (0 for Prologue, 1 for Evangelism, 2 for Discipleship, 3 for Leadership, 4 for Mission)',
      },
    },
    {
      name: 'chapterKey',
      type: 'select',
      required: true,
      unique: true,
      options: [
        { label: 'Act 0: The Sovereign Architect (Prologue)', value: 'prologue' },
        { label: 'Act I: Evangelism (The True Vine & The Fruit)', value: 'evangelism' },
        { label: 'Act II: Discipleship (The Seed & Deep Roots)', value: 'discipleship' },
        { label: 'Act III: Leadership (The Living Pillars of the House)', value: 'leadership' },
        { label: 'Act IV: Mission (Sent to the Nations)', value: 'mission' },
      ],
      admin: {
        description: 'Identifier key for the chapter act',
      },
    },
    {
      name: 'pillarName',
      type: 'text',
      required: true,
      admin: {
        description: 'Pillar label shown above headline (e.g. "Pillar I • Evangelism")',
      },
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      admin: {
        description: 'Main cinematic display headline',
      },
    },
    {
      name: 'subheadline',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Theology / Theme narrative description',
      },
    },
    {
      name: 'scriptureRef',
      type: 'text',
      required: true,
      admin: {
        description: 'Anchor Scripture reference (e.g. "John 15:5")',
      },
    },
    {
      name: 'scriptureText',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Full verse text of the anchor scripture',
      },
    },
    {
      name: 'backgroundMedia',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Background cinematic video loop or high-resolution visual frame',
      },
    },
  ],
}
