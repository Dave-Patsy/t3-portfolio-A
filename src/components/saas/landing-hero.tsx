"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";




import { signIn, useSession } from "next-auth/react";
import { Button } from "../ui/button";

export const LandingHero = () => {
  const session = useSession();

  return (
    <div className="space-y-5 py-36 text-center font-bold text-white">
      <div className="space-y-5 text-4xl font-extrabold text-black dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
        <h1>The Best AI Tool for</h1>
        <div className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          <TypewriterComponent
            options={{
              strings: [
                "Chatbot.",
                "Photo Generation.",
                "Blog Writing.",
                "Mail Writing.",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm font-light text-zinc-400 md:text-xl">
        Create content using AI 10x faster.
      </div>
      <div>
        {session.data ? (
          <Link href={"/WebForge/dashboard" }>
            <Button
              variant="outline"
              className="rounded-full bg-primary p-4 font-semibold text-primary-foreground md:p-6 md:text-lg"
            >
              Start Generating For Free
            </Button>
          </Link>
        ) : (
          
            <Button
              variant="outline"
              className="rounded-full bg-primary p-4 font-semibold text-primary-foreground md:p-6 md:text-lg"
              onClick={()=>signIn()}
            >
              Start Generating For Free
            </Button>
       
        )}
      </div>
      <div className="text-xs font-normal text-zinc-400 md:text-sm">
        No credit card required.
      </div>
    </div>
  );
};