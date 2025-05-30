const faqs = [
  {
    question: "Koje uslove moram da ispunim da bih iznajmio vozilo?",
    answer:
      "Potrebno je da imate važeću vozačku dozvolu najmanje 2 godine i da ste stariji od 21 godine. Prilikom preuzimanja vozila obavezno je prikazati ličnu kartu i vozačku dozvolu.",
  },
  {
    question: "Da li je kasko osiguranje uključeno u cenu?",
    answer:
      "Da, svi naši automobili imaju kasko osiguranje sa učešćem u šteti. Detalji o pokriću i izuzecima se nalaze u Uslovima najma.",
  },

  {
    question: "Da li mogu vozilom da putujem u inostranstvo?",
    answer:
      "Naravno. Potrebno je unapred najaviti planirano putovanje van Srbije kako bismo obezbedili dodatnu dokumentaciju i osiguranje za inostranstvo.",
  },
  {
    question: "Da li je moguće dostaviti vozilo na adresu?",
    answer:
      "Da, nudimo dostavu vozila na željenu adresu, uključujući aerodrom, stan ili hotel. Usluga se dodatno naplaćuje i mora biti zakazana unapred.",
  },
  {
    question: "Šta ako zakasnim sa vraćanjem vozila?",
    answer:
      "Ukoliko kasnite više od 30 minuta, naplaćuje se dodatni dan. Preporučujemo da nas unapred kontaktirate u slučaju kašnjenja.",
  },
  {
    question: "Da li se vozilo izdaje sa punim rezervoarom?",
    answer:
      "Da, svako vozilo se izdaje sa punim rezervoarom i očekujemo da se vrati u istom stanju. U suprotnom se naplaćuje razlika goriva + usluga dopune.",
  },
  {
    question: "Kako mogu da rezervišem vozilo?",
    answer:
      "Rezervaciju možete izvršiti putem sajta, pozivom ili licno u nasim prostorijama.",
  },
  {
    question: "Koji su načini plaćanja?",
    answer:
      "Prihvatamo gotovinu, platne kartice i uplatu preko firme. Depozit se ostavlja prilikom preuzimanja vozila i vraća se nakon završetka najma.",
  },
  {
    question: "Da li se vozila redovno servisiraju?",
    answer:
      "Apsolutno. Naša vozila su nova, tehnički ispravna i redovno održavana u ovlašćenim servisima. Bezbednost i pouzdanost su nam prioritet.",
  },
  {
    question: "Šta ako dođe do štete ili nezgode?",
    answer:
      "U slučaju bilo kakvog incidenta, obavezno odmah kontaktirajte nas i policiju. Detaljna procedura se nalazi u Uslovima najma. Kasko pokriva većinu slučajeva, osim ako nije došlo do grube nepažnje.",
  },
];

export default function FandQ() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:pt-32 lg:px-8 lg:py-40">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl">
              Frequently asked questions
            </h2>
          </div>
          <div className="mt-10 lg:col-span-7 lg:mt-0">
            <dl className="space-y-10">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="text-base/7 font-semibold text-gray-900">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 text-base/7 text-gray-600">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
