'use client'
import React, { useState, useTransition } from 'react'
import CardWrapper from './card-wrapper'
import type  * as  z from 'zod'
import { useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { LoginSchema } from '@/schemas'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import FormError from '../form-error'
import { login } from '@/actions/login'
import FormSuccess from '../form-success'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useSession } from 'next-auth/react'

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState<boolean >(false);
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const {update} = useSession()
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const paramsError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues:{
      email:'',
      password:''
    }
  })
  
  const toogleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const onSubmit = (values: z.infer<typeof LoginSchema>) =>{
    setError("")
    setSuccess("")
    
    startTransition(()=>{
      void login(values, callbackUrl)
        .then((data) => {
          if (data.error) {
            form.reset();
            setError(data?.error);
          }
          if (data.success) {
            form.reset();
            void update();
            setSuccess(data?.success);
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        // .finally(()=> void update());
        // .catch((e) => setError(JSON.stringify(e)))
    })
  }

  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel={`Don't have an account?`}
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="123456"
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {!showTwoFactor && (
              <>
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
                          autoComplete="email"
                          type="email"
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
                            type={showPassword ? "text" : "password"}
                            placeholder="********"
                            autoComplete="current-password"
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
                      <Button
                        asChild
                        size={"sm"}
                        variant={"link"}
                        className="px-0 font-normal"
                      >
                        <Link href={"/auth/reset"}>Forgot password?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            {showTwoFactor ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
