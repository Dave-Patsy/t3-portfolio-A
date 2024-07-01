
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

export default async function Page() {
  const data = await getSimpleBlog();
  return (
    <div className="relative h-full flex-1 scroll-smooth">
      <Suspense fallback={null}>
        <Intro />
        <section className="flex min-h-screen items-center" id="projects">
          <div className="z-50 mx-auto my-auto h-5/6 w-full">
            {/* <Projects/> */}
            <ProjectGrid />
          </div>
        </section>
        {/* <section className='relative flex h-screen items-center' id='skills'>
          <Skills/>
        </section> */}
        <section
          className="relative z-50 flex min-h-screen w-full items-center justify-center"
          id="contact"
        >
          <Contact />
        </section>
        <section className="relative z-50 flex min-h-screen w-full items-center justify-center">
          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-4 w-11/12 mx-auto">
            {data.map((post) => (
              <Card key={post.title}>
                <Image
                  className="rounded-lg"
                  src={urlForImage(post.titleImage)}
                  width={500}
                  height={500}
                  alt={post.title}
                />
                <CardContent className="mt-5">
                  <h1 className="line-clamp-2 text-lg">{post.title}</h1>
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {post.smallDescription}
                  </p>
                  <div className="flex justify-between">
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
        <Hero />
      </Suspense>
    </div>
  );
}
