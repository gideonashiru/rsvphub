import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
export function HowToComponent() {

  const testimonials = [
    {
      quote:
        "Create an account and sign into the platform to get started. It's quick and easy, allowing you to access all features immediately.",
      name: "How to use Rsvp Hub: " ,
      designation: "Step 1: Sign Up",
      src: "https://hfeexkyhshegrpuvvesj.supabase.co/storage/v1/object/public/event-cards//demo.jpg",
    },
    {
      quote:
        "Creating an event is straightforward. Just fill in the event details, set the date and time, and you're ready to go. Share it with your friends easily.",
      name: "How to use Rsvp Hub: " ,
      designation: "Step 2: Create an Event",
      src: "https://hfeexkyhshegrpuvvesj.supabase.co/storage/v1/object/public/event-cards//demo%20(4).jpg",
    },
    {
      quote:
        "Invite your friends to the event by sharing the link or sending invites directly through the platform. It's a seamless way to gather everyone in one place.",
      name: "How to use Rsvp Hub: " ,
      designation: "Step 3: Invite Participants",
      src:  "https://hfeexkyhshegrpuvvesj.supabase.co/storage/v1/object/public/event-cards//demo%20(1).jpg",
      
    },
    {
      quote:
        "Managing RSVPs is easy. Track who has confirmed their attendance, send reminders, and make any necessary adjustments to the event details.",
      name: "How to use Rsvp Hub: " ,
      designation: "Step 4: Manage RSVPs",
      src: "https://hfeexkyhshegrpuvvesj.supabase.co/storage/v1/object/public/event-cards//demo%20(2).jpg",
      // src: "https://hfeexkyhshegrpuvvesj.supabase.co/storage/v1/object/public/event-cards//constrcn.avif",
    },
    {
      quote:
        "Once the event is set up and shared, all that's left is to enjoy it with your friends. Capture the moments and make lasting memories together.",
      name: "How to use Rsvp Hub: " ,
      designation: "Step 5: Enjoy the Event",
      src: "https://hfeexkyhshegrpuvvesj.supabase.co/storage/v1/object/public/event-cards//demo%20(3).jpg",
     
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
