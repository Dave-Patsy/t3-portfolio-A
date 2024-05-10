"use client"
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react'

import { useRouter } from 'next/navigation';

import AvatarButton from './avatarButton';
import type { Session } from 'next-auth';

type NavBarProps = {
  session:Session | null
}

export default function ContentHeader({session}:NavBarProps) {
  const router = useRouter()

  return (
    <div className="flex h-24 items-center justify-between gap-2">
      <div className=" flex gap-4 pl-4 text-xl">
        <ChevronLeft
          onClick={() => router.back()}
          size={32}
          className="cursor-pointer"
        />
        <ChevronRight
          onClick={() => router.forward()}
          size={32}
          className="cursor-pointer"
        />
      </div>
      <div className="pr-16">
        <AvatarButton session={session} />
      </div>
    </div>
  );
}
