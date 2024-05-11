"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

import { useRouter } from "next/navigation";
import beethiveUserButton from "../ui/beethive-user-button";



export default function ContentHeader() {
  const router = useRouter();

  return (
    <div className="flex h-fit items-center justify-between pt-2 gap-2">
      <div className=" flex gap-4 pl-4 text-xl">
        <ChevronLeft
          onClick={() => router.back()}
          size={32}
          className="cursor-pointer "
        />
        <ChevronRight
          onClick={() => router.forward()}
          size={32}
          className="cursor-pointer"
        />
      </div>
      <div className="flex items-center  pr-4">
        <beethiveUserButton />
      </div>
    </div>
  );
}
