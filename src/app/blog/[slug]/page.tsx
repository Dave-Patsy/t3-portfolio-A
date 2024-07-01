
import { urlForImage } from '@/sanity/lib/image';
import { getFullBlog } from '@/sanity/querys/blogQuery';
import { PortableText } from "@portabletext/react";
import Image from 'next/image';
import React from 'react'

export const revalidate = 300; // revalidate at most 5 minutes

export default async function page({params}:{params: {slug:string}}) {
  const data = await getFullBlog(params.slug)
  return (
    <div className="flex flex-col w-11/12 mx-auto justify-center items-center my-16">
      <h1>
        <span className="block text-center text-base font-semibold uppercase tracking-wide text-primary">
          Jan Marshal - Blog
        </span>
        <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>

      <Image
        src={urlForImage(data.titleImage)}
        width={800}
        height={800}
        alt="Title Image"
        priority
        className="mt-8 rounded-lg border"
      />

      <div className="prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary mt-16">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}
