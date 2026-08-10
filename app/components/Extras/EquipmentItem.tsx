import { Button } from "@/components/ui/button";
import type { BaseLocale } from "@/locales/base-locale";
import {
  Globe,
  UserPlus,
  Baby,
  ShieldCheck,
  FileText,
  Car,
  FileCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EquipmentItem {
  id: number;
  name: string;
  description: string;
  price: number;
  free: boolean;
  perDay: boolean;
  maxPerDays: number | null;
  depositeDiscount: number;
  icon?: string;
}

interface EquipmentItemProps {
  equipment: EquipmentItem;
  lang: BaseLocale;
  isSelected: boolean;
  onToggle: (id: number) => void;
}

export function EquipmentItem({
  equipment,
  lang,
  isSelected,
  onToggle,
}: EquipmentItemProps) {
  const getEquipmentIcon = () => {
    const nameLower = equipment.name.toLowerCase();

    if (
      equipment.id === 2 ||
      nameLower.includes("dozvola") ||
      nameLower.includes("border")
    ) {
      return Globe;
    }

    if (
      equipment.id === 3 ||
      nameLower.includes("zeleni") ||
      nameLower.includes("green")
    ) {
      return FileCheck;
    }

    if (
      equipment.id === 9 ||
      nameLower.includes("dodatni") ||
      nameLower.includes("additional driver")
    ) {
      return UserPlus;
    }

    if (
      equipment.id === 6 ||
      nameLower.includes("auto sedište") ||
      nameLower.includes("car seat")
    ) {
      return Baby;
    }

    if (
      equipment.id === 7 ||
      nameLower.includes("booster") ||
      nameLower.includes("buster")
    ) {
      return Car;
    }

    if (equipment.id === 1 || nameLower.includes("full protection")) {
      return ShieldCheck;
    }

    return FileText;
  };

  const IconComponent = getEquipmentIcon();

  const handleItemClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.tagName === "BUTTON") {
      return;
    }
    onToggle(equipment.id);
  };

  return (
    <div
      onClick={handleItemClick}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-2xl border-2 shadow-lg transition-all duration-300 select-none",
        isSelected
          ? "border-p bg-s text-white shadow-p/10 ring-2 ring-p/20 scale-[1.01]"
          : "border-white/10 bg-linear-to-b from-s/90 to-pd hover:border-p/30 hover:shadow-xl",
      )}>
      <div className="flex min-h-[140px] flex-col items-stretch md:flex-row">
        <div
          className={cn(
            "flex h-24 w-full shrink-0 items-center justify-center md:h-auto md:w-32",
            isSelected ? "bg-white/5" : "bg-pl/30",
          )}>
          <IconComponent
            className={cn(
              "h-16 w-16 md:h-20 md:w-20",
              isSelected ? "text-p" : "text-p",
            )}
            aria-label={equipment.name}
          />
        </div>

        <div className="flex flex-1 flex-col justify-between p-4 md:p-6">
          <div className="flex-1">
            <h3
              className={cn(
                "mb-2 text-lg font-bold select-none md:text-xl",
                isSelected ? "text-white" : "text-foreground",
              )}>
              {equipment.name}
            </h3>
            <p
              className={cn(
                "mb-3 text-xs leading-relaxed select-none md:text-sm",
                isSelected ? "text-white/85" : "text-muted-foreground",
              )}>
              {equipment.description}
            </p>
            {equipment.depositeDiscount > 0 && (
              <div
                className={cn(
                  "mt-2 inline-flex select-none items-center rounded-full px-3 py-1 text-xs font-semibold",
                  isSelected
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-emerald-500/15 text-emerald-400",
                )}>
                💰 {lang.vehicleDepositDiscount} {equipment.depositeDiscount}€
              </div>
            )}
          </div>
        </div>

        <div className="relative flex flex-row items-center justify-between gap-4 border-t border-white/10 p-4 md:min-w-[200px] md:flex-col md:items-end md:justify-between md:border-t-0 md:p-6">
          <div
            className={cn(
              "absolute left-0 top-[15%] bottom-[15%] hidden w-px md:block",
              isSelected ? "bg-white/20" : "bg-white/10",
            )}
          />
          <div className="flex flex-1 items-center md:flex-none md:items-end">
            {equipment.free ? (
              <p
                className={cn(
                  "text-xl font-bold select-none md:text-2xl",
                  isSelected ? "text-white" : "text-emerald-400",
                )}>
                {lang.freeOfCharge}
              </p>
            ) : (
              <div>
                <div className="mb-1 flex items-baseline gap-1 md:justify-end">
                  <span
                    className={cn(
                      "text-2xl font-bold select-none md:text-3xl",
                      isSelected ? "text-white" : "text-foreground",
                    )}>
                    {equipment.price}€
                  </span>
                  {equipment.perDay && (
                    <span
                      className={cn(
                        "text-sm select-none",
                        isSelected ? "text-white/85" : "text-muted-foreground",
                      )}>
                      /{lang.day}
                    </span>
                  )}
                </div>
                {equipment.perDay && equipment.maxPerDays && (
                  <p
                    className={cn(
                      "mb-1 text-xs select-none",
                      isSelected ? "text-white/85" : "text-muted-foreground",
                    )}>
                    {lang.maxPrice}: {equipment.maxPerDays * equipment.price}€
                  </p>
                )}
                <p
                  className={cn(
                    "text-xs select-none",
                    isSelected ? "text-white/75" : "text-muted-foreground",
                  )}>
                  {lang.allPricesIncludeVAT}
                </p>
              </div>
            )}
          </div>

          <Button
            variant={isSelected ? "default" : "outline"}
            className={cn(
              "relative z-10 w-1/2 min-w-[80px] select-none py-2 text-sm transition-all md:mt-4 md:w-auto md:min-w-[120px] md:py-0 md:text-base",
              isSelected
                ? "border-white bg-white text-s hover:bg-white/90"
                : "border-p text-p hover:bg-p hover:text-primary-foreground",
            )}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggle(equipment.id);
            }}
            type="button">
            {isSelected ? lang.selected : lang.select}
          </Button>
        </div>
      </div>

      {isSelected && (
        <div className="absolute top-2 right-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-p">
            <svg
              className="h-4 w-4 text-primary-foreground"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
