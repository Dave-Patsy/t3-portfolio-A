import { Home,  Search } from "lucide-react";

import Library from "./library";

import Link from "next/link";
// import { api } from "~/trpc/server";

import { Separator } from "@/components/ui/separator";
import { auth } from "@/server/auth";

export default async function SideBar(){
  const session = await auth()
  if(session){
    // const playLists = await api.spotifyRoot.songsRouter.getPlaylist.query()
    return (
      <div className="flex w-full flex-col items-center justify-center gap-4 pt-4">
        <Link href={"/BeatHive"}>
          <Home className="text-center text-black" />
        </Link>
        <Link href={"/BeatHive/search"}>
          <Search className="text-center text-black" />
        </Link>
        <Separator className="w-11/12" />
        <Library session={session} />
        {/* <PlaylistBox playLists={playLists}/> */}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 pt-4">
      <Link href={"/BeatHive"}>
        <Home className="text-center text-black" />
      </Link>
      <Link href={"/BeatHive/search"}>
        <Search className="text-center text-black" />
      </Link>
      <Separator className="w-11/12" />
      <Library session={null} />
    </div>
  );
}