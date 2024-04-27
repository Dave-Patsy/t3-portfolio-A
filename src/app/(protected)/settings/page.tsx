import { auth } from "@/server/auth"


export default async function Page() {
  const session = await auth()
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-primary-foreground">
      <div className="mx-auto w-11/12 pt-8">
        <h1 className="text-3xl font-semibold tracking-tight">Settings Page</h1>
        <pre>{JSON.stringify(session, null, "\t")}</pre>
      </div>
    </div>
  );
}
