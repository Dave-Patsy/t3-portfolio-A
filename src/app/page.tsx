
import React, { Suspense } from "react";
import Intro from "@/components/portfolio/hero/intro";
import Hero from "@/components/portfolio/three-fiber/hero";
import Contact from "@/components/portfolio/contact/contact";
import { getSimpleBlog } from "@/sanity/querys/blogQuery";
import Projects from "@/components/portfolio/projects/projects";

export const revalidate = 300; 

export default async function Page() {
  

  return (
    <div className="relative w-full h-full flex-1 scroll-smooth">
      <Suspense fallback={null}>
        <div className="flex flex-1 flex-col gap-2 relative mx-auto px-2 max-w-3xl">
          <Intro />

          <Projects/>
          <Contact />
          <Hero />
        </div>
      </Suspense>
    </div>
  );
}
