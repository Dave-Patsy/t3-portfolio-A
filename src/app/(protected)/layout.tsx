import { Suspense, type ReactNode } from "react";
import Navbar from "./_components/navbar";

interface ProtectedLayoutProps {
  children:ReactNode
}

export default function Layout({children}:ProtectedLayoutProps) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-y-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 overflow-clip">
      <Suspense fallback={null}>

        <Navbar />
      </Suspense>
      {children}
    </div>
  );
}
