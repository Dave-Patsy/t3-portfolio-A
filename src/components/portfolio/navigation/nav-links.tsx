
import Link from 'next/link';
import React from 'react'
import { cn } from '@/lib/utils';

export default function NavLinks({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn(
        "flex items-center space-x-4 pl-16 lg:space-x-6",
        className,
      )}
      {...props}
    >
      <Link
        href="/"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Home
      </Link>
      <Link
        href="/blog"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Blog
      </Link>
      <Link
        href="/studio"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Studio
      </Link>
      {/* <Link
        href="/projects"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Projects
      </Link>
      <Link
        href="/contact"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Contact
      </Link> */}
    </nav>
  );
}
