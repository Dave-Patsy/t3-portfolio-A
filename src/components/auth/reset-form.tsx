"use client";
import React, { useState } from "react";
import CardWrapper from "./card-wrapper";
import type * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ResetSchema } from "@/schemas";
import { Input } from "../ui/input";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Button } from "../ui/button";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ResetForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  
  const router = useRouter()

  const { mutate, isPending, data } =
    api.auth.resetRouter.resetPassowrd.useMutation({
      onError(error) {
        form.reset();
        console.log(error);
        setError(error.message);
      },
      onSuccess(data) {
        toast.success(data.success);
        router.push('/auth/login')
        setSuccess(data.success);
      },
    });

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    void mutate(values);

  };

  return (
    <CardWrapper
      headerLabel="Reset you password"
      backButtonLabel={`Back to login?`}
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="tonytonytony@gmail.com"
                      autoComplete="email"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {data && <span>{JSON.stringify(data)}</span>}
          {data && <span>{data.success}</span>}
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Request reset!
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
