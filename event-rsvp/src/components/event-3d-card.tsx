

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/threeD-card-import";
import Image from "next/image";
import Link from "next/link";
import { EventType } from "@/types/types_all";
import { MapPin } from "lucide-react";

export function ThreeDCard({ event }: { event: EventType }) {
  return (
    <CardContainer className="inter-var">
      <Link
        href={event.slug ? `/events/${event.slug}` : event.href}
        className="block"
      >
        <CardBody className="bg-card relative group/card w-auto sm:w-[26rem] h-auto rounded-xl p-6 border">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            {event.title}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            {event.description} 
          </CardItem>
          <CardItem
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            {event.date}
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src={event.card}
              height="1000"
              width="1000"
              className="h-50 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
              // priority
            />
          </CardItem>

          <div className="flex justify-between items-center gap-1 mt-2">
            <CardItem
              translateZ={20}
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            >
              Click card to see event details →
            </CardItem>
            <CardItem
              translateZ={20}
              className="px-2 py-2 rounded-xl flex items-center bg-black dark:bg-white dark:text-black text-xs font-bold"
            >
              <MapPin size="30"  className="w-4 h-4 text-accent-foreground text-xl" />
              {event.location}
            </CardItem>
            <CardItem
              translateZ={20}
              className="px-4 py-1 rounded-xl bg-black dark:bg-white dark:text-black text-xs font-bold"
            >
              <div className="w-13 h-13 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                +{event.capacity} ppl
              </div>
            </CardItem>
          </div>
        </CardBody>
      </Link>
    </CardContainer>
  );
}