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
import { cn } from "@/lib/utils";
import { addDays, format, subDays } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Label } from "./ui/label";
import { CalendarIcon } from "lucide-react";
import type { BaseLocale } from "@/locales/base-locale";
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
  const times = [
    "00:00",
    "00:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
    "03:00",
    "03:30",
    "04:00",
    "04:30",
    "05:00",
    "05:30",
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
  ];
  const [pickDate, setPickDate] = useState<Date | undefined>(new Date());
  const [dropDate, setDropDate] = useState<Date | undefined>(
    addDays(new Date(), 7)
  );

  const [pickUpTime, setPickUpTime] = useState("15:00");
  const [dropOfTime, setDropOfTime] = useState("15:00");

  const [pickUpLocation, setPickUpLocation] = useState<string | undefined>();
  const [dropOffLocation, setDropOffLocation] = useState<string | undefined>();

  const { locations, lang, onStart } = props;

  return (
    <div className="mx-auto mt-8">
      <h3 className="px-4 pb-1 font-black text-2xl text-white">
        {lang.createReservation}
      </h3>
      <div className="bg-white shadow rounded-lg p-4 mb-8 flex flex-col lg:items-end lg:flex-row gap-4">
        <div className="flex flex-col gap-1">
          <Label>{lang.pickUpLoacation}</Label>
          <Select value={pickUpLocation} onValueChange={setPickUpLocation}>
            <SelectTrigger className="w-[260px] lg:w-[180px]">
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
            <SelectTrigger className="w-[260px] lg:w-[180px]">
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
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[170px] justify-start text-left font-normal",
                    !pickDate && "text-muted-foreground"
                  )}
                >
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
                  toDate={subDays(dropDate ?? addDays(new Date(), 7), 3)}
                  selected={pickDate}
                  fromDate={new Date()}
                  onSelect={setPickDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Select value={pickUpTime} onValueChange={setPickUpTime}>
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
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[170px] justify-start text-left font-normal",
                    !dropDate && "text-muted-foreground"
                  )}
                >
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
                  fromDate={addDays(pickDate ?? new Date(), 3)}
                  onSelect={setDropDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Select value={dropOfTime} onValueChange={setDropOfTime}>
              <SelectTrigger className="w-[90px]">
                <SelectValue placeholder={lang.choose} />
              </SelectTrigger>

              <SelectContent>
                {times.map((time) => (
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

            onStart({
              pickUpLocation,
              dropOffLocation,
              pickDate,
              pickUpTime,
              dropDate,
              dropOfTime,
            });
          }}
          className="bg-s"
        >
          {lang.continue}
        </Button>
      </div>
    </div>
  );
}
