/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { EventWithAttendees } from "@/components/EventWithAttendees";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { redirect, useParams } from "next/navigation";
import { EventType } from "@/types/types_all";
import { useEffect, useState } from "react";
import { getEventBySlug, deleteEventBySlug } from "@/lib/actions/client-events";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function EventSlugContent({ user }: { user: any }) {
  const params = useParams();
  const [event, setEvent] = useState<EventType | null>(null);

  useEffect(() => {
    if (!user?.id || !params.slug) return;

    const fetchEvents = async () => {
      const evnt = await getEventBySlug(params.slug as string, user.id);
      setEvent(evnt ?? null);
    };

    fetchEvents();
  }, [user?.id, params.slug]);

  if (event === null) {
    return (
      <>
        <div className="p-10 space-y-4 mt-30">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-96 w-full rounded-xl" />
        </div>
        <div className="p-10 text-center text-muted-foreground text-3xl">
          Event not found.{" "}
          <Link href="/events" className="underline">
            Go back
          </Link>
        </div>
      </>
    );
  }

  async function deleteEvent() {
    if (!params.slug) return; // Optional: guard clause for safety
    const confirmDelete = await deleteEventBySlug(
      params.slug as string,
      user.id
    );
    redirect("/events");
  }

  return (
    <>
      <div className="flex flex-row justify-center w-full ">
        <div className="max-w-[1440px] relative">
          <div className="container mx-auto px-20 pt-[164px] mb-4 space-y-6">
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
              //   className="fixed top-[164px] w-1/2 z-50
              //  bg-white/70 backdrop-blur-sm rounded-2xl p-6
              //  border border-white/50 shadow-sm"
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm "
            >
              <div className="flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:space-x-2">
                <Link href={`/events/${event.slug}/edit`}>
                  <Button
                    size="sm"
                    variant="link"
                    className="flex items-center cursor-pointer"
                  >
                    <SquarePen />
                    Edit Event
                  </Button>
                </Link>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="link"
                      className="flex items-center cursor-pointer"
                    >
                      <Trash2 />
                      Delete Event
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogTitle className="text-lg font-semibold">
                      Delete {event.title}
                    </DialogTitle>
                    Are you sure you want to delete this event? This action
                    cannot be undone.
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex items-center cursor-pointer"
                      onClick={deleteEvent}
                    >
                      <Trash2 />
                      Yes, Delete
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>

            <div className="relative">
              <EventWithAttendees event={event} attendees={attendees} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

const attendees = [
  { id: 1, name: "John Doe", avatarText: "JD" },
  { id: 2, name: "Jane Smith", avatarText: "JS" },
  // ... more attendees
];
