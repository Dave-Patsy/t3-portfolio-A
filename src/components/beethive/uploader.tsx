"use client";

import { UploadButton,UploadDropzone, Uploader } from "@/utils/uploadthing";
import { toast } from "sonner";
import { Button } from "../ui/button";

export function UploaderArea() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-red-300 p-24">
      <UploadDropzone
        config={{appendOnPaste:true,mode:'manual'}}
        endpoint="imageUploader"
        // content={{button(arg) {
        //  return (<Button>{JSON.stringify(arg)}</Button> )  
        // },allowedContent(arg) {
        //     return (<div>{JSON.stringify(arg)}</div>)
        // }}}
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          toast.success("Upload Completed");
          // alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          // alert(`ERROR! ${error.message}`);
          toast.error(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
export function Uploader2() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-red-300 p-24">
      <Uploader

        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          toast.success("Upload Completed");
          // alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          // alert(`ERROR! ${error.message}`);
          toast.error(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}


// export default { Uploader, Uploader2 };