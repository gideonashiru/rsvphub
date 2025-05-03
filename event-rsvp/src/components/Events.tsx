import { events } from "@/constants/events";
import { EventType } from "@/types/event";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export const Events = () => {
  return (
    <div>
      <div className="grid grid-cols-1  gap-10">
        {events.map((event: EventType, idx: number) => (
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
          transition={{ duration: 0.2, delay: idx * 0.1 }}
        >
            <Link
              href={event.slug ? `/events/${event.slug}` : event.href}
              key={event.href}
              className="group flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 hover:bg-gray-50 rounded-2xl transition duration-200 pt-4"
            >
              <Image
                src={event.card}
                alt="thumbnail"
                height="200"
                width="200"
                className="rounded-md"
              />
            </Link>
            
          </div>
        ))}
      </div>
      
    </div>
  );
};
