import { User } from "@supabase/supabase-js";

export default function Page({ user }: { user: User }) { 
    
    console.log("User in RSVP page:", user);
    return (
        <div className="p-10 space-y-4 mt-30">
        <h1 className="text-3xl font-bold">RSVP Page</h1>
        <p className="text-muted-foreground">
            This is a placeholder for the RSVP page. You can implement your RSVP
            logic here.
        </p>
        <p className="text-muted-foreground">
            User ID: {user?.id || "Not logged in"}
        </p>
        </div>
    );
    }