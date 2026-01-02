import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  icon: () => '🎓',
  fields: [
    defineField({
      name: 'institution',
      title: 'Institution',
      type: 'string',
      description: 'Name of the school, university, or institution',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'degree',
      title: 'Degree / Certificate',
      type: 'string',
      description: 'Type of degree or certificate earned (e.g., "Bachelor of Science", "AWS Certified")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fieldOfStudy',
      title: 'Field of Study',
      type: 'string',
      description: 'Major, concentration, or focus area (e.g., "Computer Science")',
    }),
    defineField({
      name: 'startYear',
      title: 'Start Year',
      type: 'number',
      description: 'Year you started',
      validation: (rule) => rule.min(1950).max(2100),
    }),
    defineField({
      name: 'endYear',
      title: 'End Year',
      type: 'number',
      description: 'Year you completed (or expected completion)',
      validation: (rule) => rule.min(1950).max(2100),
    }),
    defineField({
      name: 'inProgress',
      title: 'In Progress',
      type: 'boolean',
      description: 'Check if currently pursuing this education',
      initialValue: false,
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'text',
      description: 'Additional details, honors, or relevant coursework',
      rows: 3,
    }),
    defineField({
      name: 'credentialUrl',
      title: 'Credential URL',
      type: 'url',
      description: 'Link to verify credential (for certifications)',
    }),
    defineField({
      name: 'logo',
      title: 'Institution Logo',
      type: 'image',
      description: 'Logo or badge of the institution',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in the education list (lower numbers appear first)',
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      description: 'Show this education entry',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Most Recent',
      name: 'endYearDesc',
      by: [{ field: 'endYear', direction: 'desc' }],
    },
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'degree',
      institution: 'institution',
      fieldOfStudy: 'fieldOfStudy',
      media: 'logo',
      endYear: 'endYear',
      inProgress: 'inProgress',
      enabled: 'enabled',
    },
    prepare({ title, institution, fieldOfStudy, media, endYear, inProgress, enabled }) {
      const field = fieldOfStudy ? ` in ${fieldOfStudy}` : ''
      const year = inProgress ? 'In Progress' : endYear || ''
      return {
        title: `${title}${field}${enabled ? '' : ' (disabled)'}`,
        subtitle: `${institution} • ${year}`,
        media,
      }
    },
  },
})
