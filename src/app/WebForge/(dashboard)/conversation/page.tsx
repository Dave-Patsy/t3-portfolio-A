"use client";

import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { useRouter } from "next/navigation";



import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";



import { formSchema } from "./constants";


import type { z } from "zod";
import { api } from "@/trpc/react";
import { useProModal } from "@/hooks/saas/use-pro-modal";
import { Heading } from "@/components/saas/heading";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/saas/loader";
import { Empty } from "@/components/saas/empty";
import { UserAvatar } from "@/components/saas/user-avatar";
import { BotAvatar } from "@/components/saas/bot-avatar";
import { cn } from "@/lib/utils";
import {type ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { toast } from "sonner";




const ConversationPage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const conversation = api.WebForge.conversationRoute.conversation.useMutation({
    onSuccess(data) {
      setMessages((current) => [...current,data.choices.at(0)!.message]);
      form.reset();
    },
    onSettled:()=>{
      router.refresh();
    }
  })
  const isLoading = conversation.isPending

  const onSubmit =  (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: values.prompt,
      };
      setMessages((current) => [...current, userMessage]);
      const newMessages = [...messages, userMessage];
      conversation.mutate(  {message:newMessages} );

    } catch (error) {

      if(error instanceof Error){

        if (error.cause === 403) {
          proModal.onOpen();
        } else {
          toast.error("Something went wrong.");
        }
      }
    } 
  };

  return (
    <div>
      <Heading
        title="Conversation"
        description="Our most advanced conversation model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
                grid 
                w-full 
                grid-cols-12 
                gap-2 
                rounded-lg 
                border 
                p-4
                px-3
                focus-within:shadow-sm
                md:px-6
              "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent indent-2"
                        disabled={isLoading}
                        type="text"
                        placeholder="How do I calculate the radius of a circle?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 w-full lg:col-span-2"
                type="submit"
                disabled={isLoading}
                size="icon"
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="mt-4 space-y-4">
          {isLoading && (
            <div className="flex w-full items-center justify-center rounded-lg bg-muted p-8">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="No conversation started." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) =>{
              if(message.content?.at(0)){

                return (
                 
                 <div
                   key={message.content.at(0)?.toString()}
                   className={cn(
                      "flex w-full items-start gap-x-8 rounded-lg p-8",
                      message.role === "user"
                        ? "border border-black/10 bg-muted-foreground"
                        : "bg-muted",
                   )}
                  >
                    {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                    <p className="text-sm">{message.content?.toString()}</p>
                  </div>
               )
              }
            }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
