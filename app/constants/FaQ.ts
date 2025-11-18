const faqsSr = [
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

const faqsEn = [
  {
    question: "What are the requirements to rent a vehicle?",
    answer:
      "You need to have a valid driver's license for at least 2 years and be over 21 years old. When picking up the vehicle, it is mandatory to present an ID card and driver's license.",
  },
  {
    question: "Is comprehensive (casco) insurance included in the price?",
    answer:
      "Yes, all our cars have comprehensive (casco) insurance with a deductible in case of damage. Details about coverage and exclusions can be found in the Rental Terms.",
  },
  {
    question: "Can I travel abroad with the vehicle?",
    answer:
      "Of course. It is necessary to announce your planned trip outside of Serbia in advance so we can provide additional documentation and international insurance.",
  },
  {
    question: "Is it possible to have the vehicle delivered to an address?",
    answer:
      "Yes, we offer vehicle delivery to your desired address, including the airport, apartment, or hotel. This service is charged extra and must be scheduled in advance.",
  },
  {
    question: "What if I'm late returning the vehicle?",
    answer:
      "If you are more than 30 minutes late, an additional day will be charged. We recommend contacting us in advance in case of a delay.",
  },
  {
    question: "Is the vehicle rented with a full tank of fuel?",
    answer:
      "Yes, every vehicle is rented with a full tank of fuel, and we expect it to be returned in the same condition. Otherwise, the fuel difference plus a refueling service fee will be charged.",
  },
  {
    question: "How can I book a vehicle?",
    answer:
      "You can make a reservation through our website, by phone, or in person at our office.",
  },
  {
    question: "What are the payment methods?",
    answer:
      "We accept cash, credit/debit cards, and company payments (bank transfer/invoice). A deposit is required upon vehicle pickup and is returned after the rental period ends.",
  },
  {
    question: "Are the vehicles regularly serviced?",
    answer:
      "Absolutely. Our vehicles are new, in good technical condition, and regularly maintained at authorized service centers. Safety and reliability are our priority.",
  },
  {
    question: "What if there is damage or an accident?",
    answer:
      "In case of any incident, you must immediately contact us and the police. The detailed procedure can be found in the Rental Terms. Comprehensive (casco) insurance covers most cases, unless gross negligence is involved.",
  },
];

const faqsRu = [
  {
    question:
      "Каким условиям я должен соответствовать, чтобы арендовать автомобиль?",
    answer:
      "Необходимо иметь действительное водительское удостоверение не менее 2 лет и быть старше 21 года. При получении автомобиля обязательно предъявить удостоверение личности и водительское удостоверение.",
  },
  {
    question: "Включена ли страховка КАСКО в стоимость?",
    answer:
      "Да, все наши автомобили имеют страховку КАСКО с франшизой при ущербе. Подробности о покрытии и исключениях находятся в Условиях аренды.",
  },
  {
    question: "Могу ли я выезжать на автомобиле за границу?",
    answer:
      "Конечно. Необходимо заранее сообщить о планируемой поездке за пределы Сербии, чтобы мы могли предоставить дополнительную документацию и страховку для выезда за границу.",
  },
  {
    question: "Возможна ли доставка автомобиля по адресу?",
    answer:
      "Да, мы предлагаем доставку автомобиля по указанному адресу, включая аэропорт, квартиру или отель. Эта услуга оплачивается дополнительно и должна быть заказана заранее.",
  },
  {
    question: "Что делать, если я опоздаю с возвратом автомобиля?",
    answer:
      "Если вы опоздаете более чем на 30 минут, взимается плата за дополнительный день. Рекомендуем связаться с нами заранее в случае опоздания.",
  },
  {
    question: "Предоставляется ли автомобиль с полным баком топлива?",
    answer:
      "Да, каждый автомобиль предоставляется с полным баком топлива, и мы ожидаем, что он будет возвращен в том же состоянии. В противном случае взимается плата за разницу в топливе + услуга по заправке.",
  },
  {
    question: "Как я могу забронировать автомобиль?",
    answer:
      "Вы можете сделать бронирование через сайт, по телефону или лично в нашем офисе.",
  },
  {
    question: "Какие способы оплаты доступны?",
    answer:
      "Мы принимаем наличные, платежные карты и оплату от юридических лиц (безналичный расчет). Депозит вносится при получении автомобиля и возвращается по окончании аренды.",
  },
  {
    question: "Проходят ли автомобили регулярное техническое обслуживание?",
    answer:
      "Абсолютно. Наши автомобили новые, технически исправны и регулярно обслуживаются в авторизованных сервисных центрах. Безопасность и надежность – наш приоритет.",
  },
  {
    question: "Что делать в случае повреждения или аварии?",
    answer:
      "В случае любого инцидента, немедленно свяжитесь с нами и полицией. Подробная процедура описана в Условиях аренды. КАСКО покрывает большинство случаев, за исключением грубой неосторожности.",
  },
];

export { faqsSr, faqsEn, faqsRu };
