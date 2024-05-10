import type  { Songs } from "@prisma/client";
import useQueue from "./useQueue";
import {  signIn } from "next-auth/react";
import type { Session } from "next-auth";

type useOnPlayProps = {
  songs: Songs[];
  session :Session | null
};
const useOnPlay = ({songs, session}:useOnPlayProps) =>{
  const queue = useQueue()
  const onPlay = (song:Songs) => {
    if(!session) {
      void signIn()
    }
    queue.setSong(song)
    queue.setSongs(songs.map((song)=>song))
  } 

  return onPlay
}

export default useOnPlay