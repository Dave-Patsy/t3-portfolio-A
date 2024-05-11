'use client'
import { uploadSongFormSchema } from "@/schemas/beethive/upload"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { type z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { Input } from "../ui/input"
import { uploadFiles } from "@/utils/uploadthing"
import { Button } from "../ui/button"
import { api } from "@/trpc/react"
import { toast } from "sonner"
import useUploadFormModal from "@/hooks/beethive/useUploadFormModal"
import type { Songs } from "@prisma/client"


export default function UploadSongForm() {
  
  const uploadModal = useUploadFormModal()
  const form = useForm<z.infer<typeof uploadSongFormSchema>>({
    resolver: zodResolver(uploadSongFormSchema),
    defaultValues: {
      title: "",
      artist: "",
      // songFile:undefined,
      // imageFile:undefined,
    },
  });
  const utils = api.useUtils()
  // const [isPending, startTransition] = useTransition();
  const { mutate } = api.beethive.beethiveUploadRouter.uploadSong.useMutation({
    async onMutate(variables) {
      await utils.beethive.beethiveSongRouter.getSongs.cancel();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const prevSongs: Songs = utils.beethive.beethiveSongRouter.getSongs.getData();
      const newSong: Songs = {
        userId: "",
        artist: variables.songData.artist,
        createdAt: new Date(),
        genre: "",
        id: "",
        image_path: "",
        released_date: "",
        song_path: "",
        title: variables.songData.title,
        UpdatedAt: new Date(),
      };
      utils.beethive.beethiveSongRouter.getSongs.setData(
        undefined,

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        (old) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return [...old, newSong];
        },
      );
      return { prevSongs };
    },
    onError(error, newPost, ctx) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      utils.beethive.beethiveSongRouter.getSongs.setData(undefined, ctx!.prevSongs);
      toast.error(error.data?.code);
      form.reset();
    },
    onSuccess() {
      uploadModal.onClose();
      form.reset();
      toast.success("Upload Successful!");
    },
    async onSettled(){
      await utils.beethive.beethiveSongRouter.getSongs.invalidate()
    }
  });
  const onSubmit = async (values: z.infer<typeof uploadSongFormSchema>) => {
    const files = [values.songFile, values.imageFile];
    // startTransition(async()=>{
    // })
    const res = await uploadFiles("imageUploader", {
      files,
    });
    mutate({
      clientUploadedFileData:res,
      songData:{
        artist:values.artist,
        title:values.title,
      }
    })

  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="artist"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Artist</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Tony"
                    type="text"
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Tony"
                    type="text"
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    type="file"
                    ref={field.ref}
                    accept="image/*"
                    onChange={(e) => {
                      field.onChange(e.target.files?.[0]);
                    }}
                    disabled={form.formState.isSubmitting}
                  />
                  {/* <Input {...field} placeholder="Tony" type="text" /> */}
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="songFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Song</FormLabel>
                <FormControl>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    type="file"
                    accept="audio/*"
                    ref={field.ref}
                    onChange={(e) => {
                      field.onChange(e.target.files?.[0]);
                    }}
                    disabled={form.formState.isSubmitting}
                  />
                  {/* <Input
                    {...field}
                    placeholder="Tony"
                    type="file"
                    accept="audio/*"
                  /> */}
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          Upload
        </Button>
      </form>
    </Form>
  );
}
