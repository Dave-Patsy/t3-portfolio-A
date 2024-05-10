"use client";

import type * as z from "zod";

import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";

import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";


import { BotAvatar } from "@/components/saas/bot-avatar";
import { Heading } from "@/components/saas/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { Loader } from "@/components/saas/loader";
import { UserAvatar } from "@/components/saas/user-avatar";
import { Empty } from "@/components/saas/empty";
import { useProModal } from "@/hooks/saas/use-pro-modal";

import { formSchema } from "./constants";
import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";
import {type ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { toast } from "sonner";


const CodePage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const chat = api.WebForge.codeRoute.chat.useMutation({
    onSuccess(data) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setMessages((current) => [...current, data.choices.at(0).message]);
      form.reset();
    },
    onError(error) {
      toast.error(error.message);  
    },
  });
  const isLoading = chat.isPending

  const onSubmit =  (values: z.infer<typeof formSchema>) => {
    console.log("values", values);
    try {
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: values.prompt,
      };
      setMessages((current) => [...current, userMessage]);

      console.log('sending prompt message')
      chat.mutate({message:userMessage})


    } catch (error) {
      if(error instanceof Error){

        if (error.cause === 403) {
          proModal.onOpen();
        } else {
          toast.error("Something went wrong.");
        }
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Code Generation"
        description="Generate code using descriptive text."
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
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
                        placeholder="Simple toggle button using react hooks."
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
            {messages.map((message) => (
              <div
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                key={message.content}
                className={cn(
                  "flex w-full items-start gap-x-8 rounded-lg p-8",
                  message.role === "user"
                    ? "border border-black/10 bg-white"
                    : "bg-muted",
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <ReactMarkdown
                  components={{
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    pre: ({ node, ...props }) => (
                      <div className="my-2 w-full overflow-auto rounded-lg bg-black/10 p-2">
                        <pre {...props} />
                      </div>
                    ),
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    code: ({ node, ...props }) => (
                      <code className="rounded-lg bg-black/10 p-1" {...props} />
                    ),
                  }}
                  className="overflow-hidden text-sm leading-7"
                >

                  
                  {message.content as string}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePage;
