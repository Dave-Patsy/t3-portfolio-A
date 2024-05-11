'use client'
import React from 'react'
import { Button } from '@/components/ui/button';

import { type RouterOutputs, api } from "@/trpc/react";
import useSubscribeModal from '@/hooks/beethive/useSubscribeModal';

type subscriptionProps = {
  subscription: RouterOutputs["beethive"]["beethiveStripeRouter"]["getSubscription"];
};
export default function Subscription({subscription}:subscriptionProps) {

  const subscribeModal = useSubscribeModal()
  const portalURL =
    api.beethive.beethiveStripeRouter.createPortalLink.useMutation({
      onSuccess(data) {
        window.location.assign(data);
      },
    });

  const redirectToCustomerPortal =  () => {
    portalURL.mutate()
  } 
  
  console.log('subscription',subscription)
  return (
    <div className="mb-7 px-6">
      {!!!subscription?.length && (
        <div className="flex flex-col gap-y-4">
          <p>No active plan.</p>
          <Button onClick={subscribeModal.onOpen} className="w-[300px]">
            Subscribe
          </Button>
        </div>
      )}
      {!!subscription?.length && (
        <div className="flex flex-col gap-y-4">
          <p>
            You are currently on the
            <b> {subscription.at(0)?.price?.product?.name} </b>
            plan.
          </p>
          <Button
            disabled={portalURL.isPending}
            onClick={redirectToCustomerPortal}
            className="w-[300px]"
          >
            Open customer portal
          </Button>
        </div>
      )}
    </div>
  );
}
