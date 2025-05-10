import { Button } from "@/components/ui/button";
import { ButtonT } from "@/components/ui/buttontwo";
import { Events } from "@/components/Events";
import { Metadata } from "next";
import { div } from "motion/react-client";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Events | event rSvP",
  description: "rSvP description.",
};

export default function EventsPage() {
  // function addEvent(){

  // }

  return (
    <>
      <div className="container flex flex-col sm:flex-row justify-between items-start sm:items-center font-play mt-40 ">
        <h4 className="flex flex-col inline text-3xl font-montserrat ml-16">
          EVENTS
        </h4>

        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <Button size="sm" variant="outline" className="flex items-center">
            <svg
              fill="none"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit Event
          </Button>
          <Button size="sm" variant="outline" className="flex items-center">
            <svg
              fill="none"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" x2="10" y1="11" y2="17" />
              <line x1="14" x2="14" y1="11" y2="17" />
            </svg>
            Delete Event
          </Button>
          <Button size="sm" variant="outline" className="flex items-center">
            <svg
              fill="none"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
            Add Event
          </Button>
          <Button size="sm" variant="default" className="flex items-center">
            <svg
              fill="none"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <rect x="9" y="9" rx="2" ry="2" width="13" height="13" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Get RSVP Link
          </Button>
        </div>
      </div>

      <div className="flex flex-col space-y-6">
        <Events />
        <Footer />
      </div>
    </>
  );
}
