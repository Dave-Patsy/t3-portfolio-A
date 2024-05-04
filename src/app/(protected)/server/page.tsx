import { UserInfo } from "@/components/auth/user-info";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";

export default async function Page() {
  // const  session = await api.auth.settingsRouter.getSettings()
  const session = await auth();
  if(session) return <UserInfo  initSession={session} label="🖥 Server" />;
  return null
  
}
