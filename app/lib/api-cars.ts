import type { BaseLocale } from "@/locales/base-locale";
import { CarType, GasType, TransmissionType } from "./data";

export const fullProtection = {
  id: 1,
  nameMap: {
    en: "Full Protection Insurance",
    sr: "Full Protection osiguranje",
    ru: "Страхование Full Protection",
  },
  descriptionMap: {
    en: "In addition to basic protection, this option includes protection against damage to rear-view mirrors, the windshield and windows, as well as coverage for damage to the undercarriage, wheels, and tires – parts usually not covered by standard insurance. Furthermore, Full Protection includes insurance for all passengers in the vehicle, including the driver, in the event of a traffic accident. With Full Protection insurance, the deposit amount is significantly reduced or completely waived, depending on the vehicle class.",
    sr: "U cenu ove opcije pored osnovne zaštite uključena je zaštita od šteta na retrovizorima, vetrobranskom staklu i prozorima, kao i pokriće za oštećenja na podvozju, točkovima i gumama – delovima koji se u klasičnom osiguranju obično ne priznaju. Pored toga, Full Protection uključuje i osiguranje svih putnika u vozilu, uključujući vozača, u slučaju saobraćajne nezgode. Uz Full Protection osiguranje, iznos depozita se značajno smanjuje ili se potpuno ukida, u zavisnosti od klase vozila.",
    ru: "Помимо базовой защиты, в эту опцию входит защита от повреждений зеркал заднего вида, лобового и других стекол, а также покрытие ущерба днища, колес и шин – деталей, которые обычно не покрываются стандартной страховкой. Кроме того, Full Protection включает страхование всех пассажиров в транспортном средстве, включая водителя, в случае дорожно-транспортного происшествия. При страховании Full Protection сумма залога значительно снижается или полностью отменяется, в зависимости от класса автомобиля.",
  },
  name: "Full Protection osiguranje",
  description:
    "U cenu ove opcije pored osnovne zaštite uključena je zaštita od šteta na retrovizorima, vetrobranskom staklu i prozorima, kao i pokriće za oštećenja na podvozju, točkovima i gumama – delovima koji se u klasičnom osiguranju obično ne priznaju. Pored toga, Full Protection uključuje i osiguranje svih putnika u vozilu, uključujući vozača, u slučaju saobraćajne nezgode. Uz Full Protection osiguranje, iznos depozita se značajno smanjuje ili se potpuno ukida, u zavisnosti od klase vozila.",
};

const carImageMap: Record<string, string> = {
  renault_clio: "/clio.png",
  peugeot_2008: "/2008.avif",
  peugeot_3008: "/3008.avif",
  skoda_octavia: "/skoda_octavia.png",
  skoda_oktavia: "/skoda_octavia.png",
  citroen_c3_aircross: "/c3-aircross.jpg",
  citroen_c3: "/c3-aircross.jpg",
  ford_focus: "/ford-focus.webp",
  seat_ibiza: "/ibiza.webp",
  audi_a6: "/audi-a6.webp",
};

// Mapa podataka za deposite na osnovu car ID-ja ili grupe
const carDataMap: Record<
  string,
  {
    deposite: number;
    fullProtectionPrice: number;
    depositeDiscount: number;
    prices: Array<{ from: number; to: number | null; price: number }>;
    customName?: string;
  }
