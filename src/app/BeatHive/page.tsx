'server-only'
import PageContent from "@/components/spotify/contentContainer/pageContent";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";


export default async function Home() {
  const session = await getServerAuthSession()
  const songsAPI = await api.BeatHive.songsRouter.getSongs()
  return (
    <div className="relative h-full">
      <PageContent session={session} songs={songsAPI} />
    </div>
  );
}

