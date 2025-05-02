export const locations = [
  { id: 1, name: "Novi Beograd" },
  {
    id: 2,
    name: "Belgrade Airport",
  },
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
    price: 45,
    deposite: 500,
    prices: [
      { from: 3, to: 7, price: 75 },
      { from: 8, to: 15, price: 65 },
      { from: 16, to: 29, price: 55 },
      { from: 30, to: null, price: 45 },
    ],
    image: "/3008.png",
  },
  {
    id: 2,
    slug: "peugeot_2008",
    name: "Peugeot 2008 GT Line",
    type: CarType.compactSuv,
    gas: GasType.gasoline,
    numberOfSeats: 5,
    transmissionType: TransmissionType.automatic,
    airConditioning: true,
    deposite: 500,
    prices: [
      { from: 3, to: 7, price: 65 },
      { from: 8, to: 15, price: 55 },
      { from: 16, to: 29, price: 45 },
      { from: 30, to: null, price: 38 },
    ],
    price: 38,
    image: "/2008.png",
  },
  {
    id: 3,
    slug: "citroen_c3_aircross",
    name: "Citroen C3 Aircross",
    type: CarType.compactSuv,
    gas: GasType.diesel,
    numberOfSeats: 5,
    transmissionType: TransmissionType.automatic,
    airConditioning: true,
    deposite: 300,
    prices: [
      { from: 3, to: 7, price: 55 },
      { from: 8, to: 15, price: 50 },
      { from: 16, to: 29, price: 45 },
      { from: 30, to: null, price: 35 },
    ],
    price: 35,
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
    free: false,
    perDay: true,
  },
  {
    id: 2,
    name: "Dozvola za prelazak granice",
    description:
      "Ukoliko planirate da putujete sa iznajmljenim vozilom van teritorije Republike Srbije, potrebno je obezbediti dozvolu za prelazak granice. Ova dozvola omogućava legalno korišćenje vozila u inostranstvu i važi za jednu međunarodnu destinaciju ili više zemalja navedenih prilikom izdavanja, sa izuzetkom AP Kosovo i Metohija.",
    price: 48,
    free: false,
    perDay: false,
  },
  {
    id: 3,
    name: "Zeleni karton",
    description:
      "Zeleni karton (Međunarodna karta osiguranja vozila) je obavezan za prelazak granica sledećih zemalja: Severna Makedonija, Albanija, Ukrajina, Turska, Rusija, Belorusija, Moldavija, Izrael, Iran, Maroko, Tunis i Azerbejdžan. Zeleni karton se izdaje zajedno sa dozvolom za prelazak granice",
    price: 36,
    free: false,
    perDay: false,
  },
  {
    id: 5,
    name: "Auto sedište - „Jaje“ (0–13 kg)",
    description:
      "Idealno za novorođenčad i bebe do 13 kilograma. Ovo sedište pruža maksimalnu sigurnost i udobnost za najmlađe putnike. Montira se suprotno od pravca vožnje, u skladu sa najvišim bezbednosnim standardima.",
    price: 0,
    free: true,
    perDay: false,
  },
  {
    id: 6,
    name: "Auto sedište (0–36 kg)",
    description:
      "Univerzalno auto sedište koje pokriva sve uzraste – od novorođenčadi do dece od oko 12 godina. Podesivo po visini i nagibu, omogućava bezbednu i udobnu vožnju u svim fazama detetovog razvoja.Sedište se može postavljati u pravcu suprotnom od vožnje za najmanje bebe i u pravcu vožnje za stariju decu.",
    price: 0,
    free: true,
    perDay: false,
  },
  {
    id: 7,
    name: "Buster sedište (Booster)",
    description:
      "Namenjeno deci starijoj od 4 godine i težoj od 15 kilograma. Booster omogućava pravilno postavljanje sigurnosnog pojasa i povećava sigurnost deteta tokom vožnje. Kompaktno i lako za postavljanje u bilo koje vozilo.",
    price: 0,
    free: true,
    perDay: false,
  },
];
