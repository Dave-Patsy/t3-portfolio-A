'use client'

import { logout } from "@/actions/logout"
import {type ReactNode } from "react"

interface LogoutButtonProps {
  children?:ReactNode
}

export default function LogoutButton({children}:LogoutButtonProps) {
  const onClick = () => {
    void logout()
  }
  return (
    <span onClick={onClick} className="cursor-pointer flex items-center">{children}</span>
  )
}
