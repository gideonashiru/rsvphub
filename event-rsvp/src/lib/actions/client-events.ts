/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@/lib/client";
import { Attendee, EventNotification, EventType } from "@/types/types_all";
import { UUIDTypes, v4 as uuidv4 } from "uuid";

const supabase = createClient();

export async function uploadImage(file: File): Promise<string | null> {
  if (!file) return null;
  const filePath = `${file.name}-${Date.now()}`;
  const { error } = await supabase.storage
    .from("event-cards")
    .upload(filePath, file);

  if (error) {
    console.error("Error uploading image:", error.message || error);
    return null;
  }

  const { data } = await supabase.storage
    .from("event-cards")
    .getPublicUrl(filePath);
  return data.publicUrl;
}

async function generateUniqueSlug(title: string) {
  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // convert spaces to dashes
    .replace(/[^a-z0-9-]/g, ""); // remove invalid chars

  const slug = `${baseSlug}-${uuidv4().slice(0, 8)}`;

  return slug;
}

export async function createEvent(values: any, imageUrl: string | null) {
  const slug = await generateUniqueSlug(values.title);

  const href = "/" + slug;

  const { data, error } = await supabase
    .from("events")
    .insert({
      title: values.title,
      description: values.description,
      location: values.location,
      date: values.date,
      capacity: values.capacity,
      card: imageUrl,
      href,
      slug,
      owner_id: values.userId,
    })
    .select()
    .single();

  if (data) {
    const { data: invData, error: invErr } = await supabase
      .from("invites")
      .insert([{ event_id: data.id, sender_id: values.userId }])
      .select();
  }

  // If insertion failed and imageUrl exists, delete the uploaded image
  if (error && imageUrl) {
    try {
      const filePath = imageUrl.split("/storage/v1/object/public/")[1];
      if (filePath) {
        await supabase.storage.from("event-cards").remove([filePath]);
      }
    } catch (deleteError) {
      console.error("Image cleanup failed:", deleteError);
    }
  }

  return { data, error };
}

export async function getCurrentUserEvents(userId: string) {
  const { data: eventsData, error } = await supabase
    .from("events")
    .select("*")
    .eq("owner_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching user events:", error.message || error);
    return [];
  }

  const events: EventType[] = eventsData.map((row: EventType) => ({
    ownerId: row.ownerId,
    title: row.title,
    description: row.description,
    location: row.location,
    date: row.date,
    card: row.card,
    capacity: row.capacity,
    href: row.href,
    slug: row.slug,
    attendees: row.attendees,
  }));

  return events;
}

export async function getCurrentUserInvEvents(userId: string) {
  const { data: eventsData, error } = await supabase
    .from("events")
    .select("*")
    .eq("owner_id", userId)
    .eq("attendees", "8")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching user events:", error.message || error);
    return [];
  }

  const events: EventType[] = eventsData.map((row: EventType) => ({
    ownerId: row.ownerId,
    title: row.title,
    description: row.description,
    location: row.location,
    date: row.date,
    card: row.card,
    capacity: row.capacity,
    href: row.href,
    slug: row.slug,
    attendees: row.attendees,
  }));

  return events;
}

export async function getAttendeesId(eventId: number) {
  const { data, error } = await supabase
    .from("events")
    .select("attendees")
    .eq("id", eventId)
    .single();

  if (error) {
    console.error("Error fetching user:", error.message || error);
    return [];
  }

  const attendeesIds: number[] = data.attendees || [];
  return attendeesIds;
}

export async function getUserFromAttndId(userId: number) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching user:", error.message || error);
    return [];
  }

  const user: Attendee = {
    id: data.id,
    name: data.username,
    avatarText: `${data.username.charAt(0)}`,
  };
  return user;
}

export async function getEventBySlug(slug: string, ownerId: string) {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.error(
      "Error fetching event by slug and owner:",
      error?.message || "No data returned."
    );
    return { event: null, isOwnerMatch: false };
  }

  const isOwnerMatch = data.owner_id === ownerId;

  return {
    event: data as EventType,
    isOwnerMatch,
  };
}

export async function deleteEventBySlug(slug: string, ownerId: string) {
  const { data, error } = await supabase
    .from("events")
    .delete()
    .eq("slug", slug)
    .eq("owner_id", ownerId)
    .select("*")
    .single();

  if (error) {
    console.error("Error deleting event by slug:", error.message || error);
    return null;
  }

  // Optionally, delete the image from storage if it exists
  if (data.card) {
    await supabase.storage.from("event-cards").remove([data.card]);
    if (error) {
      console.error("Error removing file:", error);
    } else {
      console.log("File removed successfully:", data);
    }
  }

  return data;
}

export const saveInvite = async (slug: string, userId: string) => {
  if (!userId) return;

  // See if events exists first
  const { data: event, error: firError } = await supabase
    .from("events")
    .select("id, owner_id")
    .eq("slug", slug)
    .single();

  if (event) {
    //gets the user number id to add to attendees for events
    const userNum = await getUserNumFromId(userId);

    // Check if invite already exists
    const { data: existingInvite, error: ex } = await supabase
      .from("invites")
      .select("*")
      .eq("event_id", event.id)
      .contains("invitees_id", [userNum])
      .maybeSingle();

    // and check event owner is not the current user
    let eventOwner = false;
    if (event.owner_id == userId) eventOwner = true;

    // You may add invite to db
    if (!existingInvite && !eventOwner) {
      console.log(event.id, userNum);
      // appending to array event invites
      const { data, error } = await supabase.rpc("append_invites", {
        event_id: event.id,
        new_attendee: userNum,
      });

      if (error) {
        console.error("Error appending invite:", error);
        return { success: false };
      } else {
        return { success: true };
      }
    }
  }
};

