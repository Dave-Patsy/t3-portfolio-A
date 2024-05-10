import Navbar from "@/components/saas/navbar";
import { Sidebar } from "@/components/saas/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@/server/auth";


const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()
  const apiLimitCount = await getApiLimitCount(session);
  const isPro = await checkSubscription(session);

  return (
    <div className="relative h-full overflow-hidden">
      <div className="z-80 absolute hidden h-full pt-16 md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </div>
      <main className="mt-16  box-border h-full overflow-y-scroll border-2 border-black pb-20 md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
