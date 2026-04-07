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

import { toast } from "sonner";
import placeholder from "@/assets/images/placeholder.png";
import { uploadImage, createEvent } from "@/lib/actions/client-events";
import { useRouter } from "next/navigation";
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

interface DummyAuthUser {
  id: string;
  username: string;
  email?: string;
}

export function EventForm({ user }: { user: DummyAuthUser }) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [pickerMode, setPickerMode] = useState<"start" | "end">("start");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Define form with shared schema
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      date: undefined,
      capacity: 1,
      card: undefined,
    },
  });

  useEffect(() => {
    if (user?.id) {
      form.setValue("userId", user.id);
    }
    
    // Simulate loading time or wait for form to be ready
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust timing as needed
    
    return () => clearTimeout(timer);
  }, [user?.id, form]);

  // Submit handler
  const onSubmit = async (values: FormSchemaType) => {
    try {
      const imageUrl = values.card ? await uploadImage(values.card) : null;
      const { error } = await createEvent(values, imageUrl);

      if (error) throw new Error("Failed to create event.");

      toast.success("Event created successfully!");
      router.push("/events");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Wrapper functions using shared utilities
  const handleDateSelectWrapper = (date: Date | undefined) => {
    handleDateSelect(date, pickerMode, startTime, endTime, setStartTime, setEndTime);
  };

  const handleTimeChangeWrapper = (
    type: "hour" | "minute" | "ampm",
    value: string
  ) => {
    handleTimeChange(type, value, pickerMode, startTime, endTime, setStartTime, setEndTime);
  };

  const isTimeButtonDisabledWrapper = (
    hour?: number,
    minute?: number,
    ampm?: string
  ) => {
    return isTimeButtonDisabled(pickerMode, startTime, endTime, hour, minute, ampm);
  };

  const handleFileChangeWrapper = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e, form, setImagePreview, imagePreview);
  };

  // Update form date field when start/end times change
  useEffect(() => {
    updateFormDateField(startTime, endTime, form);
  }, [startTime, endTime, form]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      cleanupImagePreview(imagePreview);
    };
  }, [imagePreview]);

  // Show loading spinner while form is initializing
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

  return (
    <>
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
                <ImageUpload
                  handleFileChange={handleFileChangeWrapper}
                  imagePreview={imagePreview}
                  placeholder={placeholder.src}
                />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full cursor-pointer hover:ring-2 hover:ring-ring hover:ring-offset-2"
          >
            Build Your Event
          </Button>
        </form>
      </Form>
    </>
  );
}