import React from 'react'
import ContentHeader from '@/components/spotify/contentContainer/contentHeader'
import { getServerAuthSession } from '@/server/auth'
import { api } from '@/trpc/server'
import VirtualLikedContent from './_components/virtualLikedContent'

export default async function Page() {
  const favoriteApi = await api.BeatHive.songsRouter.getLikedSongs()
  const session = await getServerAuthSession()
  return (
    <div className="flex flex-col h-full">
      <ContentHeader session={session} />
      <h1 className="ml-8 pb-8 text-5xl font-bold tracking-tighter">
        Favorites
      </h1>
      {/* <LikedContent favorites={favoriteApi} /> */}
      <VirtualLikedContent favorites={favoriteApi} />
    </div>
  );
}
