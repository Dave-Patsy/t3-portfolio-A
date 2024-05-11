'use client'

import type { Session } from 'next-auth'
import React from 'react'

import type { Songs } from '@prisma/client';


import ContentHeader from './contentHeader';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import useOnPlay from '@/hooks/beethive/useOnPlay';
// import ContentHeader from './contentHeader';

type pageContentProps = {
  session: Session | null;
  songs: Songs[]
};

export default function PageContent({session,songs}:pageContentProps) {
  const onPlay = useOnPlay({songs,session});
  const router = useRouter()

  const handleTopPicksClick = async() =>{
    if(session){
      router.push("/beethive/likedsongs");
    } else{
      await signIn();
    } 
  }

  return (
    <div className="absolute h-full w-full  rounded-md bg-white/10 overflow-y-auto">
      <ContentHeader session={session} />

      <div className="relative flex h-60 flex-col overflow-y-auto">
        <h1 className="pl-8 text-5xl font-bold tracking-tight">
          Good Afternoon
        </h1>
        <div className="m-4 grid h-32 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-items-center gap-4">

            <div className="flex h-24 w-full cursor-pointer items-center justify-start overflow-clip rounded-md bg-white/10"
              onClick={handleTopPicksClick}
            >
              <div className="relative h-24 w-24">
                <Image
                  fill={true}
                  src={"/images/liked.png"}
                  alt={"liked songs"}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h1 className="flex-grow pl-4 text-start text-lg font-normal tracking-tight">
                Favorites
              </h1>
            </div>

        </div>
      </div>
      <div>
        <h1 className="pl-8 text-5xl font-bold tracking-tight">Your Songs</h1>
        <div className="px-8 m-4 grid grid-cols-1  content-center items-center justify-center justify-items-center gap-4 md:grid-cols-3 lg:grid-cols-5">
          {songs.map((ele, idx) => (
            <div
              key={idx}
              className="flex h-44 w-40 md:h-52 md:w-44 lg:h-60 lg:w-52 cursor-pointer flex-col items-center justify-center rounded-md bg-slate-200 dark:bg-white/10 drop-shadow-sm shadow"
              onClick={() => onPlay(ele)}
            >
              <div className="relative h-32 w-32 overflow-clip rounded-md">
                <Image
                  src={`https://utfs.io/f/${ele.image_path}`}
                  fill={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt={ele.title}
                />
              </div>
              <h1>{ele.title}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
              
              
              
              
