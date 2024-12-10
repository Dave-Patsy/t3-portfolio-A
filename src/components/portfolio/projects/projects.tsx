import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { urlForImage } from '@/sanity/lib/image';
import { getSimpleBlog } from '@/sanity/querys/blogQuery';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function Projects() {
  const data = await getSimpleBlog();
  return (
    <section
      className="relative z-50 flex min-h-screen w-full flex-col "
      id="projects"
    >
      <h1 className="pt-8 text-left text-3xl md:text-4xl font-normal tracking-tighter">
        Projects
      </h1>
      <div className="mx-auto mt-0 grid  grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-2">
        {data.map((post) => (
          <Card
            key={post.title}
            className="flex flex-col bg-transparent backdrop-blur-sm duration-100 hover:scale-105"
          >
            <div className="relative mx-auto mt-3 aspect-video w-11/12 items-center justify-center overflow-hidden rounded-md">
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
                      src={urlForImage(post.titleImage)}
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
            <CardContent className="relative mt-5 flex flex-grow flex-col justify-between">
              <div>
                <h1 className="line-clamp-2 text-lg">{post.title}</h1>
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {post.smallDescription}
                </p>
              </div>
              <div className=" flex justify-between">
                <Button asChild variant={"ghost"} className="mt-5">
                  <Link href={`/blog/${post.currentSluge}`}>Read More</Link>
                </Button>
                {post.demoLink && (
                  <Button asChild className="mt-5" variant={'outline'}>
                    <Link href={post.demoLink}>Demo</Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
