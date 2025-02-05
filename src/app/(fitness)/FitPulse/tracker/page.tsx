import Chart from '@/components/fitness/tracker/chart'
// import { getSet } from '@/utils/server/set'
import React, { Suspense } from 'react'
import { api } from '@/trpc/server'
import ExerciseLineGraph from '@/components/fitness/tracker/ExerciseLineGraph';

const dummyData = [
  { date: new Date("2023-09-01"), weight: 100 },
  { date: new Date("2023-09-05"), weight: 105 },
  { date: new Date("2023-09-10"), weight: 110 },
  { date: new Date("2023-09-15"), weight: 108 },
  { date: new Date("2023-09-20"), weight: 112 },
  { date: new Date("2023-09-25"), weight: 115 },
];

export default async  function Page() {
  // const data = await getSet()
  const sets = await api.fitPulse.exerciseRouter.getSet();


  return (
    <>
      <h1 className="pt-5 text-center text-3xl font-bold tracking-tighter">
        Progress Chart
      </h1>
      <div className="mx-auto my-6 box-content justify-center items-center flex h-96 w-11/12 overflow-visible ring-1 ring-black">
        {/* <Chart entries={sets} /> */}
        {/* <Suspense>

          <ExerciseLineGraph data={dummyData} width={700} height={350} />
        </Suspense> */}
      </div>
      <div className=" mx-auto  w-11/12">Max Weight</div>
    </>
  );
}
