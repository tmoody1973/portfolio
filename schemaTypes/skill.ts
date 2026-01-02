import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  icon: () => '⚡',
  fields: [
    defineField({
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      description: 'Name of the skill (e.g., "TypeScript", "React", "AWS")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Category this skill belongs to',
      options: {
        list: [
          { title: 'Languages', value: 'languages' },
          { title: 'Frameworks', value: 'frameworks' },
          { title: 'Tools', value: 'tools' },
          { title: 'Platforms', value: 'platforms' },
          { title: 'Databases', value: 'databases' },
          { title: 'Design', value: 'design' },
          { title: 'Soft Skills', value: 'soft-skills' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'proficiency',
      title: 'Proficiency Level',
      type: 'string',
      description: 'Your proficiency level with this skill',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
          { title: 'Expert', value: 'expert' },
        ],
        layout: 'radio',
      },
      initialValue: 'intermediate',
    }),
    defineField({
      name: 'proficiencyLevel',
      title: 'Proficiency (1-5)',
      type: 'number',
      description: 'Numeric proficiency level (1 = beginner, 5 = expert)',
      validation: (rule) => rule.min(1).max(5),
      initialValue: 3,
    }),
    defineField({
      name: 'yearsOfExperience',
      title: 'Years of Experience',
      type: 'number',
      description: 'How many years you have used this skill',
      validation: (rule) => rule.min(0).max(50),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      description: 'Icon or logo for this skill',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Name (Alternative)',
      type: 'string',
      description: 'Use a predefined icon name instead of custom image (e.g., "react", "typescript", "nodejs")',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of your experience with this skill',
      rows: 2,
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Highlight this skill prominently',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order within category (lower numbers appear first)',
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      description: 'Show this skill in the skills section',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Category, then Order',
      name: 'categoryOrder',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
    {
      title: 'Proficiency (High to Low)',
      name: 'proficiencyDesc',
      by: [{ field: 'proficiencyLevel', direction: 'desc' }],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      category: 'category',
      proficiency: 'proficiency',
      media: 'icon',
      featured: 'featured',
      enabled: 'enabled',
    },
    prepare({ title, category, proficiency, media, featured, enabled }) {
      const categoryLabels: Record<string, string> = {
        languages: 'Languages',
        frameworks: 'Frameworks',
        tools: 'Tools',
        platforms: 'Platforms',
        databases: 'Databases',
        design: 'Design',
        'soft-skills': 'Soft Skills',
        other: 'Other',
      }
      const star = featured ? '⭐ ' : ''
      const disabled = enabled ? '' : ' (disabled)'
      return {
        title: `${star}${title}${disabled}`,
        subtitle: `${categoryLabels[category] || category} • ${proficiency}`,
        media,
      }
    },
  },
})
