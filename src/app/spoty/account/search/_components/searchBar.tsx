'use client'
import React from 'react'
import {debounce} from 'lodash'
import { api } from '@/trpc/react';

export default function SearchBar() {


  const songs = api.BeatHive.songsRouter.searchSongs.useMutation()
  const handleInputChange = debounce((value: string) => {
    songs.mutate({searchParam:value})
  }, 300);
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if(e.target.value.length > 0) handleInputChange(value);
  };
  return (
    <div>
      <input
        className="rounded-sm indent-2 text-black"
        onChange={onInputChange}
        placeholder="Night In Tokyo"
      />
      {songs.data?.map((ele) => (
        <>
          <h1>{ele.title}</h1>
        </>
      ))}
    </div>
  );
}
