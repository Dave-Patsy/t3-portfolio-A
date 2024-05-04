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

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState<boolean >(false);
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

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
    
    startTransition(() => {
      login(values, callbackUrl)
        .then((response) => {
          if (response?.error) {
            form.reset();
            setError(response?.error);
          }
          if (response?.success) {
            form.reset();
            setSuccess(response?.success);
          }
          if (response?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
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
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>2FA Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="123456"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                          placeholder="user@gmail"
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
                            autoComplete='current-password webauthn'
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
                      <Link href="/auth/forgot-password">
                        <span className="text-sm text-gray-500 hover:underline">
                          Forgot password?
                        </span>
                      </Link>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormSuccess message={success} />
          <FormError message={error ?? paramsError} />
          <Button type="submit" className="w-full" disabled={isPending}>
            {showTwoFactor ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
