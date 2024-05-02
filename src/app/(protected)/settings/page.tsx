import { auth } from "@/server/auth";
import Test from "./_component/test";


export default async function Page() {
  const session = await auth()
  return <Test session={session} />;
}
