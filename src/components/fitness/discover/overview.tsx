import { Calendar } from "@/components/ui/calendar";
import WeeklyGoal from "./weeklygoal";


export default function Overview() {
  return (
    <div className="relative mx-auto flex w-11/12 flex-col items-center h-96  justify-between gap-2 md:flex-row">
      <div className="h-full rounded-md bg-slate-200 px-2">
        <Calendar />
      </div>
      <div className="flex-grow h-full rounded-md bg-slate-200">
        <div className="h-full w-full  rounded-md bg-slate-200">
          {`--todo add something here`}
        </div>
      </div>
      <WeeklyGoal />
    </div>
  );
}
