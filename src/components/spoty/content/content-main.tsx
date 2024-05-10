'use client'
import { AspectRatio } from '@/components/ui/aspect-ratio';
import React from 'react'
import UploadSongButton from '../upload-song-button';
import Image from 'next/image';
import type { Songs } from '@prisma/client';
import useOnPlay from '@/hooks/spoty/useOnPlay';
import type { Session } from 'next-auth';
import { api } from '@/trpc/react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

interface ContentMainProps {
  songs: Songs[]
  session: Session | null
}

export default function ContentMain({songs,session}: ContentMainProps) {
  const onPlay = useOnPlay({songs,session})
  const {data:songData} = api.spoty.spotySongRouter.getSongs.useQuery(undefined,{
    initialData:songs
  })

  const router = useRouter();
  const handleTopPicksClick = async () => {
    if (session) {
      router.push("/spoty/likedsongs");
    } else {
      await signIn();
    }
  };

  return (
    <>
      <h1 className="pl-2 text-5xl font-bold tracking-tight">Good Afternoon</h1>
      <div className="m-4 grid h-32 grid-cols-1 items-center justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div
          className="flex h-24 w-full cursor-pointer items-center justify-start overflow-clip rounded-md bg-white/10"
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
      <div className="w-72 px-2 pt-4 ">
        <UploadSongButton>
          <span>Upload song!</span>
        </UploadSongButton>
      </div>
      <div className="grid grid-cols-1 gap-2 px-2 py-4  md:grid-cols-2  lg:grid-cols-8">
        {songData.map((song) => (
          <div
            key={song.id}
            className="t flex w-full cursor-pointer flex-col"
            onClick={() => onPlay(song)}
          >
            <AspectRatio ratio={1}>
              <Image
                src={`https://utfs.io/f/${song.image_path}`}
                alt={`song image`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </AspectRatio>
            <div className="pt-1 leading-4 tracking-tight">
              <h1 className="text-lg text-black">{song.title}</h1>
              <h1 className="text-sm font-normal text-slate-600">
                {song.artist}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
