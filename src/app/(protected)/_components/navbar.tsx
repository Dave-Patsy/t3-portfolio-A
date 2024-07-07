'use client'
import UserButton from '@/components/auth/user-button'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Navbar() {
  const pathname = usePathname()
  return (
    <div className="mx-auto flex w-11/12  items-center justify-between gap-2 rounded-xl bg-secondary px-4 py-2 shadow-sm">
      <UserButton />
      <div className="hidden md:flex">
        <div className=" flex gap-x-1">
          <Button
            asChild
            variant={pathname === "/settings" ? "default" : "outline"}
          >
            <Link href={"/settings"}>Settings</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/server" ? "default" : "outline"}
          >
            <Link href={"/server"}>Server</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/client" ? "default" : "outline"}
          >
            <Link href={"/client"}>Client</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/admin" ? "default" : "outline"}
          >
            <Link href={"/admin"}>Admin</Link>
          </Button>
        </div>
      </div>
      <div className='md:hidden'>
        <DropdownMenu>
          <DropdownMenuTrigger className="mr-2 flex items-center justify-center">
            <HamburgerMenuIcon className="mx-auto  aspect-square h-8 w-8 font-medium" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"/settings"}>Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/server"}>Server</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/client"}>Client</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/admin"}>Admin</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
