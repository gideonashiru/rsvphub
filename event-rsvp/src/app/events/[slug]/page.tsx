import { redirect } from "next/navigation";
import { events } from "@/constants/events";
import { EventType } from "@/types/event";
import { Metadata } from "next";
import { SingleEvent } from "@/components/Event";
import { twMerge } from "tailwind-merge";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const event = events.find((e) => e.slug === slug) as EventType | undefined;
  if (event) {
    return {
      title: event.title,
      description: event.date,
    };
  } else {
    return {
      title: "Events",
      description:
        "Event rSvP description",
    };
  }
}

export default function SingleProjectPage({
    params,
  }: {
    params: { slug: string };
  }) {
    const slug = params.slug;
    const event = events.find((e) => e.slug === slug);
  
    if (!event) {
      redirect("/events");
    }
    return (
        <SingleEvent event={event} />
    );
  }
  