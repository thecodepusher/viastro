import Cta from "@/components/Cta";
import FandQ from "@/components/FandQ";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { en } from "@/locales/en";
import type { Route } from "./+types/rental-conditions-page";
import { langCookie } from "@/lib/prefs-cookie";
import { replace } from "react-router";
import { sr } from "@/locales/sr";

export async function loader({ request, context, params }: Route.LoaderArgs) {
  if (!params.lang) {
    const cookieHeader = request.headers.get("Cookie");

    const lgCookie = (await langCookie.parse(cookieHeader)) || {};

    const url = new URL(request.url);

    let returnPath = url.pathname;

    if (lgCookie.lang) {
      if (returnPath == "/") {
        return replace(`/${lgCookie.lang}`);
      }
      return replace(`/${lgCookie.lang}${url.pathname}`);
    }

    if (returnPath == "/") {
      return replace(`/en`);
    }

    return replace(`/en${url.pathname}`);
  }

  let lang = en;

  if (params.lang) {
    switch (params.lang) {
      case "sr":
        lang = sr;
    }
  }

  return {
    langCode: params.lang ?? "en",
    lang,
    message: context.VALUE_FROM_EXPRESS,
  };
}

export default function Home({ actionData, loaderData }: Route.ComponentProps) {
  return (
    <div className="w-full">
      <Header />

      <div className="mx-4 mt-24 mb-4 flex flex-col gap-2">
        <p className="text-lg font-bold">Rental conditions</p>
        <p>
          USLOVI NAJMA VOZILA – VIASTRO DOO <br />
          📍 Adresa: Danila Lekića Španca 31, Novi Beograd <br />
          📑 PIB: 114961759 | Matični broj: 22096737 <br />
          📧 Email: office@viastro.rs | 📞 Tel: 069/656-555 <br />
          1. 📌 OPŠTE ODREDBE <br />
          • Ovi uslovi su sastavni deo svakog Ugovora o najmu zaključenog sa
          VIASTRO DOO. <br />
          • Klijent potpisom potvrđuje da je upoznat sa svim uslovima i da ih u
          celosti prihvata. <br />
          • Ugovor se sklapa u skladu sa zakonima Republike Srbije i ima punu
          pravnu snagu. <br />
          <br />
          2. 🚗 KORIŠĆENJE VOZILA <br />• Vozilo se izdaje tehnički ispravno,
          oprano i sa punim rezervoarom. <br />
          • Zabranjeno je koristiti vozilo za: trke, off-road, vuču, školu
          vožnje, ilegalne aktivnosti, prevoz opasnih materija, vožnju pod
          dejstvom alkohola ili opijata. <br />
          • Zabranjeno je ostavljanje vozila otključanog ili sa ključevima u
          bravi. <br />
          • Klijent je dužan da prilikom vraćanja vozila dostavi vozilo oprano
          spolja i iznutra i sa istim nivoom goriva. <br />
          • Ukoliko vozilo nije vraćeno u navedenom stanju, Izdavalac ima pravo
          da naplati usluge pranja i/ili dolivanja goriva po važećem cenovniku.
          <br />
          • Vožnja u sledeće zemlje je dozvoljena isključivo uz prethodnu
          saglasnost Izdavaoca: zemlje EU, Crna Gora, Bosna i Hercegovina,
          Severna Makedonija. Vožnja u druge zemlje je zabranjena, takodje
          teritorija AP Kosovo i Metohije je zabranjena. <br />
          • Nepravilno korišćenje vozila koje dovede do gubitka fabričke
          garancije povlači punu odgovornost Klijenta.
          <br />
          • Viastro DOO zadržava pravo da u bilo kom trenutku, bez prethodne
          najave, povrati iznajmljeno vozilo.
          <br />
          <br />
          3. 👤 VOZAČKA PRAVA I OGRANIČENJA
          <br />
          • Minimalna starost vozača: 21 godina (25 godina za luksuzne klase
          vozila).
          <br />
          • Vozačka dozvola mora biti važeća najmanje 2 godine.
          <br />
          • Dodatni vozač mora biti upisan u ugovor i ispunjavati iste uslove.
          <br />
          • Za vozače mlađe od 25 godina i starije od 70 godina može se
          obračunati dodatna taksa zbog povećanog rizika.
          <br />
          <br />
          4. 🌍 KORIŠĆENJE VAN GRANICA
          <br />
          • Dozvoljeno samo uz pismenu saglasnost Izdavaoca.
          <br />
          • Klijent snosi sve troškove vezane za dodatno osiguranje i
          međunarodnu dokumentaciju.
          <br />
          • Bez saglasnosti, korišćenje van Srbije se tretira kao grubo kršenje
          ugovora.
          <br />
          • Ukoliko vozilo bude korišćeno van teritorije dozvoljenih zemalja bez
          saglasnosti Izdavaoca, Klijent snosi punu odgovornost za štetu, krađu
          i pravne posledice.
          <br />
          <br />
          5. 🧾 DOKUMENTACIJA I ODGOVORNOST
          <br />
          • Klijent preuzima obavezu da čuva dokumentaciju i ključeve vozila.
          <br />
          • U slučaju gubitka saobraćajne dozvole, ključa, tablica ili nalepnica
          – naplaćuje se po važećem cenovniku.
          <br />
          • Vozilo se fotografiše pri preuzimanju i vraćanju – fotografije su
          dokaz u slučaju spora.
          <br />
          <br />
          6. 💵 DEPOZIT I NAPLATA
          <br />
          • Depozit se ostavlja prilikom preuzimanja vozila.
          <br />
          • Depozit se koristi za pokriće: štete, goriva, pranja, kazni, gubitka
          dokumentacije ili opreme.
          <br />
          • Izdavalac zadržava pravo da zadrži deo ili ceo iznos depozita do 30
          dana nakon najma, radi pokrića eventualnih kazni iz MUP-a ili
          osiguranja.
          <br />
          • Izdavalac ima pravo da zadrži deo ili ceo iznos depozita do 30 dana
          nakon završetka najma radi eventualnih kazni, troškova ili šteta koje
          se mogu retroaktivno pojaviti.
          <br />
          <br />
          7. 🛡️ OSIGURANJE I ŠTETE
          <br />
          • Vozila su osigurana osnovnim i kasko osiguranjem sa učešćem u šteti
          (franšiza).
          <br />
          • Kasko NE pokriva: gume, felne, stakla, trap, podvozje, enterijer,
          motor, kvačilo i štete nastale usled nepažnje ili neadekvatnog
          korišćenja.
          <br />
          • Štetu procenjuje ovlašćeni procenitelj vozila.
          <br />
          • Ukoliko nema policijskog zapisnika i/ili prijave štete – Klijent
          snosi punu materijalnu odgovornost.
          <br />
          • 📌 U slučaju saobraćajne nezgode u kojoj Klijent NIJE kriv:
          <br />
          - Klijent NE snosi učešće u šteti ako dostavi policijski zapisnik,
          podatke o drugom učesniku i koristi vozilo u skladu sa ugovorom.
          <br />
          • 📌 U slučaju saobraćajne nezgode u kojoj Klijent JESTE kriv:
          <br />
          - Klijent snosi učešće u šteti (franšizu) u skladu sa važećom kasko
          polisom.
          <br />
          - Minimalno 100 EUR + PDV, maksimalno prema osiguranoj vrednosti (npr.
          5% vozila ili 600 EUR).
          <br />
          • 📌 Klijent snosi PUNU vrednost štete u sledećim slučajevima:
          <br />
          - Neprijavljivanje policiji i/ili Izdavaocu.
          <br />
          - Nedostavljanje originalnih ključeva i dokumentacije u slučaju krađe.
          <br />
          - Vožnja pod uticajem alkohola/opojnih sredstava ili bez važeće
          vozačke dozvole.
          <br />
          - Korišćenje vozila u zabranjenim uslovima (npr. trke, off-road, bez
          dozvole za izlazak iz zemlje).
          <br />
          <br />
          8. 🚨 SAOBRAĆAJNE NEZGODE I KRAĐA
          <br />
          • U slučaju nezgode – Klijent je dužan da odmah obavesti policiju i
          Izdavaoca i dostavi policijski zapisnik.
          <br />
          • U slučaju krađe – Klijent mora odmah obavestiti policiju i Izdavaoca
          i predati originalne ključeve i dokumentaciju.
          <br />
          • U suprotnom, smatra se da postoji saučesništvo, a Klijent snosi punu
          vrednost vozila.
          <br />
          <br />
          9. 📦 OPREMA I UNUTRAŠNJOST
          <br />
          • Dodatna oprema (GPS, sedišta, lanci i sl.) mora biti vraćena
          neoštećena.
          <br />
          • Gubitak ili oštećenje dodatne opreme naplaćuje se po važećem
          cenovniku (do 30.000 RSD).
          <br />
          • Pušenje u vozilu i teška oštećenja enterijera (fleke, mirisi)
          povlače obavezu dubinskog čišćenja po važećem cenovniku.
          <br />
          <br />
          10. ⏰ KAŠNJENJE I POVRAĆAJ
          <br />
          • Dozvoljeno kašnjenje: do 30 minuta bez dodatne naplate.
          <br />
          • Kašnjenje preko 30 minuta – dodatni dan najma.
          <br />
          • Vozilo se vraća na lokaciju preuzimanja ili drugu uz dogovor.
          <br />
          11. 📆 OTKAZIVANJE REZERVACIJE
          <br />
          • Otkazivanje do 48h pre početka – bez troška.
          <br />
          • Otkazivanje manje od 48h – 30% ukupne sume najma.
          <br />
          • Nepojavljivanje – 100% sume za prvi dan najma.
          <br />
          <br />
          12. 🔐 ZAŠTITA PODATAKA I NADLEŽNOST
          <br />
          • Lični podaci klijenata koriste se isključivo za obradu najma u
          skladu sa Zakonom o zaštiti podataka.
          <br />
          • Sporove rešava stvarno nadležni sud u Beogradu.
          <br />
          • Klijent potpisom potvrđuje saglasnost sa svim navedenim uslovima.
          <br />
          • Svi podaci koje Klijent dostavi obrađuju se u skladu sa Zakonom o
          zaštiti podataka o ličnosti. Klijent ima pravo na pristup, ispravku i
          brisanje svojih podataka, osim kada zakon nalaže njihovo čuvanje.
          <br />
          <br />
        </p>
      </div>

      <Footer />
    </div>
  );
}
