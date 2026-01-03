import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'folder',
  title: 'Folder',
  type: 'document',
  icon: () => '📁',
  fields: [
    defineField({
      name: 'name',
      title: 'Folder Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'parentFolder',
      title: 'Parent Folder',
      type: 'reference',
      to: [{ type: 'folder' }],
      description: 'Leave empty for root-level folder',
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'color',
      title: 'Folder Color',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Blue', value: 'blue' },
          { title: 'Green', value: 'green' },
          { title: 'Orange', value: 'orange' },
          { title: 'Purple', value: 'purple' },
          { title: 'Red', value: 'red' },
        ],
      },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      parent: 'parentFolder.name',
    },
    prepare({ title, parent }) {
      return {
        title: title,
        subtitle: parent ? `in ${parent}` : 'Root folder',
        media: () => '📁',
      }
    },
  },
})
