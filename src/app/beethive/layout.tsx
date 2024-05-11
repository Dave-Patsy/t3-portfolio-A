import ContentHeader from "@/components/beethive/content/content-header";
import Player from "@/components/beethive/player/player";
import PlayerContent from "@/components/beethive/player/player-loader";
import QueueContent from "@/components/beethive/queue/queue-content";
import Sidebar from "@/components/beethive/sidebar/side-bar";
import UploadSongModal from "@/components/beethive/upload-song-modal";
import {type ReactNode } from "react"

interface beethiveLayoutProps {
  children: ReactNode
}
export default function beethiveLayout({ children }: beethiveLayoutProps) {
  return (
    <div className="relative h-screen w-full bg-yellow-400">
      <UploadSongModal />
      <div className="absolute box-border h-full w-full ">
        <div className="h-full w-full px-2  pt-16">
          <div className=" relative flex h-full w-full flex-col justify-between gap-2 ">
            <div className="flex h-[87%] gap-2 ">
              <div className="hidden h-full w-32 rounded-md md:block">
                <Sidebar />
              </div>
              <div className="relative flex flex-grow flex-col rounded-md bg-yellow-300 overflow-clip">
                <ContentHeader />
                {children}
              </div>
              <div className="hidden h-full w-72 rounded-md  bg-yellow-300 lg:block">
                <QueueContent />
                {/* //todo add player add queue */}
              </div>
            </div>
            <div className=" h-[10%] rounded-md ">
              <PlayerContent />
              {/* //todo add player */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
