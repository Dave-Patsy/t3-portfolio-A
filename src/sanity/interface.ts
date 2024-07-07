

import { BlockMarksDefinition, Image } from "sanity";
import { markdownSchema, type markdownSchemaType } from "sanity-plugin-markdown";

export interface simpleBlogCard {
  title: string;
  smallDescription: string;
  currentSluge: string;
  titleImage: Image;
  demoLink: string
}

export interface fullBlog {
  currentSlug: string;
  title: string;
  content: string
  titleImage: Image;
}