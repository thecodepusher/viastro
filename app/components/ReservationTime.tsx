import { useState } from "react";
import { cn } from "@/lib/utils";
import { addDays, differenceInDays, format, isAfter } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Calendar from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import type { BaseLocale } from "@/locales/base-locale";
import { times } from "@/constants/calendar";
import { toast } from "sonner";

export default function ReservationTime(props: {
  locations: {
    id: number;
    name: string;
  }[];
  lang: BaseLocale;
  onStart: (data: {
    pickDate: Date;
    dropDate: Date;
    pickUpTime: string;
    dropOfTime: string;
    pickUpLocation: string;
    dropOffLocation: string;
  }) => Promise<void>;
}) {
  const [pickDate, setPickDate] = useState<Date | undefined>(new Date());
  const [dropDate, setDropDate] = useState<Date | undefined>(
    addDays(new Date(), 7)
  );

  const [pickUpTime, setPickUpTime] = useState("15:00");
  const [dropOfTime, setDropOfTime] = useState<string | null>("15:00");

  const [pickUpLocation, setPickUpLocation] = useState<string | undefined>();
  const [dropOffLocation, setDropOffLocation] = useState<string | undefined>();

  const { locations, lang, onStart } = props;
  const [dropOffTimes, setDropOffTimes] = useState<string[]>([...times]);
  const [pickDatePopoverOpen, setPickDatePopoverOpen] = useState(false);
  const [dropDatePopoverOpen, setDropDatePopoverOpen] = useState(false);

  return (
    <div className="mx-auto mt-8">
      <h3 className="px-4 pb-1 font-black text-2xl text-white">
        {lang.createReservation}
      </h3>
      <div className="bg-white shadow rounded-lg p-4 mb-8 flex flex-col lg:items-end lg:flex-row gap-4">
        <div className="flex flex-col gap-1">
          <Label>{lang.pickUpLoacation}</Label>
          <Select value={pickUpLocation} onValueChange={setPickUpLocation}>
            <SelectTrigger className="w-[300px] lg:w-[180px]">
              <SelectValue placeholder={lang.choose} />
            </SelectTrigger>

            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location.id} value={`${location.id}`}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <Label>{lang.dropOffLoacation}</Label>
          <Select value={dropOffLocation} onValueChange={setDropOffLocation}>
            <SelectTrigger className="w-[300px] lg:w-[180px]">
              <SelectValue placeholder={lang.choose} />
            </SelectTrigger>

            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location.id} value={`${location.id}`}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1">
          <Label>{lang.pickUpTime}</Label>
          <div className="flex gap-0.5">
            <Popover
              open={pickDatePopoverOpen}
              onOpenChange={setPickDatePopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[210px] justify-start text-left font-normal",
                    !pickDate && "text-muted-foreground"
                  )}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {pickDate ? (
                    format(pickDate, "PPP")
                  ) : (
                    <span>{lang.choose}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={pickDate}
                  fromDate={new Date()}
                  onSelect={(newDate: Date | undefined) => {
                    setPickDate(newDate);
                    setPickDatePopoverOpen(false);

                    if (!newDate || !dropDate) return;

                    const daysDiff = differenceInDays(dropDate, newDate);
                    const t = [...times];

                    if (daysDiff == 2) {
                      t.splice(0, times.indexOf(pickUpTime) + 1);

                      if (dropOfTime && t.indexOf(dropOfTime) == -1) {
                        setDropOfTime(t.length > 0 ? t[0] : null);
                      }
                    }

                    setDropOffTimes(t);

                    if (isAfter(addDays(newDate, 2), dropDate)) {
                      setDropDate(undefined);
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Select
              value={pickUpTime}
              onValueChange={(newTime) => {
                setPickUpTime(newTime);

                if (!pickDate || !dropDate) return;

                const daysDiff = differenceInDays(dropDate, pickDate);

                const t = [...times];

                if (daysDiff == 2) {
                  t.splice(0, times.indexOf(newTime) + 1);

                  if (dropOfTime && t.indexOf(dropOfTime) == -1) {
                    setDropOfTime(t.length > 0 ? t[0] : null);
                  }
                }

                setDropOffTimes(t);
              }}>
              <SelectTrigger className="w-[90px]">
                <SelectValue placeholder={lang.choose} />
              </SelectTrigger>

              <SelectContent>
                {times.map((time) => (
                  <SelectItem key={`pickUp${time}`} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Label>{lang.dropOffTime}</Label>
          <div className="flex gap-0.5">
            <Popover
              open={dropDatePopoverOpen}
              onOpenChange={setDropDatePopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[210px] justify-start text-left font-normal",
                    !dropDate && "text-muted-foreground"
                  )}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dropDate ? (
                    format(dropDate, "PPP")
                  ) : (
                    <span>{lang.choose}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dropDate}
                  fromDate={addDays(pickDate ?? new Date(), 2)}
                  onSelect={(newDate: Date | undefined) => {
                    setDropDate(newDate);
                    setDropDatePopoverOpen(false);

                    if (!newDate || !pickDate) return;

                    const daysDiff = differenceInDays(newDate, pickDate);
                    const t = [...times];

                    if (daysDiff == 2) {
                      t.splice(0, times.indexOf(pickUpTime) + 1);

                      if (dropOfTime && t.indexOf(dropOfTime) == -1) {
                        setDropOfTime(t.length > 0 ? t[0] : null);
                      }
                    }

                    setDropOffTimes(t);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Select value={dropOfTime ?? ""} onValueChange={setDropOfTime}>
              <SelectTrigger className="w-[90px]">
                <SelectValue placeholder={lang.choose} />
              </SelectTrigger>

              <SelectContent>
                {dropOffTimes.map((time) => (
                  <SelectItem key={`dropOff${time}`} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={() => {
            if (!pickDate || !dropDate) {
              toast.error("Odaberite datum preuzimanja i vraćanja vozila!");
              return;
            }

            if (!pickUpLocation || !dropOffLocation) {
              toast.error("Odaberite mesto preuzimanja i vraćanja vozila!");
              return;
            }

            if (!dropOfTime) {
              toast.error("Odaberite vreme preuzimanja i vraćanja vozila!");
              return;
            }

            onStart({
              pickUpLocation,
              dropOffLocation,
              pickDate,
              pickUpTime,
              dropDate,
              dropOfTime,
            });
          }}
          className="bg-s">
          {lang.continue}
        </Button>
      </div>
    </div>
  );
}
