import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Attendee } from "../types/types_all";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { removeAttendee } from "@/lib/actions/client-events";

export default function Attendees({
  attendees: initialAttendees,
  isOwner,
  eventSlug,
}: {
  attendees: Attendee[];
  isOwner: boolean;
  eventSlug: string | undefined;
}) {
  const [attendees, setAttendees] = useState<Attendee[]>(initialAttendees);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // Toggle checkbox selection
  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Handle "Remove Attendees" button click
  const handleRemoveSelected = async () => {
    if (!eventSlug) {
      toast.error("Event slug is not defined.");
      return;
    }

    const selectedIdsArray = Array.from(selectedIds);
    for (const id of selectedIdsArray) {
      try {
        await removeAttendee(eventSlug, id);
      } catch (error) {
        toast.error(`Error removing attendee with ID ${id}:`);
      }
    }
    setAttendees((prev) =>
      prev.filter((attendee) => !selectedIds.has(attendee.id))
    );

    toast.success("Selected attendees removed successfully!");

    //setSelectedIds(new Set()); // Clear selection after removing
  };

  useEffect(() => {
    if (initialAttendees.length > 0) {
      setAttendees(initialAttendees);
    }
  }, [initialAttendees]);

  return (
    <div className="mt-16 pt-6 bg-indigo-300 rounded-lg">
      {/* Heading and Button */}
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="font-semibold text-black text-[32px] tracking-[0] leading-[48px]">
          Current Attendees
        </h2>
        {isOwner && (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="link"
                  className="text-sm px-4 py-1 text-card rounded transition cursor-pointer"
                >
                  Remove Attendees
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogTitle className="text-lg font-semibold">
                  Remove Selected Attendees
                </DialogTitle>
                <DialogDescription>
                  Are you sure you want to remove the selected attendees? This
                  action cannot be undone. <br /> You have to send them a new
                  invite link if they want to rejoin.
                </DialogDescription>
                <DialogClose asChild>
                  <Button
                    size="sm"
                    variant="link"
                    className="flex items-center cursor-pointer"
                    onClick={handleRemoveSelected}
                  >
                    Yes, Remove
                  </Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      {/* Attendee list */}
      <div className="flex flex-col w-full border-t border-solid border-black bg-m-3syslightsurface">
        <ul className="w-full">
          {attendees.map((attendee, index) => (
            <li key={attendee.id} className="w-full">
              <div className="flex h-12 items-center gap-4 px-4 py-1 w-full">
                {/* Index */}
                <div className="w-6 text-sm text-black">{index + 1}.</div>

                {/* Avatar */}
                <div className="flex-shrink-0">
                  <Avatar className="w-10 h-10 bg-m3syslightprimary-container overflow-hidden">
                    <AvatarFallback className="w-10 h-10 font-m3-title-medium text-m3syslighton-primary-container">
                      {attendee.avatarText}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Name */}
                <div className="flex flex-col justify-center flex-1">
                  <span className="font-m3-body-large text-card">
                    {attendee.name}
                  </span>
                </div>

                {/* Checkbox */}
                {isOwner && (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(attendee.id)}
                      onChange={() => handleCheckboxChange(attendee.id)}
                      className="w-5 h-5 accent-indigo-600 rounded border-gray-300 cursor-pointer"
                      aria-label={`Confirm attendance for ${attendee.name}`}
                    />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
