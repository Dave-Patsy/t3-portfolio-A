import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { urlForImage } from "@/sanity/lib/image";
import { getSimpleBlog } from "@/sanity/querys/blogQuery";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Projects2() {
  const data = await getSimpleBlog();

  return (
    <section
      id="projects"
      className="relative z-50 min-h-screen w-full flex-col px-4 py-8"
    >
      <h1 className="pb-6 text-left text-3xl font-normal tracking-tighter md:text-4xl">
        Projects
      </h1>
      <div className="mx-auto grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-2">
        {data.map((post) => (
          <Card
            key={post.title}
            className="flex flex-col bg-transparent backdrop-blur-sm transition-transform duration-100 hover:scale-105"
          >
            <div className="relative mx-auto mt-3 aspect-video w-11/12 overflow-hidden rounded-md">
              {/* Background image */}
              <Image
                src="/images/portfolio/bg.png"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt="Background"
                className="bg-[#9CE6FA]"
              />
              {/* Title image */}
              <div className="absolute bottom-0 w-full">
                <AspectRatio
                  ratio={16 / 9}
                  className="absolute bottom-0 w-full"
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={urlForImage(post.titleImage)}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      alt="Title"
                      priority
                      className="object-cover"
                    />
                  </div>
                </AspectRatio>
              </div>
            </div>
            <CardContent className="mt-5 flex flex-grow flex-col justify-between">
              <div>
                <h2 className="mb-1 line-clamp-2 text-lg font-semibold">
                  {post.title}
                </h2>
                <p className="mb-3 line-clamp-3 text-sm text-muted-foreground">
                  {post.smallDescription}
                </p>

                {/* Tech Badges */}
                {post.technology && post.technology.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {post.technology.map((tech: string) => (
                      <Badge
                        key={tech}
                        variant={'outline'}
                        // className="rounded-full bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-5 flex justify-between">
                <Button asChild variant="ghost">
                  <Link href={`/blog/${post.currentSluge}`}>Read More</Link>
                </Button>
                {post.demoLink && (
                  <Button asChild variant="outline">
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
