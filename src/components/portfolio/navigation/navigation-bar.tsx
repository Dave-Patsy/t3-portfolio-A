import React from "react";
import NavLinks from "./nav-links";
import { UserNav } from "./user-nave";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export default function NavigationBar() {
  return (
    <div className="relative z-[1000]">
      {/* Navigation container */}
      <div className="fixed left-0 top-0 z-50 w-screen bg-gradient-to-b from-[#E6E9FA]/80 to-[#E6E9FA]/5 dark:from-black/80 dark:to-black/5">
        <div className="mx-auto flex px-2 h-16  max-w-[768px] items-center justify-between ">
          {/* Left-aligned navigation links */}
          <div className="flex ">
            <NavLinks />
          </div>

          {/* Right-aligned user controls */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </div>
    </div>
  );
}
