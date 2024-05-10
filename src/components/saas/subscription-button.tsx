"use client";

import { Zap } from "lucide-react";


import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { toast } from "sonner";



export const SubscriptionButton = ({ isPro = false }: { isPro: boolean }) => {


  const subscribe = api.WebForge.stripeRoute.stripe.useMutation({
    onSuccess(data) {
      if (data.url) window.location.href = data.url;
    },
  });

  const loading = subscribe.isPending
  const onClick = () => {
    try {
      subscribe.mutate()

    } catch (error) {
      toast.error("Something went wrong");
    } 
  };

  return (
    <Button
      variant={isPro ? "default" : "secondary"}
      disabled={loading}
      onClick={onClick}
    >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};
