"use client";

import Link from "next/link";
import Image from "next/image";
import tempSrc from "@/assets/images/party.png";
import { HowToComponent } from "@/components/HowToUse";

export default function LandingPage() {
  return (
    <>
      <div className="mt-40 flex flex-col items-center justify-center min-h-screen font-sans">
        <h1 className="text-4xl font-bold mb-4">Welcome to Event RSVP</h1>
        <p className="text-lg mb-8">
          Your one-stop solution for event management and RSVPs.
        </p>

        <div className="mb-8 space-x-4 flex items-center justify-center rounded-lg">
          <Link
            href="/auth/login"
            className="px-6 py-3 bg-primary ring-primary focus-visible:ring-ring rounded hover:bg-primary/70 
        transition-colors text-primary-foreground"
          >
            Log in
          </Link>

          <Link
            href="/events"
            className="px-6 py-3 bg-primary ring-primary focus-visible:ring-ring rounded hover:bg-primary/70 
        transition-colors text-primary-foreground"
          >
            View Events
          </Link>
        </div>

        <Image
          src={tempSrc}
          alt="Landing Image"
          className="w-full max-w-2xl rounded-lg shadow-lg mb-8"
          width={800}
          height={800}
        />
      </div>
      <HowToComponent />
      <div></div>
    </>
  );
}
