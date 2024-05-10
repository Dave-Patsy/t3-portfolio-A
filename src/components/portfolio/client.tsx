'use client'

import { env } from "@/env"

export default function Client() {
  return (
    <div>{env.NEXT_PUBLIC_PUBLISHABLE_KEY}</div>
  )
}
