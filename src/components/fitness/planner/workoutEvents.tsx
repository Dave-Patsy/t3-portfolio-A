import 'server-only'
import { api } from "@/trpc/server";
// import dynamic from 'next/dynamic';

// export const dynamic = 'ban'

export default async function WorkoutEventsBody() {
  const workoutEvents = await api.fitPulse.exerciseRouter.getRoutineEvents()
  workoutEvents.sort((a,b)=> a.date.getTime() - b.date.getTime())
  return (
    <div>
      {workoutEvents.map((ele, idx) => {
        return (
          <div className="mx-auto w-11/12 overflow-y-auto pt-3" key={idx}>
            <h1 className="text-center underline">{ele.date.toDateString()}</h1>
            <h2>
              - {ele.routine.title} {ele.date.toLocaleTimeString()}
            </h2>
          </div>
        );
      })}
    </div>
  );
}
