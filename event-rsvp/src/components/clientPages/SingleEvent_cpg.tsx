/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { SingleEventPage } from "@/components/SingleEvent";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { useParams } from "next/navigation";
import { Attendee, EventType } from "@/types/types_all";
import { useEffect, useState } from "react";
import { getEventBySlug, deleteEventBySlug } from "@/lib/actions/client-events";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import {
  getAttendeesId,
  getUserFromAttndId,
} from "@/lib/actions/client-events";
import { useRouter } from "next/navigation";

export default function EventSlugContent({ user }: { user: any }) {
  const router = useRouter();
  const params = useParams();
  const [eventP, setEvent] = useState<EventType | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [eventAttendees, setAttendees] = useState<Attendee[]>([]);

  useEffect(() => {
    if (!user?.id || !params.slug) return;

    const fetchEvents = async () => {
      const { event, isOwnerMatch } = await getEventBySlug(
        params.slug as string,
        user.id
      );
      setEvent(event ?? null);
      setIsOwner(isOwnerMatch);
    };

    const fetchAttendeesIds = async () => {
      if (params.slug) {
        const attendeesIds = await getAttendeesId(params.slug as string);

        if (attendeesIds.length > 0) {
          const attendeesData = await Promise.all(
            attendeesIds.map(async (attendeeId) => {
              const user = await getUserFromAttndId(attendeeId);
              return user;
            })
          );

          setAttendees(
            attendeesData.filter((a): a is Attendee => !!a && !Array.isArray(a))
          );
        } else {
          setAttendees([]);
        }
      }
    };

    fetchEvents();
    fetchAttendeesIds();
  }, [user?.id, params.slug]);

  if (eventP === null) {
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
    if (!params.slug) return;
    await deleteEventBySlug(params.slug as string, user.id);
    router.push("/events");
  }

  function handleEditEvent(eventP: EventType) {
    router.push(`/events/${eventP.slug}/edit`);
  }

  return (
    <div className="flex flex-row justify-center w-full">
      <div className="max-w-[1440px] relative">
        <div className="container mx-auto px-20 pt-[164px] mb-4 space-y-6">
         
          {isOwner && (
            <motion.div
              key={eventP.href}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="bg-card/90 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm"
            >
              <div className="flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:space-x-2">
                {/* <Link > */}
                <Button
                  onClick={() => handleEditEvent(eventP)}
                  size="sm"
                  variant="link"
                  className="flex items-center cursor-pointer"
                >
                  <SquarePen />
                  Edit Event
                </Button>
                {/* </Link> */}

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
                      Delete {eventP.title}
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
          )}

          <div className="relative">
            <SingleEventPage
              event={eventP}
              attendees={eventAttendees}
              isOwner={isOwner}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
