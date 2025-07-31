import { format } from "date-fns";
import { toast } from "sonner";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

// Common form schema
export const formSchema = z.object({
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
    .optional()
    .refine((file) => !file || file.size > 0, { message: "Invalid file." }),
  userId: z.string().optional(),
});

export type FormSchemaType = z.infer<typeof formSchema>;

// Time validation utilities
export const isValidStartTime = (date: Date): boolean => {
  const now = new Date();
  const oneHourAfterNow = new Date(now.getTime() + 1 * 60 * 60 * 1000);
  return date >= oneHourAfterNow;
};

export const isValidEndTime = (date: Date, startTime: Date | null): boolean => {
  if (!startTime) return false;
  const minEndTime = new Date(startTime.getTime() + 60 * 60 * 1000);
  return date >= minEndTime;
};

// Date/time handling utilities
export const handleDateSelect = (
  date: Date | undefined,
  pickerMode: "start" | "end",
  startTime: Date | null,
  endTime: Date | null,
  setStartTime: (date: Date) => void,
  setEndTime: (date: Date | null) => void
): void => {
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
      if (!isValidEndTime(newDate, startTime)) {
        toast.error("End time must be after the start time");
        return;
      }
      setEndTime(newDate);
    }
  }
};

export const handleTimeChange = (
  type: "hour" | "minute" | "ampm",
  value: string,
  pickerMode: "start" | "end",
  startTime: Date | null,
  endTime: Date | null,
  setStartTime: (date: Date) => void,
  setEndTime: (date: Date | null) => void
): void => {
  const currentDate = (pickerMode === "start" ? startTime : endTime) || new Date();
  const newDate = new Date(currentDate);

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
    if (!isValidEndTime(newDate, startTime)) {
      toast.error("End time must be after the start time");
      return;
    }
    setEndTime(newDate);
  }
};

export const isTimeButtonDisabled = (
  pickerMode: "start" | "end",
  startTime: Date | null,
  endTime: Date | null,
  hour?: number,
  minute?: number,
  ampm?: string
): boolean => {
  const currentTime = pickerMode === "start" ? startTime : endTime;
  if (!currentTime) return false;

  const testDate = new Date(currentTime);

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
    return !isValidEndTime(testDate, startTime);
  }
};

// File handling utilities
export const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  form: UseFormReturn<FormSchemaType>,
  setImagePreview: (url: string | null) => void,
  imagePreview?: string | null,
  existingImageUrl?: string | null
): void => {
  if (e.target.files && e.target.files.length > 0) {
    const file = e.target.files[0];
    form.setValue("card", file);
    
    // Revoke previous preview URL if it exists and is not the existing image
    if (imagePreview && imagePreview !== existingImageUrl) {
      URL.revokeObjectURL(imagePreview);
    }
    
    setImagePreview(URL.createObjectURL(file));
  }
};

// Date formatting utility
export const updateFormDateField = (
  startTime: Date | null,
  endTime: Date | null,
  form: UseFormReturn<FormSchemaType>
): void => {
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
};

// Cleanup utility
export const cleanupImagePreview = (
  imagePreview: string | null,
  existingImageUrl?: string | null
): void => {
  if (imagePreview && imagePreview !== existingImageUrl) {
    URL.revokeObjectURL(imagePreview);
  }
};