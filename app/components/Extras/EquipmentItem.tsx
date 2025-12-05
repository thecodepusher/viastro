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

  return (
    <div
      onClick={() => onToggle(equipment.id)}
      className={`group relative border-2 rounded-xl shadow-sm transition-all duration-300 overflow-hidden cursor-pointer ${
        isSelected
          ? "border-s bg-s text-white shadow-lg scale-[1.02]"
          : "border-gray-200 bg-white hover:border-s hover:shadow-md"
      }`}>
      <div className="flex flex-col md:flex-row items-stretch min-h-[140px]">
        <div className="flex items-center justify-center w-full md:w-32 h-24 md:h-auto bg-gray-50 dark:bg-gray-800/50 shrink-0 md:shrink-0">
          <IconComponent
            className="w-16 h-16 md:w-20 md:h-20 text-s"
            aria-label={equipment.name}
          />
        </div>

        <div className="flex-1 flex flex-col justify-between p-4 md:p-6">
          <div className="flex-1">
            <h3
              className={`text-lg md:text-xl font-bold mb-2 ${
                isSelected ? "text-white" : "text-gray-900"
              }`}>
              {equipment.name}
            </h3>
            <p
              className={`text-xs md:text-sm leading-relaxed mb-3 ${
                isSelected ? "text-white/90" : "text-gray-600"
              }`}>
              {equipment.description}
            </p>
            {equipment.depositeDiscount > 0 && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs font-semibold mt-2">
                💰 {lang.vehicleDepositDiscount} {equipment.depositeDiscount}€
              </div>
            )}
          </div>
        </div>

        <div
          className={`relative flex flex-row md:flex-col items-center md:items-end justify-between md:justify-between p-4 md:p-6 gap-4 md:gap-0 border-t md:border-t-0 md:min-w-[200px] ${
            isSelected ? "" : ""
          }`}>
          <div
            className={`hidden md:block absolute left-0 top-[15%] bottom-[15%] w-px ${
              isSelected ? "bg-white/20" : "bg-gray-200 dark:bg-gray-700"
            }`}
          />
          <div className="text-left md:text-right flex-1 md:flex-none flex items-center md:items-end">
            {equipment.free ? (
              <div className="w-full">
                <p
                  className={`text-xl md:text-2xl font-bold ${
                    isSelected
                      ? "text-white"
                      : "text-green-600 dark:text-green-400"
                  }`}>
                  {lang.freeOfCharge}
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-baseline md:justify-end gap-1 mb-1">
                  <span
                    className={`text-2xl md:text-3xl font-bold ${
                      isSelected
                        ? "text-white"
                        : "text-gray-900 dark:text-white"
                    }`}>
                    {equipment.price}€
                  </span>
                  {equipment.perDay && (
                    <span
                      className={`text-sm ${
                        isSelected
                          ? "text-white/90"
                          : "text-gray-600 dark:text-gray-400"
                      }`}>
                      /{lang.day}
                    </span>
                  )}
                </div>
                {equipment.perDay && equipment.maxPerDays && (
                  <p
                    className={`text-xs mb-1 ${
                      isSelected
                        ? "text-white/90"
                        : "text-gray-600 dark:text-gray-400"
                    }`}>
                    {lang.maxPrice}: {equipment.maxPerDays * equipment.price}€
                  </p>
                )}
                <p
                  className={`text-xs ${
                    isSelected
                      ? "text-white"
                      : "text-gray-500 dark:text-gray-400"
                  }`}>
                  {lang.allPricesIncludeVAT}
                </p>
              </div>
            )}
          </div>

          <Button
            variant={isSelected ? "default" : "outline"}
            className={`md:mt-4 min-w-[80px] md:min-w-[120px] w-1/2 md:w-auto text-sm md:text-base py-2 md:py-0 transition-all relative z-10 ${
              isSelected
                ? "bg-white text-s hover:bg-white/90 border-white"
                : "border-s text-s hover:bg-s hover:text-white"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onToggle(equipment.id);
            }}>
            {isSelected ? lang.selected : lang.select}
          </Button>
        </div>
      </div>

      {isSelected && (
        <div className="absolute top-2 right-2">
          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
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
