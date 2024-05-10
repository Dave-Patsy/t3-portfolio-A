'use client'
import React from 'react'
import ExerciseCalendar from './calendar';
import SchedualModal from './schedualModal';
import { type RouterOutputs } from "@/trpc/react";
type calendarBarProps = {
  routineEvents: RouterOutputs["fitPulse"]["exerciseRouter"]["getRoutineEvents"];
};

export default function CalendarBar({ routineEvents }:calendarBarProps) {
  return (
    <div className="hidden flex-col md:flex  md:w-80">
      <ExerciseCalendar routineEvents={routineEvents} />
      <SchedualModal />
    </div>
  );
}
