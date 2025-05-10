/* eslint-disable @next/next/no-img-element */
//Component that holds the UI to dispay all the events current user has

"use client";
import React, { useState } from "react";
import { events } from "@/constants/events";
import { EventType } from "@/types/event";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Paragraph } from "./Paragraph";
import temp from "@/assets/images/placeholder.png";
import { Button } from "./ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";

export const Events = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  return (
    <div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentEvents.map((event, idx) => (

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
              

              <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border w-full">
                <div className="relative h-100">
                  <img
                    alt="test cover"
                    src={temp.src}
                    className="w-full h-full object-fill"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground rounded-md px-3 py-1 font-medium">
                    {event.date}
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="font-heading text-xl font-semibold mb-2">
                    {event.title}
                  </h2>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <svg
                      fill="none"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M12 20s-8-4.5-8-8.5a8.5 8.5 0 0 1 17 0c0 4-8 8.5-8 8.5z" />
                      <circle r="2" cx="12" cy="10" />
                    </svg>
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <svg
                      fill="none"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <circle r="10" cx="12" cy="12" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>{event.time}</span>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    {event.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                        +{event.capacity}{" "}
                        {/*change to number of current capacities */}
                      </div>
                      <div className="w-8 h-8 rounded-full border-2 border-background overflow-hidden">
                        <img
                          alt="Attendee"
                          src={temp.src}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-8 h-8 rounded-full border-2 border-background overflow-hidden">
                        <img
                          alt="Attendee"
                          src={temp.src}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-12">
  <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious
          href="#"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        />
      </PaginationItem>

      {Array.from({ length: totalPages }, (_, i) => (
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={currentPage === i + 1}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      ))}

      <PaginationItem>
        <PaginationNext
          href="#"
          onClick={() =>
            setCurrentPage((p) => Math.min(p + 1, totalPages))
          }
        />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
</div>

    </div>
  );
};

