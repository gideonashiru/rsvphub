import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full bg-card border-t border-border mt-4">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-foreground">
        
        {/* Branding */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold">RSVP Hub</h3>
          <p className="text-muted-foreground">
            Simplify your event invites & responses.
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center gap-6">
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/events" className="hover:underline">Events</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
          <Link href="/privacy" className="hover:underline">Privacy</Link>
        </nav>

        {/* Copyright */}
        <div className="text-center md:text-right text-muted-foreground">
          &copy; {new Date().getFullYear()} RSVP Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
