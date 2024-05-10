import { LandingContent } from '@/components/saas/landing-content';
import { LandingHero } from '@/components/saas/landing-hero';
import { LandingNavbar } from '@/components/saas/landing-navbar';
import React from 'react'
import { getServerAuthSession } from '@/server/auth';

export default async function Page() {
  const session = await getServerAuthSession()
  return (
    <div className="h-full ">
      <LandingNavbar session={session} />
      <LandingHero />
      <LandingContent />
    </div>
  );
}
