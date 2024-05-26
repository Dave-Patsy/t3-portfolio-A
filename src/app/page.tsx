
import React, { Suspense } from "react";
import Intro from "@/components/portfolio/hero/intro";
import Hero from "@/components/portfolio/home/hero";
import ProjectGrid from "@/components/portfolio/projects/projectGrid";
import Contact from "@/components/portfolio/contact/contact";

export default function Page() {
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
          className="relative z-50 flex w-full min-h-screen items-center justify-center"
          id="contact"
        >
          <Contact />
        </section>
        <Hero />
      </Suspense>
    </div>
  );
}
