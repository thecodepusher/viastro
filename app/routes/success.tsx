import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { CheckIcon, CircleCheck } from "lucide-react";
import { Link } from "react-router";

export default function Reservation() {
  return (
    <div className="w-full">
      <Header />
      <div className="my-32 gap-8 flex flex-col items-center justify-center text-center">
        <CircleCheck size={60} className="text-p" />
        <p className="font-medium text-lg text-pd mx-8">
          Vaša rezervacija je uspešno poslata. Bićete kontaktirani o potvrdi
          rezervacije.
        </p>
        <Link to="../">
          <Button className="bg-s">Vratite se na početnu</Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
