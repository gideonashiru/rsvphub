import { StaticImageData } from "next/image";

export type EventType = {
    title: string;
    card: StaticImageData;
    date: string;
    time: string;
    location: string;
    capacity: number;
    href: string;
    slug?: string;
    attendees?: string[];
    content?: React.ReactNode | string;
  };
  