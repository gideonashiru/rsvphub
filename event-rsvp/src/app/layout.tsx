
import "antd/dist/reset.css";
import "./globals.css";

import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { NavbarDemo } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { play } from "./fonts";
import { inter } from "./fonts";
import { montserrat } from "./fonts";

export const metadata: Metadata = {
  title: "Event RSVP | Gideon",
  description: "Create events, send out rsvp's.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.className} ${play.variable} ${montserrat.className} `}
    >
      <body
        className={twMerge(
          montserrat.className,
          "flex antialiased min-h-screen"
        )}
      >
        <Toaster />
        <div className="lg:pl-2 lg:pt-2 lg:pr-2 bg-blue-300 flex-1 overflow-y-auto">
          <NavbarDemo />
          {children}

          {/* </div> */}
        </div>
      </body>
    </html>
  );
}
