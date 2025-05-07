import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { langCookie, prefs } from "@/lib/prefs-cookie";
import { en } from "@/locales/en";
import { Form, Outlet, redirect, replace } from "react-router";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Route } from "./+types/review";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { aditionalEquipment, cars, locations } from "@/lib/data";
import { differenceInCalendarDays, format } from "date-fns";
import { calculateInWorkingHours } from "@/lib/helpers";
import nodemailer from "nodemailer";
import { sr } from "@/locales/sr";

export async function loader({ request, context, params }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");

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

  const cookie = (await prefs.parse(cookieHeader)) || {};

  let lang = en;

  if (params.lang) {
    switch (params.lang) {
      case "sr":
        lang = sr;
    }
  }

  const car = cars.find((x) => x.id === +cookie.carId);
  const pickup = locations.find((x) => x.id === +cookie.pickUpLocation);
  const dropOff = locations.find((x) => x.id === +cookie.dropOffLocation);
  const pickupDate = cookie.pickUpDate;
  const pickupTime = cookie.pickUpTime;
  const dropoffDate = cookie.dropOffDate;
  const dropoffTime = cookie.dropOffTime;

  if (!car) {
    return redirect("../vehicle");
  }

  let notInWorkingHours = calculateInWorkingHours(
    dropoffDate,
    pickupDate,
    dropoffTime,
    pickupTime
  );

  let price = 0;

  const days = differenceInCalendarDays(dropoffDate, pickupDate);

  let carPrice = 0;

  for (let price of car.prices) {
    if (!price.to) {
      carPrice = days * price.price;
      break;
    }

    if (days >= price.from && days <= price.to) {
      carPrice = price.price * days;
      break;
    }
  }

  price += carPrice;

  const idExtras = cookie.extras as string;

  let extras: { id: number; name: string; price: number; perDay: boolean }[] =
    [];

  if (notInWorkingHours) {
    price += 10;
  }

  if (idExtras) {
    const ae = [...car.aditionalEquipment, ...aditionalEquipment];

    idExtras
      .split(",")
      .map((x) => +x)
      .forEach((x) => {
        const a = ae.find((a) => a.id == x)!;

        let aPrice = 0;

        if (a.perDay) {
          if (a.maxPerDays && a.maxPerDays < days) {
            aPrice = a.price * a.maxPerDays;
          } else {
            aPrice = days * a.price;
          }
        } else {
          aPrice = a.price;
        }

        price += aPrice;

        extras.push({ ...a, price: aPrice });
      });
  }

  return {
    days,
    price,
    lang,
    carPrice,
    extras,
    car,
    pickup,
    notInWorkingHours,
    dropOff,
    pickupDate,
    pickupTime,
    dropoffDate,
    dropoffTime,
    langCode: params.lang,
  };
}

export async function action({ request }: Route.ActionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};

  const car = cars.find((x) => x.id === +cookie.carId);
  const pickup = locations.find((x) => x.id === +cookie.pickUpLocation);
  const dropOff = locations.find((x) => x.id === +cookie.dropOffLocation);
  const pickupDate = cookie.pickUpDate;
  const pickupTime = cookie.pickUpTime;
  const dropoffDate = cookie.dropOffDate;
  const dropoffTime = cookie.dropOffTime;

  const formData = await request.formData();

  const firstName = formData.get("first_name");
  const lastName = formData.get("last_name");
  const email = formData.get("email");
  const phone = formData.get("phone");

  if (!car) {
    return redirect("../vehicle");
  }

  let notInWorkingHours = calculateInWorkingHours(
    dropoffDate,
    pickupDate,
    dropoffTime,
    pickupTime
  );

  let price = 0;

  const days = differenceInCalendarDays(dropoffDate, pickupDate);

  let carPrice = 0;

  for (let price of car.prices) {
    if (!price.to) {
      carPrice = days * price.price;
      break;
    }

    if (days >= price.from && days <= price.to) {
      carPrice = price.price * days;
      break;
    }
  }

  price += carPrice;

  const idExtras = cookie.extras as string;

  let extras: { id: number; name: string; price: number }[] = [];

  if (notInWorkingHours) {
    price += 10;
  }

  if (idExtras) {
    const ae = [...car.aditionalEquipment, ...aditionalEquipment];

    idExtras
      .split(",")
      .map((x) => +x)
      .forEach((x) => {
        const a = ae.find((a) => a.id == x)!;

        let aPrice = 0;

        if (a.perDay) {
          if (a.maxPerDays && a.maxPerDays < days) {
            aPrice = a.price * a.maxPerDays;
          } else {
            aPrice = days * a.price;
          }
        } else {
          aPrice = a.price;
        }

        price += aPrice;

        extras.push({ ...a, price: aPrice });
      });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: "<office@viastro.rs>", // sender address
    to: process.env.EMAIL_OFFICE, // list of receivers
    subject: "New reservation", // Subject line
    html: `
    <p>${car!.name}</p>
    <p>Pickup: ${pickup!.name} ${format(
      pickupDate,
      "dd/MM/yyyy"
    )} - ${pickupTime}</p>
    <p>Dropoff: ${dropOff!.name} ${format(
      dropoffDate,
      "dd/MM/yyyy"
    )} - ${dropoffTime}</p>

    ${
      notInWorkingHours
        ? `<p>Dodatak za rezervaciju van radnog vremena - 10€</p>`
        : ``
    }
    ${extras.map((x) => `<p>${x.name} - ${x.price}€</p>`)}
    <p>Car price: ${carPrice}€</p>
    <p>Total Price: ${price}€</p>
    <p>Deposite: ${car.deposite}€</p>
    <br/>
    <p>${firstName} ${lastName}</p>
    <p>${email}</p>
    <p>${phone}</p>
    `, // html body
  });

  return redirect("../../success", {
    headers: {
      "Set-Cookie": await prefs.serialize({}),
    },
  });
}
export function meta({}: Route.MetaArgs) {}

