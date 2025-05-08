import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie_consent");
    if (!accepted) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 flex justify-center">
      <Card className="w-full max-w-xl shadow-xl border border-gray-200 bg-white">
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4">
          <p className="text-sm text-gray-700">
            Koristimo kolačiće radi poboljšanja korisničkog iskustva.
            Korišćenjem sajta prihvatate našu politiku privatnosti.
          </p>
          <Button onClick={handleAccept}>Prihvati</Button>
        </CardContent>
      </Card>
    </div>
  );
}
