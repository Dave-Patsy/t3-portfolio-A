

import { BlockMarksDefinition, Image } from "sanity";

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
  content: BlockMarksDefinition;
  titleImage: Image;
}