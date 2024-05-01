import { UserInfo } from "@/components/auth/user-info";
import { auth } from "@/server/auth";

export default async function Page() {
  const session = await auth();
  return <UserInfo user={session?.user} label="🖥 Server" />;
}
