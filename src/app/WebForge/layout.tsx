import { CrispProvider } from '@/components/saas/crisp-provider'
import type { Metadata } from 'next'
import React, { type ReactNode } from 'react'
import { ModalProvider } from '@/components/saas/modal-provider'

// export const metadate:Metadata={
//   title:"WebForge",
//   description:"AI Platform"
// }

export default function Layout({children}:{children:ReactNode}) {
  return (
    <div className='relative h-screen'>
      <ModalProvider/>
      {/* <CrispProvider/> */}
      {children}
    </div>
  )
}
