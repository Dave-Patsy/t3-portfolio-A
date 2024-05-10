"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import React from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import useCreateRoutineEventModal from "@/hooks/fitness/useRoutineEventModal";
import { cn } from "@/lib/utils";
import { routineEventSchema } from "@/schemas/fitness";
import { api } from "@/trpc/react";

export default function SchedualForm() {
  const routineEventModal = useCreateRoutineEventModal()
  const form =
    useForm <z.infer<typeof routineEventSchema>>({
      resolver: zodResolver(routineEventSchema),
    });
  const utils = api.useUtils()
  const routines = api.fitPulse.exerciseRouter.getRoutines.useQuery();
  const routineEventAPI =
    api.fitPulse.exerciseRouter.createRoutineEvent.useMutation({
      onSuccess: () => {
        form.reset();
        routineEventModal.onClose();
      },
      onSettled: async () => {
        await utils.fitPulse.exerciseRouter.getRoutines.fetch();
      },
    });
  function onSubmit(values: z.infer<typeof routineEventSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    routineEventAPI.mutate(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="routine"
          disabled={routineEventAPI.isPending}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Routine</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? routines.data?.find(
                            (routine) => routine.id === field.value,
                          )?.title
                        : "Select routine"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9"
                    />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {routines.data?.map((routine) => (
                        <CommandItem
                          value={routine.id}
                          key={routine.id}
                          onSelect={() => {
                            form.setValue("routine", routine.id);
                          }}
                        >
                          {routine.title}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              routine.id === field.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the language that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          disabled={routineEventAPI.isPending}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
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
                    disabled={(date:Date) => date < new Date()}
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
        <Button type="submit" disabled={routineEventAPI.isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
