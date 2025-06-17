/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toast } from "sonner";

const FormSchema = z.object({
  startTime: z.date({
    required_error: "A start date and time is required.",
  }),
  endTime: z.date({
    required_error: "An end date and time is required.",
  }),
}).refine((data) => data.endTime > data.startTime, {
  message: "End time must be after start time",
  path: ["endTime"],
});

export function DateTimePickerForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.success(
      `Start: ${format(data.startTime, "PPPPpppp")} - End: ${format(data.endTime, "PPPPpppp")}`
    );
  }

  function handleDateSelect(date: Date | undefined, field: "startTime" | "endTime") {
    if (date) {
      const currentTime = form.getValues(field) || new Date();
      const newDate = new Date(date);
      newDate.setHours(currentTime.getHours());
      newDate.setMinutes(currentTime.getMinutes());
      form.setValue(field, newDate);
    }
  }

  function handleTimeChange(
    type: "hour" | "minute" | "ampm",
    value: string,
    field: "startTime" | "endTime"
  ) {
    const currentDate = form.getValues(field) || new Date();
    let newDate = new Date(currentDate);

    if (type === "hour") {
      const hour = parseInt(value, 10);
      const currentHour = newDate.getHours();
      const isPM = currentHour >= 12;
      newDate.setHours(isPM ? (hour === 12 ? 12 : hour + 12) : (hour === 12 ? 0 : hour));
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

    form.setValue(field, newDate);
  }

  const TimePickerPopover = ({ 
    field, 
    fieldName, 
    label 
  }: { 
    field: any; 
    fieldName: "startTime" | "endTime"; 
    label: string;
  }) => (
    <FormItem className="flex flex-col">
      <FormLabel>{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              className={cn(
                "w-full pl-3 text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value ? (
                format(field.value, "MM/dd/yyyy hh:mm aa")
              ) : (
                <span>MM/DD/YYYY hh:mm aa</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <div className="sm:flex">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={(date) => handleDateSelect(date, fieldName)}
              initialFocus
            />
            <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
              <ScrollArea className="w-64 sm:w-auto">
                <div className="flex sm:flex-col p-2">
                  {Array.from({ length: 12 }, (_, i) => i + 1)
                    .reverse()
                    .map((hour) => (
                      <Button
                        key={hour}
                        size="icon"
                        variant={
                          field.value &&
                          field.value.getHours() % 12 === hour % 12
                            ? "default"
                            : "ghost"
                        }
                        className="sm:w-full shrink-0 aspect-square"
                        onClick={() =>
                          handleTimeChange("hour", hour.toString(), fieldName)
                        }
                      >
                        {hour}
                      </Button>
                    ))}
                </div>
                <ScrollBar
                  orientation="horizontal"
                  className="sm:hidden"
                />
              </ScrollArea>
              <ScrollArea className="w-64 sm:w-auto">
                <div className="flex sm:flex-col p-2">
                  {Array.from({ length: 12 }, (_, i) => i * 5).map(
                    (minute) => (
                      <Button
                        key={minute}
                        size="icon"
                        variant={
                          field.value &&
                          field.value.getMinutes() === minute
                            ? "default"
                            : "ghost"
                        }
                        className="sm:w-full shrink-0 aspect-square"
                        onClick={() =>
                          handleTimeChange("minute", minute.toString(), fieldName)
                        }
                      >
                        {minute.toString().padStart(2, "0")}
                      </Button>
                    )
                  )}
                </div>
                <ScrollBar
                  orientation="horizontal"
                  className="sm:hidden"
                />
              </ScrollArea>
              <ScrollArea className="">
                <div className="flex sm:flex-col p-2">
                  {["AM", "PM"].map((ampm) => (
                    <Button
                      key={ampm}
                      size="icon"
                      variant={
                        field.value &&
                        ((ampm === "AM" &&
                          field.value.getHours() < 12) ||
                          (ampm === "PM" &&
                            field.value.getHours() >= 12))
                          ? "default"
                          : "ghost"
                      }
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() => handleTimeChange("ampm", ampm, fieldName)}
                    >
                      {ampm}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <TimePickerPopover 
              field={field} 
              fieldName="startTime" 
              label="Start Date & Time (12h)" 
            />
          )}
        />
        
        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <TimePickerPopover 
              field={field} 
              fieldName="endTime" 
              label="End Date & Time (12h)" 
            />
          )}
        />
        
        <FormDescription>
          Please select your preferred start and end date/time.
        </FormDescription>
        
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
