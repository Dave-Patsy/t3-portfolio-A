import type { ReactNode } from "react";

type authLayoutProps = {
  children: ReactNode
  login: ReactNode
}

export default function Layout({children,login}:authLayoutProps) {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] ">
      <div className="absolute w-full h-full flex justify-center items-center">

        {children}  
        {login}
      </div>
    </div>
  );
}
