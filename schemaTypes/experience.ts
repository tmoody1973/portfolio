import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  icon: () => '💼',
  fields: [
    defineField({
      name: 'company',
      title: 'Company / Organization',
      type: 'string',
      description: 'Name of the company or organization',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      description: 'Your job title or role',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      description: 'When you started this role',
      options: {
        dateFormat: 'MMMM YYYY',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      description: 'When you ended this role (leave empty if current)',
      options: {
        dateFormat: 'MMMM YYYY',
      },
    }),
    defineField({
      name: 'isCurrent',
      title: 'Current Role',
      type: 'boolean',
      description: 'Check if this is your current role',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      description: 'Describe your responsibilities and achievements',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'highlights',
      title: 'Key Highlights',
      type: 'array',
      description: 'Bullet points of key achievements (alternative to full description)',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      description: 'Logo of the company or organization',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City, State or Remote',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in the timeline (lower numbers appear first, typically most recent first)',
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      description: 'Show this experience in the journey section',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Most Recent',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'role',
      company: 'company',
      media: 'logo',
      startDate: 'startDate',
      isCurrent: 'isCurrent',
      enabled: 'enabled',
    },
    prepare({ title, company, media, startDate, isCurrent, enabled }) {
      const year = startDate ? new Date(startDate).getFullYear() : ''
      const status = isCurrent ? 'Present' : ''
      return {
        title: `${title}${enabled ? '' : ' (disabled)'}`,
        subtitle: `${company} • ${year}${status ? ' - ' + status : ''}`,
        media,
      }
    },
  },
})
