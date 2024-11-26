import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";

import AuthProvider from "@/providers/auth-provider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import NavigationBar from "@/components/portfolio/navigation/navigation-bar";
import { CSPostHogProvider } from "@/providers/posthog-provider";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "DGWH Portfolio",
  description: "Fullstack developer portfolio",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`font-sans ${inter.variable}`}>

        <CSPostHogProvider>
          <TRPCReactProvider>
            <AuthProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <main className="relative flex min-h-screen flex-col scroll-smooth dark:bg-gradient-to-b dark:from-[#2e026d] dark:to-[#15162c]">
                  <Toaster />
                  <NavigationBar />
                  {children}
                </main>
              </ThemeProvider>
            </AuthProvider>
          </TRPCReactProvider>
        </CSPostHogProvider>
      </body>
    </html>
  );
}
