

import React from 'react'
import { api } from '@/trpc/server';
import SchedualModal from './_components/schedualModal';
import Schedual from './_components/schedual';
import ExerciseCalendar from './_components/calendar';
import CalendarBar from './_components/calendarBar';

export default async  function Page() {

  const routineEvents =
    await api.fitPulse.exerciseRouter.getRoutineEvents();
  return (
    <div className="flex flex-col flex-grow h-[800px] w-11/12 mx-auto">
      <h1 className='text-4xl font-semibold tracking-tight text-center py-4'>Schedual</h1>
      <div className='flex gap-2 h-full'>
        <CalendarBar routineEvents={routineEvents}/>

        <div className="relative h-full  flex-grow">
          <Schedual routineEvents={routineEvents} />
        </div>
      </div>
    </div>
  );
}
