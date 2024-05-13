import React from 'react'
import { api } from '@/trpc/server';
import Subscription from './_components/subscription';

export default async function Page() {

  const subscription = await api.beethive.beethiveStripeRouter.getSubscription()

  
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
