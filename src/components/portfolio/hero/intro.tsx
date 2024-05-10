'use client'
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react'
import { FaDocker, FaNodeJs, FaPython, FaReact } from 'react-icons/fa';
import { SiTypescript } from 'react-icons/si';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

export default function Intro() {
  return (
    <section className="relative h-screen">
      <motion.div
        className="absolute left-1/2 top-1/2 z-50 grid w-11/12 -translate-x-1/2 -translate-y-1/2 grid-cols-1 gap-2  md:w-[734px] "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        // transition={{duration:1}}
      >
        <h1
          className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-cover bg-clip-text text-5xl md:text-7xl font-semibold tracking-tighter text-transparent bg-blend-multiply"
        >
          David Williams-Haven
        </h1>

        <h1 className="text-2xl md:text-4xl font-medium leading-6 tracking-tighter">
          Fullstack web developer
        </h1>
        <h1 className="text-lg font-semibold tracking-wide text-slate-500">
          Bio
        </h1>
        <p className="text-sm md:text-base leading-4">
          Motivated junior web developer with a solid foundation in web
          development and hands-on experience working with Node.js and Python
          web servers. Eager to apply my skills in full-stack development and
          contribute to dynamic projects that leverage cutting-edge
          technologies. Proficient in building responsive and user-friendly web
          applications using HTML, CSS, and JavaScript, with a focus on creating
          seamless user experiences.
        </p>

        <div className="relative flex gap-2 py-2">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Badge
                variant="outline"
                className="gap-2 bg-card/30 py-2 text-xl"
              >
                <FaNodeJs />
                <SiTypescript />
              </Badge>
            </HoverCardTrigger>
            <HoverCardContent>
              <p>
                {`Node.js opened doors to server-side JavaScript. Its non-blocking
            I/O, vast package ecosystem, and scalability have been key in
            building fast and efficient backends for web applications.`}
              </p>
            </HoverCardContent>
          </HoverCard>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Badge variant="outline" className="bg-card/30 py-2 text-xl">
                <FaReact />
              </Badge>
            </HoverCardTrigger>
            <HoverCardContent>
              <p>
                {`React revolutionized my front-end development. Its component-based
            architecture and virtual DOM make UI development efficient and
            enjoyable. React's ecosystem empowers me to build modern web
            applications.`}
              </p>
            </HoverCardContent>
          </HoverCard>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Badge variant="outline" className="bg-card/30 py-2 text-xl">
                <FaPython />
              </Badge>
            </HoverCardTrigger>
            <HoverCardContent>
              <p>
                {`"Python's simplicity and vast libraries made it my first choice. 
            From web scraping to data analysis and machine learning, Python's
            versatility has powered my diverse projects effectively."`}
              </p>
            </HoverCardContent>
          </HoverCard>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Badge variant="outline" className="bg-card/30 py-2 text-xl">
                <FaDocker />
              </Badge>
            </HoverCardTrigger>
            <HoverCardContent>
              <p>
                Working with Docker transformed my development process. It
                simplified environment management, containerization of apps, and
                deployment. Docker&apos;s efficiency is invaluable for seamless
                software delivery
              </p>
            </HoverCardContent>
          </HoverCard>
        </div>
        <Button variant={"ghost"} className="ring-1 ring-black" asChild>
          <Link href={"#projects"}>Checkout my Projects</Link>
        </Button>
      </motion.div>
    </section>
  );
}
