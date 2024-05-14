
import Collections from "@/components/fitness/discover/collections"
import Core from "@/components/fitness/discover/core"
import Overview from "@/components/fitness/discover/overview";
import Recommended from "@/components/fitness/discover/recommended";

export default function Page() {
  return (
    <div className="py-4">
        <Overview />
        <Recommended />
        <Core />
        <Collections />
    </div>
  )
}