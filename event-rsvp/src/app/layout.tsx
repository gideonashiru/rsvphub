import "antd/dist/reset.css";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { NavbarDemo } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { play } from "./fonts";
import { inter } from "./fonts";
import { montserrat } from "./fonts";
import { ThemeProvider } from "next-themes";
import { Footer } from "@/components/ui/Footer";
import { SessionLogoutWrapper } from "@/components/SessionLogoutWrapper";

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
          <SessionLogoutWrapper />
          <Toaster richColors />
          <NavbarDemo />

          <main className="flex-grow">{children}</main>
          <Analytics />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}