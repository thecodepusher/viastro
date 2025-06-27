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
    exnternalId: "7",
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
  {
    id: 8,
    exnternalId: "9",
    slug: "ford_focus_2020",
    name: "Ford Focus 2020",
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
    image: "/ford-focus.webp",
  },
  {
    id: 7,
    exnternalId: "8",
    slug: "clio",
    name: "Renault Clio 2025",
    type: CarType.hatchback,
    gas: GasType.gasoline,
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
      { from: 3, to: 7, price: 45 },
      { from: 8, to: 15, price: 41 },
      { from: 16, to: 29, price: 37 },
      { from: 30, to: null, price: 33 },
    ],
    price: 33,
    image: "/clio.png",
  },
  {
    id: 3,
    exnternalId: "2",
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
    exnternalId: "1",
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
    exnternalId: "6",
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
    exnternalId: "3",
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
    exnternalId: "4",
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

export const postsSr = [
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

export const postsEn = [
  {
    id: 1,
    slug: "kopaonik",
    title: "Weekend on Kopaonik – Mountain Adventure with Viastro Rent a Car",
    href: "/blog/kopaonik",
    description:
      "Discover the charms of Serbia's most famous mountain center. If you're looking for an escape from the city crowds and daily pace, Kopaonik is the perfect weekend destination – all year round. From winter sports to summer walks through pine forests, this mountain gem offers experiences that delight both local and foreign guests. And with Viastro rent a car, your journey starts stress-free – comfortably, safely, and with complete freedom of movement.",
    content: `
      <h2>Weekend on Kopaonik – Mountain Adventure with Viastro Rent a Car</h2>
      <p>If you're looking for an escape from the city crowds and daily pace, Kopaonik is the perfect weekend destination – whether you're going skiing, hiking, or just enjoying nature and SPA centers. And to make the journey as pleasant as the stay, the right solution is to rent a vehicle that suits your needs. Viastro rent a car offers vehicles ideal for the trip to the mountains – comfortable, reliable, and with full casco insurance.</p>

      <h3>Why Kopaonik for the weekend?</h3>
      <ol>
        <li><strong>Quick accessibility:</strong><br>
          Located about 280 km from Belgrade, Kopaonik is ideal for a three-day getaway. With an automatic transmission and cruise control, the journey becomes a real pleasure.
        </li>
        <li><strong>Year-round activities:</strong>
          <ul>
            <li><strong>Winter:</strong> more than 55 km of ski slopes, night skiing, adrenaline activities</li>
            <li><strong>Summer:</strong> hiking tours, mountain biking, zip line, outdoor pools</li>
            <li><strong>All year round:</strong> luxury SPA centers, ethno restaurants, panoramic views</li>
          </ul>
        </li>
        <li><strong>Wide choice of accommodation:</strong><br>
          From 5-star hotels to affordable apartments – Kopaonik has options for every budget.
        </li>
      </ol>

      <h3>Why rent a vehicle from Viastro?</h3>
      <ul>
        <li><strong>Comfort and safety:</strong> All our cars are regularly serviced, air-conditioned, and fully equipped for longer trips.</li>
        <li><strong>Flexible packages:</strong> Rentals from 3 days with unlimited mileage – perfect for a mountain weekend.</li>
        <li><strong>Full coverage:</strong> Full casco insurance, 24h assistance, and the option of additional equipment (ski rack, chains, child seat).</li>
        <li><strong>Quick and easy booking:</strong> Contact us via the website <a href="https://www.viastro.rs" target="_blank">www.viastro.rs</a> or directly at <a href="tel:0696565555">069/6565-555</a>.</li>
      </ul>

      <h3>Itinerary – suggestion:</h3>
      <ul>
        <li><strong>Friday (departure):</strong> Pick up your vehicle and head to Kopaonik. Recommended route: Belgrade – Kruševac – Brus – Kopaonik.</li>
        <li><strong>Saturday:</strong> Enjoy sports activities, nature, and local cuisine.</li>
        <li><strong>Sunday:</strong> Relax at a SPA center and return in the evening.</li>
      </ul>

      <p><strong>Viastro – Your Journey Starts Here.</strong><br>
      For all of you who want the freedom to explore Serbia at your own pace, Viastro rent a car offers reliable vehicles and maximum flexibility.</p>
    `,
    imageUrl: "/kop.png",
    date: "May 5, 2025",
    datetime: "2020-03-16",
  },
  {
    id: 2,
    title: "Đerdap National Park – The Iron Gates of Nature and History",
    href: "/blog/djerdap",
    slug: "djerdap",
    description:
      "If you're looking for a weekend adventure that combines natural beauty, archaeological wonders, and scenic drives, Đerdap National Park is the right choice. Located along the right bank of the Danube, from Golubac Fortress to Donji Milanovac, this park offers spectacular landscapes, including the deepest part of the river (82 m) and the narrowest passage (150 m) in Europe.",
    content: `
      <h2>Đerdap National Park – The Iron Gates of Nature and History</h2>
      <p>If you're looking for a weekend adventure that combines natural beauty, archaeological wonders, and scenic drives, Đerdap National Park is the right choice. Located along the right bank of the Danube, from Golubac Fortress to Donji Milanovac, this park offers spectacular landscapes, including the deepest part of the river (82 m) and the narrowest passage (150 m) in Europe.</p>

      <h3>What to see and experience:</h3>
      <ul>
        <li><strong>Golubac Fortress:</strong> An imposing medieval fortress at the entrance to the Đerdap Gorge.</li>
        <li><strong>Lepenski Vir:</strong> An archaeological site over 11,000 years old.</li>
        <li><strong>Veliki and Mali Štrbac Viewpoints:</strong> Offer unforgettable views of the Danube.</li>
        <li><strong>Tabula Traiana:</strong> A Roman inscription carved into the rock.</li>
      </ul>

      <h3>How to get there:</h3>
      <p>From Belgrade, the journey takes about 3.5 hours. The recommended route is via Požarevac and Veliko Gradište, with a stop at Golubac Fortress.</p>

      <h3>Why choose Viastro rent a car:</h3>
      <p>Our SUV models, like the <strong>Peugeot 3008 GT Line</strong>, are ideal for driving through the gorges. With <strong>full casco insurance</strong> and <strong>unlimited kilometers</strong>, you can explore everything Đerdap has to offer carefree.</p>
    `,
    imageUrl: "/sargan.png",
    date: "May 3, 2025",
    datetime: "2020-03-16",
  },
  {
    id: 3,
    title: "Mokra Gora and Šargan Eight – A Journey Through Time and Nature",
    href: "/blog/mokra_gora",
    slug: "mokra_gora",
    content: `
      <h2>Mokra Gora and Šargan Eight – A Journey Through Time and Nature</h2>
      <p>Mokra Gora is a destination that combines natural beauty, cultural heritage, and unique tourist attractions. The ride on the Šargan Eight, a narrow-gauge railway that winds through mountainous landscapes, offers an unforgettable experience.</p>

      <h3>What not to miss:</h3>
      <ul>
        <li><strong>Šargan Eight:</strong> A ride on the historic railway that forms a figure-eight.</li>
        <li><strong>Drvengrad (Timber Town):</strong> An ethno-village built by Emir Kusturica.</li>
        <li><strong>Nature of Mokra Gora:</strong> Ideal for hiking and enjoying untouched nature.</li>
      </ul>

      <h3>How to get there:</h3>
      <p>Mokra Gora is located about 200 km southwest of Belgrade. The journey takes about 3.5 hours, and the recommended route is via Užice.</p>

      <h3>Viastro rent a car – Your travel partner:</h3>
      <p>Our vehicles are perfect for mountain roads and longer drives. With an <strong>automatic transmission</strong>, <strong>air conditioning</strong>, and <strong>additional equipment</strong>, your journey will be comfortable and safe.</p>
    `,
    description:
      "Mokra Gora is a destination that combines natural beauty, cultural heritage, and unique tourist attractions. The ride on the Šargan Eight, a narrow-gauge railway that winds through mountainous landscapes, offers an unforgettable experience.",
    imageUrl: "/djerdap.png",
    date: "May 1, 2025",
    datetime: "2020-03-16",
  },
];

export const postsRu = [
  {
    id: 1,
    slug: "kopaonik",
    title: "Выходные на Копаонике – Горное приключение с Viastro rent a car",
    href: "/blog/kopaonik",
    description:
      "Откройте для себя очарование самого известного горного центра Сербии. Если вы ищете способ убежать от городской суеты и повседневного темпа, Копаоник – идеальное место для выходных – круглый год. От зимних видов спорта до летних прогулок по сосновым лесам, эта горная жемчужина предлагает впечатления, которые восхищают как местных, так и иностранных гостей. А с Viastro rent a car ваше путешествие начнется без стресса – комфортно, безопасно и с полной свободой передвижения.",
    content: `
      <h2>Выходные на Копаонике – Горное приключение с Viastro rent a car</h2>
      <p>Если вы ищете способ убежать от городской суеты и повседневного темпа, Копаоник – идеальное место для выходных – собираетесь ли вы кататься на лыжах, ходить в походы или просто наслаждаться природой и СПА-центрами. А чтобы поездка была такой же приятной, как и пребывание, правильное решение – арендовать автомобиль, соответствующий вашим потребностям. Viastro rent a car предлагает автомобили, идеально подходящие для поездки в горы – удобные, надежные и с полной страховкой КАСКО.</p>

      <h3>Почему Копаоник на выходные?</h3>
      <ol>
        <li><strong>Быстрая доступность:</strong><br>
          Расположенный примерно в 280 км от Белграда, Копаоник идеален для трехдневного отдыха. С автоматической коробкой передач и круиз-контролем путешествие становится настоящим удовольствием.
        </li>
        <li><strong>Мероприятия круглый год:</strong>
          <ul>
            <li><strong>Зимой:</strong> более 55 км лыжных трасс, ночное катание, адреналиновые развлечения</li>
            <li><strong>Летом:</strong> пешеходные туры, велосипедные прогулки по горным тропам, зиплайн, открытые бассейны</li>
            <li><strong>Круглый год:</strong> роскошные СПА-центры, этно-рестораны, панорамные виды</li>
          </ul>
        </li>
        <li><strong>Широкий выбор жилья:</strong><br>
          От 5-звездочных отелей до доступных апартаментов – на Копаонике есть варианты на любой бюджет.
        </li>
      </ol>

      <h3>Почему арендовать автомобиль у Viastro?</h3>
      <ul>
        <li><strong>Комфорт и безопасность:</strong> Все наши автомобили регулярно обслуживаются, оснащены кондиционерами и полностью оборудованы для длительных поездок.</li>
        <li><strong>Гибкие пакеты:</strong> Аренда от 3 дней с неограниченным пробегом – идеально для выходных в горах.</li>
        <li><strong>Полное покрытие:</strong> Полная страховка КАСКО, круглосуточная помощь на дороге и возможность дополнительного оборудования (багажник для лыж, цепи, детское кресло).</li>
        <li><strong>Быстрое и простое бронирование:</strong> Свяжитесь с нами через сайт <a href="https://www.viastro.rs" target="_blank">www.viastro.rs</a> или напрямую по номеру <a href="tel:0696565555">069/6565-555</a>.</li>
      </ul>

      <h3>План поездки – предложение:</h3>
      <ul>
        <li><strong>Пятница (отправление):</strong> Заберите автомобиль и отправляйтесь на Копаоник. Рекомендуемый маршрут: Белград – Крушевац – Брус – Копаоник.</li>
        <li><strong>Суббота:</strong> Наслаждайтесь спортивными мероприятиями, природой и местной кухней.</li>
        <li><strong>Воскресенье:</strong> Отдых в СПА-центре и возвращение вечером.</li>
      </ul>

      <p><strong>Viastro – Ваше путешествие начинается здесь.</strong><br>
      Для всех вас, кто хочет свободы исследовать Сербию в собственном темпе, Viastro rent a car предлагает надежные автомобили и максимальную гибкость.</p>
    `,
    imageUrl: "/kop.png",
    date: "5 мая 2025",
    datetime: "2020-03-16",
  },
  {
    id: 2,
    title: "Национальный парк Джердап – Железные ворота природы и истории",
    href: "/blog/djerdap",
    slug: "djerdap",
    description:
      "Если вы ищете приключение на выходные, сочетающее природные красоты, археологические чудеса и панорамные поездки, Национальный парк Джердап – это правильный выбор. Расположенный вдоль правого берега Дуная, от Голубацкой крепости до Дони-Милановца, этот парк предлагает захватывающие пейзажи, включая самую глубокую часть реки (82 м) и самый узкий проход (150 м) в Европе.",
    content: `
      <h2>Национальный парк Джердап – Железные ворота природы и истории</h2>
      <p>Если вы ищете приключение на выходные, сочетающее природные красоты, археологические чудеса и панорамные поездки, Национальный парк Джердап – это правильный выбор. Расположенный вдоль правого берега Дуная, от Голубацкой крепости до Дони-Милановца, этот парк предлагает захватывающие пейзажи, включая самую глубокую часть реки (82 м) и самый узкий проход (150 м) в Европе.</p>

      <h3>Что посмотреть и испытать:</h3>
      <ul>
        <li><strong>Голубацкая крепость:</strong> Внушительная средневековая крепость у входа в Джердапское ущелье.</li>
        <li><strong>Лепенски-Вир:</strong> Археологический объект возрастом более 11 000 лет.</li>
        <li><strong>Смотровые площадки Велики и Мали Штрбац:</strong> Открывают незабываемые виды на Дунай.</li>
        <li><strong>Табула Траяна:</strong> Римская надпись, высеченная в скале.</li>
      </ul>

      <h3>Как добраться:</h3>
      <p>Из Белграда поездка занимает около 3,5 часов. Рекомендуемый маршрут через Пожаревац и Велико-Градиште, с остановкой у Голубацкой крепости.</p>

      <h3>Почему выбрать Viastro rent a car:</h3>
      <p>Наши модели внедорожников, такие как <strong>Peugeot 3008 GT Line</strong>, идеально подходят для езды по ущельям. С <strong>полной страховкой КАСКО</strong> и <strong>неограниченным пробегом</strong> вы можете беззаботно исследовать все, что предлагает Джердап.</p>
    `,
    imageUrl: "/sargan.png",
    date: "3 мая 2025",
    datetime: "2020-03-16",
  },
  {
    id: 3,
    title:
      "Мокра Гора и Шарганская восьмерка – Путешествие сквозь время и природу",
    href: "/blog/mokra_gora",
    slug: "mokra_gora",
    content: `
      <h2>Мокра Гора и Шарганская восьмерка – Путешествие сквозь время и природу</h2>
      <p>Мокра Гора – это место, которое сочетает в себе природные красоты, культурное наследие и уникальные туристические достопримечательности. Поездка по Шарганской восьмерке, узкоколейной железной дороге, извивающейся по горным ландшафтам, дарит незабываемые впечатления.</p>

      <h3>Что не пропустить:</h3>
      <ul>
        <li><strong>Шарганская восьмерка:</strong> Поездка по исторической железной дороге, образующей форму восьмерки.</li>
        <li><strong>Дрвенград:</strong> Этно-деревня, построенная Эмиром Кустурицей.</li>
        <li><strong>Природа Мокра Горы:</strong> Идеально подходит для пеших прогулок и наслаждения нетронутой природой.</li>
      </ul>

      <h3>Как добраться:</h3>
      <p>Мокра Гора находится примерно в 200 км к юго-западу от Белграда. Поездка занимает около 3,5 часов, рекомендуемый маршрут – через Ужице.</p>

      <h3>Viastro rent a car – Ваш партнер в путешествиях:</h3>
      <p>Наши автомобили идеально подходят для горных дорог и длительных поездок. С <strong>автоматической коробкой передач</strong>, <strong>кондиционером</strong> и <strong>дополнительным оборудованием</strong> ваше путешествие будет комфортным и безопасным.</p>
    `,
    description:
      "Мокра Гора – это место, которое сочетает в себе природные красоты, культурное наследие и уникальные туристические достопримечательности. Поездка по Шарганской восьмерке, узкоколейной железной дороге, извивающейся по горным ландшафтам, дарит незабываемые впечатления.",
    imageUrl: "/djerdap.png",
    date: "1 мая 2025",
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

export const privacyPolicy = `
  <p class="c1"><span class="c3">VIASTRO DOO</span></p>
  <p class="c1">
      <span class="c0">&#128205;</span
      ><span
          >&nbsp;Adresa: Danila Leki&#263;a &Scaron;panca 31, Novi
          Beograd<br /></span
      ><span class="c0">&#128209;</span
      ><span
          >&nbsp;PIB: 114961759 | Mati&#269;ni broj: 22096737<br /></span
      ><span class="c0">&#128231;</span
      ><span>&nbsp;Email: office@viastro.rs | </span
      ><span class="c0">&#128222;</span
      ><span class="c3">&nbsp;Tel: 069/656-555</span>
  </p>
  <p class="c1 c2"><span class="c3"></span></p>
  <p class="c1">
      <span class="c3">ZA&Scaron;TITA PRIVATNOSTI KORISNIKA</span>
  </p>
  <p class="c1">
      <span class="c3"
          >U ime Viastro Doo obavezujemo se da &#263;emo &#269;uvati
          privatnost svih na&scaron;ih kupaca.</span
      >
  </p>
  <p class="c1">
      <span class="c3"
          >Prikupljamo samo neophodne, osnovne podatke o kupcima/
          korisnicima i podatke neophodne za poslovanje i informisanje
          korisnika u skladu sa dobrim poslovnim obi&#269;ajima i u cilju
          pru&#382;anja kvalitetne usluge.</span
      >
  </p>
  <p class="c1">
      <span class="c3"
          >Dajemo kupcima mogu&#263;nost izbora uklju&#269;uju&#263;i
          mogu&#263;nost odluke da li &#382;ele ili ne da se
          izbri&scaron;u sa mailing lista koje se koriste za
          marketin&scaron;ke kampanje.</span
      >
  </p>
  <p class="c1">
      <span class="c3"
          >Svi podaci o korisnicima/kupcima se strogo &#269;uvaju i
          dostupni su samo zaposlenima kojima su ti podaci nu&#382;ni za
          obavljanje posla. Svi zaposleni [ime prodajnog mesta] (i
          poslovni partneri) odgovorni su za po&scaron;tovanje na&#269;ela
          za&scaron;tite privatnosti.</span
      >
  </p>
  <p class="c1 c2"><span class="c3"></span></p>
  <p class="c1">
      <span class="c3"
          >ZA&Scaron;TITA POVERLJIVIH PODATAKA O TRANSAKCIJI</span
      >
  </p>
  <p class="c1">
      <span class="c3"
          >Prilikom uno&scaron;enja podataka o platnoj kartici, poverljive
          informacija se prenose putem javne mre&#382;e u
          za&scaron;ti&#263;enoj (kriptovanoj) formi upotrebom SSL
          protokola i PKI sistema, kao trenutno najsavremenije
          kriptografske tehnologije.</span
      >
  </p>
  <p class="c1">
      <span class="c3"
          >Sigurnost podataka prilikom kupovine, garantuje procesor
          platnih kartica. Niti jednog trenutka podaci o platnoj kartici
          nisu dostupni na&scaron;em sistemu.</span
      >
  </p>
  <p class="c1 c2"><span class="c3"></span></p>
  <p class="c1"><span class="c3">POVRA&#262;AJ SREDSTAVA</span></p>
  <p class="c1">
      <span class="c3"
          >U slu&#269;aju vra&#263;anja robe i povra&#263;aja sredstava
          kupcu koji je prethodno platio nekom od platnih kartica,
          delimi&#269;no ili u celosti, a bez obzira na razlog
          vra&#263;anja, Viastro Doo je u obavezi da povra&#263;aj
          vr&scaron;i isklju&#269;ivo preko VISA, EC/MC i Maestro metoda
          pla&#263;anja, &scaron;to zna&#269;i da &#263;e banka na zahtev
          prodavca obaviti povra&#263;aj sredstava na ra&#269;un korisnika
          kartice.</span
      >
  </p>
  <p class="c1 c2"><span class="c3"></span></p>
  <p class="c1"><span class="c3">IZJAVA O KONVERZIJI</span></p>
  <p class="c1">
      <span class="c3"
          >All payments will be effected in Serbian currency - Dinar
          (RSD). The amount your credit card account will be charged for
          is obtained through the conversion of the price in Euro into
          Serbian dinar according to the current exchange rate of the
          Serbian National Bank. When charging your credit card, the same
          amount is converted into your local currency according to the
          exchange rate of credit card associations. As a result of this
          conversion there is a possibility of a slight difference from
          the original price stated in our web site.</span
      >
  </p>
  `;

export const usloviNajma = `
  <p class="c3">
      <span
          >OP&Scaron;TI USLOVI NAJMA VOZILA &ndash; VIASTRO DOO
          <br />&#128205; Adresa: Danila Leki&#263;a &Scaron;panca 31,
          Novi Beograd<br />&#128209; PIB: 114961759 | Mati&#269;ni broj:
          22096737<br />&#128231; Email: office@viastro.rs | &#128222;
          Tel: 069/656-555<br /><br /></span
      ><span class="c8"
          >1. OP&Scaron;TE ODREDBE I DEFINICIJE POJMOVA</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          ><br />Op&scaron;ti uslovi najma vozila predstavljaju sastavni
          deo svakog Ugovora o najmu motornog vozila zaklju&#269;enog sa
          privrednim dru&scaron;tvom VIASTRO DOO BEOGRAD-NOVI
          BEOGRAD.</span
      >
  </p>
  <p class="c0">
      <span
          ><br />Korisniku su prilikom potpisivanja ugovora o najmu
          motornog vozila predo&#269;ene odredbe Op&scaron;tih uslova.
          Korisnik se obave&scaron;tava tako&#273;e da se u svakom
          trenutku u slu&#269;aju dodatne potrebe mo&#382;e ponovo sa
          sadr&#382;inom istih upoznati putem internet stranice Najmodavca </span
      ><span class="c17"
          ><a
              class="c13"
              href="https://www.google.com/url?q=https://viastro.rs/en/rental-conditions&amp;sa=D&amp;source=editors&amp;ust=1748527385691949&amp;usg=AOvVaw1rFlFbTivsJVnm749QXOp1"
              >https://viastro.rs/en/rental-conditions</a
          ></span
      ><span class="c1"
          >; Korisnik potpisivanjem Ugovora o najmu motornog vozila
          potvr&#273;uje da je upoznat sa svim odredbama Op&scaron;tih
          uslova najma vozila, da je sadr&#382;inu istih razumeo uslovima
          i da ih u celosti prihvata imaju&#263;i u vidu da predstavljaju
          sastavni deo svakog pojedina&#269;nog ugovora o najmu
          vozila.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >Na Ugovor o najmu vozila &#263;e primenjuju pozitivni propisi
          Republike Srbije i ugovara se njihova supsidijerna primena za
          sva prava i obaveze koja nisu istim regulisana pod uslovom da su
          primenjljiva na konkretne slu&#269;ajeve. &nbsp;Na sva sporna
          pitanja koja mogu proiza&#263;i iz Ugovora i Op&scaron;tih
          uslova se ugovara nadle&#382;nost mesno i stvarno nadle&#382;nog
          suda u Beogradu.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >Namodavac i Korisnik &#263;e nastojati da sva sporna pitanja
          prevashodno re&scaron;e mirnim vansudskim putem.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >Korisnik potpisivanjem ugovora potvr&#273;uje da je
          pro&#269;itao odredbe Op&scaron;tih uslova, da je njihovu
          sadr&#382;inu razumeo i da je saglasan da se isti primenjuju kao
          sastavni deo Ugovora.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >Najmodavac zadr&#382;ava pravo da Op&scaron;te uslove najma
          vozila izmeni uz obavezu da ih prethodno objavi na internet
          stranici sa rokom stupanja na snagu od 30 dana od dana objave a
          radi blagovremenog upoznavanja Korisnika sa sadr&#382;inom
          izmena.</span
      >
  </p>
  <p class="c0 c7"><span class="c1"></span></p>
  <p class="c0">
      <span class="c8"
          >2. ZNA&#268;ENJE &nbsp;NEKIH OD IZRAZA U OP&Scaron;TIM USLOVIMA
          POSLOVANJA</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >&rsquo;&rsquo;Najmodavac&rsquo;&rsquo; &ndash; privredno
          dru&scaron;tvo Viastro doo Beograd, sa sedi&scaron;tem na adresi
          ul. Danila Leki&#263;a &Scaron;panca br.31, Beograd-Novi
          Beograd, mati&#269;ni broj: 22096737, PIB: 114961759;</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >&rsquo;&rsquo;Najmoprimac&rsquo;&rsquo; &ndash; svako
          fizi&#269;ko ili pravno lice koje iznajmljuje vozilo, odnosno u
          &#269;ije ime se vozilo iznajmljuje;</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >&rsquo;&rsquo;Ugovor&rsquo;&rsquo; &ndash; Ugovor o najmu koji
          se potpisuje prilikom preuzimanja vozila a kojim se vozilo daje
          na kori&scaron;&#263;enje, defini&scaron;u se prava i obaveze
          ugovornih strana u skladu sa ugovornim odredbama i Op&scaron;tim
          uslovima najma kao &scaron;to su primera radi preuzimanje i
          vra&#263;anje vozila, pokri&#263;e, paket opreme i usluga
          uklju&#269;enih u cenu kao i na&#269;in pla&#263;anja. Ugovor
          pored navedenog sadr&#382;i i podaatke o stanju kilometra&#382;e
          vozila, o&scaron;te&#263;enjima i eventualnim nedostacima na
          vozilu i druga prava i obaveze koje obe ugovorne strane svojim
          potpisom u potpunosti prihvataju. Skica o stanju vozila prilikom
          izdavanja i ovi Op&scaron;ti uslovi smatraju se sastavnim delom
          Ugovora o najmu vozila kao njegov prilog;</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >&rsquo;&rsquo;Voza&#269;/Dodatni voza&#269;&rsquo;&rsquo;
          &ndash; je fizi&#269;ko lice navedeno u Ugovoru kao
          &lsquo;&rsquo;Korisnik&rsquo;&rsquo; koje potpisuje Ugovor o
          najmu i preuzima vozilo, a koje je odgovorno za
          po&scaron;tovanje svih odredbi Ugovora i Op&scaron;tih
          uslova;</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >&rsquo;&rsquo;Korisnik&rsquo;&rsquo; &ndash; Najmoprimac,
          Voza&#269; i Dodatni voza&#269; u daljem tekstu Op&scaron;tih
          uslova najma ozna&#269;avaju se jednom re&#269;ju &ndash;
          Korisnik</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >&lsquo;&rsquo;Vozilo&rsquo;&rsquo; je predmet najma Ugovora, a
          &#269;iji podaci su navedeni u Ugovoru.</span
      >
  </p>
  <p class="c0">
      <span class="c8"
          ><br />3. USLOVI I PRAVILA KORI&Scaron;&#262;ENJA VOZILA</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >Najmodavac izdaje Korisniku Vozilo koje je tehni&#269;ki
          ispravno, oprano i sa punim rezervoarom, sa ugovorenom
          pripadaju&#263;om opremom i propratnom dokumentacijom &scaron;to
          Korisnik potpisivanjem Ugovora i potvr&#273;uje. Lice koje u ime
          Korisnika preuzima vozilo i potpisuje Ugovor, ukoliko za to ima
          ovla&scaron;&#263;enje, garantuje i odgovoran je Najmodavcu,
          solidarno sa Korisnikom za po&scaron;tovanje i ispunjenje svih
          ugovornih obaveza. Potpisivanjem Ugovora Korisnik garantuje
          Najmodavcu da ispunjava op&scaron;te uslove za upravljanje
          motornim vozilom i da poseduje sve relevantne isprave u skladu
          sa va&#382;e&#263;im zakonskim i podzakonskim propisima
          Republike Srbije. Prilikom potpisivanja ugovora Korisnik je
          obavezan da Najmodavcu preda na uvid li&#269;ne isprave a
          &#269;ije kopije &#263;e predstavljati sastavni deo Ugovora kao
          prilog.</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          >Korisnik je obavezan da se stara o redovnoj tehni&#269;koj
          ispravnosti vozila i da vodi ra&#269;una i redovno proverava
          parametre kao &scaron;to su stanje te&#269;nosti za
          hla&#273;enje, ulje, ostale te&#269;nosti, visinu pritiska u
          gumama i dr. U slu&#269;aju notifikacija sa instrument table ili
          drugih signalizacija Vozila ili ukoliko Korisnik smatra da
          postoje drugi razlozi za obavljanje servisa ili redovnih servisa
          Korisnik je obavezan da se javi Najmodavcu radi obavljanja
          neophodnih radnji. U slu&#269;aju nastanka &scaron;tete na
          vozilu zbog nepo&scaron;tovanja ovih odredbi Korisnik &#263;e
          biti du&#382;an da nadoknadi tako nastalu &scaron;tetu i
          eventualnu izgubljenu dobit Najmodavca za period
          nemogu&#263;nosti izdavanja vozila usled kr&scaron;enja ovih
          odredbi Op&scaron;tih uslova.</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          ><br />Korisniku je izri&#269;ito zabranjeno da koristiti vozilo
          za slede&#263;e potrebe: trka, off-road vo&#382;nje, vu&#269;u
          drugih vozila ili prikolica, &scaron;kolu vo&#382;nje, prevoz
          opasnih materija, profesionalni prevoz putnika, vo&#382;nju pod
          dejstvom alkohola, narkotika i drugih zakonom zabranjenih
          psihoaktivnih supstanci i/ili bilo koje druge nezakonite
          aktivnosti.</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          ><br />Korisnik je obavezan da vodi ra&#269;una o ispravnosti i
          bezbednosti vozila sa odgovaraju&#263;im stepenom pa&#382;nje
          (dobrog doma&#263;ina odnosno dobrog privrednika u zavisnosti od
          toga koji je pravni standard primenjljiv na konkretan
          slu&#269;aj). Zabranjeno je ostavljanje vozila otklju&#269;anog,
          sa spu&scaron;tenim prozorima ili na drugi na&#269;in
          neobezbe&#273;enog ili sa klju&#269;evima u bravi.<br
      /></span>
  </p>
  <p class="c6">
      <span class="c1"
          >Korisnik je du&#382;an da prilikom vra&#263;anja vozila
          izvr&scaron;i povra&#263;aj istog na adresi Najmodavca sa koje
          je vozilo i preuzeo. Vozilo pre povra&#263;aja mora biti oprano
          spolja i iznutra a rezervoar mora biti pun. Ukoliko ove obaveze
          nisu ispo&scaron;tovane od strane Korisnika, Najmodavac ima
          pravo da naplati usluge pranja i/ili dolivanja goriva prema
          va&#382;e&#263;em cenovniku.</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          ><br />Korisnik mo&#382;e koristiti vozilo za vo&#382;nju u
          Republici Srbiji, dok za prelazak granice i vo&#382;nju u
          slede&#263;im zemljama to mo&#382;e u&#269;initi isklju&#269;ivo
          uz prethodnu pismenu saglasnost Najmodavca: zemlje Evropske
          unije, Crna Gora, Bosna i Hercegovina, Severna Makedonija.
          Prelazak granice i vo&#382;nja u druge zemlje je zabranjena.
          Pored navedenog Korisnik se tako&#273;e zabranjuje vo&#382;nja i
          prelazak administrativnih prelaza na teritoriju AP Kosova i
          Metohije;</span
      >
  </p>
  <p class="c6 c7"><span class="c1"></span></p>
  <p class="c0">
      <span class="c1"
          >Korisnik je du&#382;an da se upozna sa korisni&#269;kim
          uputstvom za svako vozilo, neposredno po preuzimanju istog.
          Tako&#273;e, va&#382;no je da se pridr&#382;ava svih preporuka i
          instrukcija u vezi sa pravilnim kori&scaron;&#263;enjem vozila
          kako bi se obezbedila njegova optimalna funkcionalnost i izbegle
          mogu&#263;e &scaron;tete.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >U slu&#269;aju gubitka fabri&#269;ke garancije vozila koje je
          nastalo kao posledica nepravilnog kori&scaron;&#263;enja vozila
          od strane Korisnika, odnosno kori&scaron;&#263;enja u
          suprotnosti sa pravilima i uslovima fabri&#269;ke garancije,
          Najmodavac ima pravo na naknadu punog iznosa &scaron;tete koju
          tom prilikom pretrpi a koja je nastala kao posledica gore
          opisanih radnji Korisnika.
      </span>
  </p>
  <p class="c16">
      <span
          >Najmodavac zadr&#382;ava pravo da u bilo kom trenutku, bez
          prethodne najave, raskine ugovor i zatra&#382;i povra&#263;aj
          iznajmljenog Vozila. zbog kr&scaron;enja bilo kojih odredbi
          op&scaron;tih uslova od strane korisnika.<br /></span
      ><span class="c11"
          >4.VOZA&#268;KI USLOVI ZA KORISNIKA I OGRANI&#268;ENJA
          NAJMA</span
      ><span class="c1"><br /></span>
  </p>
  <p class="c6">
      <span class="c1"
          >Minimalna godine starosti Korisnika-voza&#269;a za
          zaklju&#269;enje Ugovora o najmu je21 godina.
      </span>
  </p>
  <p class="c6 c7"><span class="c1"></span></p>
  <p class="c6">
      <span class="c1"
          >Korisnik mora da poseduje voza&#269;ku dozvolu koja mora biti
          va&#382;e&#263;a u minimalnom trajanju od pune 2 godine na dan
          zaklju&#269;enja Ugovora o najmu.</span
      >
  </p>
  <p class="c6 c7"><span class="c1"></span></p>
  <p class="c6">
      <span class="c1"
          >U slu&#269;aju ugovaranja prava za Dodatnog voza&#269;a
          iznajmljenog vozila isti mora biti upisan u ugovor i ispunjavati
          iste uslove kao i Korisnik.</span
      >
  </p>
  <p class="c6 c7"><span class="c1"></span></p>
  <p class="c16">
      <span><br /></span
      ><span class="c8"
          >5.KORI&Scaron;&#262;ENJE VOZILA VAN GRANICA REPUBLIKE
          SRBIJE</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          ><br />
          Vo&#382;nja vozila van teritorije Republike Srbije i prelazak
          granice dozvoljen je samo uz prethodnu pisanu saglasnost
          Najmodavca.</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          ><br />Korisnik je obavezan da snosi sve tro&scaron;kove vezane
          za dodatno osiguranje vozila i me&#273;unarodnu dokumentaciju
          koja je u tom slu&#269;aju potrebna. Specifikacija navedenih
          tro&scaron;kova navedena je u odgovaraju&#263;em delu
          cenovnika.</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          ><br />Kr&scaron;enje ovih odredbi, odnosno postupanje Korisnika
          mimo pisane saglasnosti Najmodavca, predstavlja grubo
          kr&scaron;enje odredbi O&scaron;tih uslova i Ugovora zbog kojeg
          Najmodavac ima pravo na raskid ugovora i naknadu eventualno
          pretrpljene &scaron;tete.</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          ><br />Ukoliko vozilo bude kori&scaron;&#263;eno van teritorije
          dozvoljenih zemalja, odnosno bude kori&scaron;&#263;eno za
          prelazak granice i vo&#382;nju u zemljama bez prethodne pisane
          saglasnosti Najmodavca, Korisnik snosi punu odgovornost za
          celokupan iznos &scaron;tete koju kao posledicu takvih
          postupanja pretrpi Najmodavac. Ukoliko izuzetno &scaron;tetu
          koja je nastala kao posledica nedozvoljenih postupanja Korisnika
          nadoknadi Najmodavac, on u tom slu&#269;aju sti&#269;e pravo
          regresa prema Korisniku koja pored iznosa &scaron;tete
          podrazumeva i pravo regresa na naknadu svih prate&#263;ih
          tro&scaron;kova koji u takvom slu&#269;aju nastanu a koji
          podrazumevaju ali se ne ograni&#269;avaju na eventualne sudske i
          advokatske tro&scaron;kove, tro&scaron;kove pla&#263;enih taksi
          i kazni, administrativni tro&scaron;kovi i tome
          sli&#269;no.</span
      >
  </p>
  <p class="c6 c7">
      <span class="c1"><br /></span>
  </p>
  <p class="c3"><span class="c11">6.DOKUMENTACIJA I ODGOVORNOST</span></p>
  <p class="c6">
      <span class="c1"
          ><br />Korisnik je u obavezi da za sve vreme trajanja Ugovora
          &#269;uva dobijenu dokumentaciju za vozilo i sve primerke
          klju&#269;eva od Vozila koje je zaprimio.</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          ><br />U slu&#269;aju gubitka saobra&#263;ajne dozvole,
          klju&#269;a, tablica, nalepnica, polisa osiguranja i tome
          sli&#269;no &ndash; Korisnik je u obavezi da plati iznos za
          preduzimanje radnji Najmodavca u cilju otklanjanja posledica
          prema va&#382;e&#263;em cenovniku. Va&#382;e&#263;i cenovnik u
          ovim slu&#269;ajevima u cenu uklju&#269;uje i manipulativne
          tro&scaron;kove koji tom prilikom nastaju (stvarni
          tro&scaron;kovi i tro&scaron;kovi anga&#382;ovanja zaposlenih
          Najmodavca na otklanjanju posledica gubitka).</span
      >
  </p>
  <p class="c6"><span class="c1">&nbsp;</span></p>
  <p class="c0">
      <span
          >Vozilo se obavezno fotografi&scaron;e od strane zaposlenih
          Najmodavca prilikom preuzimanja i vra&#263;anja istog od strane
          Korisnika, a koje fotografije &#263;e predstavljati sastavni deo
          dokumentacije za predmet i eventualno dokaz u slu&#269;aju
          re&scaron;avanja spornih pitanja.<br /><br /></span
      ><span class="c11">7. DEPOZIT I NAPLATA</span>
  </p>
  <p class="c0">
      <span class="c1"
          >Korisnik je u obavezi da polo&#382;i Depozit prilikom
          preuzimanja vozila.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >Najmodavac ima pravo da iznos Depozita koristi za pokri&#263;e
          slede&#263;ih slu&#269;ajeva: naknade &scaron;tete,
          tro&scaron;kove dolivanja goriva, tro&scaron;kove pranja,
          tro&scaron;kove pla&#263;anja kazni, tro&scaron;kove gubitka
          dokumentacije ili opreme.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >Najmodavac zadr&#382;ava pravo da zadr&#382;i deo ili ceo iznos
          depozita u roku od 30 dana od &nbsp;zavr&scaron;teka najma, u
          cilju dodatnih provera i pokri&#263;a eventualno nepla&#263;enih
          kazni Korisnika, radi pla&#263;anja tro&scaron;kova osiguranja
          i/ili drugih iznosa &scaron;teta koji su nastali usled radnji
          Korisnika a koje se mogu naknadno pojaviti za isplatu.
          Najmodavac zadr&#382;ava pravo regresa prema Korisniku i nakon
          isteka roka od 30dana i povra&#263;aja depozita ukoliko se
          pojavi potreba pla&#263;anja iznosa za Korisnika koji i
          ina&#269;e padaju na njegov teret.</span
      >
  </p>
  <p class="c0">
      <span><br /></span
      ><span class="c8">8. OSIGURANJE I NAKNADA &Scaron;TETE</span>
  </p>
  <p class="c6">
      <span class="c1"
          >Sva vozila Najmodavca su osigurana polisom obaveznog osiguranja
          od autoodgovornosti i kasko osiguranjem sa
          u&#269;e&scaron;&#263;em u &scaron;teti (fran&scaron;iza).</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          ><br />Osnovna polisa kasko osiguranja ne pokriva &scaron;tetu
          koja nastane na: gumama, felnama, staklu vozila, trapu vozila,
          podvozju, enterijeru, motoru, kva&#269;ilu i &scaron;tete koje
          nastanu usled nepa&#382;nje ili neadekvatnog
          kori&scaron;&#263;enja od strane Korisnika.</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          ><br />&Scaron;teta se procenjuje isklju&#269;ivo od strane
          ovla&scaron;&#263;enog procenitelja.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          ><br />Ukoliko se za nastalu &scaron;tetu ne sa&#269;ini
          policijski zapisnik i/ili se ne izvr&scaron;i prijava
          &scaron;tetnog doga&#273;aja iz razloga koji se mogu pripisati u
          krivicu Korisniku celokupan iznos &scaron;tete zajedno sa
          prate&#263;im tro&scaron;kovima, usled nemogu&#263;nosti naplate
          navedenih iznosa od osiguravaju&#263;ih ku&#263;a, padaju
          isklju&#269;ivo i u celosti na teret Korisnika.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >U slu&#269;aju saobra&#263;ajne nezgode u kojoj je
          u&#269;estvovao Korisnik koji NIJE kriv za saobra&#263;ajnu
          nezgodu isti NE&#262;E BITI U OBAVEZI da pla&#263;a iznos
          u&#269;e&scaron;&#263;a u &scaron;teti ukoliko Najmodavcu
          blagovremeno dostavi policijski zapisnik, podatke o drugim
          u&#269;esnicima saobra&#263;ajne nezgode i ukoliko je vozilo
          koristio u skladu sa Ugovorom i Op&scaron;tim uslovima.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >U slu&#269;aju saobra&#263;ajne nezgode u kojoj Korisnik JESTE
          kriv za saobra&#263;ajnu nezgodu isti se &nbsp;obavezuje da
          izvr&scaron;i uplatu nov&#269;anog iznos u&#269;e&scaron;&#263;a
          u &scaron;teti (fran&scaron;izu) u skladu sa va&#382;e&#263;om
          polisom kasko osiguranja.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >Minimalan iznos u&#269;e&scaron;&#263;a za &scaron;tetni
          doga&#273;aj iznosi 100 EUR + PDV, a maksimalan se odre&#273;uje
          prema osiguranoj vrednosti prema osigiranoj vrednosti iz polise
          osiguranja.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >Korisnik je obavezan da nadoknadi PUN iznos &scaron;tete,
          odnosno Najmodavac sti&#269;e pravo regresa prema Korisniku u
          slede&#263;im slu&#269;ajevima:</span
      >
  </p>
  <ol class="c10 lst-kix_list_15-0 start" start="1">
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Neprijavljivanje &scaron;tetnog
              doga&#273;aja/saobra&#263;ajne nezgode policiji i/ili
              Najmodavcu.</span
          >
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Nedostavljanje originalnih klju&#269;eva i prate&#263;e
              dokumentacije vozila u slu&#269;aju kra&#273;e iznajmljenog
              vozila,</span
          >
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Vo&#382;nje pod uticajem alkohola, i/ili psihoaktivnih
              supstanci i/ili bez va&#382;e&#263;e voza&#269;ke
              dozvole,</span
          >
      </li>
      <li class="c0 c9 c14 li-bullet-0">
          <span class="c1"
              >Kori&scaron;&#263;enje vozila u slu&#269;ajevima koji su
              zabranjeni ovim Op&scaron;tim uslovima (npr. trke, off-road,
              bez dozvole za izlazak iz zemlje).</span
          >
      </li>
  </ol>
  <p class="c3">
      <span><br /></span
      ><span class="c8"
          >9. POSTUPANJE U SLU&#268;AJU SAOBRA&#262;AJNE NEZGODE I
          KRA&#272;E</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >U slu&#269;aju nastanka saobra&#263;ajne nezgode u kojem
          u&#269;estvuje Korisnik i/ili bilo koje drugo
          ovla&scaron;&#263;eno ili neovla&scaron;&#263;eno lice &ndash;
          Korisnik je obavezan da odmah obavesti nadle&#382;nu slu&#382;bu
          policije i Najmodavca, kao i da dostavi uredno popunjen i overen
          policijski zapisnik.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >U slu&#269;aju kra&#273;e vozila &ndash; Korisnik je obavezan
          da odmah obavestiti nadle&#382;nu slu&#382;bu policije i
          Najmodavca kao i da Najmodavcu preda bez odlaganja originalne
          klju&#269;eve i prate&#263;u dokumentaciju za
          vozilo.Kr&scaron;enje ovih odredbi prestavljaju grube povrede
          Op&scaron;tih uslova zbog kojih Najmodavac ima pravo da od
          Korisnika potra&#382;uje celokupan iznos tako prouzrokovane
          &scaron;tete.
      </span>
  </p>
  <p class="c3">
      <span><br /></span
      ><span class="c8">10. OPREMA I UNUTRA&Scaron;NJOST</span>
  </p>
  <p class="c0">
      <span class="c1"
          >Sva dodatna oprema za iznajmljeno vozilo (GPS, sedi&scaron;ta,
          lanci i sl.) mora biti vra&#263;ena po prestanku ugovora
          neo&scaron;te&#263;ena zajedno sa vozilom.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >U slu&#269;aju gubitka ili o&scaron;te&#263;enja dodatne opreme
          koji se mogu pripisati u krivicu Korisniku ili su nastali na
          osnovu okolnosti koje padaju na teret Korisnika, Najmodavac ima
          pravo da naplati od Korisnika iznose istih prema
          va&#382;e&#263;em cenovniku.</span
      >
  </p>
  <p class="c0">
      <span
          >Zabranjeno je pu&scaron;enje u vozilu i kao i svako
          pona&scaron;anje prilikom kori&scaron;&#263;enja vozila koja
          mogu proizrokovati te&scaron;ka o&scaron;te&#263;enja enterijera
          (fleke, mirisi). U slu&#269;aju kr&scaron;enja ovih odredbi
          Najmodavac ima pravo da naplati Korisniku usluge dubinskog
          pranja vozila prema va&#382;e&#263;em cenovniku.<br /><br /></span
      ><span class="c11">11. KA&Scaron;NJENJE I POVRA&#262;AJ</span>
  </p>
  <p class="c0">
      <span class="c1"
          >Ka&scaron;njenje do 30 minuta: Najmodavac &#263;e tolerisati
          maksimalno ka&scaron;njenje sa povratom vozila pri prestanku
          Ugovora do najvi&scaron;e 30 minuta.
      </span>
  </p>
  <p class="c0">
      <span class="c1"
          >Ka&scaron;njenje preko 30 minuta: U slu&#269;aju
          ka&scaron;njenja sa povratom vozila po prestanku Ugovora od
          preko 30 minuta, smatra&#263;e se da je Korisnik produ&#382;io
          najam Vozila za jo&scaron; jedan dodatni dan najma pod istim
          uslovima kao &scaron;to je prethodno ugovoreno.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >Korisnik je obavezan da izvr&scaron;i povra&#263;aj Vozila na
          lokaciju sa koje je isto preuzeo ili drugu lokaciju ali samo uz
          obavezno postojanje prethodnog pisanog dogovora o promeni
          lokacije. Pisani dogovor u smislu odredbe ovog &#269;lana
          podrazumeva I razmenu poruka putem elektronskih sredstava
          komunikacije.</span
      >
  </p>
  <p class="c0 c2">
      <span class="c8"><br />12. OTKAZIVANJE REZERVACIJE</span>
  </p>
  <p class="c0 c2">
      <span class="c1"
          >Otkazivanje do 48h pre po&#269;etka najma&ndash; Korisnik
          mo&#382;e otkazati rezervaciju vozila najkasnije 48 sati pre
          po&#269;etka najma vozila bez nastanka dodatnih obaveza i/ili
          tro&scaron;kova.</span
      >
  </p>
  <p class="c0 c2">
      <span class="c1"
          >Otkazivanje manje od 48h &ndash; U slu&#269;aju da Korisnik
          otka&#382;e rezervaciju vozila u roku kra&#263;em od 48
          &#269;asova pre po&#269;etka najma u obavezi je da isplati
          Najmodavcu iznos od 30% od ukupnog iznosa najma.</span
      >
  </p>
  <p class="c0 c2">
      <span class="c1"
          >Otkazivanje manje od 24h &ndash; U slu&#269;aju da Korisnik
          otka&#382;e rezervaciju vozila u roku kra&#263;em od 24
          &#269;asa pre po&#269;etka najma u obavezi je da isplati
          Najmodavcu iznos od 50% od ukupnog iznosa najma.</span
      >
  </p>
  <p class="c0 c2">
      <span class="c1"
          >Nepojavljivanje &ndash; U slu&#269;aju da se Korisnik ne pojavi
          u dogovorenom terminu primopredaje vozila u obavezi je da
          isplati Najmodavcu naknadu u iznosu od 100% iznosanajma.</span
      >
  </p>
  <p class="c0">
      <span><br /><br /></span
      ><span class="c11"
          >13. ZA&Scaron;TITA PODATAKA O LI&#268;NOSTI</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >Li&#269;ni podaci Korisnika koriste se isklju&#269;ivo za
          obradu najma u skladu sa Zakonom o za&scaron;titi podataka o
          li&#269;nosti.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >Korisnik je potpisivanjem ugovora dao saglasnost i upoznao se
          da Obave&scaron;tenjem o obradi podataka o li&#269;nosti od
          strane Najmodavca (u svojstvu Rukovaoca) a tako&#273;e je sa
          istim saglasan. Korisnik je upoznat da Najmodavac obra&#273;uje
          sve podatke koje je upisao i predao Najmodavcu prilikom
          zaklju&#269;enja Ugovora, i to: mesto i datum zaklju&#269;enja
          ugovora, ime i prezime Korisnika, broj li&#269;ne karte, jmbg,
          broj saobra&#263;ajne i voza&#269;ke dozvole,
          prebivali&scaron;te, telefon, e-mail. Svrha obrade podataka
          jeste zaklju&#269;enje i izvr&scaron;enje ugovora o najmu i
          sprovo&#273;enje marketin&scaron;kih aktivnosti prodavca i
          &#269;uvaju se u periodu od tri godine od dana pristanka. Pravni
          osnov obrade jeste:</span
      >
  </p>
  <ul class="c10 lst-kix_list_12-0 start">
      <li class="c4 li-bullet-0">
          <span class="c1">Pristanak lica na koje se podaci odnose</span>
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Obrada je neophodna za izvr&scaron;enje ugovora
              zaklju&#269;enog sa licem na koji se podaci odnose</span
          >
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Izvr&scaron;avanje zakonom utvr&#273;enih obaveza.</span
          >
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Lice ima pravo pristupa, pravo na ispravku, dopunu,
              brisanje, ograni&#269;enje i prenosivost podataka, kao i
              pravo na prigovor i automatizovano dono&scaron;enje
              pojedina&#269;nih odluka. Lice ima pravo na opoziv pristanka
              u bilo koje vreme, pri &#269;emu opoziv pristanka ne
              uti&#269;e na dopu&scaron;tenost obrade pre opoziva. U
              slu&#269;aju opoziva pristanka, Rukovalac ne&#263;e
              obra&#273;ivati podatke Lica na koje se opoziv odnosi, osim
              ukoliko Rukovalac ima zakonsko ovla&scaron;&#263;enje za
              obradu. Navedene zahteve Lica dostavljaju e-mailom na e-
              mail adresu </span
          ><span class="c15"
              ><a class="c13" href="mailto:office@viastro.rs"
                  >office@viastro.rs</a
              ></span
          ><span class="c1">; </span>
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Rukovalac &#263;e na svaki zahtev odgovoriti u
              najkra&#263;em mogu&#263;em roku, a u svakom slu&#269;aju
              najkasnije u roku od 30 dana od prijema zahteva u skladu sa
              &#269;lanom 21. Zakona o za&scaron;titi podataka o
              li&#269;nosti. Lice mo&#382;e podneti pritu&#382;bu u vezi
              sa obradom svojih podataka o li&#269;nosti pred Poverenikom
              za informacije od javnog zna&#269;aja i za&scaron;titu
              podataka o li&#269;nosti.</span
          >
      </li>
  </ul>
  <p class="c0 c7 c9"><span class="c1"></span></p>
  <p class="c0">
      <span class="c8"
          >14. ZA&Scaron;TITA POTRO&Scaron;A&#268;A I REKLAMACIJE</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >Imaju&#263;i u vidu da Korisnik kao ugovorna mo&#382;e biti i
          fizi&#269;ko lice odredbe Ugovora o najmu i Op&scaron;tih uslova
          najma su tako definisane da se Korisnik na jasan i nedvosmislen
          na&#269;in prilikom zaklju&#269;enja Ugovora obave&scaron;tava
          o:</span
      >
  </p>
  <ul class="c10 lst-kix_list_14-0 start">
      <li class="c4 li-bullet-0">
          <span class="c1">Osnovnim obele&#382;jima usluge</span>
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Poslovnom imenu, mati&#269;nom broju, adresi sedi&scaron;ta
              i broju telefona</span
          >
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Prodajnoj ceni usluga ili na&#269;inu na koji &#263;e se
              prodajna cena usluga obra&#269;unati ukoliko se zbog prirode
              usluge prodajna cena ne mo&#382;e obra&#269;unati
              unapred</span
          >
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Na&#269;inu pla&#263;anja, na&#269;inu i roku isporuke ,
              na&#269;inu izvr&scaron;enja drugih ugovornih obaveza</span
          >
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Postojanju zakonske odgovornosti zbog nesaobraznosti usluge
              ugovoru</span
          >
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Na&#269;inu izjavljivanja reklamacije trgovcu, a
              naro&#269;ito o mestu prijema i na&#269;inu postupanja
              trgovca po njima, kao i uslovima koji se odnose na
              ostvarivanje prava potro&scaron;a&#269;a po osnovu
              saobraznosti</span
          >
      </li>
      <li class="c16 c14 c9 li-bullet-0">
          <span class="c1"
              >Mogu&#263;nosti vansudskog re&scaron;avanja sporova</span
          >
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1">Trajanju ugovora</span>
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1">Minimalnom trajanju ugovornih obaveza</span>
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Funkcionalnosti, uklju&#269;uju&#263;i i mere tehni&#269;ke
              za&scaron;tite digitalnog sadr&#382;aja</span
          >
      </li>
  </ul>
  <p class="c0 c7 c9"><span class="c1"></span></p>
  <p class="c0">
      <span class="c1"
          >Najmodavac obave&scaron;tava Korisnika da radi ostvarivanja
          svojih prava mo&#382;e izjaviti reklamaciju radi ostvarivanja
          svojih prava na e-mail adresu office@viastro.rs ili
          telefon+38169656555; Korisnik se detaljnije mo&#382;e
          informisati o proceduri na&#269;inu izjavljivanja reklamacije
          pristupom na link www.viastro.rs/reklamacije.</span
      >
  </p>
  <p class="c0 c7"><span class="c1"></span></p>
  <p class="c0 c7 c12">
      <span class="c1"><br /><br /><br /></span>
  </p>
  `;
