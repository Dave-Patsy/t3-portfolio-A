import React from 'react'
import ContentHeader from '@/components/spotify/contentContainer/contentHeader'
import { getServerAuthSession } from '@/server/auth'
import { api } from '@/trpc/server';
import Subscription from './_components/subscription';

export default async function Page() {
  const session = await getServerAuthSession()
  const subscription = await api.BeatHive.beatHiveStripeRouter.getSubscription()

  return (
    <div>
      <div className='pl-8 pt-8 space-y-4'>
        <h1 className="text-6xl font-bold tracking-tighter pb-4">
          Account Settings
        </h1>
        <h1 className="text-2xl font-semibold tracking-tighter">Subscription</h1>
        <Subscription subscription={subscription} />
      </div>
    </div>
  );
}
