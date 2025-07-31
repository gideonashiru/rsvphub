import "antd/dist/reset.css";
import "./globals.css";

import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { NavbarDemo } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { play } from "./fonts";
import { inter } from "./fonts";
import { montserrat } from "./fonts";
import { ThemeProvider } from "next-themes";
import { Footer } from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "RSVP Hub",
  description: "Create events, send out rsvp's.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.className} ${play.variable} ${montserrat.className} `}
      suppressHydrationWarning
    >
      <body
        className={twMerge(
          montserrat.className,
          "flex flex-col min-h-screen antialiased"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster richColors />

          {/* Wrapper for content and navbar */}
          <div className="flex-grow flex flex-col lg:pl-2 lg:pt-2 lg:pr-2 overflow-y-auto">
            <NavbarDemo />
            {children}
          </div>
        
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
