'use client'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import useQueue from '@/hooks/spoty/useQueue'
import {useVirtualizer} from '@tanstack/react-virtual'
import Image from 'next/image'
import { useRef } from 'react'


export default function QueueContent() {
  const parentRef = useRef(null)
  const queue = useQueue()
  const rowVirtualizer = useVirtualizer({
    count: queue.songs.length,
    getScrollElement: ()=> parentRef.current,
    estimateSize:() => 350,
    paddingEnd: 10,
  
  })
  return (
    <div className="hidden md:block h-full w-full overflow-clip rounded-md">
      <h1 className="pl-4 text-2xl font-normal tracking-tighter">Queue</h1>
      <div
        ref={parentRef}
        style={{
          height: `100%`,
          paddingTop: "12px",
          paddingBottom: "12px",
          // marginBottom:'8px',
          // overflow: "auto", // Make it scroll!
        }}
        className="overflow-y-auto scrollbar scrollbar-thumb-slate-400 scrollbar-w-2  scrollbar-h-8"
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
          className=""
        >
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
              <div className="relative h-full w-full">
                <div
                  className="relative mx-auto my-auto flex h-[95%] w-11/12 flex-col items-center justify-center rounded-md bg-orange-400 data-[match=true]:bg-orange-600"
                  data-match={
                    queue.songs.at(virtualItem.index)?.id == queue.activeSong?.id
                  }
                  onClick={() =>
                    queue.setSong(queue.songs.at(virtualItem.index)!)
                  }
                >
                  <div className="relative flex w-11/12  items-center justify-center ">
                    <AspectRatio ratio={1}>
                      <Image
                        src={`https://utfs.io/f/${
                          queue.songs.at(virtualItem.index)?.image_path
                        }`}
                        fill={true}
                        sizes="(max-width: 768px) 12vw, (max-width: 1200px) 12vw, 12vw"
                        alt={queue.songs.at(virtualItem.index)?.title ?? ""}
                      />
                    </AspectRatio>
                  </div>
                  <div className="w-11/12 text-start">
                    <h1>{queue.songs.at(virtualItem.index)?.title}</h1>
                    <h1>{queue.songs.at(virtualItem.index)?.artist}</h1>
                  </div>
                  {/* Row {virtualItem.index} */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
