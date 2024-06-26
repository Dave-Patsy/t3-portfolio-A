'use client'

import {FcGoogle} from 'react-icons/fc'
import { FaGithub, FaDiscord } from "react-icons/fa";

import { Button } from '../ui/button';
// import { signIn } from '@/server/auth';
import {signIn} from 'next-auth/react'
export default function Social() {
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => signIn("google")}
      >
        <FcGoogle className="h-6 w-6" />
      </Button>
      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => signIn("github")}
      >
        <FaGithub className="h-6 w-6" />
      </Button>
      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => signIn("discord")}
      >
        <FaDiscord className="h-6 w-6" />
      </Button>
    </div>
  );
}
