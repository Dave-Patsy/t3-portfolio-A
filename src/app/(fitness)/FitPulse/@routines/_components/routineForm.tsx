"use client";


import { type z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";

import type { CircuitType } from "@prisma/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {NestedSetGroups} from "./nestedSetGruops";
import { Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { routineSchema } from "@/schemas/fitness";
import { Input } from "@/components/ui/input";


const circuites: Record<CircuitType,string> = {
  COMPOUND: "COMPOUND",
  DROP: "DROP",
  PYRAMID: "PYRAMID",
  RESTPAUSE: "RESTPAUSE",
  STRAIGHT: "STRAIGHT",
  SUPER: "SUPER",
  TIMEUNDER: "TIMEUNDER",
  TRIGIANT: "TRIGIANT",
};

export default function RoutineForm() {
  const form = useForm<z.infer<typeof routineSchema>>({
    resolver: zodResolver(routineSchema),
    defaultValues: {
      name:'',
      circuit: [{type:"STRAIGHT",setGroup:[]}],
    },
  });

  const { fields: fieldsCircuit, append: appendCircuit, remove } = useFieldArray({
    control: form.control,
    name: "circuit",
  });

  const util = api.useContext();

  const createRoutineAPI =
    api.fitPulse.exerciseRouter.createRoutine.useMutation({
      onSuccess() {
        form.reset();
      },
      async onSettled() {
        await util.fitPulse.exerciseRouter.getRoutines.invalidate();
      },
    });
  function onSubmit(values: z.infer<typeof routineSchema>) {
    createRoutineAPI.mutate(values)
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mx-auto w-11/12">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Chest Day" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {fieldsCircuit.map((field, index) => (
            <Card key={field.id}>
              <CardHeader>
                <CardTitle></CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name={`circuit.${index}.type`}
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Circuit</FormLabel> */}
                      <div className="flex items-center gap-2">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={circuites.STRAIGHT}
                          disabled={createRoutineAPI.isPending}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={circuites.COMPOUND}>
                              {circuites.COMPOUND}
                            </SelectItem>
                            <SelectItem value={circuites.DROP}>
                              {circuites.DROP}
                            </SelectItem>
                            <SelectItem value={circuites.PYRAMID}>
                              {circuites.PYRAMID}
                            </SelectItem>
                            <SelectItem value={circuites.STRAIGHT}>
                              {circuites.STRAIGHT}
                            </SelectItem>
                            <SelectItem value={circuites.SUPER}>
                              {circuites.SUPER}
                            </SelectItem>
                            <SelectItem value={circuites.TIMEUNDER}>
                              {circuites.TIMEUNDER}
                            </SelectItem>
                            <SelectItem value={circuites.TRIGIANT}>
                              {circuites.TRIGIANT}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className=""
                          onClick={() => remove(index)}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                      <FormMessage />
                      <NestedSetGroups
                        nestIndex={index}
                        isLoading={createRoutineAPI.isPending}
                        form={form}
                        control={form.control}
                        register={form.register}
                      />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="my-2"
            onClick={() => appendCircuit([{ type: "STRAIGHT", setGroup: [] }])}
            disabled={createRoutineAPI.isPending}
          >
            Add Circuit
          </Button>
        </div>
        <Button
          variant={"secondary"}
          type="submit"
          className="pt-2"
          disabled={createRoutineAPI.isPending}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
