'use client'
import useUploadModal from '@/hooks/beethive/useUploadModatl';
import { LibraryBig, Plus } from 'lucide-react';
import type { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import React from 'react'


type libraryProps={
  session:Session|null
}
export default function Library({session}:libraryProps) {
  const {onOpen} = useUploadModal()
  const handleLibraryClick = () =>{
    if(!session){
      signIn().then((e)=>e).catch((e)=>console.log(e))
    }else{
      onOpen()
    }
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 pt-4">
      <div className="flex">
        <LibraryBig className="text-center text-black" />
        <Plus
          className="cursor-pointer text-center text-black"
          onClick={handleLibraryClick}
        />
      </div>
    </div>
  );
}
