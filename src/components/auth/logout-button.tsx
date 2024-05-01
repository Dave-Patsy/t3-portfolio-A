'use client'

import { logout } from "@/actions/logout"
import {type ReactNode } from "react"
import { Button } from "../ui/button"

interface LogoutButtonProps {
  children?:ReactNode
}

export default function LogoutButton({children}:LogoutButtonProps) {
  const handleLogout = () => {
    void logout();
  };
  return (
    <Button variant="outline" onClick={handleLogout}>
      {children}
    </Button>
  );
}
