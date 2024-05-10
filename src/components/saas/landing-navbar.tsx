"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import type { Session } from "next-auth";


const font = Montserrat({ weight: "600", subsets: ["latin"] });

type props = {
  session: Session | null
}

export const LandingNavbar = ({session}:props) => {
 

  return (
    <nav className=" flex items-center justify-between bg-transparent p-4 pt-16">
      <Link href="/" className="flex items-center">
        <div className="relative mr-4 h-8 w-8">
          <Image fill alt="Logo" src="/images/logo.png" />
        </div>
        <h1 className={cn("text-2xl font-bold text-white", font.className)}>
          WebForge
        </h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={session ? "/WebForge/dashboard" : "/sign-in"}>
          <Button variant="outline" className="rounded-full">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};
