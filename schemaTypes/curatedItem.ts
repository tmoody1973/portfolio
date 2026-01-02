import { defineType, defineField, defineArrayMember } from 'sanity'

/**
 * Curated Item Schema for the Crates app
 * Supports music, books, links, and tools
 */
export default defineType({
  name: 'curatedItem',
  title: 'Curated Item',
  type: 'document',
  icon: () => '📦',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'music', title: 'Music Details' },
    { name: 'book', title: 'Book Details' },
    { name: 'link', title: 'Link Details' },
    { name: 'display', title: 'Display Options' },
  ],
  fields: [
    // Basic info
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Name of the item (song, book, article, tool)',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'itemType',
      title: 'Item Type',
      type: 'string',
      description: 'What kind of item is this?',
      group: 'content',
      options: {
        list: [
          { title: 'Music', value: 'music' },
          { title: 'Book', value: 'book' },
          { title: 'Link', value: 'link' },
          { title: 'Tool', value: 'tool' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'creator',
      title: 'Creator / Author',
      type: 'string',
      description: 'Artist, author, or creator name',
      group: 'content',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Album art, book cover, or preview image',
      group: 'content',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'curatorNotes',
      title: 'Curator Notes',
      type: 'array',
      description: 'Why did you select this item? Your personal take.',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'discoveryDate',
      title: 'Discovery Date',
      type: 'date',
      description: 'When did you discover this?',
      group: 'content',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'Genre tags, categories, or keywords',
      group: 'content',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),

    // Music-specific fields
    defineField({
      name: 'embedType',
      title: 'Embed Type',
      type: 'string',
      description: 'What platform is the music on?',
      group: 'music',
      options: {
        list: [
          { title: 'YouTube', value: 'youtube' },
          { title: 'Bandcamp', value: 'bandcamp' },
          { title: 'Spotify', value: 'spotify' },
          { title: 'SoundCloud', value: 'soundcloud' },
        ],
      },
      hidden: ({ parent }) => parent?.itemType !== 'music',
    }),
    defineField({
      name: 'embedUrl',
      title: 'Embed URL',
      type: 'url',
      description: 'URL for embedding the music player',
      group: 'music',
      hidden: ({ parent }) => parent?.itemType !== 'music',
    }),
    defineField({
      name: 'genre',
      title: 'Genre',
      type: 'string',
      description: 'Music genre (Jazz, Electronic, Hip-Hop, etc.)',
      group: 'music',
      hidden: ({ parent }) => parent?.itemType !== 'music',
    }),

    // Book-specific fields
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      description: 'Book author',
      group: 'book',
      hidden: ({ parent }) => parent?.itemType !== 'book',
    }),
    defineField({
      name: 'purchaseUrl',
      title: 'Purchase URL',
      type: 'url',
      description: 'Link to buy the book (Amazon, Bookshop.org, etc.)',
      group: 'book',
      hidden: ({ parent }) => parent?.itemType !== 'book',
    }),
    defineField({
      name: 'isbn',
      title: 'ISBN',
      type: 'string',
      description: 'Book ISBN for lookup',
      group: 'book',
      hidden: ({ parent }) => parent?.itemType !== 'book',
    }),

    // Link/Tool-specific fields
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Link to the resource',
      group: 'link',
      hidden: ({ parent }) => !['link', 'tool'].includes(parent?.itemType),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of the link/tool',
      group: 'link',
      rows: 3,
      hidden: ({ parent }) => !['link', 'tool'].includes(parent?.itemType),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Link category (article, resource, tool, reference, etc.)',
      group: 'link',
      options: {
        list: [
          { title: 'Article', value: 'article' },
          { title: 'Resource', value: 'resource' },
          { title: 'Tool', value: 'tool' },
          { title: 'Reference', value: 'reference' },
          { title: 'Tutorial', value: 'tutorial' },
          { title: 'Inspiration', value: 'inspiration' },
        ],
      },
      hidden: ({ parent }) => !['link', 'tool'].includes(parent?.itemType),
    }),

    // Display options
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Highlight as a top pick',
      group: 'display',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order within its category (lower = first)',
      group: 'display',
      initialValue: 0,
    }),
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      description: 'Show this item in the Crates app',
      group: 'display',
      initialValue: true,
    }),
    defineField({
      name: 'substackUrl',
      title: 'Related Substack Article',
      type: 'url',
      description: 'Link to a Substack post about this discovery',
      group: 'display',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Discovery Date (Newest)',
      name: 'discoveryDesc',
      by: [{ field: 'discoveryDate', direction: 'desc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      creator: 'creator',
      author: 'author',
      itemType: 'itemType',
      media: 'coverImage',
      featured: 'featured',
      enabled: 'enabled',
    },
    prepare({ title, creator, author, itemType, media, featured, enabled }) {
      const typeIcons: Record<string, string> = {
        music: '🎵',
        book: '📚',
        link: '🔗',
        tool: '🛠️',
      }
      const icon = typeIcons[itemType] || '📦'
      const star = featured ? ' ⭐' : ''
      const disabled = enabled === false ? ' (hidden)' : ''
      const subtitle = creator || author || itemType

      return {
        title: `${icon} ${title}${star}${disabled}`,
        subtitle,
        media,
      }
    },
  },
})
