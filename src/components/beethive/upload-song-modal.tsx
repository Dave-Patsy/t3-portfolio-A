'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import useUploadFormModal from "@/hooks/beethive/useUploadFormModal";
import UploadSongForm from "@/components/beethive/upload-song-form";
export default function UploadSongModal() {
  const uploadModal = useUploadFormModal();

  const onChange = (open: boolean) => {
    if (!open) {
      uploadModal.onClose();
    }
  };
  return (
    <Dialog open={uploadModal.isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add A song</DialogTitle>
          <DialogDescription>Upload an mp3 file</DialogDescription>
        </DialogHeader>
        <UploadSongForm/>
      </DialogContent>
    </Dialog>
  );
}
