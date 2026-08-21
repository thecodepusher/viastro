import type { BaseLocale } from "@/locales/base-locale";
import { EquipmentItem } from "./EquipmentItem";

interface Equipment {
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

interface EquipmentListProps {
  equipment: Equipment[];
  lang: BaseLocale;
  selectedIds: number[];
  onToggle: (id: number) => void;
}

export function EquipmentList({
  equipment,
  lang,
  selectedIds,
  onToggle,
}: EquipmentListProps) {
  return (
    <>
      <h3 className="mx-auto max-w-7xl px-4 py-2 font-display text-lg font-bold text-foreground">
        {lang.additionalEquipment}
      </h3>

      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 pt-2">
        {equipment.map((item) => {
          const isSelected = selectedIds.some((x) => x === item.id);

          return (
            <EquipmentItem
              key={item.id}
              equipment={item}
              lang={lang}
              isSelected={isSelected}
              onToggle={onToggle}
            />
          );
        })}
      </div>
    </>
  );
}
