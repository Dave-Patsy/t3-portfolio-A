'use client'

import { logout } from "@/actions/logout"
import {type ReactNode } from "react"
import { Button } from "../ui/button"
import { signOut } from "next-auth/react"

interface LogoutButtonProps {
  children?:ReactNode
}

export default function LogoutButton({children}:LogoutButtonProps) {
  const handleLogout = async() => {
    void await signOut();
  };
  return (
    <Button variant="outline" className="w-full" onClick={handleLogout} >
      {children}
    </Button>
  );
}
