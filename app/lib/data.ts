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

export type LocaleTypes = "en" | "ru" | "sr";

export const postsSr = [
  {
    id: 1,
    title:
      "Novogodišnji i božićni odmor na planinama Srbije - Ski sezona sa Viastro rent a car",
    href: "/blog/novogodisnji-i-bozicni-odmor-na-planinama-srbije",
    slug: "novogodisnji-i-bozicni-odmor-na-planinama-srbije",
    description:
      "Želite praznični odmor na planini za Novu godinu ili Božić? Kopaonik, Zlatibor i Stara planina su u punoj ski sezoni, a uz Viastro rent a car stižete brže i sigurnije - sa opremom za sneg, punim kasko osiguranjem i 24/7 asistencijom.",
    content: `
      <h2>Novogodišnji i božićni odmor na planinama Srbije</h2>
      <p>Praznici su idealno vreme da se sklonite iz gužve i provedete nekoliko dana na snegu. Ski centri su u punom pogonu, hoteli i apartmani nude praznične pakete, a uz dobar automobil stižete bez stresa - čak i kada padne novi sneg.</p>

      <h3>Gde da idete za praznike?</h3>
      <ul>
        <li><strong>Kopaonik:</strong> Najveći broj staza, noćno skijanje i bogat apres-ski program.</li>
        <li><strong>Zlatibor:</strong> Porodična atmosfera, novo gondola iskustvo i obilje šetnji.</li>
        <li><strong>Stara planina:</strong> Šire staze, manje gužve i autentična priroda istočne Srbije.</li>
        <li><strong>Tara i Divčibare:</strong> Za mirniji odmor, šetnje i sanjkanje sa decom.</li>
      </ul>

      <h3>Šta čini razliku?</h3>
      <ul>
        <li><strong>Sigurnost na putu:</strong> Zimske gume, lanci i kasko osiguranje uključeni.</li>
        <li><strong>Fleksibilnost:</strong> Preuzimanje u Beogradu ili na aerodromu, povratak gde vama odgovara.</li>
        <li><strong>Prostor za opremu:</strong> SUV i karavani sa dovoljno mesta za ski opremu i kofere.</li>
      </ul>

      <h3>Brzi plan za praznične dane</h3>
      <ol>
        <li><strong>Dan 1:</strong> Preuzmite vozilo, krenite ranije da izbegnete gužve na magistralama.</li>
        <li><strong>Dan 2-3:</strong> Ski dan + wellness/SPA uveče, lokalna kuhinja i praznična atmosfera.</li>
        <li><strong>Dan 4:</strong> Kratka šetnja ili sankanje, povratak popodne.</li>
      </ol>

      <p><strong>Rezervišite na vreme:</strong> Praznici brzo pune kapacitete, zato obezbedite vozilo ranije. Kontakt: <a href="https://www.viastro.rs" target="_blank">www.viastro.rs</a> ili <a href="tel:0696565555">069/6565-555</a>.</p>
    `,
    imageUrl: "/mount.webp",
    date: "Decembar 15, 2025",
    datetime: "2025-12-15",
    tags: [
      "Nova godina planine",
      "Božić putovanje",
      "Ski sezona Srbija",
      "Kopaonik",
      "Zlatibor",
      "Stara planina",
      "Rent a car Beograd",
      "Zimske gume",
    ],
  },
  {
    id: 2,
    slug: "vikend-na-kopaoniku-planinska-avantura-uz-viastro-rent-a-car",
    title: "Vikend na Kopaoniku - Planinska avantura uz Viastro rent a car",
    href: "/blog/vikend-na-kopaoniku-planinska-avantura-uz-viastro-rent-a-car",
    description:
      "Otkrijte čari najpoznatijeg srpskog planinskog centra. Ako tražite beg od gradske gužve i svakodnevnog tempa, Kopaonik je savršena vikend destinacija - tokom cele godine. Od zimskih sportova do letnjih šetnji kroz borove šume, ovaj planinski biser nudi iskustva koja oduševljavaju i domaće i strane goste. A uz Viastro rent a car, vaše putovanje počinje bez stresa - udobno, sigurno i uz potpunu slobodu kretanja.",
    content: `
      <h2>Vikend na Kopaoniku - Planinska avantura uz Viastro rent a car</h2>
      <p>Ako tražite beg od gradske gužve i svakodnevnog tempa, Kopaonik je savršena vikend destinacija - bilo da idete na skijanje, planinarenje ili samo uživanje u prirodi i SPA centrima. A da bi put bio podjednako prijatan kao i boravak, pravo rešenje je iznajmljivanje vozila koje odgovara vašim potrebama. Viastro rent a car vam nudi vozila koja su idealna za put do planine - udobna, pouzdana i sa punim kasko osiguranjem.</p>

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
          Od hotela sa 5 zvezdica do pristupačnih apartmana - Kopaonik ima opcije za svaki budžet.
        </li>
      </ol>

      <h3>Zašto iznajmiti vozilo kod Viastro?</h3>
      <ul>
        <li><strong>Komfor i sigurnost:</strong> Svi naši automobili su redovno servisirani, klimatizovani i potpuno opremljeni za duža putovanja.</li>
        <li><strong>Fleksibilni paketi:</strong> Najam već od 3 dana sa neograničenim kilometrima - savršeno za vikend planine.</li>
        <li><strong>Puna pokrivenost:</strong> Full kasko osiguranje, 24h asistencija, i mogućnost dodatne opreme (nosač za ski, lanaca, dečje sedište).</li>
        <li><strong>Brza i jednostavna rezervacija:</strong> Kontaktirajte nas putem sajta <a href="https://www.viastro.rs" target="_blank">www.viastro.rs</a> ili direktno na broj <a href="tel:0696565555">069/6565-555</a>.</li>
      </ul>

      <h3>Plan puta - predlog:</h3>
      <ul>
        <li><strong>Petak (polazak):</strong> Preuzmite vozilo i uputite se ka Kopaoniku. Preporučena ruta: Beograd - Kruševac - Brus - Kopaonik.</li>
        <li><strong>Subota:</strong> Uživajte u sportskim aktivnostima, prirodi i domaćoj kuhinji.</li>
        <li><strong>Nedelja:</strong> Opuštanje u SPA centru i povratak uveče.</li>
      </ul>

      <p><strong>Viastro - Your Journey Starts Here.</strong><br>
      Za sve vas koji želite slobodu da istražujete Srbiju sopstvenim tempom, Viastro rent a car nudi pouzdana vozila i maksimalnu fleksibilnost.</p>
    `,
    imageUrl: "/kop.webp",
    date: "Maj 5, 2025",
    datetime: "2020-03-16",
    tags: [
      "Kopaonik",
      "Rent a car Beograd",
      "Iznajmljivanje automobila",
      "Skijanje Srbija",
      "Planinska turistika",
      "Vikend izleti",
      "Car rental Beograd",
      "Auto najam",
    ],
  },
  {
    id: 3,
    title: "Đerdap Nacionalni Park - Gvozdena kapija prirode i istorije",
    href: "/blog/djerdap-nacionalni-park-gvozdena-kapija-prirode-i-istorije",
    slug: "djerdap-nacionalni-park-gvozdena-kapija-prirode-i-istorije",
    description:
      "Ako tražite vikend avanturu koja spaja prirodne lepote, arheološka čuda i panoramske vožnje, Đerdap Nacionalni Park je pravi izbor. Smešten duž desne obale Dunava, od Golubačke tvrđave do Donjeg Milanovca, ovaj park nudi spektakularne pejzaže, uključujući najdublji deo reke (82 m) i najuzaniji prolaz (150 m) u Evropi.",
    content: `
      <h2>Đerdap Nacionalni Park - Gvozdena kapija prirode i istorije</h2>
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
    imageUrl: "/sargan.webp",
    date: "3 Maj, 2025",
    datetime: "2020-03-16",
    tags: [
      "Đerdap",
      "Rent a car Beograd",
      "Nacionalni park Srbija",
      "Putovanja Srbijom",
      "Iznajmljivanje automobila",
      "Turističke destinacije",
      "Dunav",
      "Car rental",
    ],
  },
  {
    id: 4,
    title: "Mokra Gora i Šarganska osmica - Putovanje kroz vreme i prirodu",
    href: "/blog/mokra-gora-i-sarganska-osmica-putovanje-kroz-vreme-i-prirodu",
    slug: "mokra-gora-i-sarganska-osmica-putovanje-kroz-vreme-i-prirodu",
    content: `
      <h2>Mokra Gora i Šarganska osmica - Putovanje kroz vreme i prirodu</h2>
      <p>Mokra Gora je destinacija koja spaja prirodne lepote, kulturnu baštinu i jedinstvene turističke atrakcije. Vožnja Šarganskom osmicom, uskom prugom koja vijuga kroz planinske predele, pruža nezaboravan doživljaj.</p>

      <h3>Šta ne propustiti:</h3>
      <ul>
        <li><strong>Šarganska osmica:</strong> Vožnja istorijskom prugom koja pravi oblik broja osam.</li>
        <li><strong>Drvengrad:</strong> Etno-selo koje je izgradio Emir Kusturica.</li>
        <li><strong>Priroda Mokre Gore:</strong> Idealna za planinarenje i uživanje u netaknutoj prirodi.</li>
      </ul>

      <h3>Kako doći:</h3>
      <p>Mokra Gora se nalazi oko 200 km jugozapadno od Beograda. Putovanje traje oko 3,5 sata, a preporučena ruta vodi preko Užica.</p>

      <h3>Viastro rent a car - Vaš partner za putovanja:</h3>
      <p>Naša vozila su savršena za planinske puteve i duže vožnje. Uz <strong>automatski menjač</strong>, <strong>klimatizaciju</strong> i <strong>dodatnu opremu</strong>, vaše putovanje će biti udobno i sigurno.</p>
    `,
    description:
      "Mokra Gora je destinacija koja spaja prirodne lepote, kulturnu baštinu i jedinstvene turističke atrakcije. Vožnja Šarganskom osmicom, uskom prugom koja vijuga kroz planinske predele, pruža nezaboravan doživljaj.",
    imageUrl: "/djerdap.webp",
    date: "1 Maj, 2025",
    datetime: "2020-03-16",
    tags: [
      "Mokra Gora",
      "Rent a car Beograd",
      "Šarganska osmica",
      "Zlatibor",
      "Iznajmljivanje automobila",
      "Kultura Srbije",
      "Turizam",
      "Auto najam",
    ],
  },
];

export const postsEn = [
  {
    id: 1,
    title:
      "New Year & Christmas on Serbia’s Mountains - Ski Season with Viastro",
    href: "/blog/novogodisnji-i-bozicni-odmor-na-planinama-srbije",
    slug: "novogodisnji-i-bozicni-odmor-na-planinama-srbije",
    description:
      "Planning a cozy mountain holiday for New Year’s or Christmas? Kopaonik, Zlatibor, and Stara Planina are in full ski season. With Viastro rent a car you arrive faster and safer - winter tires, snow chains, full casco, and 24/7 assistance included.",
    content: `
      <h2>New Year & Christmas on Serbia’s Mountains</h2>
      <p>The holidays are perfect for a snowy getaway. Ski resorts are running at full speed, hotels and apartments offer festive packages, and with the right car you arrive stress-free — even after fresh snowfall.</p>

      <h3>Where to go for the holidays?</h3>
      <ul>
        <li><strong>Kopaonik:</strong> Most slopes, night skiing, and lively après-ski.</li>
        <li><strong>Zlatibor:</strong> Family-friendly vibe, the new gondola ride, plenty of walks.</li>
        <li><strong>Stara Planina:</strong> Wide slopes, fewer crowds, authentic eastern Serbia nature.</li>
        <li><strong>Tara & Divčibare:</strong> Calmer stay, forest walks, sledding with kids.</li>
      </ul>

      <h3>What makes the trip smooth?</h3>
      <ul>
        <li><strong>Road safety:</strong> Winter tires, chains, and full insurance included.</li>
        <li><strong>Flexibility:</strong> Pick up in Belgrade or at the airport, return where it suits you.</li>
        <li><strong>Room for gear:</strong> SUVs and wagons with space for skis and luggage.</li>
      </ul>

      <h3>Quick holiday plan</h3>
      <ol>
        <li><strong>Day 1:</strong> Pick up the car, leave early to avoid traffic on main roads.</li>
        <li><strong>Day 2-3:</strong> Ski day + wellness/SPA in the evening, local food and festive mood.</li>
        <li><strong>Day 4:</strong> Short walk or sledding, return in the afternoon.</li>
      </ol>

      <p><strong>Book early:</strong> Holiday dates fill fast — secure your vehicle now. Contact: <a href="https://www.viastro.rs" target="_blank">www.viastro.rs</a> or <a href="tel:0696565555">069/6565-555</a>.</p>
    `,
    imageUrl: "/mount.webp",
    date: "December 15, 2025",
    datetime: "2025-12-15",
    tags: [
      "New Year travel",
      "Christmas getaway",
      "Serbia ski season",
      "Kopaonik",
      "Zlatibor",
      "Stara Planina",
      "Car rental Belgrade",
      "Winter tires",
    ],
  },
  {
    id: 2,
    slug: "vikend-na-kopaoniku-planinska-avantura-uz-viastro-rent-a-car",
    title: "Weekend on Kopaonik - Mountain Adventure with Viastro Rent a Car",
    href: "/blog/vikend-na-kopaoniku-planinska-avantura-uz-viastro-rent-a-car",
    description:
      "Discover the charms of Serbia's most famous mountain center. If you're looking for an escape from the city crowds and daily pace, Kopaonik is the perfect weekend destination - all year round. From winter sports to summer walks through pine forests, this mountain gem offers experiences that delight both local and foreign guests. And with Viastro rent a car, your journey starts stress-free - comfortably, safely, and with complete freedom of movement.",
    content: `
      <h2>Weekend on Kopaonik - Mountain Adventure with Viastro Rent a Car</h2>
      <p>If you're looking for an escape from the city crowds and daily pace, Kopaonik is the perfect weekend destination - whether you're going skiing, hiking, or just enjoying nature and SPA centers. And to make the journey as pleasant as the stay, the right solution is to rent a vehicle that suits your needs. Viastro rent a car offers vehicles ideal for the trip to the mountains - comfortable, reliable, and with full casco insurance.</p>

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
          From 5-star hotels to affordable apartments - Kopaonik has options for every budget.
        </li>
      </ol>

      <h3>Why rent a vehicle from Viastro?</h3>
      <ul>
        <li><strong>Comfort and safety:</strong> All our cars are regularly serviced, air-conditioned, and fully equipped for longer trips.</li>
        <li><strong>Flexible packages:</strong> Rentals from 3 days with unlimited mileage - perfect for a mountain weekend.</li>
        <li><strong>Full coverage:</strong> Full casco insurance, 24h assistance, and the option of additional equipment (ski rack, chains, child seat).</li>
        <li><strong>Quick and easy booking:</strong> Contact us via the website <a href="https://www.viastro.rs" target="_blank">www.viastro.rs</a> or directly at <a href="tel:0696565555">069/6565-555</a>.</li>
      </ul>

      <h3>Itinerary - suggestion:</h3>
      <ul>
        <li><strong>Friday (departure):</strong> Pick up your vehicle and head to Kopaonik. Recommended route: Belgrade - Kruševac - Brus - Kopaonik.</li>
        <li><strong>Saturday:</strong> Enjoy sports activities, nature, and local cuisine.</li>
        <li><strong>Sunday:</strong> Relax at a SPA center and return in the evening.</li>
      </ul>

      <p><strong>Viastro - Your Journey Starts Here.</strong><br>
      For all of you who want the freedom to explore Serbia at your own pace, Viastro rent a car offers reliable vehicles and maximum flexibility.</p>
    `,
    imageUrl: "/kop.webp",
    date: "May 5, 2025",
    datetime: "2020-03-16",
    tags: [
      "Kopaonik",
      "Car rental Belgrade",
      "Rent a car Serbia",
      "Skiing Serbia",
      "Mountain tourism",
      "Weekend trips",
      "Belgrade car hire",
      "Vehicle rental",
    ],
  },
  {
    id: 3,
    title: "Đerdap National Park - The Iron Gates of Nature and History",
    href: "/blog/djerdap-nacionalni-park-gvozdena-kapija-prirode-i-istorije",
    slug: "djerdap-nacionalni-park-gvozdena-kapija-prirode-i-istorije",
    description:
      "If you're looking for a weekend adventure that combines natural beauty, archaeological wonders, and scenic drives, Đerdap National Park is the right choice. Located along the right bank of the Danube, from Golubac Fortress to Donji Milanovac, this park offers spectacular landscapes, including the deepest part of the river (82 m) and the narrowest passage (150 m) in Europe.",
    content: `
      <h2>Đerdap National Park - The Iron Gates of Nature and History</h2>
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
    imageUrl: "/sargan.webp",
    date: "May 3, 2025",
    datetime: "2020-03-16",
    tags: [
      "Đerdap",
      "Car rental Belgrade",
      "National Park Serbia",
      "Serbia travel",
      "Belgrade car hire",
      "Tourist destinations",
      "Danube",
      "Vehicle rental",
    ],
  },
  {
    id: 4,
    title: "Mokra Gora and Šargan Eight - A Journey Through Time and Nature",
    href: "/blog/mokra-gora-i-sarganska-osmica-putovanje-kroz-vreme-i-prirodu",
    slug: "mokra-gora-i-sarganska-osmica-putovanje-kroz-vreme-i-prirodu",
    content: `
      <h2>Mokra Gora and Šargan Eight - A Journey Through Time and Nature</h2>
      <p>Mokra Gora is a destination that combines natural beauty, cultural heritage, and unique tourist attractions. The ride on the Šargan Eight, a narrow-gauge railway that winds through mountainous landscapes, offers an unforgettable experience.</p>

      <h3>What not to miss:</h3>
      <ul>
        <li><strong>Šargan Eight:</strong> A ride on the historic railway that forms a figure-eight.</li>
        <li><strong>Drvengrad (Timber Town):</strong> An ethno-village built by Emir Kusturica.</li>
        <li><strong>Nature of Mokra Gora:</strong> Ideal for hiking and enjoying untouched nature.</li>
      </ul>

      <h3>How to get there:</h3>
      <p>Mokra Gora is located about 200 km southwest of Belgrade. The journey takes about 3.5 hours, and the recommended route is via Užice.</p>

      <h3>Viastro rent a car - Your travel partner:</h3>
      <p>Our vehicles are perfect for mountain roads and longer drives. With an <strong>automatic transmission</strong>, <strong>air conditioning</strong>, and <strong>additional equipment</strong>, your journey will be comfortable and safe.</p>
    `,
    description:
      "Mokra Gora is a destination that combines natural beauty, cultural heritage, and unique tourist attractions. The ride on the Šargan Eight, a narrow-gauge railway that winds through mountainous landscapes, offers an unforgettable experience.",
    imageUrl: "/djerdap.webp",
    date: "May 1, 2025",
    datetime: "2020-03-16",
    tags: [
      "Mokra Gora",
      "Car rental Belgrade",
      "Šargan Eight",
      "Zlatibor",
      "Belgrade car hire",
      "Serbia culture",
      "Tourism",
      "Vehicle rental",
    ],
  },
];

