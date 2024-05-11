'use client'


import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { GiTreeBeehive } from "react-icons/gi";
import { GoHome, GoSearch } from "react-icons/go";

export default function SideBarNav() {
  return (
    <>
      <div className="box-content flex w-full flex-col items-center gap-2 rounded-md bg-yellow-300 py-4 text-black ">
        <div className="flex items-center justify-between">
          <GiTreeBeehive className="h-8 w-8" />
          <h1 className="text-2xl font-light tracking-tight">BeetHive</h1>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link href={"/beethive"}>
                <GoHome className="thi h-12 w-12 " />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Home</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link href={"/beethive"}>
                <GoSearch className="h-12 w-12" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Search</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
}
