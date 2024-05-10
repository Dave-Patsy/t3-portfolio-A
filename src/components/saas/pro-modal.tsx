"use client";

import { Check, Zap } from "lucide-react";


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { tools } from "@/constants";
import { Card } from "@/components/ui/card";

import { useProModal } from "@/hooks/saas/use-pro-modal";
import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";




export const ProModal = () => {
  const proModal = useProModal();


  const subscribe = api.WebForge.stripeRoute.stripe.useMutation({
    onSuccess(data) {
      if (data.url) window.location.href = data.url;
    },
    onError() {
      toast.error("Something went wrong");
    },
  })
  const loading = subscribe.isPending
  const onSubscribe =  () => {
    try {
      subscribe.mutate()
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center justify-center gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 text-xl font-bold">
              Upgrade to WebForge
              <Badge variant="default" className="py-1 text-sm uppercase">
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="space-y-2 pt-2 text-center font-medium text-zinc-900">
            {tools.map((tool) => (
              <Card
                key={tool.href}
                className="flex items-center justify-between border-black/5 p-3"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn("w-fit rounded-md p-2", tool.bgColor)}>
                    <tool.icon className={cn("h-6 w-6", tool.color)} />
                  </div>
                  <div className="text-sm font-semibold">{tool.label}</div>
                </div>
                <Check className="h-5 w-5 text-primary" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={onSubscribe}
            size="lg"
            variant="default"
            className="w-full"
          >
            Upgrade
            <Zap className="ml-2 h-4 w-4 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
