'use client'

import { Button } from '@/components/ui/button'
import React, { type ReactNode,useState } from 'react'
import {usePathname} from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Layout({children,programs,routines}:{
    children:ReactNode,
    routines:ReactNode,
    programs:ReactNode,
}) {
  const pathname = usePathname()
  const [page, setPage] = useState(children)
  
  if( pathname === '/FitPulse'){
    if(!page) return null
    return (
      <>
        <Tabs defaultValue="discover">
          <TabsList className="grid grid-cols-3 w-11/12 mx-auto">
            <TabsTrigger value="discover">discover</TabsTrigger>
            <TabsTrigger value="routines">Routines</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
          </TabsList>
          <TabsContent value="discover">{children}</TabsContent>
          <TabsContent value="routines">{routines}</TabsContent>
          <TabsContent value="programs">{programs}</TabsContent>
        </Tabs>

        {/* <div className='flex gap-10 justify-center pt-4 pb-2'>

          <Button onClick={()=>setPage(children)}>discover</Button>
          <Button onClick={()=>setPage(routines)}>routines</Button>
          <Button onClick={()=>setPage(programs)}>programs</Button>
        </div>
        <div>{page}</div> */}
      </>
    );
  } 

  return (
    <div className=''>{children}</div>
  )
}