"use client";
import React, { useState } from "react";
import CardWrapper from "./card-wrapper";
import {type z} from "zod";
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
import { RegisterSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const router = useRouter()
  const { mutate, isPending } =
    api.auth.registerRouter.register.useMutation({
      onError(error) {
        form.reset();
        console.log(error);
        setError(error.message);
      },
      onSuccess(data) {
        toast.success(data.success);
        router.push("/auth/login");
        setSuccess(data.success);
      },
    });

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name:'',
      password: "",
      confirmPassword:''
    },
  });

  const toogleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    void mutate(values)
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel={`Already have an account?`}
      backButtonHref="/auth/login"
      showSocial
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
                      placeholder="jonh.doe@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Tony Tony Tony"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="flex flex-row items-center justify-center">
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="******"
                        type={showPassword ? "text" : "password"}
                      />
                      {showPassword ? (
                        <FaEyeSlash
                          className="ml-2 h-6 w-6 text-gray-400"
                          onClick={toogleShowPassword}
                        />
                      ) : (
                        <FaEye
                          className="ml-2 h-6 w-6 text-gray-400"
                          onClick={toogleShowPassword}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="flex flex-row items-center justify-center">
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="******"
                        type={showPassword ? "text" : "password"}
                      />
                      {showPassword ? (
                        <FaEyeSlash
                          className="ml-2 h-6 w-6 text-gray-400"
                          onClick={toogleShowPassword}
                        />
                      ) : (
                        <FaEye
                          className="ml-2 h-6 w-6 text-gray-400"
                          onClick={toogleShowPassword}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Create an Account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
