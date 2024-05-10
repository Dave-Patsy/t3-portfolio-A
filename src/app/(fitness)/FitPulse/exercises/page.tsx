
import React from 'react'
import { api } from '@/trpc/server'
import ExerciseCards from './_components/exerciseCards'

export default async function Page() {
  
  const exercises = await api.fitPulse.exerciseRouter.getExercises();
  return (
    <>
      <h1 className='font-bold tracking-tighter text-3xl text-center pt-5'>Exercises</h1>
      <div className='flex flex-col gap-5 pt-4'>
          <ExerciseCards exercises={exercises}/>
      </div>
    </>
  )
}
