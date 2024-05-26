'use client'
import useOnPlay from "@/hooks/beethive/useOnPlay";
import useQueue from "@/hooks/beethive/useQueue";
import { type Songs } from "@prisma/client";
import {Play}from"lucide-react";
import {type Session } from "next-auth";

type useOnPlayProps = {
  songs: Songs[];
  session: Session | null;
};

export default function PlayButton({songs,session}:useOnPlayProps){
  const onPlay = useOnPlay({ songs, session });
  const queue = useQueue()
  if(!songs) return null
  return (
    <div className="flex justify-center items-center">

      <div
        className="flex h-10 w-10 cursor-pointer items-center
          justify-center rounded-full bg-orange-500 text-yellow-200"
        onClick={() => {
          queue.setSongs(songs.map((song) => song))
          queue.setSong(songs.at(0)!);
        }}
      >
        <Play />
      </div>
    </div>
  );
}