export const postsRu = [
  {
    id: 1,
    title: "Новый год и Рождество в горах Сербии - Лыжный сезон с Viastro",
    href: "/blog/novogodisnji-i-bozicni-odmor-na-planinama-srbije",
    slug: "novogodisnji-i-bozicni-odmor-na-planinama-srbije",
    description:
      "Хотите провести новогодние и рождественские праздники в горах? Копаоник, Златибор и Стара-Планина уже в разгаре сезона. С Viastro rent a car вы доберетесь быстрее и безопаснее - зимняя резина, цепи, полное КАСКО и помощь 24/7.",
    content: `
      <h2>Новый год и Рождество в горах Сербии</h2>
      <p>Праздники — идеальное время уехать из города и провести несколько дней на снегу. Курорты работают на полную, отели и апартаменты предлагают праздничные пакеты, а с правильным автомобилем вы доберетесь без стресса — даже после свежего снегопада.</p>

      <h3>Куда поехать на праздники?</h3>
      <ul>
        <li><strong>Копаоник:</strong> Больше всего трасс, ночное катание, оживленный apres-ski.</li>
        <li><strong>Златибор:</strong> Семейная атмосфера, новая гондола, много прогулок.</li>
        <li><strong>Стара-Планина:</strong> Широкие склоны, меньше людей, аутентичная природа восточной Сербии.</li>
        <li><strong>Тара и Дивчибаре:</strong> Спокойный отдых, лесные прогулки, санки с детьми.</li>
      </ul>

      <h3>Что важно в дороге?</h3>
      <ul>
        <li><strong>Безопасность:</strong> Зимняя резина, цепи и полное страхование включены.</li>
        <li><strong>Гибкость:</strong> Выдача в Белграде или в аэропорту, возврат там, где удобно.</li>
        <li><strong>Место для снаряжения:</strong> SUV и универсалы с багажником для лыж и чемоданов.</li>
      </ul>

      <h3>Быстрый план на праздники</h3>
      <ol>
        <li><strong>День 1:</strong> Заберите авто, выезжайте раньше, чтобы обойти трафик.</li>
        <li><strong>Дни 2-3:</strong> Катание + вечерний SPA, местная кухня и праздничное настроение.</li>
        <li><strong>День 4:</strong> Прогулка или санки, выезд домой после обеда.</li>
      </ol>

      <p><strong>Бронируйте заранее:</strong> Праздничные даты быстро заполняются — закрепите автомобиль сейчас. Контакт: <a href="https://www.viastro.rs" target="_blank">www.viastro.rs</a> или <a href="tel:0696565555">069/6565-555</a>.</p>
    `,
    imageUrl: "/mount.webp",
    date: "15 декабря 2025",
    datetime: "2025-12-15",
    tags: [
      "Новый год Сербия",
      "Рождество поездка",
      "Лыжный сезон",
      "Копаоник",
      "Златибор",
      "Стара-Планина",
      "Аренда авто Белград",
      "Зимняя резина",
    ],
  },
  {
    id: 2,
    slug: "vikend-na-kopaoniku-planinska-avantura-uz-viastro-rent-a-car",
    title: "Выходные на Копаонике - Горное приключение с Viastro rent a car",
    href: "/blog/vikend-na-kopaoniku-planinska-avantura-uz-viastro-rent-a-car",
    description:
      "Откройте для себя очарование самого известного горного центра Сербии. Если вы ищете способ убежать от городской суеты и повседневного темпа, Копаоник - идеальное место для выходных - круглый год. От зимних видов спорта до летних прогулок по сосновым лесам, эта горная жемчужина предлагает впечатления, которые восхищают как местных, так и иностранных гостей. А с Viastro rent a car ваше путешествие начнется без стресса - комфортно, безопасно и с полной свободой передвижения.",
    content: `
      <h2>Выходные на Копаонике - Горное приключение с Viastro rent a car</h2>
      <p>Если вы ищете способ убежать от городской суеты и повседневного темпа, Копаоник - идеальное место для выходных - собираетесь ли вы кататься на лыжах, ходить в походы или просто наслаждаться природой и СПА-центрами. А чтобы поездка была такой же приятной, как и пребывание, правильное решение - арендовать автомобиль, соответствующий вашим потребностям. Viastro rent a car предлагает автомобили, идеально подходящие для поездки в горы - удобные, надежные и с полной страховкой КАСКО.</p>

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
          От 5-звездочных отелей до доступных апартаментов - на Копаонике есть варианты на любой бюджет.
        </li>
      </ol>

      <h3>Почему арендовать автомобиль у Viastro?</h3>
      <ul>
        <li><strong>Комфорт и безопасность:</strong> Все наши автомобили регулярно обслуживаются, оснащены кондиционерами и полностью оборудованы для длительных поездок.</li>
        <li><strong>Гибкие пакеты:</strong> Аренда от 3 дней с неограниченным пробегом - идеально для выходных в горах.</li>
        <li><strong>Полное покрытие:</strong> Полная страховка КАСКО, круглосуточная помощь на дороге и возможность дополнительного оборудования (багажник для лыж, цепи, детское кресло).</li>
        <li><strong>Быстрое и простое бронирование:</strong> Свяжитесь с нами через сайт <a href="https://www.viastro.rs" target="_blank">www.viastro.rs</a> или напрямую по номеру <a href="tel:0696565555">069/6565-555</a>.</li>
      </ul>

      <h3>План поездки - предложение:</h3>
      <ul>
        <li><strong>Пятница (отправление):</strong> Заберите автомобиль и отправляйтесь на Копаоник. Рекомендуемый маршрут: Белград - Крушевац - Брус - Копаоник.</li>
        <li><strong>Суббота:</strong> Наслаждайтесь спортивными мероприятиями, природой и местной кухней.</li>
        <li><strong>Воскресенье:</strong> Отдых в СПА-центре и возвращение вечером.</li>
      </ul>

      <p><strong>Viastro - Ваше путешествие начинается здесь.</strong><br>
      Для всех вас, кто хочет свободы исследовать Сербию в собственном темпе, Viastro rent a car предлагает надежные автомобили и максимальную гибкость.</p>
    `,
    imageUrl: "/kop.webp",
    date: "5 мая 2025",
    datetime: "2020-03-16",
    tags: [
      "Копаоник",
      "Аренда авто Белград",
      "Аренда автомобиля",
      "Лыжи Сербия",
      "Горный туризм",
      "Выходные поездки",
      "Прокат авто Белград",
      "Автопрокат",
    ],
  },
  {
    id: 3,
    title: "Национальный парк Джердап - Железные ворота природы и истории",
    href: "/blog/djerdap-nacionalni-park-gvozdena-kapija-prirode-i-istorije",
    slug: "djerdap-nacionalni-park-gvozdena-kapija-prirode-i-istorije",
    description:
      "Если вы ищете приключение на выходные, сочетающее природные красоты, археологические чудеса и панорамные поездки, Национальный парк Джердап - это правильный выбор. Расположенный вдоль правого берега Дуная, от Голубацкой крепости до Дони-Милановца, этот парк предлагает захватывающие пейзажи, включая самую глубокую часть реки (82 м) и самый узкий проход (150 м) в Европе.",
    content: `
      <h2>Национальный парк Джердап - Железные ворота природы и истории</h2>
      <p>Если вы ищете приключение на выходные, сочетающее природные красоты, археологические чудеса и панорамные поездки, Национальный парк Джердап - это правильный выбор. Расположенный вдоль правого берега Дуная, от Голубацкой крепости до Дони-Милановца, этот парк предлагает захватывающие пейзажи, включая самую глубокую часть реки (82 м) и самый узкий проход (150 м) в Европе.</p>

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
    imageUrl: "/sargan.webp",
    date: "3 мая 2025",
    datetime: "2020-03-16",
    tags: [
      "Джердап",
      "Аренда авто Белград",
      "Национальный парк Сербия",
      "Путешествия по Сербии",
      "Прокат автомобиля",
      "Туристические направления",
      "Дунай",
      "Автопрокат",
    ],
  },
  {
    id: 4,
    title:
      "Мокра Гора и Шарганская восьмерка - Путешествие сквозь время и природу",
    href: "/blog/mokra-gora-i-sarganska-osmica-putovanje-kroz-vreme-i-prirodu",
    slug: "mokra-gora-i-sarganska-osmica-putovanje-kroz-vreme-i-prirodu",
    content: `
      <h2>Мокра Гора и Шарганская восьмерка - Путешествие сквозь время и природу</h2>
      <p>Мокра Гора - это место, которое сочетает в себе природные красоты, культурное наследие и уникальные туристические достопримечательности. Поездка по Шарганской восьмерке, узкоколейной железной дороге, извивающейся по горным ландшафтам, дарит незабываемые впечатления.</p>

      <h3>Что не пропустить:</h3>
      <ul>
        <li><strong>Шарганская восьмерка:</strong> Поездка по исторической железной дороге, образующей форму восьмерки.</li>
        <li><strong>Дрвенград:</strong> Этно-деревня, построенная Эмиром Кустурицей.</li>
        <li><strong>Природа Мокра Горы:</strong> Идеально подходит для пеших прогулок и наслаждения нетронутой природой.</li>
      </ul>

      <h3>Как добраться:</h3>
      <p>Мокра Гора находится примерно в 200 км к юго-западу от Белграда. Поездка занимает около 3,5 часов, рекомендуемый маршрут - через Ужице.</p>

      <h3>Viastro rent a car - Ваш партнер в путешествиях:</h3>
      <p>Наши автомобили идеально подходят для горных дорог и длительных поездок. С <strong>автоматической коробкой передач</strong>, <strong>кондиционером</strong> и <strong>дополнительным оборудованием</strong> ваше путешествие будет комфортным и безопасным.</p>
    `,
    description:
      "Мокра Гора - это место, которое сочетает в себе природные красоты, культурное наследие и уникальные туристические достопримечательности. Поездка по Шарганской восьмерке, узкоколейной железной дороге, извивающейся по горным ландшафтам, дарит незабываемые впечатления.",
    imageUrl: "/djerdap.webp",
    date: "1 мая 2025",
    datetime: "2020-03-16",
    tags: [
      "Мокра Гора",
      "Шарганская восьмерка",
      "Культура",
      "Туризм",
      "Златибор",
    ],
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

export function getAditionalEquipment(langCode: LocaleTypes) {
  return aditionalEquipment.map((ad) => {
    return {
      ...ad,
      name: ad.nameMap[langCode],
      description: ad.descriptionMap[langCode],
    };
  });
}

export const aditionalEquipment = [
  {
    id: 2,
    nameMap: {
      en: "Cross Border Permission",
      sr: "Dozvola za prelazak granice",
      ru: "Разрешение на пересечение границы",
    },
    descriptionMap: {
      en: "If you plan to travel with the rented vehicle outside the territory of the Republic of Serbia, you must obtain a Cross Border Permission. This permission enables the legal use of the vehicle abroad and is valid for one international destination or multiple countries specified at the time of issuance, with the exception of AP Kosovo and Metohija.",
      sr: "Ukoliko planirate da putujete sa iznajmljenim vozilom van teritorije Republike Srbije, potrebno je obezbediti dozvolu za prelazak granice. Ova dozvola omogućava legalno korišćenje vozila u inostranstvu i važi za jednu međunarodnu destinaciju ili više zemalja navedenih prilikom izdavanja, sa izuzetkom AP Kosovo i Metohija.",
      ru: "Если вы планируете поездку на арендованном автомобиле за пределы территории Республики Сербия, необходимо получить **Разрешение на пересечение границы**. Это разрешение дает право легального использования транспортного средства за границей и действительно для одного международного направления или нескольких стран, указанных при выдаче, за исключением АР Косово и Метохия.",
    },
    name: "Dozvola za prelazak granice",
    icon: "public/icons/extras/borderpass.svg",
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
    nameMap: {
      en: "Green Card",
      sr: "Zeleni karton",
      ru: "Зеленая карта",
    },
    descriptionMap: {
      en: "The Green Card (International Motor Insurance Card) is mandatory for crossing the borders of the following countries: North Macedonia, Albania, Ukraine, Turkey, Russia, Belarus, Moldova, Israel, Iran, Morocco, Tunisia, and Azerbaijan. The Green Card is issued together with the Cross Border Permission.",
      sr: "Zeleni karton (Međunarodna karta osiguranja vozila) je obavezan za prelazak granica sledećih zemalja: Severna Makedonija, Albanija, Ukrajina, Turska, Rusija, Belorusija, Moldavija, Izrael, Iran, Maroko, Tunis i Azerbejdžan. Zeleni karton se izdaje zajedno sa dozvolom za prelazak granice",
      ru: "Зеленая карта (Международная карта страхования транспортного средства) обязательна для пересечения границ следующих стран: Северная Македония, Албания, Украина, Турция, Россия, Беларусь, Молдова, Израиль, Иран, Марокко, Тунис и Азербайджан. Зеленая карта выдается вместе с Разрешением на пересечение границы.",
    },
    name: "Zeleni karton",
    icon: "public/icons/extras/borderpass-green.svg",
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
    nameMap: {
      en: "Additional Driver",
      sr: "Dodatni vozač",
      ru: "Дополнительный водитель",
    },
    descriptionMap: {
      en: "If you wish for more than one person to operate the vehicle during the rental, it is possible to add an **additional driver**. The additional driver must meet the same requirements as the main driver: they must possess a valid driver’s license and be at least 21 years old (or older, depending on the vehicle class).",
      sr: "Ukoliko želite da vozilo koristi više od jedne osobe tokom najma, moguće je dodati **dodatnog vozača**. Dodatni vozač mora ispunjavati iste uslove kao i glavni vozač - da poseduje važeću vozačku dozvolu, kao i minimalno 21 godinu starosti (ili više, u zavisnosti od klase vozila).",
      ru: "Если вы хотите, чтобы автомобилем во время аренды управляло более одного человека, можно добавить **дополнительного водителя**. Дополнительный водитель должен соответствовать тем же требованиям, что и основной водитель: иметь действующее водительское удостоверение и быть не моложе 21 года (или старше, в зависимости от класса автомобиля).",
    },
    name: "Dodatni vozac",
    icon: "public/icons/extras/wificar.svg",
    description:
      "Ukoliko želite da vozilo koristi više od jedne osobe tokom najma, moguće je dodati dodatnog vozača. Dodatni vozač mora ispunjavati iste uslove kao i glavni vozač - da poseduje važeću vozačku dozvolu, kao i minimalno 21 godinu starosti (ili više, u zavisnosti od klase vozila). ",
    price: 0,
    free: true,
    perDay: false,
    maxPerDays: null,
    depositeDiscount: 0,
  },
  {
    id: 6,
    nameMap: {
      en: "Car Seat (0-36 kg)",
      sr: "Auto sedište (0-36 kg)",
      ru: "Автокресло (0-36 кг)",
    },
    descriptionMap: {
      en: "A universal car seat that covers all ages-from newborns up to children around 12 years old. It is adjustable in height and recline, allowing for a safe and comfortable ride throughout all phases of the child’s development. The seat can be installed rear-facing for the smallest babies and forward-facing for older children.",
      sr: "Univerzalno auto sedište koje pokriva sve uzraste - od novorođenčadi do dece od oko 12 godina. Podesivo po visini i nagibu, omogućava bezbednu i udobnu vožnju u svim fazama detetovog razvoja. Sedište se može postavljati u pravcu suprotnom od vožnje za najmanje bebe i u pravcu vožnje za stariju decu.",
      ru: "Универсальное автокресло, подходящее для всех возрастов - от новорожденных до детей примерно 12 лет. Регулируется по высоте и наклону, что обеспечивает безопасную и комфортную поездку на всех этапах развития ребенка. Кресло может устанавливаться против хода движения для самых маленьких детей и по ходу движения для детей постарше.",
    },
    name: "Auto sedište (0-36 kg)",
    icon: "public/icons/extras/childseats.svg",
    description:
      "Univerzalno auto sedište koje pokriva sve uzraste - od novorođenčadi do dece od oko 12 godina. Podesivo po visini i nagibu, omogućava bezbednu i udobnu vožnju u svim fazama detetovog razvoja.Sedište se može postavljati u pravcu suprotnom od vožnje za najmanje bebe i u pravcu vožnje za stariju decu.",
    price: 0,
    free: true,
    perDay: false,
    maxPerDays: null,
    depositeDiscount: 0,
  },
  {
    id: 7,
    nameMap: {
      en: "Booster Seat",
      sr: "Buster sedište (Booster)",
      ru: "Бустер (Booster)",
    },
    descriptionMap: {
      en: "Intended for children older than 7 years and weighing over 15 kilograms. The Booster ensures the correct positioning of the seat belt and increases child safety during the ride. Compact and easy to install in any vehicle.",
      sr: "Namenjeno deci starijoj od 7 godine i težoj od 15 kilograma. Booster omogućava pravilno postavljanje sigurnosnog pojasa i povećava sigurnost deteta tokom vožnje. Kompaktno i lako za postavljanje u bilo koje vozilo.",
      ru: "Предназначено для детей старше 7 лет и весом более 15 килограммов. Бустер обеспечивает правильное положение ремня безопасности и повышает безопасность ребенка во время поездки. Компактен и легко устанавливается в любой автомобиль.",
    },
    name: "Buster sedište (Booster)",
    icon: "public/icons/extras/boostseats.svg",
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

export const privacyPolicySr = `
  <p class="c3">
      <span
          >POLITIKA PRIVATNOSTI &ndash; VIASTRO DOO
          <br />&#128205; Adresa: Danila Leki&#263;a &Scaron;panca 31,
          Novi Beograd<br />&#128209; PIB: 114961759 | Mati&#269;ni broj:
          22096737<br />&#128231; Email: office@viastro.rs | &#128222;
          Tel: 069/656-555<br /><br /></span>
  </p>
  <p class="c1 c2"><span class="c3"></span></p>
  <p class="c0">
      <span class="c8"
          >1. ZAŠTITA PRIVATNOSTI KORISNIKA</span
      >
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
  <p class="c0">
      <span class="c8"
          >2. ZAŠTITA POVERLJIVIH PODATAKA O TRANSAKCIJI</span
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
  <p class="c0">
      <span class="c8"
          >3. POVRAĆAJ SREDSTAVA</span
      >
  </p>
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
  <p class="c0">
      <span class="c8"
          >4. IZJAVA O KONVERZIJI</span
      >
  </p>
  <p class="c1">
      <span class="c3"
          >Sva pla&#263;anja &#263;e biti izvr&#353;ena u lokalnoj valuti Republike Srbije &ndash; dinar (RSD). Iznos za koji &#263;e Va&#353;a kreditna kartica biti zadu&#382;ena dobija se konverzijom cene iz Evra u srpski dinar po va&#382;e&#263;em kursu Narodne banke Srbije. Prilikom zadu&#382;ivanja Va&#353;e kreditne kartice, ista suma se konvertuje u Va&#353;u lokalnu valutu prema kursu udru&#382;enja kreditnih kartica. Kao rezultat ove konverzije, postoji mogu&#263;nost neznatne razlike u odnosu na originalnu cenu navedenu na na&#353;em veb sajtu.</span
      >
  </p>
  `;

export const privacyPolicyEn = `
  <p class="c3">
      <span
          >PRIVACY POLICY &ndash; VIASTRO DOO
          <br />&#128205; Address: Danila Leki&#263;a &Scaron;panca 31, Novi
          Belgrade<br />&#128209; Tax ID: 114961759 | Registration Number: 22096737<br />&#128231; Email: office@viastro.rs | &#128222;
          Tel: 069/656-555<br /><br /></span>
  </p>
  <p class="c1 c2"><span class="c3"></span></p>
  <p class="c0">
      <span class="c8"
          >1. USER PRIVACY PROTECTION</span
      >
  </p>
  <p class="c1">
      <span class="c3"
          >On behalf of Viastro Doo, we commit to protecting the privacy of all our customers.</span
      >
  </p>
  <p class="c1">
      <span class="c3"
          >We collect only necessary, basic customer/user data and data required for business operations and customer information in accordance with good business practices and for the purpose of providing quality service.</span
      >
  </p>
  <p class="c1">
      <span class="c3"
          >We give customers the option to choose, including the option to decide whether they want to be removed from mailing lists used for marketing campaigns.</span
      >
  </p>
  <p class="c1">
      <span class="c3"
          >All customer/user data is strictly protected and is available only to employees who need this data to perform their work. All employees (and business partners) are responsible for respecting privacy protection principles.</span
      >
  </p>
  <p class="c1 c2"><span class="c3"></span></p>
  <p class="c0">
      <span class="c8"
          >2. PROTECTION OF CONFIDENTIAL TRANSACTION DATA</span
      >
  </p>
  <p class="c1">
      <span class="c3"
          >When entering payment card data, confidential information is transmitted over the public network in protected (encrypted) form using SSL protocol and PKI system, as the most modern cryptographic technology currently available.</span
      >
  </p>
  <p class="c1">
      <span class="c3"
          >Data security during purchase is guaranteed by the payment card processor. Payment card data is not available in our system at any time.</span
      >
  </p>
  <p class="c1 c2"><span class="c3"></span></p>
  <p class="c0">
      <span class="c8"
          >3. REFUND</span
      >
  </p>
  <p class="c1">
      <span class="c3"
          >In case of return of goods and refund to a customer who has previously paid with one of the payment cards, partially or in full, regardless of the reason for return, Viastro Doo is obliged to make the refund exclusively through VISA, EC/MC and Maestro payment methods, which means that the bank will, upon the seller's request, process the refund to the cardholder's account.</span
      >
  </p>
  <p class="c1 c2"><span class="c3"></span></p>
  <p class="c0">
      <span class="c8"
          >4. CONVERSION STATEMENT</span
      >
  </p>
  <p class="c1">
      <span class="c3"
          >All payments will be effected in Serbian currency - Dinar (RSD). The amount your credit card account will be charged for is obtained through the conversion of the price in Euro into Serbian dinar according to the current exchange rate of the Serbian National Bank. When charging your credit card, the same amount is converted into your local currency according to the exchange rate of credit card associations. As a result of this conversion there is a possibility of a slight difference from the original price stated in our web site.</span
      >
  </p>
  `;

export const privacyPolicyRu = `
  <p class="c3">
      <span
          >ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ &ndash; VIASTRO DOO
          <br />&#128205; Адрес: ул. Данила Лекича Шпанца 31, Нови
          Белград<br />&#128209; ИНН: 114961759 | Регистрационный номер: 22096737<br />&#128231; Email: office@viastro.rs | &#128222;
          Тел: 069/656-555<br /><br /></span>
  </p>
  <p class="c1 c2"><span class="c3"></span></p>
  <p class="c0">
      <span class="c8"
          >1. ЗАЩИТА КОНФИДЕНЦИАЛЬНОСТИ ПОЛЬЗОВАТЕЛЕЙ</span
      >
  </p>
  <p class="c1">
      <span class="c3"
          >От имени Viastro Doo мы обязуемся защищать конфиденциальность всех наших клиентов.</span
      >
  </p>
  <p class="c1">
      <span class="c3"
          >Мы собираем только необходимые, основные данные о клиентах/пользователях и данные, необходимые для ведения бизнеса и информирования клиентов в соответствии с хорошими деловыми практиками и с целью предоставления качественных услуг.</span
      >
  </p>
  <p class="c1">
      <span class="c3"
          >Мы предоставляем клиентам возможность выбора, включая возможность решить, хотят ли они быть удалены из списков рассылки, используемых для маркетинговых кампаний.</span
      >
  </p>
  <p class="c1">
      <span class="c3"
          >Все данные о клиентах/пользователях строго защищены и доступны только сотрудникам, которым эти данные необходимы для выполнения своей работы. Все сотрудники (и деловые партнеры) несут ответственность за соблюдение принципов защиты конфиденциальности.</span
      >
  </p>
  <p class="c1 c2"><span class="c3"></span></p>
  <p class="c0">
      <span class="c8"
          >2. ЗАЩИТА КОНФИДЕНЦИАЛЬНЫХ ДАННЫХ ТРАНЗАКЦИЙ</span
      >
  </p>
  <p class="c1">
      <span class="c3"
          >При вводе данных платежной карты конфиденциальная информация передается по публичной сети в защищенной (зашифрованной) форме с использованием протокола SSL и системы PKI, как наиболее современной криптографической технологии, доступной в настоящее время.</span
      >
  </p>
  <p class="c1">
      <span class="c3"
          >Безопасность данных при покупке гарантируется процессором платежных карт. Данные платежной карты недоступны в нашей системе ни в один момент.</span
      >
  </p>
  <p class="c1 c2"><span class="c3"></span></p>
  <p class="c0">
      <span class="c8"
          >3. ВОЗВРАТ СРЕДСТВ</span
      >
  </p>
  <p class="c1">
      <span class="c3"
          >В случае возврата товара и возврата средств клиенту, который ранее оплатил одной из платежных карт, частично или полностью, независимо от причины возврата, Viastro Doo обязано производить возврат исключительно через методы оплаты VISA, EC/MC и Maestro, что означает, что банк по запросу продавца обработает возврат средств на счет держателя карты.</span
      >
  </p>
  <p class="c1 c2"><span class="c3"></span></p>
  <p class="c0">
      <span class="c8"
          >4. ЗАЯВЛЕНИЕ О КОНВЕРСИИ</span
      >
  </p>
  <p class="c1">
      <span class="c3"
          >Все платежи осуществляются в сербской валюте - Динар (RSD). Сумма, которая будет списана с Вашей кредитной карты, получается путем конвертации цены из Евро в сербский динар по текущему обменному курсу Народного банка Сербии. При списании с Вашей кредитной карты та же сумма конвертируется в Вашу местную валюту в соответствии с обменным курсом систем кредитных карт. В результате этой конвертации возможна небольшая разница по сравнению с первоначальной ценой, указанной на нашем сайте.</span
      >
  </p>
  `;

export const rentalConditionsSr = `
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
              href="https://viastro.rs/sr/rental-conditions"
              >https://viastro.rs/sr/rental-conditions</a
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

export const rentalConditionsRu = `
  <p class="c3">
      <span
          >ОБЩИЕ УСЛОВИЯ АРЕНДЫ ТРАНСПОРТНЫХ СРЕДСТВ - VIASTRO DOO
          <br />📍 Адрес: ул. Данила Лекича Шпанца 31, Нови Београд<br />📉 ИНН: 114961759 | Регистрационный номер: 22096737<br />📧 Email: office@viastro.rs | 📞 Тел: 069/656-555<br /><br /></span
      ><span class="c8"
          >1. ОБЩИЕ ПОЛОЖЕНИЯ И ОПРЕДЕЛЕНИЯ ПОНЯТИЙ</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          ><br />Общие условия аренды транспортных средств являются неотъемлемой частью каждого Договора аренды транспортного средства, заключенного с компанией VIASTRO DOO БЕЛГРАД-НОВИ-БЕЛГРАД.</span
      >
  </p>
  <p class="c0">
      <span
          ><br />Пользователю в момент подписания договора аренды транспортного средства были представлены положения Общих условий. Пользователь также информируется, что в случае дополнительной необходимости он может в любое время повторно ознакомиться с их содержанием через веб-сайт Арендодателя </span
      ><span class="c17"
          ><a
              class="c13"
              href="https://viastro.rs/ru/rental-conditions"
              >https://viastro.rs/ru/rental-conditions</a
          ></span
      ><span class="c1"
          >; Подписывая Договор аренды транспортного средства, Пользователь подтверждает, что он ознакомлен со всеми положениями Общих условий аренды транспортных средств, понял их содержание и полностью их принимает, имея в виду, что они являются неотъемлемой частью каждого отдельного договора аренды транспортного средства.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >На Договор аренды транспортного средства распространяются действующие нормативные акты Республики Сербия, и договорена их субсидиарная применимость для всех прав и обязанностей, которые им не регулируются, при условии, что они применимы к конкретным случаям. По всем спорным вопросам, которые могут возникнуть из Договора и Общих условий, договорена юрисдикция местного и предметно компетентного суда в Белграде.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >Арендодатель и Пользователь будут стремиться разрешить все спорные вопросы в первую очередь мирным внесудебным путем.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >Подписывая договор, Пользователь подтверждает, что он прочитал положения Общих условий, понял их содержание и согласен с их применением как неотъемлемой части Договора.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >Арендодатель оставляет за собой право изменять Общие условия аренды транспортных средств с обязательством предварительно опубликовать их на веб-сайте со сроком вступления в силу через 30 дней с даты публикации для своевременного ознакомления Пользователя с содержанием изменений.</span
      >
  </p>
  <p class="c0 c7"><span class="c1"></span></p>
  <p class="c0">
      <span class="c8"
          >2. ЗНАЧЕНИЕ НЕКОТОРЫХ ВЫРАЖЕНИЙ В ОБЩИХ УСЛОВИЯХ ДЕЯТЕЛЬНОСТИ</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >"Арендодатель" - компания Viastro doo Белград, с местонахождением по адресу ул. Данила Лекича Шпанца, д. 31, Белград-Нови-Београд, регистрационный номер: 22096737, ИНН: 114961759;</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >"Арендатор" - любое физическое или юридическое лицо, которое арендует транспортное средство, или от имени которого арендуется транспортное средство;</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >"Договор" - Договор аренды, который подписывается при получении транспортного средства и которым транспортное средство передается в пользование, определяются права и обязанности сторон в соответствии с договорными положениями и Общими условиями аренды, такие как, например, получение и возврат транспортного средства, покрытие, пакет оборудования и услуг, включенных в цену, а также способ оплаты. Договор, помимо прочего, содержит данные о пробеге транспортного средства, повреждениях и возможных недостатках транспортного средства и другие права и обязанности, которые обе стороны договора полностью принимают своими подписями. Схема состояния транспортного средства при выдаче и настоящие Общие условия считаются неотъемлемой частью Договора аренды транспортного средства как его приложение;</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >"Водитель/Дополнительный водитель" - это физическое лицо, указанное в Договоре как "Пользователь", которое подписывает Договор аренды и получает транспортное средство и которое ответственно за соблюдение всех положений Договора и Общих условий;</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >"Пользователь" - Арендатор, Водитель и Дополнительный водитель в дальнейшем тексте Общих условий аренды обозначаются одним словом - Пользователь.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >"Транспортное средство" является предметом аренды по Договору, данные о котором указаны в Договоре.</span
      >
  </p>
  <p class="c0">
      <span class="c8"
          ><br />3. УСЛОВИЯ И ПРАВИЛА ИСПОЛЬЗОВАНИЯ ТРАНСПОРТНОГО СРЕДСТВА</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >Арендодатель передает Пользователю Транспортное средство, которое является технически исправным, вымытым и с полным баком, с договоренным соответствующим оборудованием и сопроводительной документацией, что Пользователь подтверждает подписанием Договора. Лицо, которое от имени Пользователя получает транспортное средство и подписывает Договор, если оно уполномочено на это, гарантирует и несет ответственность перед Арендодателем солидарно с Пользователем за соблюдение и выполнение всех договорных обязательств. Подписывая Договор, Пользователь гарантирует Арендодателю, что он соответствует общим условиям для управления транспортным средством и имеет все соответствующие документы в соответствии с действующими законодательными и подзаконными актами Республики Сербия. При подписании договора Пользователь обязан предъявить Арендодателю для ознакомления личные документы, копии которых будут являться неотъемлемой частью Договора как приложение.</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          >Пользователь обязан заботиться о регулярной технической исправности транспортного средства и следить за такими параметрами, как уровень охлаждающей жидкости, масла, других жидкостей, давление в шинах и т.д. В случае уведомлений с приборной панели или других сигнализаций Транспортного средства или если Пользователь считает, что есть другие причины для проведения сервисного или регулярного обслуживания, Пользователь обязан обратиться к Арендодателю для выполнения необходимых действий. В случае возникновения ущерба транспортному средству из-за несоблюдения этих положений Пользователь будет обязан возместить таким образом причиненный ущерб и возможную упущенную выгоду Арендодателя за период невозможности сдачи транспортного средства в аренду из-за нарушения этих положений Общих условий.</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          ><br />Пользователю строго запрещено использовать транспортное средство для следующих целей: гонки, внедорожное вождение, буксировка других транспортных средств или прицепов, школа вождения, перевозка опасных материалов, профессиональные перевозки пассажиров, вождение в состоянии алкогольного, наркотического опьянения и других запрещенных законом психоактивных веществ и/или любые другие незаконные действия.</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          ><br />Пользователь обязан заботиться о исправности и безопасности транспортного средства с надлежащей степенью внимания (доброго хозяина или доброго предпринимателя в зависимости от того, какой правовой стандарт применим к конкретному случаю). Запрещено оставлять транспортное средство незапертым, с опущенными стеклами или иным образом незащищенным или с ключами в замке зажигания.<br
      /></span>
  </p>
  <p class="c6">
      <span class="c1"
          >Пользователь обязан при возврате транспортного средства произвести возврат того же по адресу Арендодателя, с которого транспортное средство было получено. Транспортное средство перед возвратом должно быть вымыто снаружи и внутри, а бак должен быть полным. Если эти обязательства не выполнены Пользователем, Арендодатель имеет право взимать плату за услуги мойки и/или долива топлива согласно действующему прайс-листу.</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          ><br />Пользователь может использовать транспортное средство для вождения в Республике Сербия, в то время как для пересечения границы и вождения в следующих странах он может сделать это исключительно при наличии предварительного письменного согласия Арендодателя: страны Европейского Союза, Черногория, Босния и Герцеговина, Северная Македония. Пересечение границы и вождение в другие страны запрещено. Кроме того, Пользователю также запрещается вождение и пересечение административных переходов на территории АП Косово и Метохия;</span
      >
  </p>
  <p class="c6 c7"><span class="c1"></span></p>
  <p class="c0">
      <span class="c1"
          >Пользователь обязан ознакомиться с руководством пользователя для каждого транспортного средства непосредственно после его получения. Также важно придерживаться всех рекомендаций и инструкций, касающихся правильного использования транспортного средства, чтобы обеспечить его оптимальную функциональность и избежать возможных повреждений.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >В случае утраты заводской гарантии на транспортное средство, которая возникла в результате неправильного использования транспортного средства Пользователем, то есть использования в противоречии с правилами и условиями заводской гарантии, Арендодатель имеет право на возмещение полной суммы ущерба, который он при этом понес и который возник как следствие вышеописанных действий Пользователя.
      </span>
  </p>
  <p class="c16">
      <span
          >Арендодатель оставляет за собой право в любое время, без предварительного уведомления, расторгнуть договор и потребовать возврата арендованного Транспортного средства из-за нарушения Пользователем любых положений общих условий.<br /></span
      ><span class="c11"
          >4. ВОДИТЕЛЬСКИЕ УСЛОВИЯ ДЛЯ ПОЛЬЗОВАТЕЛЯ И ОГРАНИЧЕНИЯ АРЕНДЫ</span
      ><span class="c1"><br /></span>
  </p>
  <p class="c6">
      <span class="c1"
          >Минимальный возраст Пользователя-водителя для заключения Договора аренды составляет 21 год.
      </span>
  </p>
  <p class="c6 c7"><span class="c1"></span></p>
  <p class="c6">
      <span class="c1"
          >Пользователь должен иметь водительское удостоверение, которое должно быть действительным в течение минимум полных 2 лет на дату заключения Договора аренды.</span
      >
  </p>
  <p class="c6 c7"><span class="c1"></span></p>
  <p class="c6">
      <span class="c1"
          >В случае договоренности о праве для Дополнительного водителя арендованного транспортного средства, последний должен быть вписан в договор и соответствовать тем же условиям, что и Пользователь.</span
      >
  </p>
  <p class="c6 c7"><span class="c1"></span></p>
  <p class="c16">
      <span><br /></span
      ><span class="c8"
          >5. ИСПОЛЬЗОВАНИЕ ТРАНСПОРТНОГО СРЕДСТВА ЗА ПРЕДЕЛАМИ ГРАНИЦ РЕСПУБЛИКИ СЕРБИЯ</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          ><br />
          Вождение транспортного средства за пределами территории Республики Сербия и пересечение границы разрешено только при наличии предварительного письменного согласия Арендодателя.</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          ><br />Пользователь обязан нести все расходы, связанные с дополнительным страхованием транспортного средства и международной документацией, которая в таком случае требуется. Спецификация указанных расходов указана в соответствующем разделе прайс-листа.</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          ><br />Нарушение этих положений, то есть действия Пользователя в обход письменного согласия Арендодателя, представляет собой грубое нарушение положений Общих условий и Договора, по которому Арендодатель имеет право на расторжение договора и возмещение возможного понесенного ущерба.</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          ><br />Если транспортное средство будет использоваться за пределами территории разрешенных стран, то есть будет использоваться для пересечения границы и вождения в странах без предварительного письменного согласия Арендодателя, Пользователь несет полную ответственность за всю сумму ущерба, который как следствие таких действий понесет Арендодатель. Если ущерб, который возник в результате неразрешенных действий Пользователя, возместит Арендодатель, он в этом случае приобретает право регресса к Пользователю, которое помимо суммы ущерба подразумевает и право регресса на возмещение всех сопутствующих расходов, которые в таком случае возникают и которые подразумевают, но не ограничиваются возможными судебными и адвокатскими расходами, расходами на оплаченные такси и штрафы, административные расходы и тому подобное.</span
      >
  </p>
  <p class="c6 c7">
      <span class="c1"><br /></span>
  </p>
  <p class="c3"><span class="c11">6. ДОКУМЕНТАЦИЯ И ОТВЕТСТВЕННОСТЬ</span></p>
  <p class="c6">
      <span class="c1"
          ><br />Пользователь обязан в течение всего срока действия Договора хранить полученную документацию на транспортное средство и все экземпляры ключей от Транспортного средства, которые он получил.</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          ><br />В случае утери техпаспорта, ключей, номерных знаков, наклеек, страхового полиса и тому подобного - Пользователь обязан оплатить сумму за предпринятые Арендодателем действия по устранению последствий согласно действующему прайс-листу. Действующий прайс-лист в этих случаях включает в цену и операционные расходы, которые при этом возникают (фактические расходы и расходы по задействованию сотрудников Арендодателя на устранение последствий утери).</span
      >
  </p>
  <p class="c6"><span class="c1">&nbsp;</span></p>
  <p class="c0">
      <span
          >Транспортное средство обязательно фотографируется сотрудниками Арендодателя при получении и возврате его Пользователем, и эти фотографии будут составлять неотъемлемую часть документации по предмету и возможное доказательство в случае разрешения спорных вопросов.<br /><br /></span
      ><span class="c11">7. ДЕПОЗИТ И ОПЛАТА</span>
  </p>
  <p class="c0">
      <span class="c1"
          >Пользователь обязан внести Депозит при получении транспортного средства.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >Арендодатель имеет право использовать сумму Депозита для покрытия следующих случаев: возмещение ущерба, расходы на долив топлива, расходы на мойку, расходы на оплату штрафов, расходы на утерю документации или оборудования.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >Арендодатель оставляет за собой право удержать часть или всю сумму депозита в течение 30 дней с момента окончания аренды, с целью дополнительных проверок и покрытия возможных неоплаченных штрафов Пользователя, для оплаты расходов по страхованию и/или других сумм ущерба, которые возникли в результате действий Пользователя и которые могут появиться для выплаты впоследствии. Арендодатель оставляет за собой право регресса к Пользователю и после истечения срока в 30 дней и возврата депозита, если возникнет необходимость оплаты сумм за Пользователя, которые в любом случае ложатся на его счет.</span
      >
  </p>
  <p class="c0">
      <span><br /></span
      ><span class="c8">8. СТРАХОВАНИЕ И ВОЗМЕЩЕНИЕ УЩЕРБА</span>
  </p>
  <p class="c6">
      <span class="c1"
          >Все транспортные средства Арендодателя застрахованы полисом обязательного страхования автогражданской ответственности и полисом каско с участием в ущербе (франшиза).</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          ><br />Основной полис каско не покрывает ущерб, возникший на: шинах, дисках, стеклах транспортного средства, шасси, ходовой части, салоне, двигателе, сцеплении и ущерб, возникший due to небрежности или ненадлежащего использования со стороны Пользователя.</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          ><br />Ущерб оценивается исключительно уполномоченным оценщиком.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          ><br />Если по причиненному ущербу не составляется полицейский протокол и/или не производится уведомление о страховом случае по причинам, которые могут быть отнесены к вине Пользователя, вся сумма ущерба вместе с сопутствующими расходами, из-за невозможности взыскания указанных сумм со страховых компаний, ложатся исключительно и полностью на счет Пользователя.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >В случае дорожно-транспортного происшествия, в котором участвовал Пользователь, который НЕ виновен в дорожно-транспортном происшествии, он НЕ БУДЕТ ОБЯЗАН оплачивать сумму участия в ущербе, если Арендодателю своевременно предоставит полицейский протокол, данные о других участниках дорожно-транспортного происшествия и если он использовал транспортное средство в соответствии с Договором и Общими условиями.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >В случае дорожно-транспортного происшествия, в котором Пользователь виновен в дорожно-транспортном происшествии, он обязуется произвести оплату денежной суммы участия в ущербе (франшизы) в соответствии с действующим полисом каско.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >Минимальная сумма участия в страховом случае составляет 100 евро + НДС, а максимальная определяется в соответствии со страховой стоимостью по полису страхования.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >Пользователь обязан возместить ПОЛНУЮ сумму ущерба, то есть Арендодатель приобретает право регресса к Пользователю в следующих случаях:</span
      >
  </p>
  <ol class="c10 lst-kix_list_15-0 start" start="1">
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Неуведомление о страховом случае/дорожно-транспортном происшествии полиции и/или Арендодателю.</span
          >
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Непредставление оригиналов ключей и сопроводительной документации транспортного средства в случае кражи арендованного транспортного средства,</span
          >
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Вождения под воздействием алкоголя, и/или психоактивных веществ и/или без действительного водительского удостоверения,</span
          >
      </li>
      <li class="c0 c9 c14 li-bullet-0">
          <span class="c1"
              >Использование транспортного средства в случаях, которые запрещены настоящими Общими условиями (например, гонки, внедорожье, без разрешения на выезд из страны).</span
          >
      </li>
  </ol>
  <p class="c3">
      <span><br /></span
      ><span class="c8"
          >9. ДЕЙСТВИЯ В СЛУЧАЕ ДОРОЖНО-ТРАНСПОРТНОГО ПРОИСШЕСТВИЯ И КРАЖИ</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >В случае возникновения дорожно-транспортного происшествия, в котором участвует Пользователь и/или любое другое уполномоченное или неуполномоченное лицо - Пользователь обязан немедленно уведомить компетентную полицейскую службу и Арендодателя, а также предоставить properly заполненный и заверенный полицейский протокол.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >В случае кражи транспортного средства - Пользователь обязан немедленно уведомить компетентную полицейскую службу и Арендодателя, а также передать Арендодателю без задержки оригиналы ключей и сопроводительную документацию на транспортное средство. Нарушение этих положений представляет собой грубые нарушения Общих условий, по которым Арендодатель имеет право потребовать от Пользователя всю сумму причиненного таким образом ущерба.
      </span>
  </p>
  <p class="c3">
      <span><br /></span
      ><span class="c8">10. ОБОРУДОВАНИЕ И САЛОН</span>
  </p>
  <p class="c0">
      <span class="c1"
          >Все дополнительное оборудование для арендованного транспортного средства (GPS, детские сиденья, цепи и т.д.) должно быть возвращено по окончании договора в неповрежденном состоянии вместе с транспортным средством.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >В случае утери или повреждения дополнительного оборудования, которые могут быть отнесены к вине Пользователя или возникли due to обстоятельств, которые ложатся на счет Пользователя, Арендодатель имеет право взимать с Пользователя их стоимость согласно действующему прайс-листу.</span
      >
  </p>
  <p class="c0">
      <span
          >Запрещено курение в транспортном средстве, а также любое поведение при использовании транспортного средства, которое может привести к серьезным повреждениям салона (пятна, запахи). В случае нарушения этих положений Арендодатель имеет право взимать с Пользователя плату за услуги глубокой чистки салона согласно действующему прайс-листу.<br /><br /></span
      ><span class="c11">11. ОПОЗДАНИЕ И ВОЗВРАТ</span>
  </p>
  <p class="c0">
      <span class="c1"
          >Опоздание до 30 минут: Арендодатель будет терпеть максимальное опоздание с возвратом транспортного средства по окончании Договора до 30 минут.
      </span>
  </p>
  <p class="c0">
      <span class="c1"
          >Опоздание свыше 30 минут: В случае опоздания с возвратом транспортного средства по окончании Договора свыше 30 минут, будет считаться, что Пользователь продлил аренду Транспортного средства еще на один дополнительный день аренды на тех же условиях, как было ранее договорено.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >Пользователь обязан произвести возврат Транспортного средства на локацию, с которой оно было получено, или на другую локацию, но только при обязательном наличии предварительной письменной договоренности об изменении локации. Письменная договоренность в смысле положений этой статьи подразумевает и обмен сообщениями через электронные средства связи.</span
      >
  </p>
  <p class="c0 c2">
      <span class="c8"><br />12. ОТМЕНА БРОНИРОВАНИЯ</span>
  </p>
  <p class="c0 c2">
      <span class="c1"
          >Отмена до 48 часов до начала аренды - Пользователь может отменить бронирование транспортного средства не позднее чем за 48 часов до начала аренды транспортного средства без возникновения дополнительных обязательств и/или расходов.</span
      >
  </p>
  <p class="c0 c2">
      <span class="c1"
          >Отмена менее чем за 48 часов - В случае, если Пользователь отменяет бронирование транспортного средства в срок менее 48 часов до начала аренды, он обязан выплатить Арендодателю сумму в размере 30% от общей суммы аренды.</span
      >
  </p>
  <p class="c0 c2">
      <span class="c1"
          >Отмена менее чем за 24 часа - В случае, если Пользователь отменяет бронирование транспортного средства в срок менее 24 часов до начала аренды, он обязан выплатить Арендодателю сумму в размере 50% от общей суммы аренды.</span
      >
  </p>
  <p class="c0 c2">
      <span class="c1"
          >Неявка - В случае, если Пользователь не явится в согласованный срок передачи транспортного средства, он обязан выплатить Арендодателю компенсацию в размере 100% суммы аренды.</span
      >
  </p>
  <p class="c0">
      <span><br /><br /></span
      ><span class="c11"
          >13. ЗАЩИТА ПЕРСОНАЛЬНЫХ ДАННЫХ</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >Персональные данные Пользователя используются исключительно для обработки аренды в соответствии с Законом о защите персональных данных.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >Подписывая договор, Пользователь дал согласие и ознакомился с Уведомлением об обработке персональных данных со стороны Арендодателя (в качестве Контролера) и также согласен с ним. Пользователь уведомлен, что Арендодатель обрабатывает все данные, которые он ввел и предоставил Арендодателю при заключении Договора, а именно: место и дата заключения договора, имя и фамилия Пользователя, номер удостоверения личности, ИНН, номер техпаспорта и водительского удостоверения, место жительства, телефон, e-mail. Цель обработки данных - заключение и исполнение договора аренды и проведение маркетинговых активностей продавца, и они хранятся в течение периода три года с даты согласия. Правовое основание обработки заключается в:</span
      >
  </p>
  <ul class="c10 lst-kix_list_12-0 start">
      <li class="c4 li-bullet-0">
          <span class="c1">Согласие лица, на которое относятся данные</span>
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Обработка необходима для исполнения договора, заключенного с лицом, на которое относятся данные</span
          >
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Исполнение установленных законом обязательств.</span
          >
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Лицо имеет право доступа, право на исправление, дополнение, удаление, ограничение и переносимость данных, а также право на возражение и автоматизированное принятие индивидуальных решений. Лицо имеет право отозвать согласие в любое время, при этом отзыв согласия не влияет на допустимость обработки до отзыва. В случае отзыва согласия, Контролер не будет обрабатывать данные Лица, на которое относится отзыв, за исключением случаев, когда Контролер имеет законное полномочие на обработку. Указанные запросы Лица направляются по электронной почте на адрес </span
          ><span class="c15"
              ><a class="c13" href="mailto:office@viastro.rs"
                  >office@viastro.rs</a
              ></span
          ><span class="c1">; </span>
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Контролер ответит на каждый запрос в кратчайший возможный срок, но в любом случае не позднее чем в течение 30 дней с момента получения запроса в соответствии со статьей 21 Закона о защите персональных данных. Лицо может подать жалобу в связи с обработкой своих персональных данных Уполномоченному по информации общественного значения и защите персональных данных.</span
          >
      </li>
  </ul>
  <p class="c0 c7 c9"><span class="c1"></span></p>
  <p class="c0">
      <span class="c8"
          >14. ЗАЩИТА ПРАВ ПОТРЕБИТЕЛЕЙ И РЕКЛАМАЦИИ</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >Учитывая, что Пользователь как договаривающаяся сторона может быть и физическим лицом, положения Договора аренды и Общих условий аренды определены таким образом, чтобы Пользователь при заключении Договора четко и недвусмысленно информировался о:</span
      >
  </p>
  <ul class="c10 lst-kix_list_14-0 start">
      <li class="c4 li-bullet-0">
          <span class="c1">Основных характеристиках услуги</span>
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Фирменном наименовании, регистрационном номере, адресе местонахождения и номере телефона</span
          >
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Продажной цене услуг или способе, которым продажная цена услуг будет рассчитана, если из-за характера услуги продажная цена не может быть рассчитана заранее</span
          >
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Способе оплаты, способе и сроке поставки, способе исполнения других договорных обязательств</span
          >
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Наличии законной ответственности за несоответствие услуги договору</span
          >
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Способе заявления рекламации продавцу, и в частности о месте приема и способе действий продавца по ним, а также условиях, касающихся осуществления прав потребителя по основанию соответствия</span
          >
      </li>
      <li class="c16 c14 c9 li-bullet-0">
          <span class="c1"
              >Возможности внесудебного разрешения споров</span
          >
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1">Сроке действия договора</span>
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1">Минимальном сроке договорных обязательств</span>
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Функциональности, включая меры технической защиты цифрового контента</span
          >
      </li>
  </ul>
  <p class="c0 c7 c9"><span class="c1"></span></p>
  <p class="c0">
      <span class="c1"
          >Арендодатель информирует Пользователя, что для осуществления своих прав он может заявить рекламацию с целью осуществления своих прав по электронной почте office@viastro.rs или телефону +38169656555; Пользователь может более подробно ознакомиться с процедурой и способом заявления рекламации, перейдя по ссылке www.viastro.rs/reklamacije.</span
      >
  </p>
  <p class="c0 c7"><span class="c1"></span></p>
  <p class="c0 c7 c12">
      <span class="c1"><br /><br /><br /></span>
  </p>
  `;

export const rentalConditionsEn = `
  <p class="c3">
      <span
          >GENERAL VEHICLE RENTAL CONDITIONS - VIASTRO DOO
          <br />📍 Address: Danila Lekića Španca 31, Novi Beograd<br />📉 Tax ID: 114961759 | Company ID: 22096737<br />📧 Email: office@viastro.rs | 📞 Tel: 069/656-555<br /><br /></span
      ><span class="c8"
          >1. GENERAL PROVISIONS AND DEFINITIONS</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          ><br />The General Vehicle Rental Conditions form an integral part of every Vehicle Rental Agreement concluded with the company VIASTRO DOO BELGRADE-NOVI BEOGRAD.</span
      >
  </p>
  <p class="c0">
      <span
          ><br />The User was presented with the provisions of the General Conditions at the time of signing the vehicle rental agreement. The User is also informed that they can reacquaint themselves with the content at any time via the Lessor's website </span
      ><span class="c17"
          ><a
              class="c13"
              href="https://viastro.rs/en/rental-conditions"
              >https://viastro.rs/en/rental-conditions</a
          ></span
      ><span class="c1"
          >; By signing the Vehicle Rental Agreement, the User confirms that they have read all the provisions of the General Vehicle Rental Conditions, understood their content, and fully accepts them, bearing in mind that they form an integral part of each individual vehicle rental agreement.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >The Vehicle Rental Agreement is governed by the positive regulations of the Republic of Serbia, and their subsidiary application is agreed upon for all rights and obligations not regulated by them, provided they are applicable to specific cases. Regarding all disputed issues that may arise from the Agreement and the General Conditions, the jurisdiction of the locally and materially competent court in Belgrade is agreed upon.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >The Lessor and the User shall endeavor to resolve all disputed issues primarily through amicable out-of-court means.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >By signing the agreement, the User confirms that they have read the provisions of the General Conditions, understood their content, and agrees to their application as an integral part of the Agreement.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >The Lessor reserves the right to amend the General Vehicle Rental Conditions with the obligation to publish them in advance on the website, effective 30 days from the date of publication, for the timely familiarization of the User with the content of the changes.</span
      >
  </p>
  <p class="c0 c7"><span class="c1"></span></p>
  <p class="c0">
      <span class="c8"
          >2. MEANING OF SOME TERMS IN THE GENERAL TERMS AND CONDITIONS</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >''Lessor'' - the company Viastro doo Belgrade, with its registered office at Danila Lekića Španca St. No. 31, Belgrade-Novi Beograd, company ID: 22096737, Tax ID: 114961759;</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >''Lessee'' - any natural or legal person who rents the vehicle, or in whose name the vehicle is rented;</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >''Agreement'' - the Rental Agreement signed upon vehicle pickup, which grants the use of the vehicle, defining the rights and obligations of the contracting parties in accordance with the contractual provisions and the General Rental Conditions, such as, for example, vehicle pickup and return, coverage, equipment package and services included in the price, and the method of payment. The Agreement also contains, among other things, data on the vehicle's mileage, damages, and any deficiencies in the vehicle, and other rights and obligations that both contracting parties fully accept with their signatures. The vehicle condition sketch at the time of rental and these General Conditions are considered an integral part of the Vehicle Rental Agreement as its annex;</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >''Driver/Additional Driver'' - is the natural person listed in the Agreement as the ''User'' who signs the Rental Agreement and takes over the vehicle, and who is responsible for complying with all provisions of the Agreement and General Conditions;</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >''User'' - Lessee, Driver, and Additional Driver in the further text of the General Rental Conditions are referred to by one word - User.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >''Vehicle'' is the subject of the rental under the Agreement, whose details are listed in the Agreement.</span
      >
  </p>
  <p class="c0">
      <span class="c8"
          ><br />3. CONDITIONS AND RULES FOR VEHICLE USE</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >The Lessor provides the User with a Vehicle that is technically sound, clean, and with a full tank, with the agreed accompanying equipment and documentation, which the User confirms by signing the Agreement. The person who, on behalf of the User, takes over the vehicle and signs the Agreement, if authorized to do so, guarantees and is liable to the Lessor, jointly and severally with the User, for the observance and fulfillment of all contractual obligations. By signing the Agreement, the User guarantees to the Lessor that they meet the general conditions for operating a motor vehicle and possess all relevant documents in accordance with the applicable laws and by-laws of the Republic of Serbia. When signing the agreement, the User is obliged to present their personal documents to the Lessor for inspection, copies of which will form an integral part of the Agreement as an annex.</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          >The User is obliged to care for the regular technical soundness of the vehicle and to monitor parameters such as coolant level, oil, other fluids, tire pressure, etc. In case of notifications from the instrument panel or other vehicle signals, or if the User believes there are other reasons for service or regular maintenance, the User must contact the Lessor to perform the necessary actions. In case of damage to the vehicle due to non-compliance with these provisions, the User will be obliged to compensate the damage thus caused and any lost profit of the Lessor for the period of inability to rent out the vehicle due to violation of these provisions of the General Conditions.</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          ><br />The User is expressly prohibited from using the vehicle for the following purposes: racing, off-road driving, towing other vehicles or trailers, driving school, transport of hazardous materials, professional passenger transport, driving under the influence of alcohol, narcotics, and other legally prohibited psychoactive substances and/or any other illegal activities.</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          ><br />The User is obliged to care for the vehicle's functionality and safety with an appropriate degree of attention (that of a good householder or a good businessman, depending on which legal standard applies to the specific case). It is forbidden to leave the vehicle unlocked, with windows down, or otherwise unsecured, or with the keys in the ignition.<br
      /></span>
  </p>
  <p class="c6">
      <span class="c1"
          >The User is obliged, upon returning the vehicle, to return it to the Lessor's address from which the vehicle was taken. The vehicle must be clean, both externally and internally, before return, and the fuel tank must be full. If these obligations are not fulfilled by the User, the Lessor has the right to charge for washing and/or refueling services according to the current price list.</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          ><br />The User may use the vehicle for driving within the Republic of Serbia, while crossing the border and driving in the following countries is only permitted with the prior written consent of the Lessor: European Union countries, Montenegro, Bosnia and Herzegovina, North Macedonia. Crossing the border and driving to other countries is prohibited. Additionally, the User is also prohibited from driving and crossing administrative crossings into the territory of AP Kosovo and Metohija;</span
      >
  </p>
  <p class="c6 c7"><span class="c1"></span></p>
  <p class="c0">
      <span class="c1"
          >The User is obliged to familiarize themselves with the user manual for each vehicle immediately upon taking it over. It is also important to adhere to all recommendations and instructions regarding the proper use of the vehicle to ensure its optimal functionality and avoid possible damage.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >In the event of loss of the vehicle's factory warranty due to improper use by the User, i.e., use contrary to the rules and conditions of the factory warranty, the Lessor has the right to compensation for the full amount of damage suffered as a result of the User's actions described above.
      </span>
  </p>
  <p class="c16">
      <span
          >The Lessor reserves the right to terminate the agreement at any time, without prior notice, and request the return of the rented Vehicle due to the User's breach of any of the general conditions.<br /></span
      ><span class="c11"
          >4. DRIVER CONDITIONS FOR THE USER AND RENTAL LIMITATIONS</span
      ><span class="c1"><br /></span>
  </p>
  <p class="c6">
      <span class="c1"
          >The minimum age of the User-driver for concluding the Rental Agreement is 21 years.
      </span>
  </p>
  <p class="c6 c7"><span class="c1"></span></p>
  <p class="c6">
      <span class="c1"
          >The User must hold a driver's license that has been valid for a minimum of full 2 years on the date of concluding the Rental Agreement.</span
      >
  </p>
  <p class="c6 c7"><span class="c1"></span></p>
  <p class="c6">
      <span class="c1"
          >In case of arranging the right for an Additional Driver of the rented vehicle, the same must be entered into the agreement and meet the same conditions as the User.</span
      >
  </p>
  <p class="c6 c7"><span class="c1"></span></p>
  <p class="c16">
      <span><br /></span
      ><span class="c8"
          >5. USE OF THE VEHICLE OUTSIDE THE BORDERS OF THE REPUBLIC OF SERBIA</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          ><br />
          Driving the vehicle outside the territory of the Republic of Serbia and crossing the border is permitted only with the prior written consent of the Lessor.</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          ><br />The User is obliged to bear all costs related to additional vehicle insurance and international documentation required in such a case. The specification of these costs is listed in the relevant section of the price list.</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          ><br />Violation of these provisions, i.e., the User acting without the written consent of the Lessor, constitutes a gross breach of the General Conditions and the Agreement, for which the Lessor has the right to terminate the agreement and claim compensation for any eventual damage suffered.</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          ><br />If the vehicle is used outside the territory of permitted countries, i.e., used for border crossing and driving in countries without the prior written consent of the Lessor, the User bears full responsibility for the entire amount of damage suffered by the Lessor as a consequence of such actions. If the Lessor exceptionally compensates for the damage resulting from the User's unauthorized actions, it acquires a right of recourse against the User, which, in addition to the amount of damage, includes the right of recourse for compensation of all accompanying costs that arise in such a case, including but not limited to potential court and attorney fees, costs of paid fines and tickets, administrative costs, and the like.</span
      >
  </p>
  <p class="c6 c7">
      <span class="c1"><br /></span>
  </p>
  <p class="c3"><span class="c11">6. DOCUMENTATION AND LIABILITY</span></p>
  <p class="c6">
      <span class="c1"
          ><br />The User is obliged to keep the received vehicle documentation and all copies of the Vehicle keys received for the entire duration of the Agreement.</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          ><br />In case of loss of the vehicle registration certificate, keys, license plates, stickers, insurance policy, etc. - the User is obliged to pay the amount for the actions undertaken by the Lessor to eliminate the consequences according to the current price list. The current price list in these cases includes in the price the handling costs that arise (actual costs and costs of engaging the Lessor's employees to eliminate the consequences of the loss).</span
      >
  </p>
  <p class="c6"><span class="c1">&nbsp;</span></p>
  <p class="c0">
      <span
          >The Vehicle is mandatory photographed by the Lessor's employees upon pickup and return by the User, and these photographs will form an integral part of the documentation for the case and potential evidence in case of dispute resolution.<br /><br /></span
      ><span class="c11">7. DEPOSIT AND PAYMENT</span>
  </p>
  <p class="c0">
      <span class="c1"
          >The User is obliged to provide a Deposit upon taking over the vehicle.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >The Lessor has the right to use the Deposit amount to cover the following cases: damage compensation, refueling costs, cleaning costs, fine payment costs, costs of lost documentation or equipment.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >The Lessor reserves the right to retain part or all of the deposit amount within 30 days of the end of the rental, for the purpose of additional checks and coverage of any unpaid fines by the User, for payment of insurance costs and/or other damage amounts that arose due to the User's actions and which may subsequently appear for payment. The Lessor reserves the right of recourse against the User even after the expiry of the 30-day period and the refund of the deposit, if the need arises to pay amounts for the User which in any case fall on their account.</span
      >
  </p>
  <p class="c0">
      <span><br /></span
      ><span class="c8">8. INSURANCE AND DAMAGE COMPENSATION</span>
  </p>
  <p class="c6">
      <span class="c1"
          >All of the Lessor's vehicles are insured with a compulsory motor third-party liability insurance policy and a casco insurance policy with participation in the damage (franchise).</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          ><br />The basic casco insurance policy does not cover damage to: tires, rims, vehicle glass, chassis, undercarriage, interior, engine, clutch, and damage resulting from negligence or improper use by the User.</span
      >
  </p>
  <p class="c6">
      <span class="c1"
          ><br />The damage is assessed exclusively by an authorized appraiser.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          ><br />If a police report is not made for the damage incurred and/or the insurance event is not reported for reasons attributable to the User's fault, the entire amount of damage along with accompanying costs, due to the impossibility of collecting these amounts from insurance companies, fall solely and entirely on the User.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >In the case of a traffic accident in which the User who is NOT at fault for the traffic accident participated, they WILL NOT BE OBLIGED to pay the participation amount in the damage if they timely provide the Lessor with the police report, data on other participants in the traffic accident, and if they used the vehicle in accordance with the Agreement and General Conditions.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >In the case of a traffic accident in which the User IS at fault for the traffic accident, they undertake to pay the monetary amount of participation in the damage (franchise) in accordance with the valid casco insurance policy.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >The minimum participation amount for an insurance event is 100 EUR + VAT, and the maximum is determined according to the insured value under the insurance policy.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >The User is obliged to compensate the FULL amount of damage, i.e., the Lessor acquires the right of recourse against the User in the following cases:</span
      >
  </p>
  <ol class="c10 lst-kix_list_15-0 start" start="1">
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Failure to report the insurance event/traffic accident to the police and/or the Lessor.</span
          >
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Failure to deliver the original keys and accompanying vehicle documentation in case of theft of the rented vehicle,</span
          >
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Driving under the influence of alcohol, and/or psychoactive substances and/or without a valid driver's license,</span
          >
      </li>
      <li class="c0 c9 c14 li-bullet-0">
          <span class="c1"
              >Use of the vehicle in cases prohibited by these General Conditions (e.g., racing, off-road, without permission to leave the country).</span
          >
      </li>
  </ol>
  <p class="c3">
      <span><br /></span
      ><span class="c8"
          >9. PROCEDURE IN CASE OF TRAFFIC ACCIDENT AND THEFT</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >In the event of a traffic accident involving the User and/or any other authorized or unauthorized person - the User is obliged to immediately notify the competent police service and the Lessor, and to provide a properly completed and certified police report.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >In case of vehicle theft - the User is obliged to immediately notify the competent police service and the Lessor, and to deliver to the Lessor without delay the original keys and accompanying documentation for the vehicle. Breach of these provisions constitutes gross violations of the General Conditions for which the Lessor has the right to claim the entire amount of damage thus caused from the User.
      </span>
  </p>
  <p class="c3">
      <span><br /></span
      ><span class="c8">10. EQUIPMENT AND INTERIOR</span>
  </p>
  <p class="c0">
      <span class="c1"
          >All additional equipment for the rented vehicle (GPS, child seats, chains, etc.) must be returned undamaged together with the vehicle upon termination of the agreement.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >In case of loss or damage to additional equipment that can be attributed to the User's fault or arose due to circumstances falling on the User's account, the Lessor has the right to charge the User for their cost according to the current price list.</span
      >
  </p>
  <p class="c0">
      <span
          >Smoking in the vehicle is prohibited, as is any behavior during the use of the vehicle that may cause severe damage to the interior (stains, odors). In case of violation of these provisions, the Lessor has the right to charge the User for deep cleaning services according to the current price list.<br /><br /></span
      ><span class="c11">11. DELAY AND RETURN</span>
  </p>
  <p class="c0">
      <span class="c1"
          >Delay up to 30 minutes: The Lessor will tolerate a maximum delay in returning the vehicle after the termination of the Agreement of up to 30 minutes.
      </span>
  </p>
  <p class="c0">
      <span class="c1"
          >Delay over 30 minutes: In case of delay in returning the vehicle after the termination of the Agreement of over 30 minutes, it will be considered that the User has extended the rental of the Vehicle for one additional rental day under the same conditions as previously agreed.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >The User is obliged to return the Vehicle to the location from which it was taken, or to another location but only with the mandatory prior written agreement on the change of location. Written agreement within the meaning of this article also includes the exchange of messages via electronic means of communication.</span
      >
  </p>
  <p class="c0 c2">
      <span class="c8"><br />12. CANCELLATION OF RESERVATION</span>
  </p>
  <p class="c0 c2">
      <span class="c1"
          >Cancellation up to 48h before rental start - The User can cancel the vehicle reservation no later than 48 hours before the start of the vehicle rental without incurring additional obligations and/or costs.</span
      >
  </p>
  <p class="c0 c2">
      <span class="c1"
          >Cancellation less than 48h - If the User cancels the vehicle reservation within a period shorter than 48 hours before the start of the rental, they are obliged to pay the Lessor an amount of 30% of the total rental amount.</span
      >
  </p>
  <p class="c0 c2">
      <span class="c1"
          >Cancellation less than 24h - If the User cancels the vehicle reservation within a period shorter than 24 hours before the start of the rental, they are obliged to pay the Lessor an amount of 50% of the total rental amount.</span
      >
  </p>
  <p class="c0 c2">
      <span class="c1"
          >No-show - In case the User does not appear at the agreed vehicle handover time, they are obliged to pay the Lessor compensation in the amount of 100% of the rental amount.</span
      >
  </p>
  <p class="c0">
      <span><br /><br /></span
      ><span class="c11"
          >13. PERSONAL DATA PROTECTION</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >The User's personal data is used exclusively for processing the rental in accordance with the Personal Data Protection Law.</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >By signing the agreement, the User has given consent and has familiarized themselves with the Notice on Personal Data Processing by the Lessor (as the Controller) and is also agreeable to it. The User is informed that the Lessor processes all data that the User entered and provided to the Lessor when concluding the Agreement, namely: place and date of conclusion of the agreement, User's first and last name, ID card number, personal ID number, vehicle registration and driver's license number, residence, telephone, e-mail. The purpose of data processing is the conclusion and execution of the rental agreement and the implementation of the seller's marketing activities, and they are stored for a period of three years from the date of consent. The legal basis for processing is:</span
      >
  </p>
  <ul class="c10 lst-kix_list_12-0 start">
      <li class="c4 li-bullet-0">
          <span class="c1">Consent of the data subject</span>
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Processing is necessary for the performance of a contract concluded with the data subject</span
          >
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Fulfillment of legal obligations.</span
          >
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >The data subject has the right of access, the right to rectification, supplementation, erasure, restriction, and portability of data, as well as the right to object and to automated individual decision-making. The data subject has the right to withdraw consent at any time, whereby the withdrawal of consent does not affect the lawfulness of processing based on consent before its withdrawal. In case of withdrawal of consent, the Controller will not process the data of the data subject to which the withdrawal relates, unless the Controller has a legal authorization for processing. The aforementioned requests of the data subject are submitted by email to </span
          ><span class="c15"
              ><a class="c13" href="mailto:office@viastro.rs"
                  >office@viastro.rs</a
              ></span
          ><span class="c1">; </span>
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >The Controller will respond to every request as soon as possible, and in any case no later than within 30 days of receipt of the request in accordance with Article 21 of the Personal Data Protection Law. The data subject may file a complaint regarding the processing of their personal data with the Commissioner for Information of Public Importance and Personal Data Protection.</span
          >
      </li>
  </ul>
  <p class="c0 c7 c9"><span class="c1"></span></p>
  <p class="c0">
      <span class="c8"
          >14. CONSUMER PROTECTION AND COMPLAINTS</span
      >
  </p>
  <p class="c0">
      <span class="c1"
          >Considering that the User as a contracting party can also be a natural person, the provisions of the Rental Agreement and the General Rental Conditions are defined in such a way that the User is clearly and unambiguously informed upon conclusion of the Agreement about:</span
      >
  </p>
  <ul class="c10 lst-kix_list_14-0 start">
      <li class="c4 li-bullet-0">
          <span class="c1">Basic characteristics of the service</span>
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Business name, registration number, registered office address and telephone number</span
          >
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Selling price of the services or the method by which the selling price will be calculated if, due to the nature of the service, the selling price cannot be calculated in advance</span
          >
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Method of payment, method and delivery period, method of performance of other contractual obligations</span
          >
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Existence of legal liability for non-conformity of the service with the contract</span
          >
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Method of lodging a complaint with the trader, and in particular about the place of receipt and the trader's procedure regarding them, as well as the conditions relating to the exercise of consumer rights on the basis of conformity</span
          >
      </li>
      <li class="c16 c14 c9 li-bullet-0">
          <span class="c1"
              >Possibility of out-of-court dispute settlement</span
          >
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1">Duration of the contract</span>
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1">Minimum duration of contractual obligations</span>
      </li>
      <li class="c4 li-bullet-0">
          <span class="c1"
              >Functionality, including technical protection measures for digital content</span
          >
      </li>
  </ul>
  <p class="c0 c7 c9"><span class="c1"></span></p>
  <p class="c0">
      <span class="c1"
          >The Lessor informs the User that to exercise their rights, they can file a complaint to exercise their rights at the email address office@viastro.rs or telephone +38169656555; The User can get more information about the procedure and method of filing a complaint by accessing the link www.viastro.rs/reklamacije.</span
      >
  </p>
  <p class="c0 c7"><span class="c1"></span></p>
  <p class="c0 c7 c12">
      <span class="c1"><br /><br /><br /></span>
  </p>
  `;
