export type ReservationEmailPayload = {
  carName: string;
  pickupSummary: string;
  dropoffSummary: string;
  days: number;
  carPrice: number;
  totalPrice: number;
  carDeposit: number;
  depositDiscount: number;
  depositDue: number;
  extrasDescriptions: string[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
};

const BREVO_URL = "https://api.brevo.com/v3/smtp/email";

export async function sendReservationEmail(payload: ReservationEmailPayload) {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    throw new Error("BREVO_API_KEY is not configured.");
  }

  const extrasHtml =
    payload.extrasDescriptions.length > 0
      ? payload.extrasDescriptions.map((extra) => `<li>${extra}</li>`).join("")
      : "<li>Nema dodatnih stavki</li>";

  const htmlContent = `
    <h2>Nova rezervacija sa sajta</h2>
    <p><strong>Vozilo:</strong> ${payload.carName}</p>
    <p><strong>Preuzimanje:</strong> ${payload.pickupSummary}</p>
    <p><strong>Povraćaj:</strong> ${payload.dropoffSummary}</p>
    <p><strong>Broj dana:</strong> ${payload.days}</p>
    <p><strong>Cena vozila:</strong> ${payload.carPrice.toFixed(2)}€</p>
    <p><strong>Ukupna cena:</strong> ${payload.totalPrice.toFixed(2)}€</p>
    <p><strong>Depozit za vozilo:</strong> ${payload.carDeposit.toFixed(2)}€</p>
    <p><strong>Popust na depozit:</strong> ${payload.depositDiscount.toFixed(
      2
    )}€</p>
    <p><strong>Depozit za naplatu:</strong> ${payload.depositDue.toFixed(
      2
    )}€</p>
    <h3>Dodatna oprema</h3>
    <ul>${extrasHtml}</ul>
    <h3>Podaci klijenta</h3>
    <p><strong>Ime i prezime:</strong> ${payload.customerName}</p>
    <p><strong>Email:</strong> ${payload.customerEmail}</p>
    <p><strong>Telefon:</strong> ${payload.customerPhone}</p>
  `;

  const response = await fetch(BREVO_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: {
        email: "office@viastro.rs",
        name: "Viastro Reservations",
      },
      to: [
        {
          email: "reservations@viastro.rs",
          name: "Reservations",
        },
      ],
      replyTo: {
        email: payload.customerEmail,
        name: payload.customerName,
      },
      subject: `Nova rezervacija - ${payload.carName}`,
      htmlContent,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Brevo API responded with an error.");
  }
}
