import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'fileItem',
  title: 'File',
  type: 'document',
  icon: () => '📄',
  fields: [
    defineField({
      name: 'name',
      title: 'File Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fileType',
      title: 'File Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'PDF', value: 'pdf' },
          { title: 'Document', value: 'document' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image File',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.fileType !== 'image',
    }),
    defineField({
      name: 'pdfFile',
      title: 'PDF File',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      hidden: ({ parent }) => parent?.fileType !== 'pdf',
    }),
    defineField({
      name: 'documentFile',
      title: 'Document File',
      type: 'file',
      hidden: ({ parent }) => parent?.fileType !== 'document',
    }),
    defineField({
      name: 'folder',
      title: 'Folder',
      type: 'reference',
      to: [{ type: 'folder' }],
      description: 'Leave empty for root-level file',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      fileType: 'fileType',
      folder: 'folder.name',
      image: 'image',
    },
    prepare({ title, fileType, folder, image }) {
      const icon = fileType === 'image' ? '🖼️' : fileType === 'pdf' ? '📕' : '📄'
      return {
        title: title,
        subtitle: folder ? `in ${folder}` : 'Root',
        media: fileType === 'image' && image ? image : () => icon,
      }
    },
  },
})
