
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { urlForImage } from '@/sanity/lib/image';
import { getFullBlog } from '@/sanity/querys/blogQuery';
import { PortableText } from "@portabletext/react";
import Image from 'next/image';
import React from 'react'
import Markdown from 'react-markdown';
export const revalidate = 300; // revalidate at most 5 minutes

export default async function page({params}:{params: {slug:string}}) {
  const data = await getFullBlog(params.slug)
  return (
    <div className="mx-auto my-16 flex w-11/12 flex-col items-center justify-center">
      <h1>
        <span className="block text-center text-base font-semibold uppercase tracking-wide text-primary">
          David Williams-Haven - Blog
        </span>
        <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>

      <div className="relative mt-8   aspect-video w-full items-center justify-center overflow-hidden rounded-md lg:w-6/12 ">
        <Image
          src={"/images/portfolio/bg.png"}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt="Image"
          className="bg-[#9CE6FA]"
        />
        <div className="absolute bottom-0 w-full">
          <AspectRatio
            ratio={16 / 9}
            className="absolute bottom-0 z-10 mx-auto "
          >
            <div className="relative h-full w-full">
              <Image
                src={urlForImage(data.titleImage)}
                fill={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt="Title Image"
                priority
                className="bottom-0 origin-bottom"
              />
            </div>
          </AspectRatio>
        </div>
      </div>

      <div className="prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary mt-16">
        <Markdown>{`${data.content}`}</Markdown>
      </div>
    </div>
  );
}
