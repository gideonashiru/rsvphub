//Component that holds the UI to dispay all the events current user has

"use client";
import React from "react";
import { events } from "@/constants/events";
import { EventType } from "@/types/event";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Paragraph } from "./Paragraph";

export const Events = () => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-5">

        {events.map((event: EventType, idx: number) => (
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
            transition={{ duration: 0.2, delay: idx * 0.1 }}
          >
            <Link
              href={event.slug ? `/events/${event.slug}` : event.href}
              key={event.href}
              className="group flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 hover:bg-gray-50 rounded-2xl transition duration-500 pt-4"
            >
              <Image
                src={event.card}
                alt="card thumbnail"
                height="300"
                width="300"
                className="rounded-md"
              />

              <div className="flex flex-col justify-between font-play">
                <div>
                  <h4  className="font-bold text-lg md:text-lg lg:text-lg"     >
                    {event.title}
                  </h4>
                  <h4  className="text-lg md:text-lg lg:text-lg"     >
                  Date: {event.date}
                  </h4>
                  <h4  className="text-lg md:text-lg lg:text-lg"     >
                  Time: {event.time}
                  </h4>
                  <h4  className="text-lg md:text-lg lg:text-lg"     >
                  Location: {event.location}
                  </h4>
                  <h4  className="text-lg md:text-lg lg:text-lg"     >
                  Capacity: {event.capacity}
                  </h4>
 
                </div>

                <div className="flex space-x-2 md:mb-1 mt-2 md:mt-0">
                  {event.attendees?.map((stack: string) => (
                    <span
                      key={stack}
                      className=" text-xs md:text-xs lg:text-xs bg-gray-50 px-2 py-1 rounded-sm text-gray-700"
                    >
                      {stack}
                    </span>
                  ))}
                </div>

              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
