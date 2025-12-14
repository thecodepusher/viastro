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
  wsPayOrderId?: string;
  approvalCode?: string;
  baseUrl?: string;
};

export type LongTermInquiryPayload = {
  type: "business" | "individual";
  companyName?: string;
  taxId?: string;
  fullName?: string;
  email: string;
  phone?: string;
  message?: string;
};

const BREVO_URL = "https://api.brevo.com/v3/smtp/email";
const logoDataUri = "https://viastro.rs/logo_white.webp";

export async function sendReservationEmail(payload: ReservationEmailPayload) {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    throw new Error("BREVO_API_KEY is not configured.");
  }

  const extrasHtml =
    payload.extrasDescriptions.length > 0
      ? payload.extrasDescriptions
          .map(
            (extra) =>
              `<tr><td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${extra}</td></tr>`
          )
          .join("")
      : `<tr><td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Nema dodatnih stavki</td></tr>`;

  const paymentInfoHtml =
    payload.wsPayOrderId || payload.approvalCode
      ? `
    <div style="margin-top: 30px; padding: 20px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
      <h3 style="margin-top: 0; margin-bottom: 15px; color: #92400e; font-size: 16px;">💰 Informacije o preautorizaciji depozita</h3>
      <table style="width: 100%; border-collapse: collapse;">
        ${payload.wsPayOrderId ? `<tr><td style="padding: 6px 0; font-weight: 600; color: #374151; width: 200px;">WSPay Order ID:</td><td style="padding: 6px 0; color: #1f2937; font-family: monospace; font-size: 13px;">${payload.wsPayOrderId}</td></tr>` : ""}
        ${payload.approvalCode ? `<tr><td style="padding: 6px 0; font-weight: 600; color: #374151; width: 200px;">Approval Code:</td><td style="padding: 6px 0; color: #1f2937; font-family: monospace; font-size: 13px;">${payload.approvalCode}</td></tr>` : ""}
      </table>
      <p style="margin-top: 15px; margin-bottom: 0; color: #92400e; font-size: 13px; line-height: 1.6;">
        <strong>Napomena:</strong> Depozit je preautorizovan. Možete izvršiti <strong>capture</strong> (naplatu) ili <strong>release</strong> (otpuštanje) preautorizacije depozita preko 
        <a href="https://administration.wspay.biz/HR/Transaction/BrowseAuthorized" style="color: #d97706; text-decoration: underline;">WSPay admin panela</a>.
      </p>
    </div>
    `
      : "";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
      <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f3f4f6;">
        <tr>
          <td style="padding: 0;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 0;">
              <div style="background: linear-gradient(135deg, #FF9B17 0%, #ff8c00 100%); padding: 30px 40px; text-align: center;">
                <img 
                  src="${logoDataUri}" 
                  alt="Viastro Logo" 
                  width="180" 
                  height="60"
                  style="max-width: 180px; max-height: 60px; width: auto; height: auto; margin: 0 auto; display: block; border: 0; outline: none; text-decoration: none;" 
                />
                <h1 style="margin: 15px 0 0 0; color: #ffffff; font-size: 24px; font-weight: 600;">Nova rezervacija</h1>
              </div>
              <div style="padding: 40px;">
          <div style="margin-bottom: 30px;">
            <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 18px; font-weight: 600; border-bottom: 2px solid #FF9B17; padding-bottom: 10px;">Detalji rezervacije</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #374151; width: 180px;">Vozilo:</td>
                <td style="padding: 10px 0; color: #1f2937; font-size: 15px;">${payload.carName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #374151;">Preuzimanje:</td>
                <td style="padding: 10px 0; color: #1f2937;">${payload.pickupSummary}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #374151;">Povraćaj:</td>
                <td style="padding: 10px 0; color: #1f2937;">${payload.dropoffSummary}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #374151;">Broj dana:</td>
                <td style="padding: 10px 0; color: #1f2937;">${payload.days} ${payload.days === 1 ? "dan" : "dana"}</td>
              </tr>
            </table>
          </div>
          <div style="margin-bottom: 30px;">
            <h3 style="margin: 0 0 20px 0; color: #111827; font-size: 16px; font-weight: 600;">💵 Finansijski pregled</h3>
            <div style="margin-bottom: 16px; background-color: #f9fafb; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Cena najma vozila</p>
              <p style="margin: 0; color: #1f2937; font-size: 20px; font-weight: 700;">${payload.carPrice.toFixed(2)}€</p>
              <p style="margin: 8px 0 0 0; color: #6b7280; font-size: 12px;">Ukupna cena za ${payload.days} ${payload.days === 1 ? "dan" : "dana"} najma</p>
            </div>

            <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb;">
              <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Depozit</p>
              <table style="width: 100%; border-collapse: collapse;">
                ${
                  payload.depositDiscount > 0
                    ? `
                <tr>
                  <td style="padding: 6px 0; color: #6b7280; font-size: 14px;">Originalni depozit:</td>
                  <td style="padding: 6px 0; text-align: right; color: #6b7280; font-size: 14px; text-decoration: line-through;">${payload.carDeposit.toFixed(2)}€</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #6b7280; font-size: 14px;">Popust:</td>
                  <td style="padding: 6px 0; text-align: right; color: #059669; font-weight: 600; font-size: 14px;">-${payload.depositDiscount.toFixed(2)}€</td>
                </tr>
                <tr style="border-top: 2px solid #e5e7eb; margin-top: 8px;">
                  <td style="padding: 10px 0 0 0; color: #1f2937; font-weight: 600; font-size: 15px;">Depozit za naplatu:</td>
                  <td style="padding: 10px 0 0 0; text-align: right; font-weight: 700; color: #1f2937; font-size: 18px;">${payload.depositDue.toFixed(2)}€</td>
                </tr>
                `
                    : `
                <tr>
                  <td style="padding: 6px 0; color: #1f2937; font-weight: 600; font-size: 15px;">Depozit za naplatu:</td>
                  <td style="padding: 6px 0; text-align: right; font-weight: 700; color: #1f2937; font-size: 18px;">${payload.carDeposit.toFixed(2)}€</td>
                </tr>
                `
                }
              </table>
              <p style="margin: 12px 0 0 0; color: #6b7280; font-size: 12px; font-style: italic;">Depozit je preautorizovan i vraća se po završetku najma</p>
            </div>
          </div>
          <div style="margin-bottom: 30px;">
            <h3 style="margin: 0 0 15px 0; color: #111827; font-size: 16px; font-weight: 600;">🔧 Dodatna oprema</h3>
            <table style="width: 100%; border-collapse: collapse; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden;">
              ${extrasHtml}
            </table>
          </div>
          <div style="margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #FF9B17 0%, #ff8c00 100%); border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #ffffff; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px;">Ukupna cena</p>
            <p style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700;">${payload.totalPrice.toFixed(2)}€</p>
          </div>
          <div style="margin-bottom: 30px; padding-top: 30px; border-top: 2px solid #e5e7eb;">
            <h3 style="margin: 0 0 20px 0; color: #111827; font-size: 18px; font-weight: 600; border-bottom: 2px solid #FF9B17; padding-bottom: 10px;">👤 Podaci klijenta</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #374151; width: 120px;">Ime i prezime:</td>
                <td style="padding: 10px 0; color: #1f2937;">${payload.customerName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #374151;">Email:</td>
                <td style="padding: 10px 0; color: #1f2937;">
                  <a href="mailto:${payload.customerEmail}" style="color: #FF9B17; text-decoration: none;">${payload.customerEmail}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #374151;">Telefon:</td>
                <td style="padding: 10px 0; color: #1f2937;">
                  <a href="tel:${payload.customerPhone}" style="color: #FF9B17; text-decoration: none;">${payload.customerPhone}</a>
                </td>
              </tr>
            </table>
          </div>
              ${paymentInfoHtml}
            </div>
            <div style="background-color: #f9fafb; padding: 20px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">Viastro Rent a Car - Automatski generisan email</p>
            </div>
          </div>
        </td>
      </tr>
    </table>
    </body>
    </html>
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

export async function sendLongTermInquiryEmail(
  payload: LongTermInquiryPayload
) {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    throw new Error("BREVO_API_KEY is not configured.");
  }

  const isBusiness = payload.type === "business";
  const subjectName = isBusiness
    ? payload.companyName || "Firma"
    : payload.fullName || "Klijent";
  const subject = `Upit za dugoročni najam - ${subjectName}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
      <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f3f4f6;">
        <tr>
          <td style="padding: 0;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 0;">
              <div style="background: linear-gradient(135deg, #FF9B17 0%, #ff8c00 100%); padding: 30px 40px; text-align: center;">
                <img 
                  src="${logoDataUri}" 
                  alt="Viastro Logo" 
                  width="180" 
                  height="60"
                  style="max-width: 180px; max-height: 60px; width: auto; height: auto; margin: 0 auto; display: block; border: 0; outline: none; text-decoration: none;" 
                />
                <h1 style="margin: 15px 0 0 0; color: #ffffff; font-size: 24px; font-weight: 600;">Upit za dugoročni najam</h1>
              </div>
              <div style="padding: 40px;">
          <!-- Tip klijenta -->
          <div style="margin-bottom: 30px; padding: 16px; background-color: ${isBusiness ? "#eff6ff" : "#f0fdf4"}; border-radius: 8px; border-left: 4px solid ${isBusiness ? "#3b82f6" : "#22c55e"};">
            <p style="margin: 0; color: ${isBusiness ? "#1e40af" : "#166534"}; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">
              ${isBusiness ? "🏢 Pravno lice" : "👤 Fizičko lice"}
            </p>
          </div>
          <div style="margin-bottom: 30px;">
            <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 18px; font-weight: 600; border-bottom: 2px solid #FF9B17; padding-bottom: 10px;">📋 Podaci klijenta</h2>
            <table style="width: 100%; border-collapse: collapse;">
              ${
                isBusiness
                  ? `
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #374151; width: 180px;">Naziv firme:</td>
                <td style="padding: 10px 0; color: #1f2937; font-size: 15px;">${payload.companyName || "-"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #374151;">PIB:</td>
                <td style="padding: 10px 0; color: #1f2937; font-size: 15px;">${payload.taxId || "-"}</td>
              </tr>
              `
                  : `
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #374151; width: 180px;">Ime i prezime:</td>
                <td style="padding: 10px 0; color: #1f2937; font-size: 15px;">${payload.fullName || "-"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #374151;">Telefon:</td>
                <td style="padding: 10px 0; color: #1f2937; font-size: 15px;">
                  ${payload.phone ? `<a href="tel:${payload.phone}" style="color: #FF9B17; text-decoration: none;">${payload.phone}</a>` : "-"}
                </td>
              </tr>
              `
              }
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #374151;">Email:</td>
                <td style="padding: 10px 0; color: #1f2937; font-size: 15px;">
                  <a href="mailto:${payload.email}" style="color: #FF9B17; text-decoration: none;">${payload.email}</a>
                </td>
              </tr>
            </table>
          </div>
          ${
            payload.message
              ? `
          <div style="margin-bottom: 30px; padding-top: 30px; border-top: 2px solid #e5e7eb;">
            <h3 style="margin: 0 0 15px 0; color: #111827; font-size: 16px; font-weight: 600;">💬 Opis zahteva</h3>
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #1f2937; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${payload.message.replace(/\n/g, "<br/>")}</p>
            </div>
          </div>
          `
              : ""
          }
          <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #FF9B17 0%, #ff8c00 100%); border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #ffffff; font-size: 15px; font-weight: 600;">
              Molimo kontaktirajte klijenta i ponudite opcije dugoročnog najma
            </p>
            </div>
            <div style="background-color: #f9fafb; padding: 20px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">Viastro Rent a Car - Automatski generisan email</p>
            </div>
          </div>
        </td>
      </tr>
    </table>
    </body>
    </html>
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
        name: "Viastro",
      },
      to: [
        {
          email: "reservations@viastro.rs",
          name: "Reservations",
        },
      ],
      replyTo: {
        email: payload.email,
        name: subjectName,
      },
      subject,
      htmlContent,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Brevo API responded with an error.");
  }
}
