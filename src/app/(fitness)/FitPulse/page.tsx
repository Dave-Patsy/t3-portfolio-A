
import Collections from "@/components/fitness/discover/collections"
import Core from "@/components/fitness/discover/core"
import Recommended from "@/components/fitness/discover/recommended";
import WeeklyGoal from "@/components/fitness/discover/weeklygoal";



export default function Page() {
  return (
    <>
        <WeeklyGoal />
        <Recommended />

        <Core />

        <Collections />
    </>
  )
}