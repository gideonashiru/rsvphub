/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@/lib/client";
import { EventType } from "@/types/types_all";

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

export async function createEvent(values: any, imageUrl: string | null) {
  const slug = values.title
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9-]/g, "-");
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
    .single();

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

  const { data: eventsData, error } = await (supabase)
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

export async function getEventBySlug(slug: string, ownerId: string) {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .eq("owner_id", ownerId)
    .single();

  if (error) {
    console.error("Error fetching event by slug and owner:", error.message || error);
    return null;
  }

  return data as EventType;
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
  if (data?.card) {
    const filePath = data.card.split("/storage/v1/object/public/")[1];
    if (filePath) {
      await supabase.storage.from("event-cards").remove([filePath]);
    }
  }

  return data;
}