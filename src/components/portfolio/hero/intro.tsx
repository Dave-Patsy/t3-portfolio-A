'use client'
import { motion } from 'framer-motion';
import Link from 'next/link';

import { IoLocationSharp } from "react-icons/io5";
import { FiDownload } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";
import { Button } from '@/components/ui/button';

import Skills from './skills';

import TechStack3 from './stack-test-3';


export default function Intro() {
  return (
    <section className="relative h-fit w-full" id="intro">
      <motion.div
        className="relative z-10 w-full items-center justify-center pt-16 "
        initial={{ opacity: 0, translateX: -100 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="relative grid h-full w-full grid-cols-1 gap-2">
          <div className="space-y-2">
            <h1 className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-cover bg-clip-text text-5xl font-semibold leading-10 tracking-tighter text-transparent bg-blend-multiply md:text-7xl">
              David Williams-Haven
            </h1>
            <div>
              <h1 className="text-2xl font-normal leading-6 tracking-tighter md:text-4xl">
                Fullstack web developer
              </h1>
              <h1 className="flex items-center text-xl">
                <IoLocationSharp /> California, US
              </h1>
            </div>

            <div>
              <h1 className="leading-0 text-lg font-semibold tracking-wide text-slate-500">
                Bio
              </h1>
              <p className="text-sm leading-4 md:text-base">
                {`I'm a motivated web developer with a strong foundation in computer
                  science. I have hands-on experience building web applications using
                  Node.js and Python web servers. I'm eager to leverage my full-stack
                  development skills and contribute to innovative projects that utilize
                  the latest technologies.`}
              </p>
            </div>
            <div className="flex gap-2">
              <Button className="gap-2" variant={"outline"} asChild>
                <Link
                  href={"/images/portfolio/Resume (7-22-24).pdf"}
                  target="_blank"
                  className="text-sm font-medium "
                >
                  <FiDownload />
                  Resume
                </Link>
              </Button>
              <Button className="gap-2" variant={"outline"} asChild>
                <Link href={"https://x.com/DavidWilliamsH4"}>
                  <FaSquareXTwitter scale={2} />
                </Link>
              </Button>
              <Button className="gap-2" variant={"outline"} asChild>
                <Link href="https://www.linkedin.com/in/david-williams-haven-32a3342a5/">
                  <FaLinkedin scale={2} />
                </Link>
              </Button>
              <Button className="gap-2" variant={"outline"} asChild>
                <Link href="https://github.com/Dave-Patsy">
                  <FaGithub scale={2} />
                </Link>
              </Button>
            </div>
          </div>
          <TechStack3 />
          <Skills />
        </div>
      </motion.div>
    </section>
  );
}
