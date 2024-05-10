"use client";
import React, { useState } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";



const formSchema = z.object({
  Name: z.string(),
  Description: z.string(),
});

export default function ExerciseForm() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: "",
      Description: "",
    },
  });

  const util = api.useUtils()
  const exersizeAPI = api.fitPulse.exerciseRouter.createExercise.useMutation({
    onSuccess() {
      form.reset();
    },
    async onSettled() {
      await util.fitPulse.exerciseRouter.getExercises.invalidate();
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    exersizeAPI.mutate({name:values.Name, description:values.Description})
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="Name"
          disabled={exersizeAPI.isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exercise</FormLabel>
              <FormControl>
                <Input placeholder="Squat" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Description"
          disabled={exersizeAPI.isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Lie down, bend knees, lift upper body, engage abs, lower back down. Strengthen your core."
                  {...field}
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
