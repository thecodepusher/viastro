import { forwardRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  format,
  addMonths,
  subMonths,
  isBefore,
  startOfDay,
} from "date-fns";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface CustomCalendarProps {
  mode?: "single" | "range";
  selected?: Date | undefined;
  fromDate?: Date;
  toDate?: Date;
  onSelect?: (date: Date | undefined) => void;
  showOutsideDays?: boolean;
  className?: string;
  initialFocus?: boolean;
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const CustomCalendar = forwardRef<HTMLDivElement, CustomCalendarProps>(
  (
    {
      mode = "single",
      selected,
      fromDate,
      toDate,
      onSelect,
      showOutsideDays = true,
      className,
      initialFocus = false,
    },
    ref
  ) => {
    const [currentMonth, setCurrentMonth] = useState<Date>(
      selected ? startOfMonth(selected) : startOfMonth(new Date())
    );

    useEffect(() => {
      if (selected) {
        setCurrentMonth(startOfMonth(selected));
      }
    }, [selected]);

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    const days = eachDayOfInterval({
      start: calendarStart,
      end: calendarEnd,
    });

    const handlePreviousMonth = () => {
      setCurrentMonth(subMonths(currentMonth, 1));
    };

    const handleNextMonth = () => {
      setCurrentMonth(addMonths(currentMonth, 1));
    };

    const handleDayClick = (day: Date) => {
      if (fromDate && isBefore(startOfDay(day), startOfDay(fromDate))) {
        return;
      }
      if (toDate && isBefore(startOfDay(toDate), startOfDay(day))) {
        return;
      }

      if (onSelect) {
        onSelect(day);
      }
    };

    const isDayDisabled = (day: Date): boolean => {
      if (fromDate && isBefore(startOfDay(day), startOfDay(fromDate))) {
        return true;
      }
      if (toDate && isBefore(startOfDay(toDate), startOfDay(day))) {
        return true;
      }
      return false;
    };

    const isDaySelected = (day: Date): boolean => {
      if (!selected) return false;
      return isSameDay(day, selected);
    };

    return (
      <div
        ref={ref}
        className={cn("p-3", className)}
        role="application"
        aria-label="Calendar">
        <div className="flex justify-center pt-1 relative items-center w-full mb-4">
          <button
            type="button"
            onClick={handlePreviousMonth}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "size-7 bg-transparent p-0 opacity-50 hover:opacity-100 border-0 hover:bg-accent absolute left-0 cursor-pointer"
            )}
            aria-label="Previous month">
            <ChevronLeft className="size-4" />
          </button>

          <div className="text-sm font-medium">
            {format(currentMonth, "MMMM yyyy")}
          </div>

          <button
            type="button"
            onClick={handleNextMonth}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "size-7 bg-transparent p-0 opacity-50 hover:opacity-100 border-0 hover:bg-accent absolute right-0 cursor-pointer"
            )}
            aria-label="Next month">
            <ChevronRight className="size-4" />
          </button>
        </div>

        <div className="flex w-full mb-2">
          {WEEKDAYS.map((day, index) => (
            <div
              key={index}
              className="text-muted-foreground w-9 font-normal text-[0.8rem] text-center p-0 flex items-center justify-center">
              {day}
            </div>
          ))}
        </div>

        <div className="w-full border-collapse">
          <div className="flex flex-col w-full">
            {Array.from({ length: Math.ceil(days.length / 7) }).map(
              (_, weekIdx) => (
                <div key={weekIdx} className="flex w-full mt-1">
                  {days.slice(weekIdx * 7, (weekIdx + 1) * 7).map((day) => {
                    const isCurrentMonth = isSameMonth(day, currentMonth);
                    const isSelected = isDaySelected(day);
                    const isTodayDate = isToday(day);
                    const isDisabled = isDayDisabled(day);
                    const showDay = showOutsideDays || isCurrentMonth;

                    if (!showDay) {
                      return (
                        <div
                          key={day.toString()}
                          className="relative p-0 text-center text-sm w-9 h-9 flex items-center justify-center invisible"
                        />
                      );
                    }

                    return (
                      <div
                        key={day.toString()}
                        className="relative p-0 text-center text-sm w-9 h-9 flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => handleDayClick(day)}
                          disabled={isDisabled}
                          className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "h-9 w-9 p-0 font-normal cursor-pointer rounded-md hover:bg-accent transition-colors",
                            !isCurrentMonth &&
                              "text-muted-foreground opacity-50",
                            isDisabled &&
                              "text-muted-foreground opacity-50 cursor-not-allowed",
                            isTodayDate &&
                              !isSelected &&
                              "bg-accent text-accent-foreground font-semibold",
                            isSelected &&
                              "bg-s text-white hover:bg-s/90 hover:text-white focus:bg-s focus:text-white rounded-md cursor-pointer"
                          )}
                          aria-label={format(day, "PPPP")}
                          aria-selected={isSelected}
                          aria-disabled={isDisabled}>
                          {format(day, "d")}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }
);

CustomCalendar.displayName = "CustomCalendar";

export default CustomCalendar;