> = {
  // Peugeot 2008 (id: "1")
  "1": {
    deposite: 500,
    fullProtectionPrice: 11.99,
    depositeDiscount: 250,
    customName: "Peugeot 2008 GT",
    prices: [
      { from: 3, to: 7, price: 65 },
      { from: 8, to: 15, price: 55 },
      { from: 16, to: 29, price: 45 },
      { from: 30, to: null, price: 38 },
    ],
  },
  // Citroen C3 Aircross (id: "2")
  "2": {
    deposite: 300,
    fullProtectionPrice: 9.99,
    depositeDiscount: 150,
    customName: "Citroen C3 Aircross",
    prices: [
      { from: 3, to: 7, price: 55 },
      { from: 8, to: 15, price: 50 },
      { from: 16, to: 29, price: 45 },
      { from: 30, to: null, price: 35 },
    ],
  },
  // Peugeot 3008 (id: "3")
  "3": {
    deposite: 500,
    fullProtectionPrice: 12.99,
    depositeDiscount: 250,
    customName: "Peugeot 3008",
    prices: [
      { from: 3, to: 7, price: 75 },
      { from: 8, to: 15, price: 65 },
      { from: 16, to: 29, price: 55 },
      { from: 30, to: null, price: 45 },
    ],
  },
  // Skoda Octavia (id: "6")
  "6": {
    deposite: 500,
    fullProtectionPrice: 12.99,
    depositeDiscount: 250,
    customName: "Skoda Octavia",
    prices: [
      { from: 3, to: 7, price: 75 },
      { from: 8, to: 15, price: 65 },
      { from: 16, to: 29, price: 55 },
      { from: 30, to: null, price: 45 },
    ],
  },
  // Seat Ibiza (id: "7")
  "7": {
    deposite: 300,
    fullProtectionPrice: 9.99,
    depositeDiscount: 150,
    customName: "Seat Ibiza FR",
    prices: [
      { from: 3, to: 7, price: 42 },
      { from: 8, to: 15, price: 38 },
      { from: 16, to: 29, price: 34 },
      { from: 30, to: null, price: 30 },
    ],
  },
  // Renault Clio (id: "8")
  "8": {
    deposite: 300,
    fullProtectionPrice: 9.99,
    depositeDiscount: 150,
    customName: "Renault Clio",
    prices: [
      { from: 3, to: 7, price: 45 },
      { from: 8, to: 15, price: 41 },
      { from: 16, to: 29, price: 37 },
      { from: 30, to: null, price: 33 },
    ],
  },
  // Default za ostale automobile
  default: {
    deposite: 300,
    fullProtectionPrice: 9.99,
    depositeDiscount: 150,
    prices: [
      { from: 3, to: 7, price: 42 },
      { from: 8, to: 15, price: 38 },
      { from: 16, to: 29, price: 34 },
      { from: 30, to: null, price: 30 },
    ],
  },
};

function getCarImage(brandName: string, modelName: string): string {
  const normalizedBrand = brandName.toLowerCase().trim();
  const normalizedModel = modelName.toLowerCase().trim().replace(/\s+/g, "_");
  const fullKey = `${normalizedBrand}_${normalizedModel}`;
  if (carImageMap[fullKey]) {
    return carImageMap[fullKey];
  }
  const firstWordModel = normalizedModel.split("_")[0];
  const partialKey = `${normalizedBrand}_${firstWordModel}`;
  if (carImageMap[partialKey]) {
    return carImageMap[partialKey];
  }

  return "/car.png";
}

function getCarData(carId: string) {
  return carDataMap[carId] || carDataMap.default;
}

export type ApiCarFeatures = {
  engine_cc: string;
  engine_power: string;
  transmission: string; // "1" = manual, "2" = automatic
  fuel: string; // "1" = gasoline, "2" = diesel
  doors: string;
  passengers: string;
  aircondition: string;
  gps?: string;
  trunk?: string;
};

export type ApiCarModel = {
  id: string;
  brand_name: string;
  model_name: string;
  group_id: string;
  group_name: string;
  class_id: string;
  class_name: string;
  limit_km: string;
  features: ApiCarFeatures;
  price?: number;
};

export type ApiCarsResponse = {
  date_from: string;
  date_to: string;
  days: number;
  available_models: ApiCarModel[];
};

export type ApiAllModelsResponse = ApiCarModel[];

export type TransformedCar = {
  id: number;
  exnternalId: string;
  slug: string;
  name: string;
  type: CarType;
  gas: GasType;
  numberOfSeats: number;
  transmissionType: TransmissionType;
  airConditioning: boolean;
  deposite: number;
  aditionalEquipment: any[];
  prices: Array<{ from: number; to: number | null; price: number }>;
  price: number;
  image: string;
  carTypeText: string;
  gasText: string;
  transmissionText: string;
  available: boolean;
  customName?: string;
};

