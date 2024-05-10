'use client'
import { Trash2 } from "lucide-react";
import React from "react";
import { useFieldArray, type useForm } from "react-hook-form";
import { type z } from "zod";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import {type routineSchema } from "@/schemas/fitness";


type NestedArrayProps = {
  nestIndex: number;
  isLoading: boolean;
  form: ReturnType<typeof useForm<z.infer<typeof routineSchema>>>;
  control: ReturnType<typeof useForm<z.infer<typeof routineSchema>>>["control"];
  register: ReturnType<
    typeof useForm<z.infer<typeof routineSchema>>
  >["register"];
};
type NestedArrayProps2 = {
  nestIndex1: number;
  nestIndex2: number;
  isLoading: boolean;
  control: ReturnType<typeof useForm<z.infer<typeof routineSchema>>>["control"];
  register: ReturnType<
    typeof useForm<z.infer<typeof routineSchema>>
  >["register"];
};



function NestedSetGroups({ nestIndex,form, control, register, isLoading }: NestedArrayProps) {
  const { fields, remove, append } = useFieldArray({
    control: control,
    name: `circuit.${nestIndex}.setGroup`,
  });

  const exercises =  api.fitPulse.exerciseRouter.getExercises.useQuery()
  return (
    <div>
      {fields.map((item, k) => (
        <FormField
          control={control}
          key={item.id}
          disabled={isLoading}
          name={`circuit.${nestIndex}.setGroup.${k}.exercise`}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel className="pr-2">Exercise</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between pl-2",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? exercises.data?.find(
                              (exercise) => exercise.id === field.value,
                            )?.name
                          : "Select Exercise"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search exercises..."
                        className="h-9"
                      />
                      <CommandEmpty>No Exercise found.</CommandEmpty>
                      <CommandGroup>
                        {exercises.data?.map((exercise) => (
                          <CommandItem
                            value={exercise.name}
                            key={exercise.id}
                            onSelect={() => {
                              // form.setValue("language", language.value);
                              // field.value = exercise.name
                              form.setValue(
                                `circuit.${nestIndex}.setGroup.${k}.exercise`,
                                exercise.id,
                              );
                            }}
                          >
                            {exercise.name}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                exercise.name === field.value
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

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className=""
                  onClick={() => remove(k)}
                  disabled={isLoading}
                >
                  <Trash2 />
                </Button>
              </div>
              <NestedSet
                nestIndex1={nestIndex}
                nestIndex2={k}
                control={control}
                register={register}
                isLoading={isLoading}
              />
            </FormItem>
          )}
        />
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={() =>
          append({
            exercise: "",
            set: [],
          })
        }
        disabled={isLoading}
      >
        Add exercise
      </Button>
    </div>
  );
};

function NestedSet({nestIndex1,nestIndex2,control,register,isLoading}:NestedArrayProps2){
  const { fields, remove, append } = useFieldArray({
    control: control,
    name: `circuit.${nestIndex1}.setGroup.${nestIndex2}.set`,
  });

  return (
    <div>
      <div className="grid grid-cols-2 gap-2 pb-2">
        <FormLabel>Reps</FormLabel>
        <FormLabel>weight</FormLabel>
      </div>
      <div className="space-y-2">
        {fields.map((item, idx) => (
          <div key={item.id} className="grid grid-cols-2 gap-2">
            <FormField
              control={control}
              disabled={isLoading}
              name={`circuit.${nestIndex1}.setGroup.${nestIndex2}.set.${idx}.reps`}
              render={({ field }) => (
                <FormItem>
                  <Input
                    type="number"
                    placeholder="1"
                    {...field}
                    disabled={isLoading}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              disabled={isLoading}
              name={`circuit.${nestIndex1}.setGroup.${nestIndex2}.set.${idx}.weight`}
              render={({ field }) => (
                <FormItem>
                  <Input
                    type="number"
                    placeholder="1"
                    disabled={isLoading}
                    {...field}
                  />
                </FormItem>
              )}
            />
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={() => append({ weight: 100, reps: 10 })}
        disabled={isLoading}
      >
        Add Set
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={() => remove(fields.length - 1)}
        disabled={isLoading}
      >
        Remove Set
      </Button>
    </div>
  );  
}

export { NestedSetGroups, NestedSet };