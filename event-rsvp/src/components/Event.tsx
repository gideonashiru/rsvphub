// Display component for a single event item to be displayed on its own page
// 'event' object is brought as input here

"use client";
import { EventType } from "../types/event";
import { motion } from "framer-motion";
import React from "react";
import Image, { StaticImageData } from "next/image";

export const SingleEvent = ({ event }: { event: EventType }) => {
  return (
    <div className="py-10">
      <motion.div
        initial={{
          opacity: 0,
          x: -70,
        }}
        animate={{
          opacity: 2,
          x: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        key={event.slug}
        className="relative"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border">
          <div key={event.href} className="relative">
            <Image
              src={event.card}
              alt={event.title}
              height="1000"
              width="1000"
              className="rounded-md object-contain max-h-[500px] w-auto mx-auto"
            />
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col justify-between font-play">
        <div>
          <h4 className="font-bold text-lg md:text-lg lg:text-lg">
            {event.title}
          </h4>
          <h4 className="text-lg md:text-lg lg:text-lg">Date: {event.date}</h4>
          <h4 className="text-lg md:text-lg lg:text-lg">Time: {event.time}</h4>
          <h4 className="text-lg md:text-lg lg:text-lg">
            Location: {event.location}
          </h4>
          <h4 className="text-lg md:text-lg lg:text-lg">
            Capacity: {event.capacity}
          </h4>
        </div>

        {/* <div className="flex space-x-2 md:mb-1 mt-2 md:mt-0">
          {event.attendees?.map((stack: string) => (
            <span
              key={stack}
              className=" text-xs md:text-xs lg:text-xs bg-gray-50 px-2 py-1 rounded-sm text-gray-700"
            >
              {stack}
            </span>
          ))}
        </div> */}

      </div>

      <a
        href={event.href}
        target="__blank"
        className="inline-flex items-center gap-1 group/button rounded-full hover:scale-105 focus:outline-none transition ring-offset-gray-900 bg-gray-800 text-white shadow-lg shadow-black/20 sm:backdrop-blur-sm group-hover/button:bg-gray-50/15 group-hover/button:scale-105 focus-visible:ring-1 focus-visible:ring-offset-2 ring-gray-50/60 text-sm font-medium px-4 py-2 mt-auto origin-left"
      >
        Get RSVP link
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
        >
          <path d="M5 12l14 0"></path>
          <path d="M13 18l6 -6"></path>
          <path d="M13 6l6 6"></path>
        </svg>
      </a>
    </div>
  );
};
