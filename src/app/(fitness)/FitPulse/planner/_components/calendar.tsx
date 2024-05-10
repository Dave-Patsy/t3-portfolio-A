"use client";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";



import { type RouterOutputs, api } from "@/trpc/react";

const bookedStyle = { border: "2px solid currentColor" };

type props = {
  routineEvents: RouterOutputs["fitPulse"]["exerciseRouter"]["getRoutineEvents"];
};
export default function ExerciseCalendar({ routineEvents }: props) {

  const routineEventsAPI =
    api.fitPulse.exerciseRouter.getRoutineEvents.useQuery(undefined, {
      initialData: routineEvents,
    });
  
  const [date, setDate] = useState<Date | undefined>(new Date());

  // const [month, setMonth] = React.useState<Date | undefined>(new Date());


  if (routineEventsAPI.isLoading){
    return (
      <div className="relative m-auto my-2 flex w-80 flex-col gap-2 py-1 sm:w-11/12 sm:flex-row">
        
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            // onMonthChange={setMonth}
            className=" rounded-md border scale-90 mx-auto"
          />

      </div>
    );
  }
  const bookedDays = routineEventsAPI.data.map((event) => event.date);
  return (
    <>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className=" mx-auto scale-90 rounded-md border shadow"
        modifiers={{ booked: bookedDays }}
        modifiersStyles={{ booked: bookedStyle }}
      />
    </>
  );
}
