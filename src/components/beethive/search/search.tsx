'use client'

import React from 'react'
import {debounce} from 'lodash'
import { api } from '@/trpc/react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';

export default function SearchBar() {


  const songs = api.beethive.beethiveSongRouter.searchSongs.useMutation()
  const handleInputChange = debounce((value: string) => {
    songs.mutate({searchParam:value})
  }, 300);
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if(e.target.value.length > 0) handleInputChange(value);
  };
  return (
    <div>
      <h1 className='text-4xl font-semibold tracking-tight pb-4'>Search</h1>
      <input
        className="rounded-sm indent-2 text-black"
        onChange={onInputChange}
        placeholder="Night In Tokyo"
      />
      <div className='grid md:grid-cols-3 lg:grid-cols-6 gap-4 pt-8'>

        {songs.data?.map((ele) => (
          <div key={ele.id} className='flex flex-col w-full justify-center items-center gap-2 pb-2 rounded-md bg-orange-400 hover:bg-orange-600 cursor-pointer duration-100'>
            <div className="relative flex w-5/6 items-center justify-center pt-4">
              <AspectRatio ratio={1}>
                <Image
                  src={`https://utfs.io/f/${ele?.image_path}`}
                  fill={true}
                  sizes="(max-width: 768px) 12vw, (max-width: 1200px) 12vw, 12vw"
                  alt={ele?.title ?? ""}
                  className='rounded-md'
                />
              </AspectRatio>
            </div>
            <div className='flex flex-col w-5/6 text-start leading-4'>
              <h1>{ele.title}</h1>
              <h1>{ele.artist}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}