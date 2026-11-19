import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  addDays,
  differenceInDays,
  format,
  startOfDay,
} from "date-fns";
import { rentalMinutesBetween, MIN_RENTAL_MINUTES } from "@/lib/helpers";
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
import CustomCalendar from "@/components/ui/custom-calendar";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Loader2 } from "lucide-react";
import type { BaseLocale } from "@/locales/base-locale";
import { times } from "@/constants/calendar";
import { toast } from "sonner";

function dayGap(dropDate: Date, pickDate: Date): number {
  return differenceInDays(startOfDay(dropDate), startOfDay(pickDate));
}

function rentalMinutes(
  pickDate: Date,
  dropDate: Date,
  pickUpTime: string,
  dropTime: string,
): number {
  return rentalMinutesBetween(
    startOfDay(pickDate),
    pickUpTime,
    startOfDay(dropDate),
    dropTime,
  );
}

function isReturnBeforeMinimum(
  pickDate: Date | undefined,
  dropDate: Date | undefined,
  pickUpTime: string,
  dropTime: string,
): boolean {
  if (!pickDate || !dropDate) return false;
  return (
    rentalMinutes(pickDate, dropDate, pickUpTime, dropTime) < MIN_RENTAL_MINUTES
  );
}

export default function ReservationTime(props: {
  locations: {
    id: number;
    name: string;
  }[];
  lang: BaseLocale;
  isLoading?: boolean;
  initialValues?: {
    pickUpDate?: string;
    pickUpTime?: string;
    dropOffDate?: string;
    dropOffTime?: string;
    pickUpLocation?: string;
    dropOffLocation?: string;
  };
  onStart: (data: {
    pickDate: Date;
    dropDate: Date;
    pickUpTime: string;
    dropOfTime: string;
    pickUpLocation: string;
    dropOffLocation: string;
  }) => Promise<void>;
}) {
  const { initialValues } = props;

  const getInitialPickDate = (): Date | undefined => {
    if (initialValues?.pickUpDate) {
      const date = new Date(initialValues.pickUpDate);
      return isNaN(date.getTime()) ? new Date() : date;
    }
    return new Date();
  };

  const getInitialDropDate = (): Date | undefined => {
    if (initialValues?.dropOffDate) {
      const date = new Date(initialValues.dropOffDate);
      return isNaN(date.getTime()) ? addDays(new Date(), 7) : date;
    }
    return addDays(new Date(), 7);
  };

  const { locations, lang, onStart, isLoading = false } = props;

  const initialPickUpTime = initialValues?.pickUpTime || "15:00";
  const initialDropOffTime = initialValues?.dropOffTime || "15:00";
  const initialPickDate = getInitialPickDate();
  const initialDropDate = getInitialDropDate();
  const [pickDate, setPickDate] = useState<Date | undefined>(initialPickDate);
  const [dropDate, setDropDate] = useState<Date | undefined>(initialDropDate);

  const [pickUpTime, setPickUpTime] = useState(initialPickUpTime);
  const [dropOfTime, setDropOfTime] = useState<string | null>(
    initialDropOffTime,
  );

  const [pickUpLocation, setPickUpLocation] = useState<string | undefined>(
    initialValues?.pickUpLocation,
  );
  const [dropOffLocation, setDropOffLocation] = useState<string | undefined>(
    initialValues?.dropOffLocation,
  );

  const [pickDatePopoverOpen, setPickDatePopoverOpen] = useState(false);
  const [dropDatePopoverOpen, setDropDatePopoverOpen] = useState(false);

  const moveReturnByHalfHour = (
    nextPickDate: Date | undefined,
    nextDropDate: Date | undefined,
    nextPickTime: string,
    nextDropTime: string | null,
    notify: boolean,
  ) => {
    if (
      !nextPickDate ||
      !nextDropDate ||
      !nextDropTime ||
      !isReturnBeforeMinimum(
        nextPickDate,
        nextDropDate,
        nextPickTime,
        nextDropTime,
      )
    ) {
      return;
    }

    const nextTime = times.find(
      (time) =>
        rentalMinutes(nextPickDate, nextDropDate, nextPickTime, time) >=
        MIN_RENTAL_MINUTES,
    );

    if (nextTime) {
      setDropOfTime(nextTime);
      if (notify) toast.error(lang.minimumRentalHint);
      return;
    }

    toast.error(lang.minimumRentalHint);
  };

  return (
    <div className="w-full mx-auto">
      <h3 className="pb-3 font-display font-semibold text-lg sm:text-2xl text-white/95 sm:text-left text-center">
        {lang.createReservation}
      </h3>
      <div className="w-full max-w-full rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xl p-3 sm:p-5 mb-4 sm:mb-6 flex flex-col gap-3 text-white">
      <div className="flex flex-col items-stretch xl:flex-row gap-3 sm:gap-4">
        <div className="w-full min-w-0 xl:w-40 xl:grow-0 xl:shrink-0 flex flex-col gap-1">
          <Label className="text-white/80 text-xs sm:text-sm">
            {lang.pickUpLoacation}
          </Label>
          <Select value={pickUpLocation} onValueChange={setPickUpLocation}>
            <SelectTrigger
              className="w-full min-w-0 overflow-hidden bg-white/10 border border-white/20 text-white data-placeholder:text-white/70 [&_svg:not([class*='text-'])]:text-white/70 focus:ring-2 focus:ring-p/40 *:data-[slot=select-value]:min-w-0 *:data-[slot=select-value]:truncate"
              aria-label={lang.pickUpLoacation}>
              <SelectValue placeholder={lang.choose} />
            </SelectTrigger>

            <SelectContent className="bg-pd text-white border border-white/15 **:data-highlighted:bg-white/10 **:data-highlighted:text-white **:data-[state=checked]:bg-white/15">
              {locations.map((location) => (
                <SelectItem key={location.id} value={`${location.id}`}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full min-w-0 xl:w-40 xl:grow-0 xl:shrink-0 flex flex-col gap-1">
          <Label className="text-white/80 text-xs sm:text-sm">
            {lang.dropOffLoacation}
          </Label>
          <Select value={dropOffLocation} onValueChange={setDropOffLocation}>
            <SelectTrigger
              className="w-full min-w-0 overflow-hidden bg-white/10 border border-white/20 text-white data-placeholder:text-white/70 [&_svg:not([class*='text-'])]:text-white/70 focus:ring-2 focus:ring-p/40 *:data-[slot=select-value]:min-w-0 *:data-[slot=select-value]:truncate"
              aria-label={lang.dropOffLoacation}>
              <SelectValue placeholder={lang.choose} />
            </SelectTrigger>

            <SelectContent className="bg-pd text-white border border-white/15 **:data-highlighted:bg-white/10 **:data-highlighted:text-white **:data-[state=checked]:bg-white/15">
              {locations.map((location) => (
                <SelectItem key={location.id} value={`${location.id}`}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full min-w-0 xl:flex-1 flex flex-col gap-1">
          <Label className="text-white/80 text-xs sm:text-sm">
            {lang.pickUpTime}
          </Label>
          <div className="flex min-w-0 gap-1">
            <Popover
              open={pickDatePopoverOpen}
              onOpenChange={setPickDatePopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  aria-label={`${lang.pickUpTime} - ${pickDate ? format(pickDate, "PPP") : lang.choose}`}
                  className={cn(
                    "min-w-0 flex-1 justify-start text-left font-normal bg-white/10 border border-white/20 text-white hover:bg-white/15 hover:border-white/35 focus:ring-2 focus:ring-p/40 overflow-hidden",
                    !pickDate && "text-white/70",
                  )}>
                  <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate">
                    {pickDate ? format(pickDate, "PPP") : lang.choose}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0 bg-pd border border-white/15">
                <CustomCalendar
                  mode="single"
                  selected={pickDate}
                  fromDate={new Date()}
                  onSelect={(newDate: Date | undefined) => {
                    setPickDate(newDate);
                    setPickDatePopoverOpen(false);

                    if (!newDate || !dropDate) return;

                    if (dayGap(dropDate, newDate) < 0) {
                      setDropDate(undefined);
                      return;
                    }

                    moveReturnByHalfHour(
                      newDate,
                      dropDate,
                      pickUpTime,
                      dropOfTime,
                      false,
                    );
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Select
              value={pickUpTime}
              onValueChange={(newTime) => {
                setPickUpTime(newTime);
                moveReturnByHalfHour(
                  pickDate,
                  dropDate,
                  newTime,
                  dropOfTime,
                  true,
                );
              }}>
              <SelectTrigger
                className="w-20 shrink-0 px-2 gap-1 bg-white/10 border border-white/20 text-white data-placeholder:text-white/70 [&_svg:not([class*='text-'])]:text-white/70 focus:ring-2 focus:ring-p/40"
                aria-label={`${lang.pickUpTime} - ${pickUpTime || lang.choose}`}>
                <SelectValue placeholder={lang.choose} />
              </SelectTrigger>

              <SelectContent className="bg-pd text-white border border-white/15 **:data-highlighted:bg-white/10 **:data-highlighted:text-white **:data-[state=checked]:bg-white/15">
                {times.map((time) => (
                  <SelectItem key={`pickUp${time}`} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-full min-w-0 xl:flex-1 flex flex-col gap-1">
          <Label className="text-white/80 text-xs sm:text-sm">
            {lang.dropOffTime}
          </Label>
          <div className="flex min-w-0 gap-1">
            <Popover
              open={dropDatePopoverOpen}
              onOpenChange={setDropDatePopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  aria-label={`${lang.dropOffTime} - ${dropDate ? format(dropDate, "PPP") : lang.choose}`}
                  className={cn(
                    "min-w-0 flex-1 justify-start text-left font-normal bg-white/10 border border-white/20 text-white hover:bg-white/15 hover:border-white/35 focus:ring-2 focus:ring-p/40 overflow-hidden",
                    !dropDate && "text-white/70",
                  )}>
                  <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate">
                    {dropDate ? format(dropDate, "PPP") : lang.choose}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-pd border border-white/15">
                <CustomCalendar
                  mode="single"
                  selected={dropDate}
                  defaultMonth={pickDate}
                  fromDate={startOfDay(pickDate ?? new Date())}
                  onSelect={(newDate: Date | undefined) => {
                    setDropDate(newDate);
                    setDropDatePopoverOpen(false);

                    if (!newDate || !pickDate) return;

                    moveReturnByHalfHour(
                      pickDate,
                      newDate,
                      pickUpTime,
                      dropOfTime,
                      false,
                    );
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Select
              value={dropOfTime ?? ""}
              onValueChange={(newTime) => {
                setDropOfTime(newTime);
                moveReturnByHalfHour(
                  pickDate,
                  dropDate,
                  pickUpTime,
                  newTime,
                  true,
                );
              }}>
              <SelectTrigger
                className="w-20 shrink-0 px-2 gap-1 bg-white/10 border border-white/20 text-white data-placeholder:text-white/70 [&_svg:not([class*='text-'])]:text-white/70 focus:ring-2 focus:ring-p/40"
                aria-label={`${lang.dropOffTime} - ${dropOfTime || lang.choose}`}>
                <SelectValue placeholder={lang.choose} />
              </SelectTrigger>

              <SelectContent className="bg-pd text-white border border-white/15 **:data-highlighted:bg-white/10 **:data-highlighted:text-white **:data-[state=checked]:bg-white/15">
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
          disabled={isLoading}
          onClick={() => {
            if (isLoading) return;

            if (!pickDate || !dropDate) {
              toast.error(props.lang.toastErrorSelectDates);
              return;
            }

            if (!pickUpLocation || !dropOffLocation) {
              toast.error(props.lang.toastErrorSelectLocations);
              return;
            }

            if (!dropOfTime) {
              toast.error(props.lang.toastErrorSelectTimes);
              return;
            }

            if (
              rentalMinutesBetween(
                startOfDay(pickDate),
                pickUpTime,
                startOfDay(dropDate),
                dropOfTime,
              ) < MIN_RENTAL_MINUTES
            ) {
              toast.error(props.lang.minimumRentalHint);
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
          aria-label={lang.continue}
          aria-busy={isLoading}
          className="xl:w-36 xl:shrink-0 w-full h-10 xl:self-end bg-p text-pd font-semibold hover:bg-p/90 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70">
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {lang.continue}
            </>
          ) : (
            lang.continue
          )}
        </Button>
      </div>
    </div>
    </div>
  );
}
