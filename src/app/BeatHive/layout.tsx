import React from 'react'
import ModalProvider from '@/components/spotify/ModalProvider';
import Player from '@/components/spotify/player';
import SideBar from '@/components/spotify/sidebar/sideBar';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}){
  return (
    <div className="relative flex-1">
      <ModalProvider />
      <div className="absolute flex h-full w-full flex-1 pt-16">
        <div className="flex h-full w-full flex-col gap-2 p-2">
          <div className="flex flex-grow gap-4">
            <div className=" flex h-full w-16  ">
              <div className="h-full w-full overflow-hidden rounded-md bg-slate-100 drop-shadow  dark:bg-white/40">
                <div className="scrollbar-width-thin scrollbar-thumb-blue-500/50 scrollbar-track-gray-200 my-auto h-full w-full overflow-y-auto">
                  <SideBar />
                </div>
              </div>
            </div>
            <div className=" flex-1 overflow-clip rounded-md bg-slate-100 drop-shadow dark:bg-white/10">
              {children}
            </div>
          </div>
          <Player className=" h-20 rounded-md bg-black/80" />
        </div>
      </div>
    </div>
  );
}
