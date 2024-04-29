'use client'
import { UserInfo } from "@/components/auth/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";


export default function Page() {
  const user = useCurrentUser();
  return <UserInfo user={user} label="📱 Client" />;
}
