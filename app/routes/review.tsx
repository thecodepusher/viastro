import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prefs } from "@/lib/prefs-cookie";
import { en } from "@/locales/en";
import { Outlet, redirect } from "react-router";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Route } from "./+types/review";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cars } from "@/components/Cars";
import { locations } from "@/lib/data";
import {
  differenceInBusinessDays,
  differenceInCalendarDays,
  differenceInDays,
  format,
} from "date-fns";

export async function loader({ request, context, params }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};

  let lang = en;

  // if (params.lang) {
  //   switch (params.lang) {
  //     case "sr":
  //       lang = sr;
  //   }
  // }

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

  const price = car.price * differenceInCalendarDays(dropoffDate, pickupDate);

  return {
    price,
    lang,
    car,
    pickup,
    dropOff,
    pickupDate,
    pickupTime,
    dropoffDate,
    dropoffTime,
    langCode: params.lang,
  };
}

export async function action({ request }: Route.ActionArgs) {}
export function meta({}: Route.MetaArgs) {}

export default function Reservation({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="w-full">
      <h3 className="mx-6 my-4 font-bold text-xl">Cost summery</h3>
      <div className="mx-6 p-4 border rounded shadow">
        <div>
          Pickup: {loaderData.pickup?.name}{" "}
          {format(loaderData.pickupDate, "dd/MM/yyyy")} -{" "}
          {loaderData.pickupTime}
        </div>
        <div>
          Dropoff: {loaderData.dropOff?.name}{" "}
          {format(loaderData.dropoffDate, "dd/MM/yyyy")} -{" "}
          {loaderData.dropoffTime}
        </div>
        <div>Vehicle: {loaderData.car?.name}</div>

        <div>Total: {loaderData.price}€</div>
      </div>

      <h3 className="mx-6 my-4 font-bold text-xl">Your information</h3>

      <div className="mx-6 mt-4 p-4 border rounded shadow flex flex-col gap-4 mb-6">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="first_name">First name</Label>
          <Input type="text" id="first_name" placeholder="First name" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="last_name">Last name</Label>
          <Input type="text" id="last_name" placeholder="Last name" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input type="phone" id="phone" placeholder="Phone" />
        </div>

        <div className="items-top flex space-x-2">
          <Checkbox id="terms1" />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
            <p className="text-sm text-muted-foreground">
              You agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
      <div className="flex mx-6 mb-6">
        <Button size="lg" className="w-full bg-s hover:bg-p">
          Finish
        </Button>
      </div>
    </div>
  );
}
