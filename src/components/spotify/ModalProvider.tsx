"use client"
import React, { useEffect, useState } from 'react'
import UploadModal from './uploadModal';
import { api } from '@/trpc/react';
import SubscribeModal from './SubscribeModal';

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  const subscription = api.beethive.beethiveStripeRouter.getSubscription.useQuery();
  const products = api.beethive.beethiveStripeRouter.getProducts.useQuery();


  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if(subscription.isSuccess && products.isSuccess ){

    return (
      <>
        <SubscribeModal products={products.data} subscription={subscription.data}  />
        <UploadModal />
      </>
    );
  }else{
    return (
      <>
        <UploadModal />
      </>
    );

  }
}
