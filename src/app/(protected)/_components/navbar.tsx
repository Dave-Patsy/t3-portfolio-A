'use client'
import UserButton from '@/components/auth/user-button'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Navbar() {
  const pathname = usePathname()
  return (
    <div className='bg-secondary gap-2 flex flex-col justify-between items-center px-4 py-2 rounded-xl w-11/12 mx-auto shadow-sm'>
      <UserButton/>
      <div className=' flex gap-x-1'>
        <Button 
          asChild
          variant={pathname === '/settings' ? 'default' :'outline'}
        >
          <Link href={'/settings'}>
            Settings
          </Link>
        </Button>
        <Button 
          asChild
          variant={pathname === '/server' ? 'default' :'outline'}
        >
          <Link href={'/server'}>
            Server
          </Link>
        </Button>
        <Button 
          asChild
          variant={pathname === '/client' ? 'default' :'outline'}
        >
          <Link href={'/client'}>
            Client
          </Link>
        </Button>
        <Button 
          asChild
          variant={pathname === '/admin' ? 'default' :'outline'}
        >
          <Link href={'/admin'}>
            Admin
          </Link>
        </Button>
      </div>
    </div>
  )
}
