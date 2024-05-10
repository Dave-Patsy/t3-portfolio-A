import React from 'react'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import UploadForm from './uploadForm'
import useUploadModal from '@/hooks/beatHive/useUploadModatl'

export default function UploadModal() {
  const uploadModal = useUploadModal()

  const onChange = (open:boolean) =>{
    if(!open){
      uploadModal.onClose()
    }
  }
  return (
    <Dialog open={uploadModal.isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add A song</DialogTitle>
          <DialogDescription>Upload an mp3 file</DialogDescription>
        </DialogHeader>
        <UploadForm/>
      </DialogContent>
    </Dialog>
  );
}
