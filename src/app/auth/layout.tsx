import type { ReactNode } from "react";

type authLayoutProps = {
  children: ReactNode
}

export default function Layout({children}:authLayoutProps) {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] ">
      <div className="absolute w-full h-full flex justify-center items-center">

        {children}  
      </div>
    </div>
  );
}
