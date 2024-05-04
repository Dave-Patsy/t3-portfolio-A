import ResetForm from "@/components/auth/reset-form";
import { Suspense } from "react";

export default async function Page() {
  return (
    <Suspense fallback={null}>
        <ResetForm/>
    </Suspense>
  )
}
