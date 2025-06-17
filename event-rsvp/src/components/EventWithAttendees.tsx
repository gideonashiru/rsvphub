// Display component for a single event item to be displayed on its own page
// 'event' object is brought as input here

"use client";
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin, CalendarDays, Users, Link } from "lucide-react";
import { EventType } from "../types/types_all";
import { motion } from "framer-motion";
import { ThreeDCardForSlugs } from "./event-3d-page";
import { useRouter } from "next/navigation";

interface Attendee {
  id: number;
  name: string;
  avatarText: string;
}

export const EventWithAttendees = ({
  event,
  attendees,
}: {
  event: EventType;
  attendees: Attendee[];
}) => {
  const router = useRouter();

  function rsvpHere() {
    router.push(`/events/${event.slug}/rsvp`);
  }

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
          {/* rounded-2xl border border-gray-100 bg-white shadow-lg*/}
          <div className="flex flex-col w-full max-w-[515px] items-start justify-center gap-1 p-6 ">
            {/* Title */}
            <div className="w-full">
              <h1 className="w-full font-play font-semibold text-black text-[40px] leading-[48px] mb-3">
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
              <div className="flex items-center group hover:bg-gray-50 -mx-2 px-2 py-2 rounded-xl transition-colors duration-200">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-xl mr-4 group-hover:bg-blue-100 transition-colors duration-200">
                  <MapPin className="w-5 h-5 text-blue-700" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Location
                  </p>
                  <p className="font-subheading font-[number:var(--subheading-font-weight)] text-black text-[length:var(--subheading-font-size)] tracking-[var(--subheading-letter-spacing)] leading-[var(--subheading-line-height)] [font-style:var(--subheading-font-style)]">
                    {event.location}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center group hover:bg-gray-50 -mx-2 px-2 py-2 rounded-xl transition-colors duration-200">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-xl mr-4 group-hover:bg-blue-100 transition-colors duration-200">
                  <CalendarDays className="w-5 h-5 text-blue-700" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Date & Time
                  </p>
                  <p className="font-play font-normal text-black text-xl leading-[30px]">
                    {event.date}
                  </p>
                </div>
              </div>

              {/* Capacity */}
              <div className="flex items-center group hover:bg-gray-50 -mx-2 px-2 py-2 rounded-xl transition-colors duration-200">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-xl mr-4 group-hover:bg-blue-100 transition-colors duration-200">
                  <Users className="w-5 h-5 text-blue-700" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Capacity
                  </p>
                  <p className="font-play font-normal text-black text-xl leading-[30px]">
                    {event.capacity}
                  </p>
                </div>
              </div>
            </div>

            
            <div className="w-full pt-2">
              <Button
                size="lg"
                variant="default"
                className="cursor-pointer w-full bg-black hover:bg-blue-800 text-white font-medium py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 hover:shadow-xl transform hover:-translate-y-0.5 border-0"
                onClick={rsvpHere}
              >
                <Link className="w-5 h-5" />
                Get RSVP Link
              </Button>
            </div>
          </div>
        </div>

        {/* Attendees section */}
        <div className="mt-16 pt-6 bg-indigo-300 rounded-lg">
          <h2 className="font-['Inter',Helvetica] font-semibold text-black text-[32px] tracking-[0] leading-[48px] mb-6 ml-2">
            Current Attendees
          </h2>
          <div className="flex flex-col w-full border-t border-solid border-black bg-m-3syslightsurface">
            <ul className="w-full">
              {attendees.map((attendee, index) => (
                <li key={attendee.id} className="w-full">
                  <div className="flex h-12 items-center gap-4 px-4 py-1 w-full">
                    {/* Index */}
                    <div className="w-6 text-sm text-black">{index + 1}.</div>

                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <Avatar className="w-10 h-10 bg-m3syslightprimary-container overflow-hidden">
                        <AvatarFallback className="w-10 h-10 font-m3-title-medium text-m3syslighton-primary-container text-[length:var(--m3-title-medium-font-size)] tracking-[var(--m3-title-medium-letter-spacing)] leading-[var(--m3-title-medium-line-height)] [font-style:var(--m3-title-medium-font-style)]">
                          {attendee.avatarText}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    {/* Name */}
                    <div className="flex flex-col justify-center flex-1">
                      <span className="font-m3-body-large font-[number:var(--m3-body-large-font-weight)] text-m3syslighton-surface text-[length:var(--m3-body-large-font-size)] tracking-[var(--m3-body-large-letter-spacing)] leading-[var(--m3-body-large-line-height)] [font-style:var(--m3-body-large-font-style)]">
                        {attendee.name}
                      </span>
                    </div>

                    {/* Checkbox */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-5 h-5 accent-indigo-600 rounded border-gray-300 cursor-pointer"
                        aria-label={`Confirm attendance for ${attendee.name}`}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// This component is used to display the event details and the list of attendees.
// It takes in an 'event' object and an array of 'attendees' as props.
