import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import Test from "./_component/test";

export default async function Page() {
  const session = await auth()
  const data = await api.auth.settingsRouter.settingsTest()
  console.log("settings session", session);
  if(session) return <Test initSession={session} />;
  return <pre>{JSON.stringify(data,null,'\t')}</pre>
}