export async function getUserInvtdEvents(userUUId: string) {
  // Get the user's numeric ID using their UUID
  const userNum = await getUserNumFromId(userUUId);

  // Get events where the user is in the invites array
  const { data: eventData, error: eventError } = await supabase
    .from("events")
    .select("*")
    .contains("attendees", [userNum])
    .order("created_at", { ascending: true });

  if (eventError || !eventData) {
    console.error(
      "Error fetching current invites:",
      eventError?.message || "No events found."
    );
    return [];
  }

  // Map the events to your desired EventType
  const events: EventType[] = eventData.map((row: any) => ({
    ownerId: row.ownerId,
    title: row.title,
    description: row.description,
    location: row.location,
    date: row.date,
    card: row.card,
    capacity: row.capacity,
    href: row.href,
    slug: row.slug,
    attendees: row.attendees,
  }));

  return events;
}

export async function getUserInvites(userId: string) {
  //gets the user number id to add to attendees for events
  const userNum = await getUserNumFromId(userId);

  // Check if invite already exists
  const { data: invites, error: invitesErr } = await supabase
    .from("invites")
    .select("*")
    .contains("invitees_id", [userNum]);

  if (!invites) {
    // console.error("Error fetching user invites:", invitesErr);
    return [];
  }
  //Extract all event_ids from invites
  const eventIds = invites.map(
    (invite: { event_id: number }) => invite.event_id
  );

  if (eventIds.length === 0) return [];

  // Fetch all relevant events
  const { data: events, error: eventErr } = await supabase
    .from("events")
    .select("*")
    .in("id", eventIds);

  if (eventErr || !events) {
    console.error(
      "Error fetching events for invites:",
      eventErr?.message || "No events found."
    );
    // handle error or return empty array
    return [];
  }

  const ownerIds = events.map((owner: { owner_id: string }) => owner.owner_id);

  if (ownerIds.length === 0) return [];

  // Fetch all relevant organizers
  const { data: usersData, error: usersErr } = await supabase
    .from("users")
    .select("username, owner_uuid")
    .in("owner_uuid", ownerIds);

  if (usersErr || !usersData) {
    console.error("Error fetching users for events:", usersErr);
    // handle error or return empty array
    return [];
  }

  // Now it's safe to use events
  const invs: EventNotification[] = invites.map((invite: any) => {
    const event = events.find((e) => e.id === invite.event_id);
    const organizer = usersData.find((u) => u.owner_uuid === event?.owner_id);

    return {
      id: invite.id,
      title: event?.title,
      description: event?.description,
      eventDate: event?.date,
      location: event?.location,
      organizer: organizer?.username,
      status: "pending",
    };
  });

  return invs;
}

export async function getUserNumFromId(userId: string) {
  const { data: userNum } = await supabase
    .from("users")
    .select("id")
    .eq("owner_uuid", userId)
    .single();

  return userNum?.id;
}

export async function getUserNamefromId(userId: string) {
  const { data: userNum } = await supabase
    .from("users")
    .select("username")
    .eq("owner_uuid", userId)
    .single();

  return userNum?.username;
}

export async function acceptInvite(
  userId: string,
  eventInv: EventNotification
) {
  const attendee_id = await getUserNumFromId(userId);

  // Update the invite status to 'accepted'
  const { data: eventID, error } = await supabase
    .from("invites")
    .select("event_id")
    .eq("id", eventInv.id)
    .single();

  if (error) {
    console.error("Error accepting invite:", error.message || error);
    return { success: false, message: "Failed to accept invite." };
  }

  // Add the user to the event's attendees
  const { data: eventData, error: eventError } = await supabase.rpc(
    "append_attendee",
    {
      event_id: eventID.event_id,
      attendee_id: attendee_id,
    }
  );

  if (eventError) {
    console.error("Error adding attendee:", eventError);
    return { success: false, message: "Failed to add attendee." };
  } else {

        console.log("Event ID:", eventID);
    console.log("Attendee ID:", attendee_id);
    // Optionally, delete the invite after accepting
    const { data, error } = await supabase.rpc("remove_invitee", {
      event_id: eventID.event_id,
      target_attendee: attendee_id,
    });

    if (error) {
      console.error("Failed to remove invitee:", error);
      return false;
    }
  }

}

export async function declineInvite(userId:string,inviteId: string) {
  // Get the user number from the userId
  const userNum = await getUserNumFromId(userId);
  
  // Look up the invite to get the associated event_id
  const { data: invite, error: inviteErr } = await supabase
    .from("invites")
    .select("event_id")
    .eq("id", inviteId)
    .single();

  if (inviteErr || !invite) {
    console.error("Failed to fetch invite:", inviteErr?.message);
    return false;
  }

  const { data, error } = await supabase.rpc("remove_invitee", {
    event_id: invite.event_id,
    target_attendee: userNum,
  });

  if (error) {
    console.error("Failed to remove invitee:", error.message);
    return false;
  }

  return data;
}
