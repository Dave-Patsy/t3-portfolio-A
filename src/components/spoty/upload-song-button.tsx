'use client'

import useUploadFormModal from "@/hooks/spoty/useUploadFormModal"
import { ReactNode } from "react"
import { Button } from "../ui/button"

interface UploadSongButtonProps {
  children: ReactNode
}

export default function UploadSongButton({children}:UploadSongButtonProps) {
  const uploadSongFormModal = useUploadFormModal()
  return <Button variant={'destructive'}  onClick={uploadSongFormModal.onOpen}>{children}</Button>
}
