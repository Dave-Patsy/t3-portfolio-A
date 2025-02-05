"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { IoLocationSharp } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import TechStack4 from "./stack-test-4";
import SkillsPortfolio1 from "./skills-test-1";
import TestSkillsPortfolio from "./test-skills";
import TestTechStack from "./test-stack";

export default function TestIntro() {
  return (
    <section id="intro" className="relative pt-16 w-full">
      <motion.div
        className="mx-auto max-w-7xl px-6"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="grid gap-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              David Williams-Haven
            </h1>
            <div>
              <p className="text-2xl md:text-4xl font-normal">
                Fullstack web developer
              </p>
              <p className="flex items-center text-xl">
                <IoLocationSharp className="mr-1" /> California, US
              </p>
            </div>

            {/* Bio */}
            <div>
              <h2 className="text-lg font-semibold text-slate-500 tracking-wide">
                Bio
              </h2>
              <p className="text-sm md:text-base">
                {`I'm a motivated web developer with a strong foundation in computer
                science. I have hands-on experience building web applications using
                Node.js and Python web servers. I'm eager to leverage my full-stack
                development skills and contribute to innovative projects that utilize
                the latest technologies.`}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" asChild className="flex items-center gap-2">
                <Link href="/images/portfolio/Resume (7-22-24).pdf" target="_blank">
                  <FiDownload /> Resume
                </Link>
              </Button>
              <Button variant="outline" asChild className="flex items-center gap-2">
                <Link href="https://x.com/DavidWilliamsH4">
                  <FaSquareXTwitter />
                </Link>
              </Button>
              <Button variant="outline" asChild className="flex items-center gap-2">
                <Link href="https://www.linkedin.com/in/david-williams-haven-32a3342a5/">
                  <FaLinkedin />
                </Link>
              </Button>
              <Button variant="outline" asChild className="flex items-center gap-2">
                <Link href="https://github.com/Dave-Patsy">
                  <FaGithub />
                </Link>
              </Button>
            </div>
          </div>

          {/* Tech Stack */}
          {/* <TechStack4 /> */}
          <TestTechStack/>
          <TestSkillsPortfolio/>
          {/* Skills */}
          {/* <SkillsPortfolio1 /> */}
        </div>
      </motion.div>
    </section>
  );
}
