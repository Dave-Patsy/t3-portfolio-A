
import Link from 'next/link';
import React from 'react'
import { cn } from '@/lib/utils';
import { auth } from '@/server/auth';

export default async function NavLinks({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const data = await auth()
  return (
    <nav className={cn("flex  gap-2  lg:space-x-6", className)} {...props}>
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
      {data?.user.role === 'ADMIN' && (
        <Link
          href="/studio"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Studio
        </Link>
      )}

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
