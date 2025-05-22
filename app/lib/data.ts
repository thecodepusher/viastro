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
    id: 6,
    exnternalId: "",
    slug: "seat_ibiza_fr",
    name: "Seat Ibiza FR",
    type: CarType.hatchback,
    gas: GasType.gasoline,
    numberOfSeats: 5,
    transmissionType: TransmissionType.manual,
    airConditioning: true,
    deposite: 300,
    aditionalEquipment: [
      {
        id: 1,
        name: "Full Protection osiguranje",
        description:
          "U cenu ove opcije pored osnovne zaštite uključena je zaštita od šteta na retrovizorima, vetrobranskom staklu i prozorima, kao i pokriće za oštećenja na podvozju, točkovima i gumama – delovima koji se u klasičnom osiguranju obično ne priznaju. Pored toga, Full Protection uključuje i osiguranje svih putnika u vozilu, uključujući vozača, u slučaju saobraćajne nezgode. Uz Full Protection osiguranje, iznos depozita se značajno smanjuje ili se potpuno ukida, u zavisnosti od klase vozila.",
        price: 9.99,
        free: false,
        depositeDiscount: 150,
        perDay: true,
        maxPerDays: null,
      },
    ],
    prices: [
      { from: 3, to: 7, price: 42 },
      { from: 8, to: 15, price: 38 },
      { from: 16, to: 29, price: 34 },
      { from: 30, to: null, price: 30 },
    ],
    price: 30,
    image: "/ibiza.webp",
  },
  // {
  //   id: 7,
  //   exnternalId: "",
  //   slug: "volkswagen_golf_7",
  //   name: "Volkswagen Golf 7",
  //   type: CarType.hatchback,
  //   gas: GasType.diesel,
  //   numberOfSeats: 5,
  //   transmissionType: TransmissionType.manual,
  //   airConditioning: true,
  //   deposite: 300,
  //   aditionalEquipment: [
  //     {
  //       id: 1,
  //       name: "Full Protection osiguranje",
  //       description:
  //         "U cenu ove opcije pored osnovne zaštite uključena je zaštita od šteta na retrovizorima, vetrobranskom staklu i prozorima, kao i pokriće za oštećenja na podvozju, točkovima i gumama – delovima koji se u klasičnom osiguranju obično ne priznaju. Pored toga, Full Protection uključuje i osiguranje svih putnika u vozilu, uključujući vozača, u slučaju saobraćajne nezgode. Uz Full Protection osiguranje, iznos depozita se značajno smanjuje ili se potpuno ukida, u zavisnosti od klase vozila.",
  //       price: 9.99,
  //       free: false,
  //       depositeDiscount: 150,
  //       perDay: true,
  //       maxPerDays: null,
  //     },
  //   ],
  //   prices: [
  //     { from: 3, to: 7, price: 45 },
  //     { from: 8, to: 15, price: 41 },
  //     { from: 16, to: 29, price: 37 },
  //     { from: 30, to: null, price: 33 },
  //   ],
  //   price: 33,
  //   image: "/golf_7.webp",
  // },
  {
    id: 3,
    exnternalId: "",
    slug: "citroen_c3_aircross",
    name: "Citroen C3 Aircross",
    type: CarType.compactSuv,
    gas: GasType.diesel,
    numberOfSeats: 5,
    transmissionType: TransmissionType.automatic,
    airConditioning: true,
    deposite: 300,
    aditionalEquipment: [
      {
        id: 1,
        name: "Full Protection osiguranje",
        description:
          "U cenu ove opcije pored osnovne zaštite uključena je zaštita od šteta na retrovizorima, vetrobranskom staklu i prozorima, kao i pokriće za oštećenja na podvozju, točkovima i gumama – delovima koji se u klasičnom osiguranju obično ne priznaju. Pored toga, Full Protection uključuje i osiguranje svih putnika u vozilu, uključujući vozača, u slučaju saobraćajne nezgode. Uz Full Protection osiguranje, iznos depozita se značajno smanjuje ili se potpuno ukida, u zavisnosti od klase vozila.",
        price: 9.99,
        free: false,
        depositeDiscount: 150,
        perDay: true,
        maxPerDays: null,
      },
    ],
    prices: [
      { from: 3, to: 7, price: 55 },
      { from: 8, to: 15, price: 50 },
      { from: 16, to: 29, price: 45 },
      { from: 30, to: null, price: 35 },
    ],
    price: 35,
    image: "/c3-aircross.jpg",
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
    aditionalEquipment: [
      {
        id: 1,
        name: "Full Protection osiguranje",
        description:
          "U cenu ove opcije pored osnovne zaštite uključena je zaštita od šteta na retrovizorima, vetrobranskom staklu i prozorima, kao i pokriće za oštećenja na podvozju, točkovima i gumama – delovima koji se u klasičnom osiguranju obično ne priznaju. Pored toga, Full Protection uključuje i osiguranje svih putnika u vozilu, uključujući vozača, u slučaju saobraćajne nezgode. Uz Full Protection osiguranje, iznos depozita se značajno smanjuje ili se potpuno ukida, u zavisnosti od klase vozila.",
        price: 11.99,
        depositeDiscount: 250,
        free: false,
        perDay: true,
        maxPerDays: null,
      },
    ],
    prices: [
      { from: 3, to: 7, price: 65 },
      { from: 8, to: 15, price: 55 },
      { from: 16, to: 29, price: 45 },
      { from: 30, to: null, price: 38 },
    ],
    price: 38,
    image: "/2008.avif",
  },
  {
    id: 4,
    slug: "skoda_oktavia",
    name: "Škoda Octavia",
    type: CarType.sedan,
    gas: GasType.diesel,
    numberOfSeats: 5,
    transmissionType: TransmissionType.automatic,
    airConditioning: true,
    deposite: 500,
    aditionalEquipment: [
      {
        id: 1,
        name: "Full Protection osiguranje",
        description:
          "U cenu ove opcije pored osnovne zaštite uključena je zaštita od šteta na retrovizorima, vetrobranskom staklu i prozorima, kao i pokriće za oštećenja na podvozju, točkovima i gumama – delovima koji se u klasičnom osiguranju obično ne priznaju. Pored toga, Full Protection uključuje i osiguranje svih putnika u vozilu, uključujući vozača, u slučaju saobraćajne nezgode. Uz Full Protection osiguranje, iznos depozita se značajno smanjuje ili se potpuno ukida, u zavisnosti od klase vozila.",
        price: 12.99,
        free: false,
        perDay: true,
        maxPerDays: null,
        depositeDiscount: 250,
      },
    ],
    prices: [
      { from: 3, to: 7, price: 75 },
      { from: 8, to: 15, price: 65 },
      { from: 16, to: 29, price: 55 },
      { from: 30, to: null, price: 45 },
    ],
    price: 45,
    image: "/skoda_octavia.png",
  },
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
    aditionalEquipment: [
      {
        id: 1,
        name: "Full Protection osiguranje",
        description:
          "U cenu ove opcije pored osnovne zaštite uključena je zaštita od šteta na retrovizorima, vetrobranskom staklu i prozorima, kao i pokriće za oštećenja na podvozju, točkovima i gumama – delovima koji se u klasičnom osiguranju obično ne priznaju. Pored toga, Full Protection uključuje i osiguranje svih putnika u vozilu, uključujući vozača, u slučaju saobraćajne nezgode. Uz Full Protection osiguranje, iznos depozita se značajno smanjuje ili se potpuno ukida, u zavisnosti od klase vozila.",
        price: 12.99,
        free: false,
        perDay: true,
        depositeDiscount: 250,
        maxPerDays: null,
      },
    ],
    prices: [
      { from: 3, to: 7, price: 75 },
      { from: 8, to: 15, price: 65 },
      { from: 16, to: 29, price: 55 },
      { from: 30, to: null, price: 45 },
    ],
    image: "/3008.png",
  },
  {
    id: 5,
    slug: "audi_a6",
    name: "Audi A6",
    type: CarType.sedan,
    gas: GasType.diesel,
    numberOfSeats: 5,
    transmissionType: TransmissionType.automatic,
    airConditioning: true,
    deposite: 1000,
    aditionalEquipment: [
      {
        id: 1,
        name: "Full Protection osiguranje",
        description:
          "U cenu ove opcije pored osnovne zaštite uključena je zaštita od šteta na retrovizorima, vetrobranskom staklu i prozorima, kao i pokriće za oštećenja na podvozju, točkovima i gumama – delovima koji se u klasičnom osiguranju obično ne priznaju. Pored toga, Full Protection uključuje i osiguranje svih putnika u vozilu, uključujući vozača, u slučaju saobraćajne nezgode. Uz Full Protection osiguranje, iznos depozita se značajno smanjuje ili se potpuno ukida, u zavisnosti od klase vozila.",
        price: 14.99,
        free: false,
        perDay: true,
        maxPerDays: null,
        depositeDiscount: 500,
      },
    ],
    prices: [
      { from: 3, to: 7, price: 115 },
      { from: 8, to: 15, price: 105 },
      { from: 16, to: 29, price: 95 },
      { from: 30, to: null, price: 85 },
    ],
    price: 85,
    image: "/audi-a6.webp",
  },
];

