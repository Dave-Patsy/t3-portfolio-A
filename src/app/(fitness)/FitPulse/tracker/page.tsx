import Chart from '@/components/fitness/tracker/chart'
// import { getSet } from '@/utils/server/set'
import React from 'react'
import { api } from '@/trpc/server'

export default async  function Page() {
  // const data = await getSet()
  const sets = await api.fitPulse.exerciseRouter.getSet();


  return (
    <>
      <h1 className="pt-5 text-center text-3xl font-bold tracking-tighter">
        Progress Chart
      </h1>
      <div className="mx-auto my-6 box-content  flex h-96 w-11/12 overflow-visible ring-1 ring-black">
        <Chart entries={sets} />
      </div>
      <div className=" mx-auto  w-11/12">Max Weight</div>
    </>
  );
}
