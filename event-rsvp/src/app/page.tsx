import LandingPage from "@/components/LandingPage";
import { ModeToggle } from "@/components/ui/toggle-mode";

export default function Home() {
  return (
    <div>
      <ModeToggle />
      <LandingPage />
    </div>
  );
}

// APIS i want to implement
// OpenAI API (ChatGPT) – you can integrate a chatbot for answering FAQs about the event.
// Stripe API – for handling payments if you plan to charge for event tickets.
// Google Calendar API – users can add your event directly to their Google Calendar.
// SendGrid API or Mailgun API – for sending email invites.
// Twilio API – to send SMS messages to users.

