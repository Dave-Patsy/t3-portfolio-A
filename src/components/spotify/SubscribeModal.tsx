"use client";

import type { Prices } from "@prisma/client";
import React from "react";
import { getStripe } from "@/stripe/stripeClient";
import {type RouterOutputs, api } from "@/trpc/react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import useSubscribeModal from "@/hooks/beethive/useSubscribeModal";
import { loadStripe } from "@stripe/stripe-js";
import { env } from "@/env";



interface SubscribeModalProps {
  subscription: RouterOutputs["beethive"]["beethiveStripeRouter"]["getSubscription"];
  products: RouterOutputs["beethive"]["beethiveStripeRouter"]["getProducts"];
}

const formatPrice = (price: Prices) => {
  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency ?? undefined,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount ?? 0) / 100);

  return priceString;
};

const SubscribeModal: React.FC<SubscribeModalProps> = ({ products,subscription }) => {
  const subscribeModal = useSubscribeModal();

  const onChange = (open: boolean) => {
    if (!open) {
      subscribeModal.onClose();
    }
  };
  const portalURL =
    api.beethive.beethiveStripeRouter.createCheckoutSession.useMutation({
      async onSuccess(data) {
        const stripe = await getStripe();
        await stripe?.redirectToCheckout({ sessionId: data });
      },
    });

  const handleCheckout =  (price: Prices) => {
    console.log('handleCheckout',price)
    portalURL.mutate({price:price.id})
  };

  let content = <div className="text-center">No products available.</div>;

  if (products.length) {
    content = (
      <div>
        {products.map((product) => {
          if (!product.prices?.length) {
            return <div key={product.id}>No prices available</div>;
          }

          return product.prices.map((price) => (
            <Button
              key={price.id}
              onClick={() => handleCheckout(price)}
              disabled={portalURL.isPending}
              className="mb-4"
            >
              {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
            </Button>
          ));
        })}
      </div>
    );
  }

  if (!subscription) {
    content = <div className="text-center">Already subscribed.</div>;
  }

  return (
    <>
      <Dialog open={subscribeModal.isOpen} onOpenChange={onChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Only for premium users</DialogTitle>
            <DialogDescription>
              Listen to music with Spotify Premium
            </DialogDescription>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubscribeModal;
