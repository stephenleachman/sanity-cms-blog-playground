export default {
    name: 'blog',
    title: 'Blog',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title of blog article',
        type: 'string',
      },
      {
        name: 'slug',
        title: 'Slug of the blog article',
        type: 'slug',
        options: {
          source: 'title',
        },
      },
      {
        name: 'titleImage',
        title: 'Title Image',
        type: 'image',
      },
      {
        name: 'smallDiscription',
        title: 'Small Discription',
        type: 'text',
      },
      {
        name: 'content',
        type: 'array',
        title: 'Content',
        of: [{
                type: 'block',
            }],
        }
      
    ],
}