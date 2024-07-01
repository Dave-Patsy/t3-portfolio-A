// import { simpleBlogCard } from "sanity/interface";
// import { client } from "sanity/lib/client";

import type { fullBlog, simpleBlogCard } from "@/sanity/interface";
import { client } from "@/sanity/lib/client";

async function getSimpleBlog() {
  const query = `
    *[_type == 'blog'] | order(_CreatedAt desc) {
    title,
      smallDescription,
      "currentSluge": slug.current,
      titleImage,
      demoLink
    }
  `;
  const data:simpleBlogCard[] = await client.fetch(query)
  return data
}

async function getFullBlog(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          title,
          content,
          titleImage,
          demoLink
      }[0]`;

  const data:fullBlog = await client.fetch(query);
  return data;
}

export { getSimpleBlog, getFullBlog };