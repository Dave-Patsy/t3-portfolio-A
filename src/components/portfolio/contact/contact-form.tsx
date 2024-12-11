'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/trpc/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const ContactFormSchema = z.object({
  name:z.string().min(1).max(30),
  email: z.string().email(),
  message: z.string().max(1500).min(5)

})
export default function ContactForm() {

  const form = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues:{
      name:'',
      email: '',
      message: ''
    }
  })

  const {mutate} = api.portfolio.sendContactEmail.useMutation({
    onSuccess(data, variables, context) {
      toast.success("Message Sent");
      form.reset();
    },
  })

  const handleSubmit = (values: z.infer<typeof ContactFormSchema>) => {
    mutate({
      name: values.name,
      email: values.email,
      message: values.message,
    });
  }

  
  return (
    <>
      <Form {...form}>
        <form
          // autoFocus={false}
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    type="text"
                    autoComplete="name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John@doe.com"
                    type="email"

                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your message here."
                    className="h-48 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Send!
          </Button>
        </form>
      </Form>
    </>
  );
}
