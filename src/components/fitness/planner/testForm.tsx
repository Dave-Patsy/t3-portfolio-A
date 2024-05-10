// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client"
/* eslint-disable */
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import type * as z from "zod"
import {useForm} from 'react-hook-form'
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
// import { Input } from "@/components/ui/input"

import { toast } from 'react-toastify';

import * as DialogPrimitive from "@radix-ui/react-dialog"

// import {formSchema} from '@/models/models'

import type {Routine}from '@prisma/client'
import { createWorkoutEvent, createWorkoutEventAxios } from "@/utils/client/events"
type props = {
  routines: Routine[]
}
export function TestForm({routines}:props) {

  const notify = () =>{

    toast('🦄 you just set workout schedule!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_CENTER
    });
  } 
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      id: routines[0].id,
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(JSON.stringify(values,null,2) )
    createWorkoutEvent(values)
    notify()
    // toast.success("Success Notification !", {
    //   position: toast.POSITION.TOP_CENTER
    // })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Set Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="id"
          render={({ field  }) => (
            <FormItem>
              <FormLabel>Workout Routine</FormLabel>
              <Select  onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a workout routine" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {routines.map((ele,idx)=>{
                    return(<SelectItem value={ele.id}key={idx}>{ele.title}</SelectItem>)
                    })
                  }
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogPrimitive.Close asChild>

          <Button type="submit">Submit</Button>
        </DialogPrimitive.Close>
      </form>
    </Form>
  )
}

/* eslint-enable */