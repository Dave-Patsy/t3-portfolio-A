import React from 'react'

interface HeaderProps {
  label:string
}

export default function Header({label}:HeaderProps) {
  return (
    <div className=' w-full flex flex-col gap-y-4 items-center justify-center'>
      <h1 className='font-semibold text-3xl'>
        🔐 Auth
      </h1>
      <p className='text-muted-foreground text-sm'>
        {label}
      </p>
    </div>
  )
}
