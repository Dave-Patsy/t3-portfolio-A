import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import Link from "next/link";
import { env } from "@/env";
import AuthProvider from "@/providers/auth-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <AuthProvider>
            <Toaster/>
            <nav className="relative h-0">
              <div className="fixed w-full pt-2 flex gap-4 justify-center">
                <Link href={'/'} className="bg-red-300">Home</Link>
                <Link href={'/settings'} className="bg-red-300">Settings</Link>
              </div>
            </nav>
            {children}
          </AuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
