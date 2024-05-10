import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Button } from '../../ui/button';
import { signIn, signOut } from 'next-auth/react';
import type { Session } from 'next-auth';
import Link from 'next/link';

type AvatarButtonProps = {
  session: Session | null;
};

export default function AvatarButton({session}:AvatarButtonProps) {

  if (!session) return <Button onClick={() => signIn()}>Login</Button>;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={session.user.image ?? ""} />
          <AvatarFallback>
            {session.user.name?.at(0)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {session.user.name?.toUpperCase()}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={"/BeatHive/account"}>Account</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button variant={"link"} onClick={() => signOut()}>
            Log out
          </Button>

          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
