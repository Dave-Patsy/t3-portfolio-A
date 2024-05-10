import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { getServerAuthSession } from "@/server/auth";
import { MobileSidebar } from "./mobile-sidebar";
import SignOutButton from "./signOutButton";




const Navbar = async () => {
  const session = await getServerAuthSession();
  const apiLimitCount = await getApiLimitCount(session);
  const isPro = await checkSubscription(session);

  return (
    <div className="flex items-center p-4">
      <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      <div className="flex w-full justify-end">
        {session?<SignOutButton/>:null}
      </div>
    </div>
  );
};

export default Navbar;
