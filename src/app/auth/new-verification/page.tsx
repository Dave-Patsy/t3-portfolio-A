import NewVerificationForm from "@/components/auth/new-verification-form";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={null}>

      <NewVerificationForm/>
    </Suspense>
  )
}
