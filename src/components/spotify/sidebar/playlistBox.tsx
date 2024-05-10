'use client'
import React from 'react'
import { api } from '@/trpc/react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type PlaylistBoxProps= {
  playLists: {
      id: string;
      name: string;
      createdAt: Date;
      UpdatedAt: Date;
      userId: string;
  }[]
}

export default function PlaylistBox({playLists}:PlaylistBoxProps) {
  const playlistAPI = api.BeatHive.songsRouter.getPlaylist.useQuery(
    undefined,
    {
      initialData: playLists,
    },
  );
  return (
    <>
      {playlistAPI.data.map((ele, idx) => (
        <TooltipProvider key={idx}>
          <Tooltip delayDuration={50}>
            <TooltipTrigger asChild>
              <div className=" h-12 w-12 rounded-md bg-red-600" key={idx}></div>
            </TooltipTrigger>
            <TooltipContent className="absolute origin-left">
              <h1 className=' whitespace-nowrap'>{ele.name}</h1>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </>
  );
}
