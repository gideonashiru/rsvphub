/* eslint-disable react/no-children-prop */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import "./globals.css";
import { NavbarDemo } from "@/components/ui/resizable-navbar-demo";


const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Event RSVP | Gideon",
  description: "Create events, send out rsvp's here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return ( 
    <html lang="en">
      <body className ={twMerge(  inter.className,  "flex antialiased min-h-screen bg-gray-900"  )} >

      <div className="lg:pl-2 lg:pt-2 lg:pr-2 bg-gray-100 flex-1 overflow-y-auto">
          <div className="flex-1 bg-yellow-100 min-h-screen lg:rounded-tl-xl lg:rounded-tr-xl border border-transparent lg:border-neutral-200 overflow-y-auto">

            <NavbarDemo />
            {children}
           
          </div>
        </div>
      </body>
    </html>
  );
}
