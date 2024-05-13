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
        <h1 className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-cover bg-clip-text text-5xl font-semibold tracking-tighter text-transparent bg-blend-multiply md:text-7xl">
          David Williams-Haven
        </h1>

        <h1 className="text-2xl font-medium leading-6 tracking-tighter md:text-4xl">
          Fullstack web developer
        </h1>
        <h1 className="text-lg font-semibold tracking-wide text-slate-500">
          Bio
        </h1>
        <p className="text-sm leading-4 md:text-base">
          {`I'm a motivated web developer with a strong foundation in computer
          science. I have hands-on experience building web applications using
          Node.js and Python web servers. I'm eager to leverage my full-stack
          development skills and contribute to innovative projects that utilize
          the latest technologies.`}
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
