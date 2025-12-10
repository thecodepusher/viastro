import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import type { TransformedCar } from "@/lib/api-cars";

type CarSelectProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  placeholder: string;
  cars: TransformedCar[];
  noSearchResults: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

export function CarSelect({
  id,
  name,
  label,
  value,
  placeholder,
  cars,
  noSearchResults,
  disabled = false,
  onChange,
}: CarSelectProps) {
  const [carSearchQuery, setCarSearchQuery] = useState("");
  const [isCarDropdownOpen, setIsCarDropdownOpen] = useState(false);
  const carDropdownRef = useRef<HTMLDivElement>(null);
  const carInputRef = useRef<HTMLInputElement>(null);

  const filteredCars = cars.filter((car) => {
    const searchLower = carSearchQuery.toLowerCase();
    const carName = car.customName || car.name;
    return carName.toLowerCase().includes(searchLower);
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        carDropdownRef.current &&
        !carDropdownRef.current.contains(event.target as Node) &&
        carInputRef.current &&
        !carInputRef.current.contains(event.target as Node)
      ) {
        setIsCarDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCarSelect = (carName: string) => {
    onChange(carName);
    setCarSearchQuery("");
    setIsCarDropdownOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setCarSearchQuery(e.target.value);
    setIsCarDropdownOpen(true);
  };

  const handleClear = () => {
    onChange("");
    setCarSearchQuery("");
    carInputRef.current?.focus();
  };

  return (
    <div className="relative block space-y-2 rounded-2xl border border-gray-100 bg-slate-50/80 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-p/40 hover:shadow-md">
      <span className="text-sm font-semibold text-gray-700">{label}</span>
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            ref={carInputRef}
            id={id}
            required
            name={name}
            type="text"
            value={value}
            onChange={handleInputChange}
            onFocus={() => setIsCarDropdownOpen(true)}
            placeholder={placeholder}
            disabled={disabled}
            className="pl-10 pr-10"
          />
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {isCarDropdownOpen && filteredCars.length > 0 && (
          <div
            ref={carDropdownRef}
            className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
            {filteredCars.map((car) => {
              const carName = car.customName || car.name;
              return (
                <button
                  key={car.id}
                  type="button"
                  onClick={() => handleCarSelect(carName)}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-p/10 hover:text-p transition-colors">
                  {carName}
                </button>
              );
            })}
          </div>
        )}
        {isCarDropdownOpen && carSearchQuery && filteredCars.length === 0 && (
          <div className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-500 shadow-lg">
            {noSearchResults} "{carSearchQuery}"
          </div>
        )}
      </div>
    </div>
  );
}

