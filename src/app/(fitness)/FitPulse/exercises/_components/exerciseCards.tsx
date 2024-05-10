'use client'
import React from 'react'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import useAddExerciseModal from '@/hooks/fitness/useAddExerciseModal';

import ExerciseForm from './exerciseForm';
import {type RouterOutputs } from '@/trpc/react';

type props = {
  exercises: RouterOutputs["fitPulse"]["exerciseRouter"]["getExercises"];
};
export default function ExerciseCards({exercises}:props) {
  const  uploadModal  = useAddExerciseModal();
    const onChange = (open: boolean) => {
      if (!open) {
        uploadModal.onClose();
      }
    };
  return (
    <>
      <Dialog open={uploadModal.isOpen} onOpenChange={onChange}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={uploadModal.onOpen} className="mx-auto w-96">
            Add Exercise
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Exercise</DialogTitle>
            <DialogDescription>
              Add new exercise to the library
            </DialogDescription>
          </DialogHeader>
          <ExerciseForm/>
          {/* <DialogFooter>
            <Button type="submit" onClick={uploadModal.onClose}>Create</Button>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
      {exercises.map((ele, idx) => {
        return (
          <Card
            key={idx}
            className="mx-auto w-11/12 cursor-pointer hover:bg-accent"
          >
            <CardHeader>
              <CardTitle>{ele.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{ele.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
