/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useEffect, useState } from "react";
import { Events } from "@/components/Events";
import { Footer } from "@/components/ui/Footer";
import { EventType } from "@/types/types_all";
import { getCurrentUserEvents } from "@/lib/actions/client-events";
import { get } from "http";

type TabKey = "my-events" | "invited-events" | "past-events";

export default function EventsPage({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState<TabKey>("my-events");
  
  // Your events data - you'll need to organize this by tab type
  const [myEvents, setMyEvents] = useState<EventType[]>([]);
  const [invitedEvents, setInvitedEvents] = useState<EventType[]>([]);
  const [pastEvents, setOldEvents] = useState<EventType[]>([]);


  useEffect(() => {
    if (!user?.id) return

    const fetchEvents = async () => {
      const events = await getCurrentUserEvents(user.id)
      setMyEvents(events)
    }

    fetchEvents()
  }, [user?.id])



  function getEventsForTab(tab: TabKey) {
    switch (tab) {
      case "my-events":
        return myEvents;
      case "invited-events":
        return invitedEvents;
      case "past-events":
        return pastEvents;
      default:
        return [];
    }
  }
  return (
    <div className="mt-50">
      <Events
        title={activeTab}
        events={getEventsForTab(activeTab)}
        onTabChange={setActiveTab}
      />
      <Footer />
    </div>
  );
}
