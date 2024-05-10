
import { api } from '@/trpc/server';
import SearchBar from './_components/searchBar'
import { auth } from '@/server/auth';
import PlayButton from '../likedsongs/_components/play-button';
import VirtualLikedContent from '../likedsongs/_components/virtualLikedContent';

export default async function Page() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const favoriteApi: Songs[] = await api.BeatHive.songsRouter.getLikedSongs();
  const session = await auth();

  return (
    <div className="flex-grow-1 relative flex flex-col overflow-y-auto scrollbar scrollbar-thumb-slate-400 scrollbar-w-2  scrollbar-h-8">
      <div className="flex content-center items-center gap-4">
        <h1 className="ml-8  text-5xl font-bold leading-3 tracking-tighter">
          Favorites
        </h1>
        <PlayButton songs={favoriteApi} session={session} />
      </div>
      {/* <LikedContent favorites={favoriteApi} /> */}
      <VirtualLikedContent favorites={favoriteApi} />
    </div>
  );

  return (
    <div>
      <div className="pl-8">
        <SearchBar />
      </div>
    </div>
  );
}