export const posts = [
  {
    id: 1,
    slug: "kopaonik",
    title: "Vikend na Kopaoniku – Planinska avantura uz Viastro rent a car",
    href: "/blog/kopaonik",
    description:
      "Otkrijte čari najpoznatijeg srpskog planinskog centra. Ako tražite beg od gradske gužve i svakodnevnog tempa, Kopaonik je savršena vikend destinacija – tokom cele godine. Od zimskih sportova do letnjih šetnji kroz borove šume, ovaj planinski biser nudi iskustva koja oduševljavaju i domaće i strane goste. A uz Viastro rent a car, vaše putovanje počinje bez stresa – udobno, sigurno i uz potpunu slobodu kretanja.",
    content: `
      <h2>Vikend na Kopaoniku – Planinska avantura uz Viastro rent a car</h2>
      <p>Ako tražite beg od gradske gužve i svakodnevnog tempa, Kopaonik je savršena vikend destinacija – bilo da idete na skijanje, planinarenje ili samo uživanje u prirodi i SPA centrima. A da bi put bio podjednako prijatan kao i boravak, pravo rešenje je iznajmljivanje vozila koje odgovara vašim potrebama. Viastro rent a car vam nudi vozila koja su idealna za put do planine – udobna, pouzdana i sa punim kasko osiguranjem.</p>

      <h3>Zašto Kopaonik za vikend?</h3>
      <ol>
        <li><strong>Brza dostupnost:</strong><br>
          Smešten na oko 280 km od Beograda, Kopaonik je idealan za trodnevni odmor. Uz automatski menjač i tempomat, putovanje postaje pravo uživanje.
        </li>
        <li><strong>Aktivnosti tokom cele godine:</strong>
          <ul>
            <li><strong>Zimi:</strong> više od 55 km ski staza, noćno skijanje, adrenalinski sadržaji</li>
            <li><strong>Leti:</strong> pešačke ture, bajs po planinskim stazama, zip line, bazeni na otvorenom</li>
            <li><strong>Tokom cele godine:</strong> luksuzni SPA centri, etno restorani, panoramski pogledi</li>
          </ul>
        </li>
        <li><strong>Širok izbor smeštaja:</strong><br>
          Od hotela sa 5 zvezdica do pristupačnih apartmana – Kopaonik ima opcije za svaki budžet.
        </li>
      </ol>

      <h3>Zašto iznajmiti vozilo kod Viastro?</h3>
      <ul>
        <li><strong>Komfor i sigurnost:</strong> Svi naši automobili su redovno servisirani, klimatizovani i potpuno opremljeni za duža putovanja.</li>
        <li><strong>Fleksibilni paketi:</strong> Najam već od 3 dana sa neograničenim kilometrima – savršeno za vikend planine.</li>
        <li><strong>Puna pokrivenost:</strong> Full kasko osiguranje, 24h asistencija, i mogućnost dodatne opreme (nosač za ski, lanaca, dečje sedište).</li>
        <li><strong>Brza i jednostavna rezervacija:</strong> Kontaktirajte nas putem sajta <a href="https://www.viastro.rs" target="_blank">www.viastro.rs</a> ili direktno na broj <a href="tel:0696565555">069/6565-555</a>.</li>
      </ul>

      <h3>Plan puta – predlog:</h3>
      <ul>
        <li><strong>Petak (polazak):</strong> Preuzmite vozilo i uputite se ka Kopaoniku. Preporučena ruta: Beograd – Kruševac – Brus – Kopaonik.</li>
        <li><strong>Subota:</strong> Uživajte u sportskim aktivnostima, prirodi i domaćoj kuhinji.</li>
        <li><strong>Nedelja:</strong> Opuštanje u SPA centru i povratak uveče.</li>
      </ul>

      <p><strong>Viastro – Your Journey Starts Here.</strong><br>
      Za sve vas koji želite slobodu da istražujete Srbiju sopstvenim tempom, Viastro rent a car nudi pouzdana vozila i maksimalnu fleksibilnost.</p>
    `,
    imageUrl: "/kop.png",
    date: "Maj 5, 2025",
    datetime: "2020-03-16",
  },
  {
    id: 2,
    title: "Đerdap Nacionalni Park – Gvozdena kapija prirode i istorije",
    href: "/blog/djerdap",
    slug: "djerdap",
    description:
      "Ako tražite vikend avanturu koja spaja prirodne lepote, arheološka čuda i panoramske vožnje, Đerdap Nacionalni Park je pravi izbor. Smešten duž desne obale Dunava, od Golubačke tvrđave do Donjeg Milanovca, ovaj park nudi spektakularne pejzaže, uključujući najdublji deo reke (82 m) i najuzaniji prolaz (150 m) u Evropi.",
    content: `
      <h2>Đerdap Nacionalni Park – Gvozdena kapija prirode i istorije</h2>
      <p>Ako tražite vikend avanturu koja spaja prirodne lepote, arheološka čuda i panoramske vožnje, Đerdap Nacionalni Park je pravi izbor. Smešten duž desne obale Dunava, od Golubačke tvrđave do Donjeg Milanovca, ovaj park nudi spektakularne pejzaže, uključujući najdublji deo reke (82 m) i najuzaniji prolaz (150 m) u Evropi.</p>

      <h3>Šta videti i doživeti:</h3>
      <ul>
        <li><strong>Golubačka tvrđava:</strong> Impozantna srednjovekovna tvrđava na ulazu u Đerdapsku klisuru.</li>
        <li><strong>Lepenski Vir:</strong> Arheološko nalazište staro preko 11.000 godina.</li>
        <li><strong>Vidikovci Veliki i Mali Štrbac:</strong> Pružaju nezaboravne poglede na Dunav.</li>
        <li><strong>Tabula Traiana:</strong> Rimski natpis uklesan u stenu.</li>
      </ul>

      <h3>Kako doći:</h3>
      <p>Iz Beograda, putovanje traje oko 3,5 sata. Preporučuje se ruta preko Požarevca i Velikog Gradišta, sa pauzom kod Golubačke tvrđave.</p>

      <h3>Zašto izabrati Viastro rent a car:</h3>
      <p>Naši SUV modeli, poput <strong>Peugeot 3008 GT Line</strong>, idealni su za vožnju kroz klisure. Uz <strong>full kasko osiguranje</strong> i <strong>neograničene kilometre</strong>, možete bezbrižno istraživati sve što Đerdap nudi.</p>
    `,
    imageUrl: "/sargan.png",
    date: "3 Maj, 2025",
    datetime: "2020-03-16",
  },
  {
    id: 3,
    title: "Mokra Gora i Šarganska osmica – Putovanje kroz vreme i prirodu",
    href: "/blog/mokra_gora",
    slug: "mokra_gora",
    content: `
      <h2>Mokra Gora i Šarganska osmica – Putovanje kroz vreme i prirodu</h2>
      <p>Mokra Gora je destinacija koja spaja prirodne lepote, kulturnu baštinu i jedinstvene turističke atrakcije. Vožnja Šarganskom osmicom, uskom prugom koja vijuga kroz planinske predele, pruža nezaboravan doživljaj.</p>

      <h3>Šta ne propustiti:</h3>
      <ul>
        <li><strong>Šarganska osmica:</strong> Vožnja istorijskom prugom koja pravi oblik broja osam.</li>
        <li><strong>Drvengrad:</strong> Etno-selo koje je izgradio Emir Kusturica.</li>
        <li><strong>Priroda Mokre Gore:</strong> Idealna za planinarenje i uživanje u netaknutoj prirodi.</li>
      </ul>

      <h3>Kako doći:</h3>
      <p>Mokra Gora se nalazi oko 200 km jugozapadno od Beograda. Putovanje traje oko 3,5 sata, a preporučena ruta vodi preko Užica.</p>

      <h3>Viastro rent a car – Vaš partner za putovanja:</h3>
      <p>Naša vozila su savršena za planinske puteve i duže vožnje. Uz <strong>automatski menjač</strong>, <strong>klimatizaciju</strong> i <strong>dodatnu opremu</strong>, vaše putovanje će biti udobno i sigurno.</p>
    `,
    description:
      "Mokra Gora je destinacija koja spaja prirodne lepote, kulturnu baštinu i jedinstvene turističke atrakcije. Vožnja Šarganskom osmicom, uskom prugom koja vijuga kroz planinske predele, pruža nezaboravan doživljaj.",
    imageUrl: "/djerdap.png",
    date: "1 Maj, 2025",
    datetime: "2020-03-16",
  },
];

