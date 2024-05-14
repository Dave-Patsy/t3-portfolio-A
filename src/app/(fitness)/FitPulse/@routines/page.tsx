
import React from 'react'
import CreateRoutineModal from './_components/createRoutineModal'
import { api } from '@/trpc/server'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { DotsVerticalIcon } from '@radix-ui/react-icons'

export default async function Page() {
  // const routines = await getRoutines()
  const routines = await api.fitPulse.exerciseRouter.getRoutines()
  return (
    <>
    
        <div>
          <h1 className='font-semibold tracking-tighter text-5xl text-center py-8'>My Routine</h1>
          <div className='flex flex-col gap-2'>

            <CreateRoutineModal/> 

            {routines.map((routine,idx)=>(
              <Card key={idx} className='w-11/12 mx-auto'>
                <CardHeader>
                  <div className='flex justify-between items-center'>

                    <CardTitle>{routine.title}</CardTitle>
                    <DotsVerticalIcon className='text-card-foreground text-center'/>
                  </div>
                </CardHeader>
              
              </Card>
            ))}

          </div>
          
        </div>
        {/* {routines.map((ele,idx)=>{
          return(
            <>
              <Link 
                href={'/exercise/routine/[key]'}
                as={`/exercise/routine/${ele.id}`}
                
              >


                <Card key={idx}>
                  <CardHeader>
                    <CardTitle>{ele.title}</CardTitle>
                  </CardHeader>
                
                </Card>
              </Link>
            
            </>
          )
        })} */}
    </>
  )
}
