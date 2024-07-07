export default {
  name: "blog",
  type: "document",
  title: "Blog",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title of blog article",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug of your blog article",
      options: {
        source: "title",
      },
    },
    {
      name: "demoLink",
      type: "string",
      title: "Link to Project",
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "titleImage",
      type: "image",
      title: "Title image",
    },
    {
      name: "smallDescription",
      type: "text",
      title: "Small Description",
    },
    {
      name: "content",
      type: "array",
      title: "Content",
      of: [
        {
          type: "markdown",
        },
      ],
    },
  ],
};
