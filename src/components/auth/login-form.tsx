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

export default function LoginForm() {

  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues:{
      email:'',
      password:''
    }
  })
  
  const onSubmit = (values: z.infer<typeof LoginSchema>) =>{
    setError("")
    setSuccess("")
    
    startTransition(()=>{
      void login(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
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
          <div>
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
                      autoComplete='email'
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
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <Button 
                    asChild
                    size={'sm'}
                    variant={'link'}
                    className='px-0 font-normal'
                  >
                    <Link href={'/auth/reset'}>
                      Forgot password?
                    </Link>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
