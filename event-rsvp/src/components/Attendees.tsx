
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Attendee,} from "../types/types_all";



export default function Attendees({ attendees, isOwner }: { attendees: Attendee[], isOwner : boolean  }) {
  return (
    <div className="mt-16 pt-6 bg-indigo-300 rounded-lg">
      {/* Attendees section */}
      <h2 className="font-semibold text-black text-[32px] tracking-[0] leading-[48px] mb-6 ml-2">
        Current Attendees
      </h2>
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
                    <AvatarFallback className="w-10 h-10 font-m3-title-medium text-m3syslighton-primary-container text-[length:var(--m3-title-medium-font-size)] tracking-[var(--m3-title-medium-letter-spacing)] leading-[var(--m3-title-medium-line-height)] [font-style:var(--m3-title-medium-font-style)]">
                      {attendee.avatarText}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Name */}
                <div className="flex flex-col justify-center flex-1">
                  <span className="font-m3-body-large font-[number:var(--m3-body-large-font-weight)] text-m3syslighton-surface text-[length:var(--m3-body-large-font-size)] tracking-[var(--m3-body-large-letter-spacing)] leading-[var(--m3-body-large-line-height)] [font-style:var(--m3-body-large-font-style)]">
                    {attendee.name}
                  </span>
                </div>

                {/* Checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-indigo-600 rounded border-gray-300 cursor-pointer"
                    aria-label={`Confirm attendance for ${attendee.name}`}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}