'use client'
import React, { useEffect, useRef, useState } from 'react'
import { api } from '@/trpc/react'
import { useVirtualizer  } from "@tanstack/react-virtual"
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type LikedContentProps = {
  favorites:
    | {
        id: string;
        userId: string;
        title: string;
        artist: string;
        genre: string | null;
        released_date: string | null;
        song_path: string;
        image_path: string;
        createdAt: Date;
        UpdatedAt: Date;
      }[]
    | undefined;
};
export default function VirtualLikedContent({ favorites }: LikedContentProps) {
  const favoriteAPI = api.BeatHive.songsRouter.getLikedSongs.useQuery(
    undefined,
    {
      initialData: favorites,
      refetchOnMount: false,
    },
  );
  const parentRef = useRef<HTMLDivElement>(null)

  const x = favoriteAPI.data?.length
  const  [test, setTest] = useState(96)
  
  const rowVirtualizer = useVirtualizer({
    count: x ?? 0,
    getScrollElement: () => parentRef.current,
    // estimateSize: () => 64,
    estimateSize: () => test,
  });

  if (!favoriteAPI.data?.length) return null
  

  return (
    <>
      {/* The scrollable element for your list */}
      <div ref={parentRef} className="flex-1 overflow-y-auto">
        {/* The large inner element to hold all of the items */}
        <div
          // className={` relative w-full h-[${rowVirtualizer.getTotalSize()}px] bg-yellow-200`}
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {/* Only the visible items in the virtualizer, manually positioned to be in view */}
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              className={cn(
                `absolute left-0 top-0 flex w-full items-center]`,
              )}
              style={{
                height:`${test}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <div className="flex w-full items-center justify-center">
                <div className="flex w-16 min-w-[2rem] items-center justify-center">
                  {virtualItem.index + 1}
                </div>
                <div className="relative flex h-12 min-h-[3rem] w-12 min-w-[3rem] items-center justify-center">
                  <Image
                    src={`https://utfs.io/f/${favoriteAPI.data?.at(
                      virtualItem.index,
                    )?.image_path}`}
                    fill={true}
                    sizes="(max-width: 768px) 12vw, (max-width: 1200px) 12vw, 12vw"
                    alt={favoriteAPI.data?.at(virtualItem.index)?.title ?? ""}
                  />
                </div>
                <div className="w-96 whitespace-nowrap pl-4 text-sm md:flex-1">
                  <h1>{favoriteAPI.data?.at(virtualItem.index)?.title}</h1>
                  <h1>{favoriteAPI.data?.at(virtualItem.index)?.artist}</h1>
                </div>
                <div className=" relative flex w-64 items-center justify-center">
                  <TooltipProvider>
                    <Tooltip delayDuration={50}>
                      <TooltipTrigger asChild>
                        <Heart className="mx-4 fill-emerald-500 text-emerald-500" />
                      </TooltipTrigger>
                      <TooltipContent sideOffset={5} side="left" align="start">
                        <p className="origin-left whitespace-nowrap">
                          Remove From Your Library
                          {/* {favoriteAPI.data?.at(idx)?.title} */}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
