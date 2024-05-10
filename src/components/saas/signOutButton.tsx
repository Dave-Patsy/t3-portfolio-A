'use client'
import React from 'react'
import { Button } from '../ui/button';
import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  return (
    <Button variant={'outline'}  className="text-muted-foreground" onClick={() => signOut()}>
      Sign out
    </Button>
  );
}