export const wokringHours = [
  { from: "08:00", to: "16:00" },
  { from: "08:00", to: "16:00" },
  { from: "08:00", to: "16:00" },
  { from: "08:00", to: "16:00" },
  { from: "08:00", to: "16:00" },
  { from: "08:00", to: "16:00" },
  { from: "08:00", to: "16:00" },
];

export const aditionalEquipment = [
  {
    id: 2,
    name: "Dozvola za prelazak granice",
    description:
      "Ukoliko planirate da putujete sa iznajmljenim vozilom van teritorije Republike Srbije, potrebno je obezbediti dozvolu za prelazak granice. Ova dozvola omogućava legalno korišćenje vozila u inostranstvu i važi za jednu međunarodnu destinaciju ili više zemalja navedenih prilikom izdavanja, sa izuzetkom AP Kosovo i Metohija.",
    price: 48,
    free: false,
    perDay: false,
    maxPerDays: null,
    depositeDiscount: 0,
  },
  {
    id: 3,
    name: "Zeleni karton",
    description:
      "Zeleni karton (Međunarodna karta osiguranja vozila) je obavezan za prelazak granica sledećih zemalja: Severna Makedonija, Albanija, Ukrajina, Turska, Rusija, Belorusija, Moldavija, Izrael, Iran, Maroko, Tunis i Azerbejdžan. Zeleni karton se izdaje zajedno sa dozvolom za prelazak granice",
    price: 36,
    free: false,
    perDay: false,
    maxPerDays: null,
    depositeDiscount: 0,
  },
  {
    id: 9,
    name: "Dodatni vozac",
    description:
      "Ukoliko želite da vozilo koristi više od jedne osobe tokom najma, moguće je dodati dodatnog vozača. Dodatni vozač mora ispunjavati iste uslove kao i glavni vozač – da poseduje važeću vozačku dozvolu, kao i minimalno 21 godinu starosti (ili više, u zavisnosti od klase vozila). ",
    price: 0,
    free: true,
    perDay: false,
    maxPerDays: null,
    depositeDiscount: 0,
  },
  // {
  //   id: 8,
  //   name: "WiFi",
  //   description:
  //     "Ostanite povezani i tokom puta! Nudimo opciju mobilnog WiFi uređaja u vozilu, idealnu za navigaciju, streaming, poslovne pozive ili zabavu tokom putovanja. Rezervacije preko 7 dana cena je fiksna 35e.",
  //   price: 5,
  //   free: false,
  //   perDay: true,
  //   maxPerDays: 7,
  //   depositeDiscount: 0,
  // },
  // {
  //   id: 5,
  //   name: "Auto sedište - „Jaje“ (0–13 kg)",
  //   description:
  //     "Idealno za novorođenčad i bebe do 13 kilograma. Ovo sedište pruža maksimalnu sigurnost i udobnost za najmlađe putnike. Montira se suprotno od pravca vožnje, u skladu sa najvišim bezbednosnim standardima.",
  //   price: 0,
  //   free: true,
  //   perDay: false,
  //   maxPerDays: null,
  //   depositeDiscount: 0,
  // },
  {
    id: 6,
    name: "Auto sedište (0–36 kg)",
    description:
      "Univerzalno auto sedište koje pokriva sve uzraste – od novorođenčadi do dece od oko 12 godina. Podesivo po visini i nagibu, omogućava bezbednu i udobnu vožnju u svim fazama detetovog razvoja.Sedište se može postavljati u pravcu suprotnom od vožnje za najmanje bebe i u pravcu vožnje za stariju decu.",
    price: 0,
    free: true,
    perDay: false,
    maxPerDays: null,
    depositeDiscount: 0,
  },
  {
    id: 7,
    name: "Buster sedište (Booster)",
    description:
      "Namenjeno deci starijoj od 7 godine i težoj od 15 kilograma. Booster omogućava pravilno postavljanje sigurnosnog pojasa i povećava sigurnost deteta tokom vožnje. Kompaktno i lako za postavljanje u bilo koje vozilo.",
    price: 0,
    free: true,
    perDay: false,
    maxPerDays: null,
    depositeDiscount: 0,
  },
];

export const PRICE_FOR_PICKUP_OFF_HOURS = 20;
