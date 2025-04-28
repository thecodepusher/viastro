export const locations = [
  {
    id: 1,
    name: "Belgrade Airport",
  },
  { id: 2, name: "Novi Beograd" },
];

export enum GasType {
  diesel,
  gasoline,
  electric,
  hybrid,
}

export enum TransmissionType {
  automatic,
  manual,
}

export enum CarType {
  sedan,
  suv,
  compactSuv,
  hatchback,
}

export const cars = [
  {
    id: 1,
    slug: "peugeot_3008",
    name: "Peugeot 3008",
    type: CarType.suv,
    gas: GasType.diesel,
    numberOfSeats: 5,
    transmissionType: TransmissionType.automatic,
    airConditioning: true,
    price: 30,
    deposite: 300,
    prices: [
      { from: 1, to: 1, price: 50 },
      { from: 2, to: 3, price: 40 },
      { from: 4, to: 7, price: 38 },
      { from: 8, to: 15, price: 35 },
      { from: 16, to: 29, price: 32 },
      { from: 30, to: null, price: 30 },
    ],
    image: "/3008.png",
  },
  {
    id: 2,
    slug: "peugeot_2008",
    name: "Peugeot 2008",
    type: CarType.compactSuv,
    gas: GasType.gasoline,
    numberOfSeats: 5,
    transmissionType: TransmissionType.automatic,
    airConditioning: true,
    deposite: 300,
    prices: [
      { from: 1, to: 1, price: 40 },
      { from: 2, to: 3, price: 30 },
      { from: 4, to: 7, price: 28 },
      { from: 8, to: 15, price: 25 },
      { from: 16, to: 29, price: 22 },
      { from: 30, to: null, price: 20 },
    ],
    price: 20,
    image: "/2008.png",
  },
];

export const wokringHours = [
  { from: "09:00", to: "18:00" },
  { from: "09:00", to: "18:00" },
  { from: "09:00", to: "18:00" },
  { from: "09:00", to: "18:00" },
  { from: "09:00", to: "18:00" },
  { from: "09:00", to: "18:00" },
  { from: "09:00", to: "18:00" },
];

export const aditionalEquipment = [
  {
    id: 1,
    name: "Total insurance",
    description:
      "This coverage package completely releases you of any possible financial responsibility in the case of damage to the vehicle, windows, mirrors, lights, and wheels caused by traffic accidents, theft or attempted theft.",
    price: 68,
  },
  {
    id: 2,
    name: "Cross border permit",
    description:
      "If you are planning to travel outside the borders of our beautiful country, you must select a border crossing charge. Vehicles have territorial validity of insurance in Europe, with the exception of Kosovo.",
    price: 48,
  },
  {
    id: 3,
    name: "Green card",
    description:
      "Exclusively for crossing the borders of North Macedonia, Albania, Ukraine, Turkey, Russia, Belarus, Moldova, Israel, Iran, Morocco, Tunisia and Azerbaijan a Green card is mandatory. Green card is issued together with the Cross border permit.",
    price: 36,
  },
  {
    id: 4,
    name: "Wi-Fi",
    description:
      "Excellent connection for all your devices! Connect up to 5 devices at once, surf with the best 4G network and stay connected while on your vacation",
    price: 30,
  },
  {
    id: 5,
    name: "Child seat (0-9 kg)",
    description:
      "for children from the day of birth up to 13 kg, belongs to the 0+ car seat group. ",
    price: 49,
  },
  {
    id: 6,
    name: "Child seat (9-18 kg)",
    description:
      "Child seat for children from birth up to 18 kg, belongs to the 0+ and 1 car seat group.",
    price: 49,
  },
  {
    id: 7,
    name: "Child seat (18-36 kg)",
    description:
      "Booster seat for children from 4 up to 12 years old, belongs to the 2 and 3 car seat group.",
    price: 49,
  },
  {
    id: 8,
    name: "Child seat Booster (18-36kg)",
    description:
      "Booster seat for children from 4 up to 12 years old, belongs to the 2 and 3 car seat group.",
    price: 49,
  },
];
