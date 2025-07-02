// components/date-time-picker.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface DateTimePickerProps {
  pickerMode: "start" | "end";
  startTime: Date | null;
  endTime: Date | null;
  setPickerMode: (mode: "start" | "end") => void;
  handleDateSelect: (date: Date | undefined) => void;
  handleTimeChange: (type: "hour" | "minute" | "ampm", value: string) => void;
  isTimeButtonDisabled: (
    hour?: number,
    minute?: number,
    ampm?: "AM" | "PM"
  ) => boolean;
}

export function DateTimePicker({
  pickerMode,
  startTime,
  endTime,
  setPickerMode,
  handleDateSelect,
  handleTimeChange,
  isTimeButtonDisabled,
}: DateTimePickerProps) {
  const currentTime = pickerMode === "start" ? startTime : endTime;

  return (
    <div>
      <div className="text-sm text-muted-foreground mb-2">
        <p className="mt-2 text-lg font-semibold text-gray-700">
          Selected:{" "}
          {startTime ? format(startTime, "MM/dd/yyyy hh:mm aa") : "N/A"}
          {endTime ? ` - ${format(endTime, "MM/dd/yyyy hh:mm aa")}` : ""}
        </p>
        Currently setting:{" "}
        <span className="font-medium">
          {pickerMode === "start" ? "Start" : "End"} Time
        </span>
        {pickerMode === "end" && !startTime && (
          <span className="text-red-500 block">
            Please select a start time first
          </span>
        )}
      </div>

      <div className="flex gap-2 mb-2">
        <Button
          type="button"
          variant={pickerMode === "start" ? "default" : "outline"}
          size="sm"
          onClick={() => setPickerMode("start")}
          className="flex-1 cursor-pointer hover:ring-2 hover:ring-ring hover:ring-offset-2"
        >
          Start Time
          {startTime && (
            <span className="ml-2 text-xs">
              {format(startTime, "MM/dd hh:mm aa")}
            </span>
          )}
        </Button>
        <Button
          type="button"
          variant={pickerMode === "end" ? "default" : "outline"}
          size="sm"
          onClick={() => setPickerMode("end")}
          className="flex-1 cursor-pointer hover:ring-2 hover:ring-ring hover:ring-offset-2"
          disabled={!startTime}
        >
          End Time
          {endTime && (
            <span className="ml-2 text-xs">
              {format(endTime, "MM/dd hh:mm aa")}
            </span>
          )}
        </Button>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full pl-3 text-left font-normal",
              !currentTime && "text-muted-foreground"
            )}
            disabled={pickerMode === "end" && !startTime}
          >
            {currentTime ? (
              format(currentTime, "MM/dd/yyyy hh:mm aa")
            ) : (
              <span>Select {pickerMode} date and time</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <div className="sm:flex">
            <Calendar
              mode="single"
              selected={currentTime || undefined}
              onSelect={handleDateSelect}
              // initialFocus
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                if (date < today) return true;
                if (pickerMode === "end" && startTime) {
                  const startDate = new Date(startTime);
                  startDate.setHours(0, 0, 0, 0);
                  return date < startDate;
                }
                return false;
              }}
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
                          currentTime &&
                          currentTime.getHours() % 12 === hour % 12
                            ? "default"
                            : "ghost"
                        }
                        className="sm:w-full shrink-0 aspect-square"
                        onClick={() =>
                          handleTimeChange("hour", hour.toString())
                        }
                        disabled={isTimeButtonDisabled(hour)}
                      >
                        {hour}
                      </Button>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" className="sm:hidden" />
              </ScrollArea>

              <ScrollArea className="w-64 sm:w-auto">
                <div className="flex sm:flex-col p-2">
                  {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                    <Button
                      key={minute}
                      size="icon"
                      variant={
                        currentTime && currentTime.getMinutes() === minute
                          ? "default"
                          : "ghost"
                      }
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() =>
                        handleTimeChange("minute", minute.toString())
                      }
                      disabled={isTimeButtonDisabled(undefined, minute)}
                    >
                      {minute.toString().padStart(2, "0")}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="sm:hidden" />
              </ScrollArea>

              <ScrollArea>
                <div className="flex sm:flex-col p-2">
                  {["AM", "PM"].map((ampm) => (
                    <Button
                      key={ampm}
                      size="icon"
                      variant={
                        currentTime &&
                        ((ampm === "AM" && currentTime.getHours() < 12) ||
                          (ampm === "PM" && currentTime.getHours() >= 12))
                          ? "default"
                          : "ghost"
                      }
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() => handleTimeChange("ampm", ampm)}
                      disabled={isTimeButtonDisabled(
                        undefined,
                        undefined,
                        ampm as "AM" | "PM"
                      )}
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
    </div>
  );
}
