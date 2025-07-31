"use client";

import dynamic from "next/dynamic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { parse } from "date-fns";
import { toast } from "sonner";
import placeholder from "@/assets/images/placeholder.png";
import {
  uploadImage,
  updateEvent,
  getEventBySlug,
  removeFromBucket,
} from "@/lib/actions/client-events";
import { User } from "@supabase/supabase-js";
import { useRouter, useParams } from "next/navigation";
import { EventType } from "@/types/types_all";
import { slugToTitle } from "@/lib/utils/utils";
import {
  formSchema,
  FormSchemaType,
  handleDateSelect,
  handleTimeChange,
  isTimeButtonDisabled,
  handleFileChange,
  updateFormDateField,
  cleanupImagePreview,
} from "@/lib/utils/event-form-utils";

const DateTimePicker = dynamic(
  () => import("./date-time-picker").then((mod) => mod.DateTimePicker),
  { ssr: false, loading: () => <p>Loading date picker...</p> }
);

const ImageUpload = dynamic(
  () => import("./image-upload").then((mod) => mod.ImageUpload),
  {
    ssr: false,
    loading: () => <p>Loading image uploader...</p>,
  }
);

export function EditEventForm({ user }: { user: User }) {
  const params = useParams();
  const eventSlug: string = params.slug as string;

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [pickerMode, setPickerMode] = useState<"start" | "end">("start");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [currentEvent, setCurrentEvent] = useState<EventType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const router = useRouter();

  const title = slugToTitle(eventSlug);

  // Define form with shared schema
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      date: "",
      capacity: 1,
      card: undefined,
    },
  });

  // Fetch event data on component mount
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setIsLoading(true);
        const { event, isOwnerMatch } = await getEventBySlug(
          eventSlug,
          user?.id
        );

        if (!event) {
          toast.error("Failed to load event data.");
          router.push("/events");
          return;
        }

        // Check if user owns this event
        if (!isOwnerMatch) {
          toast.error("You don't have permission to edit this event.");
          router.push("/events");
          return;
        }

        setCurrentEvent(event);
        setExistingImageUrl(event.card || null);
        setImagePreview(event.card || null);

        // Parse the date string to extract start and end times
        const dateRange = event.date.split(" - ");
        if (dateRange.length === 2) {
          const startDate = parse(
            dateRange[0],
            "MM/dd/yyyy hh:mm aa",
            new Date()
          );
          const endDate = parse(
            dateRange[1],
            "MM/dd/yyyy hh:mm aa",
            new Date()
          );
          setStartTime(startDate);
          setEndTime(endDate);
        }

        // Set form values
        form.setValue("title", event.title);
        form.setValue("description", event.description ?? "");
        form.setValue("location", event.location);
        form.setValue("date", event.date);
        form.setValue("capacity", event.capacity);

      } catch (error) {
        console.error("Error fetching event:", error);
        toast.error("Failed to load event data.");
        router.push("/events");
      } finally {
        setIsLoading(false);
      }
    };

    if (eventSlug && user?.id) {
      fetchEventData();
    }
  }, [eventSlug, user?.id, form, router]);

  // Submit handler for updating the event
  const onSubmit = async (values: FormSchemaType) => {
    

    try {
      let imageUrl = existingImageUrl; // Keep existing image by default

      // Only upload new image if a new file was selected
      if (values.card) {
        // Delete previous image if it exists
        await removeFromBucket(existingImageUrl);
        imageUrl = await uploadImage(values.card);
      }

      const { error } = await updateEvent(eventSlug, values, imageUrl);

      if (error) throw new Error("Failed to update event.");

      toast.success("Event updated successfully!");
      router.push(`/events/${eventSlug}`); // Redirect to event details page
    } catch (err) {
      console.error("Error updating event:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Wrapper functions using shared utilities
  const handleDateSelectWrapper = (date: Date | undefined) => {
    handleDateSelect(
      date,
      pickerMode,
      startTime,
      endTime,
      setStartTime,
      setEndTime
    );
  };

  const handleTimeChangeWrapper = (
    type: "hour" | "minute" | "ampm",
    value: string
  ) => {
    handleTimeChange(
      type,
      value,
      pickerMode,
      startTime,
      endTime,
      setStartTime,
      setEndTime
    );
  };

  const isTimeButtonDisabledWrapper = (
    hour?: number,
    minute?: number,
    ampm?: string
  ) => {
    return isTimeButtonDisabled(
      pickerMode,
      startTime,
      endTime,
      hour,
      minute,
      ampm
    );
  };

  const handleFileChangeWrapper = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e, form, setImagePreview, imagePreview, existingImageUrl);
  };

  // Update form date field when start/end times change
  useEffect(() => {
    updateFormDateField(startTime, endTime, form);
  }, [startTime, endTime, form]);

  // Clean up preview URLs on unmount
  useEffect(() => {
    return () => {
      cleanupImagePreview(imagePreview, existingImageUrl);
    };
  }, [imagePreview, existingImageUrl]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading event data...</p>
        </div>
      </div>
    );
  }

  if (!currentEvent) {
    return (
      <div className="text-center">
        <p>Event not found.</p>
        <Button onClick={() => router.push("/events")} className="mt-4">
          Back to Events
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Edit Your Event</h1>
        <p className="text-muted-foreground mb-4">
          Editing: <span className="font-semibold">{title}</span>
        </p>
        <p className="text-muted-foreground">
          Update and or Change the details of your event below.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log("Validation failed", errors); 
          })}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the event name"
                    {...field}
                    className="input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Write a message to the people you&apos;re inviting (optional)
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write here..."
                    {...field}
                    className="input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Where will your event/party take place?"
                    {...field}
                    className="input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Date & Time</FormLabel>
                <DateTimePicker
                  pickerMode={pickerMode}
                  startTime={startTime}
                  endTime={endTime}
                  setPickerMode={setPickerMode}
                  handleDateSelect={handleDateSelectWrapper}
                  handleTimeChange={handleTimeChangeWrapper}
                  isTimeButtonDisabled={isTimeButtonDisabledWrapper}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Capacity</FormLabel>
                <FormControl>
                  <Input
                    placeholder="25"
                    type="number"
                    min={0}
                    max={200}
                    {...field}
                    className="input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="card"
            render={() => (
              <FormItem>
                <FormLabel>Event Card</FormLabel>
                <FormControl>
                  <ImageUpload
                    handleFileChange={handleFileChangeWrapper}
                    imagePreview={imagePreview}
                    placeholder={placeholder.src}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/events/${eventSlug}`)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 cursor-pointer hover:ring-2 hover:ring-ring hover:ring-offset-2"
            >
              Update Event
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
