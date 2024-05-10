// import Navigation from '@/components/exercise/navigation'
import Navigation from '@/components/fitness/navigation'
import React, { type ReactNode } from 'react'

export default function Layout({children}:{children:ReactNode}) {
  
  return (
    <div className="relative h-screen">
      <Navigation />
      <div className=''>{children}</div>
    </div>
  );
}
