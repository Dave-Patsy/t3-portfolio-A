

import { Image, PortableTextBlock } from "sanity";

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
  content: PortableTextBlock;
  titleImage: Image;
}