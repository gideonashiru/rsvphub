export const dynamic = "force-dynamic";

import { notFound, redirect } from "next/navigation";
import { events } from "@/constants/events";
import { EventType } from "@/types/event";
import { Metadata } from "next";
import { SingleEvent } from "@/components/Event";


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
      description: "Event rSvP description",
    };
  }
}

export default function SingleProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const event = events.find((e) => e.slug === params.slug);

  if (!event) {
    redirect("/events");
  }

  return (
    <>
      <div className="mt-40" />
      <SingleEvent event={event} />
    </>
  );
}


//when i swap to api calls
// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const res = await fetch("https://your-api.com/events"); // example
//   const events: EventType[] = await res.json();
//   const event = events.find((e) => e.slug === params.slug);

//   return event
//     ? {
//         title: event.title,
//         description: event.date,
//       }
//     : {
//         title: "Events",
//         description: "Event rSvP description",
//       };
// }
