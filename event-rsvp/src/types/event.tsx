import { StaticImageData } from "next/image";

export type Event = {
    title: string;
    card: StaticImageData[] | string[];
    date: string;
    time: string;
    location: string;
    capacity: number;
    href: string;
    slug?: string;
    attendees?: string[];
    content?: React.ReactNode | string;
  };
  