function getCarTypeFromApi(groupName: string, className: string): CarType {
  const groupLower = groupName.toLowerCase();
  const classLower = className.toLowerCase();

  if (groupLower.includes("suv")) return CarType.suv;
  if (groupLower.includes("limuzina") || groupLower.includes("sedan"))
    return CarType.sedan;
  if (classLower.includes("compact")) return CarType.compactSuv;
  return CarType.hatchback;
}

function getGasTypeFromApi(fuel: string): GasType {
  return fuel === "2" ? GasType.diesel : GasType.gasoline;
}

function getTransmissionTypeFromApi(transmission: string): TransmissionType {
  return transmission === "2"
    ? TransmissionType.automatic
    : TransmissionType.manual;
}

function getCarTypeText(carType: CarType): string {
  switch (carType) {
    case CarType.suv:
      return "SUV";
    case CarType.hatchback:
      return "Hatchback";
    case CarType.sedan:
      return "Sedan";
    case CarType.compactSuv:
      return "Compact SUV";
    default:
      return "Hatchback";
  }
}

function getGasText(gas: GasType, lang: BaseLocale): string {
  switch (gas) {
    case GasType.diesel:
      return lang.diesel;
    case GasType.gasoline:
      return lang.gasoline;
    case GasType.hybrid:
      return lang.hybrid;
    case GasType.electric:
      return lang.electric;
    default:
      return lang.gasoline;
  }
}

function getTransmissionText(
  transmissionType: TransmissionType,
  lang: BaseLocale
): string {
  return transmissionType === TransmissionType.automatic
    ? lang.automatic
    : lang.manual;
}

/**
 * @param apiModels
 * @param lang
 * @param days
 * @param availableCarIds
 */

export function transformApiCars(
  apiModels: ApiCarModel[],
  lang: BaseLocale,
  days?: number,
  availableCarIds?: string[]
): TransformedCar[] {
  return apiModels.map((apiCar) => {
    const carType = getCarTypeFromApi(apiCar.group_name, apiCar.class_name);
    const gas = getGasTypeFromApi(apiCar.features.fuel);
    const transmissionType = getTransmissionTypeFromApi(
      apiCar.features.transmission
    );
    const numberOfSeats = parseInt(apiCar.features.passengers) || 5;
    const airConditioning = apiCar.features.aircondition === "1";
    const carData = getCarData(apiCar.id);
    const image = getCarImage(apiCar.brand_name, apiCar.model_name);

    const aditionalEquipment = [
      {
        ...fullProtection,
        price: carData.fullProtectionPrice,
        free: false,
        depositeDiscount: carData.depositeDiscount,
        perDay: true,
        maxPerDays: null,
      },
    ];

    const carTypeText = getCarTypeText(carType);
    const gasText = getGasText(gas, lang);
    const transmissionText = getTransmissionText(transmissionType, lang);
    const slug = `${apiCar.brand_name.toLowerCase()}_${apiCar.model_name.toLowerCase().replace(/\s+/g, "_")}`;
    const minPrice =
      carData.prices.find((p) => p.from === 30)?.price ||
      carData.prices[carData.prices.length - 1]?.price ||
      0;
    let available: boolean;

    if (apiCar.price !== undefined && apiCar.price !== null) {
      available = apiCar.price > 0;
    } else {
      if (availableCarIds !== undefined) {
        available = availableCarIds.includes(apiCar.id);
      } else {
        available = true;
      }
    }

    return {
      id: parseInt(apiCar.id),
      exnternalId: apiCar.id,
      slug,
      name: `${apiCar.brand_name} ${apiCar.model_name}`,
      type: carType,
      gas,
      numberOfSeats,
      transmissionType,
      airConditioning,
      deposite: carData.deposite,
      aditionalEquipment,
      prices: carData.prices,
      price: minPrice,
      image,
      carTypeText,
      gasText,
      transmissionText,
      available,
      customName: carData.customName,
    };
  });
}
