/* eslint-disable @next/next/no-img-element */


import { ModeToggle } from "@/components/ui/toggle-mode";
import { toast } from "sonner";


export default function Home() {
  function handleClick() {
    return toast("You made it", {
      description: <span className="text-black">mane im dead!</span>,
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  }
  return (
    <div>
      <ModeToggle />

         {/* <Footer/> */}
    </div>
  );
}

// APIS i will need to implement
// OpenAI API (ChatGPT) – you can integrate a chatbot for answering FAQs about the event.
// QR Code API (for event check-in) QR Code Generator APIs like goqr.me or QRCode Monkey API – generate unique QR codes for each RSVP.
// Supabase API – for managing user data, event details, and RSVPs.
// Stripe API – for handling payments if you plan to charge for event tickets.
//To manage user logins and registration:
// Auth0 or Firebase Authentication – handle secure logins, including social login (Google, Facebook).

// OAuth 2.0 / OpenID Connect – if you want to allow users to sign in with Google or Facebook manually.
//Google Calendar API – users can add your event directly to their Google Calendar.
// To send RSVP invites and confirmations:

// SendGrid API or Mailgun API – for sending email invites.

// Twilio API – to send SMS messages to users.

