
import React, { Suspense } from "react";
import Intro from "@/components/portfolio/hero/intro";
import Hero from "@/components/portfolio/home/hero";
import ProjectGrid from "@/components/portfolio/projects/projectGrid";
import Contact from "@/components/portfolio/contact/contact";
import { getSimpleBlog } from "@/sanity/querys/blogQuery";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { headers } from "next/headers";
import GetMicroData from "./_components/getMicroData";

export const revalidate = 300; 

export default async function Page() {
  const data = await getSimpleBlog();
    const headerList = headers();
    console.log('headers portfolio page: ',headerList);
  return (
    <div className="relative h-full flex-1 scroll-smooth">
      <Suspense fallback={null}>
        <Intro />
        <section
          className="relative z-50 flex flex-col min-h-screen w-full items-center justify-center"
          id="projects"
        >
            <h1 className="py-8 text-center text-6xl font-bold tracking-tighter">
              Projects
            </h1>
          <div className="mx-auto mt-5 grid w-11/12 grid-cols-1 md:grid-cols-2 gap-5 xl:grid-cols-4">
            {data.map((post) => (
              <Card key={post.title} className="flex flex-col">
                <div className="relative aspect-video w-full items-center justify-center overflow-hidden rounded-md">
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
                    <Button asChild variant={"default"} className="mt-5">
                      <Link href={`/blog/${post.currentSluge}`}>Read More</Link>
                    </Button>
                    {post.demoLink && (
                      <Button asChild className="mt-5">
                        <Link href={post.demoLink}>Demo</Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        {/* <section className="flex min-h-screen items-center" id="projects">
          <div className="z-50 mx-auto my-auto h-5/6 w-full">
            <ProjectGrid />
          </div>
        </section> */}
        {/* <section className='relative flex h-screen items-center' id='skills'>
          <Skills/>
        </section> */}
        <section
          className="relative z-50 flex min-h-screen w-full items-center justify-center"
          id="contact"
        >
          <Contact />
        </section>
        <section
          className="relative z-50 flex min-h-screen w-full items-center justify-center"
          id="test"
        >
          <GetMicroData />
        </section>

        <Hero />
      </Suspense>
    </div>
  );
}