export default function Reservation({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="w-full">
      <h3 className="mx-6 my-4 font-bold text-xl">Cost summery</h3>
      <div className="mx-6 p-4 border rounded shadow flex gap-2 flex-col">
        <div>
          <Label>Pickup</Label>
          <p>
            {loaderData.pickup?.name}{" "}
            {format(loaderData.pickupDate, "dd/MM/yyyy")} -{" "}
            {loaderData.pickupTime}
          </p>
        </div>
        <div>
          <Label>Dropoff</Label>
          <p>
            {loaderData.dropOff?.name}{" "}
            {format(loaderData.dropoffDate, "dd/MM/yyyy")} -{" "}
            {loaderData.dropoffTime}
          </p>
        </div>
        <div>
          <Label>Vehicle</Label>
          <p>
            {loaderData.car?.name}
            {" - "}
            <span className="font-bold text-s text-lg">
              {loaderData.carPrice.toFixed(2)}€
            </span>
          </p>
        </div>

        {(loaderData.extras.length > 0 || loaderData.notInWorkingHours) && (
          <div>
            <Label className="">Extras</Label>

            <div className="flex flex-col ">
              {loaderData.notInWorkingHours && (
                <div>
                  Dodatak za rezervaciju van radnog vremena
                  {" - "}
                  <span className="font-bold text-s text-lg">10€</span>
                </div>
              )}

              {loaderData.extras.map((extra) => (
                <div key={`ext-${extra.id}`}>
                  {extra.name}
                  {" - "}
                  <span className="font-bold text-s text-lg">
                    {extra.price.toFixed(2)}€
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <Label>Total</Label>
          <p className="font-bold text-s text-lg">
            {loaderData.price.toFixed(2)}€
          </p>
        </div>

        <div>
          <Label>Depozit</Label>
          <p>
            <span className="font-bold text-s text-lg">
              {loaderData.car.deposite}€
            </span>
          </p>
        </div>
      </div>

      <h3 className="mx-6 my-4 font-bold text-xl">Your information</h3>

      <Form method="POST">
        <div className="mx-6 mt-4 p-4 border rounded shadow flex flex-col gap-4 mb-6">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              required
              type="email"
              id="email"
              name="email"
              placeholder="Email"
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="first_name">First name</Label>
            <Input
              required
              type="text"
              id="first_name"
              name="first_name"
              placeholder="First name"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="last_name">Last name</Label>
            <Input
              required
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Last name"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="phone">Phone</Label>
            <Input
              required
              type="phone"
              id="phone"
              name="phone"
              placeholder="Phone"
            />
          </div>

          <div className="items-top flex space-x-2">
            <Checkbox required id="terms1" />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                AGREEMENT
              </label>
              <p className="text-sm text-muted-foreground">
                We need your agreement so we can contact you regarding your
                reservation. Find out more about our privacy policy, Conversion
                Statement, User Privacy Protection, Confidential Transaction
                Data Protection, and Refunds. here.
              </p>
            </div>
          </div>
        </div>
        <div className="flex mx-6 mb-6">
          <Button type="submit" size="lg" className="w-full bg-s hover:bg-p">
            Finish
          </Button>
        </div>
      </Form>
    </div>
  );
}
