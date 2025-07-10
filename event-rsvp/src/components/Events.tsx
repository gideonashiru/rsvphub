/* eslint-disable @typescript-eslint/no-explicit-any */
//Component that holds the UI to display all the events current user has
"use client";
import React, { useEffect, useState } from "react";
import { EventType } from "@/types/types_all";
import { motion } from "framer-motion";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { ThreeDCard } from "./event-3d-card";
import { Button } from "./ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

type TabKey = "my-events" | "invited-events" | "past-events";

interface EventsProps {
  title: TabKey;
  events: any;
  onTabChange: (tab: TabKey) => void; // Add this prop to handle tab changes
}

export const Events = ({ title, events, onTabChange }: EventsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 8; // Number of events to display per page
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);
 

  const tabLabels = {
    "my-events": "My Events",
    "invited-events": "Invited Events",
    "past-events": "Past Events",
  };

  const TabButton = ({
    tabKey,
    label,
    isActive,
    onClick,
  }: {
    tabKey: TabKey;
    label: string;
    isActive: boolean;
    onClick: (tab: TabKey) => void;
  }) => (
    <button
      onClick={() => onClick(tabKey)}
      className={`
        px-6 py-3 font-montserrat font-semibold text-lg transition-all duration-200 ease-in-out
        border-b-4 hover:bg-gray-50 relative
        ${
          isActive
            ? "border-blue-600 text-blue-600 bg-accent"
            : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
        }
      `}
    >
      {label}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-accent"
          layoutId="activeTab"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </button>
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [title]);

  return (
    <div>
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-4">
        <div className="flex items-center justify-between">
          <nav className="flex space-x-0 -mb-px">
            {Object.entries(tabLabels).map(([key, label]) => (
              <TabButton
                key={key}
                tabKey={key as TabKey}
                label={label}
                isActive={title === key}
                onClick={onTabChange}
              />
            ))}
          </nav>

          {/* Create Event Button */}
          <Button className="flex items-center gap-2 hover:bg-accent cursor-pointer hover:ring-2 hover:ring-ring hover:ring-offset-2">
            <Link
              href="/events/create-event"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Event
            </Link>
          </Button>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-2">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm">
            {events.length} {events.length === 1 ? "event" : "events"}
          </div>
        </div>


 <div className="inline-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center px-4">
  {currentEvents.map((event: EventType, idx:number) => (
    <motion.div
      key={event.href}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: idx * 0.1 }}
      className="w-[26rem]"
    >
      <ThreeDCard event={event} />
    </motion.div>
  ))}
</div>

      </div>

      {currentEvents.length === 0 && (
        <motion.div
          className="text-center text-muted-foreground mt-12 py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold mb-2">No events found</h3>
          <p className="text-gray-500">
            {title === "my-events" && "You haven't created any events yet."}
            {title === "invited-events" &&
              "You have not accepted any event invitations."}
            {title === "past-events" && "No past events to display."}
          </p>
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((p) => Math.max(p - 1, 1));
                  }}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === i + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(i + 1);
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((p) => Math.min(p + 1, totalPages));
                  }}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};
