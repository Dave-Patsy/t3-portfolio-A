import { ReactNode } from "react";

export default function Layout({children}:{
  children: ReactNode
}){
  return( <div className="mt-8">{children}</div>);
  
}