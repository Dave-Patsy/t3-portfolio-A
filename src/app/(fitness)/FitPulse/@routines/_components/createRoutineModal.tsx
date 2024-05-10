'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React from 'react'
import RoutineForm from "./routineForm";
import { Button } from "@/components/ui/button";
import useCreateRoutineModal from "@/hooks/fitness/useCreateRoutineModal";


export default function CreateRoutineModal() {
  const createRoutineModal = useCreateRoutineModal()
    const onChange = (open: boolean) => {
      if (!open) {
        createRoutineModal.onClose()
      }
    };
  return (
    <>
      <Dialog open={createRoutineModal.isOpen} onOpenChange={onChange}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            onClick={createRoutineModal.onOpen}
            className="mx-auto w-96"
          >
            Create Routine
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[340px] md:max-w-3xl ">
          <DialogHeader>
            <DialogTitle>Create Routine</DialogTitle>
            <DialogDescription>
              Add new routines to your library.
            </DialogDescription>
          </DialogHeader>
          <div className="relative max-h-[85vh] w-full overflow-y-auto">
            <RoutineForm />
          </div>
          {/* <DialogFooter>
              <Button type="submit" onClick={uploadModal.onClose}>Create</Button>
            </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </>
  );
}



