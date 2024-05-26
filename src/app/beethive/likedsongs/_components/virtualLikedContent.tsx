'use client'
import React, { useRef } from 'react'
import { api } from '@/trpc/react'
import { useVirtualizer  } from "@tanstack/react-virtual"
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import useQueue from '@/hooks/beethive/useQueue';

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

  const queue = useQueue()
  const favoriteAPI = api.beethive.beethiveSongRouter.getLikedSongs.useQuery(
    undefined,
    {
      initialData: favorites,
      refetchOnMount: false,
    },
  );
  
  const parentRef = useRef<HTMLDivElement>(null)
  
  const rowVirtualizer = useVirtualizer({
    count: favoriteAPI.data?.length ?? 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120,
    paddingEnd: 10,
    paddingStart:10,
  });

  if (!favoriteAPI.data?.length) return null
  

  return (
    <>
      {/* The scrollable element for your list */}
      <div
        ref={parentRef}
        style={{
          height: `100%`,
          paddingTop: "12px",
          paddingBottom: "12px",
        }}
        className="overflow-y-auto scrollbar scrollbar-thumb-slate-400 scrollbar-w-2  scrollbar-h-8"
      >
        {/* The large inner element to hold all of the items */}
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
          className=""
        >
          {/* Only the visible items in the virtualizer, manually positioned to be in view */}
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <div
                className="mx-auto my-auto flex h-[95%] w-11/12 cursor-pointer items-center justify-center rounded-md bg-orange-400 transition duration-100 ease-in-out hover:bg-orange-600"
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                onClick={() =>queue.setSong(favoriteAPI.data?.at(virtualItem.index))}
              >
                <div className="flex w-16 min-w-[2rem] items-center justify-center">
                  {virtualItem.index + 1}
                </div>
                <div className="w-18 relative flex aspect-square rounded-md overflow-clip min-w-20  items-center justify-center">
                  <AspectRatio ratio={1} className="rounded-md">
                    <Image
                      src={`https://utfs.io/f/${
                        favoriteAPI.data?.at(virtualItem.index)?.image_path
                      }`}
                      fill={true}
                      sizes="(max-width: 768px) 12vw, (max-width: 1200px) 12vw, 12vw"
                      alt={favoriteAPI.data?.at(virtualItem.index)?.title ?? ""}
                    />
                  </AspectRatio>
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
