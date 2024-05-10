'use client'
import { Button } from '@/components/ui/button'
import React, { type ReactNode,useState } from 'react'
import {usePathname} from 'next/navigation'

export default function Layout({children,programs,routines}:{
    children:ReactNode,
    routines:ReactNode,
    programs:ReactNode,
}) {
  const pathname = usePathname()
  const [page, setPage] = useState(children)
  
  if( pathname === '/fitness'){
    return (
      <>
        <div className='flex gap-10 justify-center pt-4 pb-2'>

          <Button onClick={()=>setPage(children)}>discover</Button>
          <Button onClick={()=>setPage(routines)}>routines</Button>
          <Button onClick={()=>setPage(programs)}>programs</Button>
        </div>
        <div>{page}</div>
      </>
    )
  } 

  return (
    <div className=''>{children}</div>
  )
}