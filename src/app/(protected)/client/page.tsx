'use client'
import { UserInfo } from "@/components/auth/user-info";
import { useSession } from "next-auth/react";


export default function Page() {
  const {data: session} = useSession();
  return <UserInfo initSession={session} label="📱 Client" />;
}

