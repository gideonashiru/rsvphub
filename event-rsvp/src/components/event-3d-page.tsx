"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/threeD-card-import";
import Image from "next/image";
import { EventType } from "@/types/types_all";

export function ThreeDCardForSlugs({ event }: { event: EventType }) {
  return (
    <CardContainer className="inter-var">
      <CardBody
        className="w-full md:w-[625px] h-[613px] rounded-xl p-0 overflow-hidden
                   bg-gray-50 relative group/card dark:hover:shadow-2xl 
                   dark:hover:shadow-emerald-500/[0.1] dark:bg-black 
                   dark:border-white/[0.2] border-black/[0.1]"
      >
        <CardItem translateZ="100" className="w-full h-full">
          <Image
            src={event.card}
            height="1000"
            width="1000"
            className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
            priority
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
