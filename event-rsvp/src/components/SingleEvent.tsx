// Display component for a single event item to be displayed on its own page
// 'event' object is brought as input here

"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { MapPin, CalendarDays, Users, Link } from "lucide-react";
import { Attendee, EventType } from "../types/types_all";
import { motion } from "framer-motion";
import { ThreeDCardForSlugs } from "./event-3d-page";
import { useRouter } from "next/navigation";
import Attendees from "./Attendees";
import { toast } from "sonner";


export const SingleEventPage = ({
  event,
  attendees,
  isOwner,
}: {
  event: EventType;
  attendees: Attendee[];
  isOwner: boolean;
}) => {
  const router = useRouter();
 

  const inviteLink = `${window.location.origin}/invite/${event.slug}`;

  function rsvpHere() {
    router.push(`/events/${event.slug}/rsvp`);
  }

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      toast.success("RSVP link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy RSVP link.");
    }
  };



  return (
    <div className="flex flex-col gap-8">
      <motion.div
        key={event.href}
        initial={{
          opacity: 0,
          x: -50,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        {/* Main product section with image and copy */}
        <div className="flex flex-col md:flex-row gap-8">
          <ThreeDCardForSlugs event={event} />

          <div className="flex flex-col w-full max-w-[515px] items-start justify-center gap-1 p-6 ">
            {/* Title */}
            <div className="w-full">
              <h1 className="w-full font-semibold text-[40px] leading-[48px] mb-3">
                {event.title}
              </h1>
            </div>

            {/* Description */}
            <p className="w-full font-small-text font-[number:var(--small-text-font-weight)] text-gray-600 text-[length:var(--small-text-font-size)] tracking-[var(--small-text-letter-spacing)] leading-[var(--small-text-line-height)] [font-style:var(--small-text-font-style)]">
              {event.description}
            </p>

            {/* Event Details Grid */}
            <div className="w-full space-y-4">
              {/* Location */}
              <div className="flex items-center group hover:bg-secondary/50 -mx-2 px-2 py-2 rounded-xl transition-colors duration-200">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-xl mr-4 group-hover:bg-blue-100 transition-colors duration-200">
                  <MapPin className="w-5 h-5 text-blue-700" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Location
                  </p>
                  <p className="font-subheading font-[number:var(--subheading-font-weight)] text-[length:var(--subheading-font-size)] tracking-[var(--subheading-letter-spacing)] leading-[var(--subheading-line-height)] [font-style:var(--subheading-font-style)]">
                    {event.location}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center group hover:bg-secondary/50 -mx-2 px-2 py-2 rounded-xl transition-colors duration-200">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-xl mr-4 group-hover:bg-blue-100 transition-colors duration-200">
                  <CalendarDays className="w-5 h-5 text-blue-700" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Date & Time
                  </p>
                  <p className="font-play font-normal text-xl leading-[30px]">
                    {event.date}
                  </p>
                </div>
              </div>

              {/* Capacity */}
              <div className="flex items-center group hover:bg-secondary/50 -mx-2 px-2 py-2 rounded-xl transition-colors duration-200">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-xl mr-4 group-hover:bg-blue-100 transition-colors duration-200">
                  <Users className="w-5 h-5 text-blue-700" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium uppercase tracking-wide mb-1">
                    Capacity
                  </p>
                  <p className="font-play font-normal  text-xl leading-[30px]">
                    {event.capacity}
                  </p>
                </div>
              </div>
            </div>

            {isOwner && (
              <div className="w-full pt-2">
                <Button
                  size="lg"
                  variant="default"
                  className="cursor-pointer w-full py-4 px-6 rounded-xl bg-primary hover:bg-primary/90 hover:ring-2 hover:ring-ring hover:ring-offset-2 transition-all duration-200 transform hover:-translate-y-0.5"
                  // onClick={rsvpHere}
                  onClick={copyInviteLink}
                >
                  <Link className="w-5 h-5" />
                  Get RSVP Link
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Attendees section */}
        {isOwner && <Attendees attendees={attendees} isOwner={isOwner} />}
      </motion.div>
    </div>
  );
};

