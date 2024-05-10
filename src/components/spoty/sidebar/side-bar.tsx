import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { auth } from "@/server/auth"

import Link from "next/link";
import { GoPlus, GoArrowRight } from "react-icons/go";

import { Library } from "lucide-react";
import SideBarNav from "./side-bar-nav";

export default async function Sidebar() {
  const session = await auth()

  if(session){
    return (
      <div className="flex h-full w-full flex-col items-center gap-2 text-black">
        <SideBarNav />
        <div className="relative flex w-full flex-grow flex-col items-center overflow-clip rounded-md bg-yellow-300">
          <div className="flex w-full justify-between">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex h-10 w-10 items-center justify-center pl-2">
                    <Library className="h-8 w-8 " />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Expand your library</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="flex justify-end gap-2 pr-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href={"/spoty"} className="cursor-pointer">
                      <GoPlus className=" h-6 w-6 " />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Create a playlist or folder</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href={"/spoty"} className="cursor-pointer">
                      <GoArrowRight className="h-6 w-6 " />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Show more</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="h-full  w-full overflow-y-auto text-center scrollbar scrollbar-thumb-slate-400 scrollbar-w-2  scrollbar-h-8">
            {/* side bar content */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>side-bar</div>
  )
}
