'use client'
import React, { useState } from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import useUploadModal from '@/hooks/beatHive/useUploadModatl'


const formSchema = z.object({
  title:z.string(),
  artist:z.string(),
  songFile:z.custom<File>((v) => v instanceof File, {
      message: 'Image is required',
    }),
  imageFile:z.custom<File>((v) => v instanceof File, {
      message: 'Image is required',
    }),
})

export default function UploadForm() {

  const uploadModal = useUploadModal()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      title:'',
      artist:'',
      songFile:undefined,
      imageFile: undefined
    }
  })

  async function  onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true)
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("author", values.artist);
    formData.append("songFile", values.songFile);
    formData.append("imageFile", values.imageFile);    
    // console.log(formData);
    // console.log(values);
    await fetch("/api/spotify/upload", {
      method: "POST",
      body: formData,
    }).then(()=>setIsLoading(false));
    
    uploadModal.onClose()
    form.reset()
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Congratulations" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="artist"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Artist</FormLabel>
              <FormControl>
                <Input placeholder="Post Malone" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="songFile"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Song File</FormLabel>
              <FormControl>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  type="file"
                  ref={field.ref}
                  disabled={isLoading}
                  accept='audio/*'
                  onChange={(e) => {
                    field.onChange(e.target.files?.[0]);
                  }}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageFile"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Song Image</FormLabel>
              <FormControl>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  type="file"
                  ref={field.ref}
                  disabled={isLoading}
                  accept='image/*'
                  onChange={(e) => {
                    field.onChange(e.target.files?.[0]);
                  }}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant={"secondary"} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
