import ContentHeader from "@/components/spoty/content/content-header";
import ContentMain from "@/components/spoty/content/content-main";
import UploadSongButton from "@/components/spoty/upload-song-button";
import UploadSongModal from "@/components/spoty/upload-song-modal";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import Image from "next/image";



export default async function Page() {
  const songs = await api.spoty.spotySongRouter.getSongs()
  const session = await auth()
  return (
    <div className="relative flex h-full w-full flex-col overflow-y-scroll scrollbar scrollbar-thumb-slate-400   scrollbar-w-2 scrollbar-h-8 ">
      
      <ContentMain songs={songs} session={session} />
      {/* <UploaderArea  /> */}
    </div>
  );
}
