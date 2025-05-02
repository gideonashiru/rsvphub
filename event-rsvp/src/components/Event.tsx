"use client";
import { Event } from "../types/event";
import { motion } from "framer-motion";
import React from "react";
import Image, { StaticImageData } from "next/image";

export const SingleEvent = ({ event }: { event: Event }) => {
  return (
    <div>
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        key={event.slug}
        className="relative"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {event.card.map((image, idx) => (
            <div key={`image-${idx}`} className="relative">
              <Image
                src={image}
                alt={`${event.title} image ${idx + 1}`}
                height="1000"
                width="1000"
                className="rounded-md object-contain max-h-[500px] w-auto mx-auto"
              />
            </div>
          ))}
        </div>
      </motion.div>

      
    </div>
  );
};
