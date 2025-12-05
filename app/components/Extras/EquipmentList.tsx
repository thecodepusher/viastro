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
      <h3 className="font-bold mx-auto max-w-7xl px-4 py-2 text-lg">
        {lang.additionalEquipment}
      </h3>

      <div className="mx-auto max-w-7xl px-4 py-2 flex flex-col gap-4">
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
