import React from 'react'
import SearchBar from './_components/searchBar'
import ContentHeader from '@/components/spotify/contentContainer/contentHeader'
import { getServerAuthSession } from '@/server/auth'

export default async function Page() {
  const session = await getServerAuthSession()
  return (
    <div>
      <ContentHeader session={session} />
      <div className='pl-8'>

        <SearchBar />
      </div>
    </div>
  );
}
