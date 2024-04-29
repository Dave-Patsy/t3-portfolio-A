'use server'

import { signOut } from "@/server/auth"

export const logout = async () => {
  // some cleanup when logging out
  await signOut()
}