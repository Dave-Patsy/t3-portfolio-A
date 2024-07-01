
import React from 'react'
import NavLinks from './nav-links';

import { UserNav } from './user-nave';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import Link from 'next/link';


export default function NavigationBar() {
  return (
    <div className="relative z-[1000] h-0 w-full">
      <div className="absolute left-0 top-0 z-[1000] w-full">
        <div className="fixed z-50 my-auto flex h-16  w-full items-center justify-center gap-2 from-[#E6E9FA]/80 to-[#E6E9FA]/5 px-4 hover:bg-gradient-to-b dark:from-black/80 dark:to-black/5">
          <NavLinks />
          <div className="ml-auto flex items-center justify-center space-x-4 pr-16">
            <Link
              href={"/images/portfolio/Resume.pdf"}
              target="_blank"
              className="text-sm text-muted-foreground hover:text-primary font-medium"
            >
              <h1>Resume</h1>
            </Link>

            <ThemeToggle />

            <UserNav />
          </div>
        </div>
      </div>
    </div>
  );
}
