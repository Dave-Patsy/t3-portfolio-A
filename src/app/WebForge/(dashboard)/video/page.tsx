"use client";

import type * as z from "zod";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FileAudio } from "lucide-react";
import { useRouter } from "next/navigation";

import { Heading } from "@/components/saas/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader } from "@/components/saas/loader";
import { Empty } from "@/components/saas/empty";
import { useProModal } from "@/hooks/saas/use-pro-modal";

import { formSchema } from "./constants";
import { api } from "@/trpc/react";
import { toast } from "sonner";


const VideoPage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [video, setVideo] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const videoApi = api.WebForge.videoRoute.video.useMutation({
    onSuccess(data) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      if (data[0]) setVideo(data[0]);
      form.reset();       
    },
    onSettled(){
      router.refresh();
    }
  })
  const isLoading = videoApi.isPending

  const onSubmit =  (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);
      videoApi.mutate({promt:values.prompt})
    } catch (error) {
      if(error instanceof Error){

        if (error.cause=== 403) {
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
        title="Video Generation"
        description="Turn your prompt into video."
        icon={FileAudio}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="
              rounded-lg 
              border 
              w-full 
              p-4 
              px-3 
              md:px-6 
              focus-within:shadow-sm
              grid
              grid-cols-12
              gap-2
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
                      placeholder="Clown fish swimming in a coral reef"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="col-span-12 lg:col-span-2 w-full"
              type="submit"
              disabled={isLoading}
              size="icon"
            >
              Generate
            </Button>
          </form>
        </Form>
        {isLoading && (
          <div className="p-20">
            <Loader />
          </div>
        )}
        {!video && !isLoading && <Empty label="No video files generated." />}
        {video && (
          <video
            controls
            className="w-full aspect-video mt-8 rounded-lg border bg-black"
          >
            <source src={video} />
          </video>
        )}
      </div>
    </div>
  );
};

export default VideoPage;
