'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import SchedualForm from './schedualForm';
import useCreateRoutineEventModal from '@/hooks/fitness/useRoutineEventModal';

export default function SchedualModal() {
  const routineEventModal = useCreateRoutineEventModal()
    const onChange = (open: boolean) => {
      if (!open) {
        routineEventModal.onClose();
      }
    };
  return (
    <div className="flex justify-center">
      <Dialog open={routineEventModal.isOpen} onOpenChange={onChange}>
        <DialogTrigger asChild>
          <Button onClick={routineEventModal.onOpen}>Create Event</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Make an event.</DialogTitle>
          <SchedualForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
