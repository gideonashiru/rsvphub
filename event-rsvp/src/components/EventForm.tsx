/* eslint-disable prefer-const */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { format } from "date-fns";
import { toast } from "sonner";
import placeholder from "@/assets/images/placeholder.png";
import { uploadImage, createEvent } from "@/lib/actions/client-events";
import { DateTimePicker } from "./date-time-picker";
import { ImageUpload } from "./image-upload";
import { User } from "@supabase/supabase-js";
import { useRouter } from 'next/navigation'; // Next.js App Pages


const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  description: z
    .string()
    .min(0, { message: "Description must be at least 2 characters." }),
  location: z
    .string()
    .min(2, { message: "Location must be at least 2 characters." }),
  date: z.string().min(5, { message: "Date and time is required." }),
  capacity: z.coerce
    .number()
    .min(1, { message: "Maximum capacity must be at least 1." }),
  card: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Card file is required." }),
  userId: z.string(), // Optional userId field
});

export function EventForm(user: { user: User }) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [pickerMode, setPickerMode] = useState<"start" | "end">("start");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "(example)",
      description: "",
      location: "",
      date: undefined,
      capacity: 1,
      card: undefined,
    },
  });

  useEffect(() => {
    if (user?.user?.id) {
      form.setValue("userId", user.user.id);
    }
  }, [user?.user?.id, form]);

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const imageUrl = values.card ? await uploadImage(values.card) : null;

    console.log("Form submitted with values:", values);
    const { error } = await createEvent(values, imageUrl);

    if (error) {
      // console.error("Error creating event:", error.message);
      toast.error("Failed to create event. Please try again.");
      return;
    }

    toast.success("Event created successfully!");
    router.push('/events')

  };

  // Helper function to check if a date is valid for start time (at least 2 hours before day ends)
  const isValidStartTime = (date: Date) => {
    const now = new Date();
    const oneHourAfterNow = new Date(now.getTime() + 1 * 60 * 60 * 1000); // 1 hour after current time

    // The selected start time must be at least 1 hour after now
    return date >= oneHourAfterNow;
  };

  // Helper function to check if end time is valid (after start time)
  const isValidEndTime = (date: Date) => {
    if (!startTime) return false;
    const minEndTime = new Date(startTime.getTime() + 60 * 60 * 1000); // startTime + 1 hour
    return date >= minEndTime;
  };

  //function to show date in the input field
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const currentTime = pickerMode === "start" ? startTime : endTime;
      const newDate = new Date(date);
      if (currentTime) {
        newDate.setHours(currentTime.getHours());
        newDate.setMinutes(currentTime.getMinutes());
      }

      if (pickerMode === "start") {
        if (!isValidStartTime(newDate)) {
          toast.error(
            "Start time must be at least 1 hour ahead of now and not in the past"
          );
          return;
        }
        setStartTime(newDate);

        // Clear end time if it's now invalid
        if (endTime && endTime <= newDate) {
          setEndTime(null);
        }
      } else {
        if (!isValidEndTime(newDate)) {
          toast.error("End time must be after the start time");
          return;
        }
        setEndTime(newDate);
      }

      form.setValue(
        "date",
        `${startTime?.toLocaleString()} - ${endTime?.toLocaleString()}`
      ); // Update the date field with formatted string
      form.setValue(
        "date",
        `${format(new Date(startTime!), "MM/dd/yyyy hh:mm aa")} - ${format(
          new Date(endTime!),
          "MM/dd/yyyy hh:mm aa"
        )}`
      );
      // Update the date field with formatted string
    }
  };

  const handleTimeChange = (
    type: "hour" | "minute" | "ampm",
    value: string
  ) => {
    const currentDate =
      (pickerMode === "start" ? startTime : endTime) || new Date();
    let newDate = new Date(currentDate);

    if (type === "hour") {
      const hour = parseInt(value, 10);
      const currentHour = newDate.getHours();
      const isPM = currentHour >= 12;
      newDate.setHours(
        isPM ? (hour === 12 ? 12 : hour + 12) : hour === 12 ? 0 : hour
      );
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value, 10));
    } else if (type === "ampm") {
      const hours = newDate.getHours();
      if (value === "AM" && hours >= 12) {
        newDate.setHours(hours - 12);
      } else if (value === "PM" && hours < 12) {
        newDate.setHours(hours + 12);
      }
    }

    if (pickerMode === "start") {
      if (!isValidStartTime(newDate)) {
        toast.error(
          "Start time must be at least 1 hour ahead of now and not in the past"
        );
        return;
      }
      setStartTime(newDate);

      // Clear end time if it's now invalid
      if (endTime && endTime <= newDate) {
        setEndTime(null);
      }
    } else {
      if (!isValidEndTime(newDate)) {
        toast.error("End time must be after the start time");
        return;
      }
      setEndTime(newDate);
    }

    // Update the date field with formatted string
    form.setValue(
      "date",
      `${startTime?.toLocaleString()} - ${endTime?.toLocaleString()}`
    );
    form.setValue(
      "date",
      `${format(new Date(startTime!), "MM/dd/yyyy hh:mm aa")} - ${format(
        new Date(endTime!),
        "MM/dd/yyyy hh:mm aa"
      )}`
    );
  };

  // Helper function to check if a time button should be disabled
  const isTimeButtonDisabled = (
    hour?: number,
    minute?: number,
    ampm?: string
  ) => {
    const currentTime = pickerMode === "start" ? startTime : endTime;
    if (!currentTime) return false;

    let testDate = new Date(currentTime);

    if (hour !== undefined) {
      const currentHour = testDate.getHours();
      const isPM = currentHour >= 12;
      testDate.setHours(
        isPM ? (hour === 12 ? 12 : hour + 12) : hour === 12 ? 0 : hour
      );
    }

    if (minute !== undefined) {
      testDate.setMinutes(minute);
    }

    if (ampm !== undefined) {
      const hours = testDate.getHours();
      if (ampm === "AM" && hours >= 12) {
        testDate.setHours(hours - 12);
      } else if (ampm === "PM" && hours < 12) {
        testDate.setHours(hours + 12);
      }
    }

    if (pickerMode === "start") {
      return !isValidStartTime(testDate);
    } else {
      return !isValidEndTime(testDate);
    }
  };
  // Function to handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      form.setValue("card", e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0])); // Create a preview URL for the image
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  useEffect(() => {
    if (startTime && endTime) {
      const formatted = `${format(startTime, "MM/dd/yyyy hh:mm aa")} - ${format(
        endTime,
        "MM/dd/yyyy hh:mm aa"
      )}`;
      form.setValue("date", formatted);
    } else if (startTime) {
      const formatted = `${format(startTime, "MM/dd/yyyy hh:mm aa")} - `;
      form.setValue("date", formatted);
    } else {
      form.setValue("date", "");
    }
  }, [startTime, endTime, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              <FormLabel>Write a message to the people you&apos;re inviting (optional)</FormLabel>
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
                handleDateSelect={handleDateSelect}
                handleTimeChange={handleTimeChange}
                isTimeButtonDisabled={isTimeButtonDisabled}
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
              <ImageUpload
                handleFileChange={handleFileChange}
                imagePreview={imagePreview}
                placeholder={placeholder.src}
              />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full cursor-pointer hover:ring-2 hover:ring-ring hover:ring-offset-2">
          Build Your Event
        </Button>
      </form>
    </Form>
  );
}
