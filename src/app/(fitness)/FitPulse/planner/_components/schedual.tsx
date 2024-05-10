'use client'
import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type RouterOutputs, api } from "@/trpc/react";


type schedualProps = {
  routineEvents: RouterOutputs['fitPulse']['exerciseRouter']['getRoutineEvents']
}
export default function Schedual({routineEvents}:schedualProps) {
  const routineEventsAPI =
    api.fitPulse.exerciseRouter.getRoutineEvents.useQuery(undefined, {
      initialData: routineEvents,
    });

  if(routineEventsAPI.isLoading) return null
  routineEventsAPI.data.sort((a,b)=> a.date.getTime() - b.date.getTime())
  return (
    <div className="absolute h-full w-5/6 overflow-clip rounded-sm border shadow-md">
      <div className=" mx-auto flex h-full  flex-col gap-2  overflow-y-auto first:pt-4 last:pb-4">
        {routineEventsAPI.data.map((ele, idx) => (
          <Card key={idx} className="w-11/12 mx-auto cursor-pointer hover:scale-105 duration-150">
            <CardHeader>
              <CardTitle>{ele.routine.title}</CardTitle>
              <CardDescription>{ele.date.toDateString()}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}

