"use client"

import useQueue from '@/hooks/beatHive/useQueue';
import Image from 'next/image';
import React from 'react'


export default function MediaItem() {
  const queue = useQueue()
  return (
    <div
      className="
        flex 
        w-full 
        cursor-pointer 
        items-center 
        gap-x-3 
        rounded-md 
        p-2 
        hover:bg-neutral-800/50
      "
    >
      <div
        className="
          relative 
          min-h-[48px] 
          min-w-[48px] 
          overflow-hidden 
          rounded-md
        "
      >
        <Image
          fill
          src={
            `https://utfs.io/f/${queue.activeSong?.image_path}` ||
            "/images/music-placeholder.png"
          }
          alt="MediaItem"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="truncate text-white">{queue.activeSong?.title}</p>
        <p className="truncate text-sm text-neutral-400">
          By {queue.activeSong?.artist}
        </p>
      </div>
    </div>
  );
}
