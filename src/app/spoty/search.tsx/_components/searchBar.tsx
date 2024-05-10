'use client'
import React from 'react'
import {debounce} from 'lodash'
import { api } from '@/trpc/react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';

export default function SearchBar() {


  const songs = api.spoty.spotySongRouter.searchSongs.useMutation()
  const handleInputChange = debounce((value: string) => {
    songs.mutate({searchParam:value})
  }, 300);
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if(e.target.value.length > 0) handleInputChange(value);
  };
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl font-semibold tracking-tight">Search</h1>
      <input
        className="w-60 rounded-sm indent-2 text-black"
        onChange={onInputChange}
        placeholder="Night In Tokyo"
      />
      <div className="flex-grow overflow-y-auto">
        {songs.data?.map((ele) => (
          <div key={ele.id} className="w-52 rounded-md">
            <AspectRatio ratio={1}>
              <Image
                src={`https://utfs.io/f/${ele.image_path}`}
                fill={true}
                sizes="(max-width: 768px) 12vw, (max-width: 1200px) 12vw, 12vw"
                alt={ele.title ?? ""}
              />
            </AspectRatio>
            <h1>{ele.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
