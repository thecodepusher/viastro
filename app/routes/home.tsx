import { database } from "~/database/context";
import * as schema from "~/database/schema";

import type { Route } from "./+types/home";
import { DateTimePicker24h } from "@/components/DateTimePicker";
import { Label } from "@/components/ui/label";
import { en } from "@/locales/en";
import logoWhite from "viastro_logo_white.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CalendarIcon, Menu } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import FandQ from "@/components/FandQ";
import TrustedBy from "@/components/TrustedBy";
import BlogSection from "@/components/BlogSection";
import Feature from "@/components/Feature";
import Logos from "@/components/Logos";
import GetInTouch from "@/components/GetInTouch";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Viastro rent a car | Belgrade" },
    { name: "description", content: "" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  let name = formData.get("name");
  let email = formData.get("email");
  if (typeof name !== "string" || typeof email !== "string") {
    return { guestBookError: "Name and email are required" };
  }

  name = name.trim();
  email = email.trim();
  if (!name || !email) {
    return { guestBookError: "Name and email are required" };
  }

  const db = database();
  try {
    await db.insert(schema.guestBook).values({ name, email });
  } catch (error) {
    return { guestBookError: "Error adding to guest book" };
  }
}

export async function loader({ context, params }: Route.LoaderArgs) {
  let lang = en;

  // if (params.lang) {
  //   switch (params.lang) {
  //     case "sr":
  //       lang = sr;
  //   }
  // }

  // const db = database();

  // const guestBook = await db.query.guestBook.findMany({
  //   columns: {
  //     id: true,
  //     name: true,
  //   },
  // });

  const locations = [
    {
      id: 1,
      name: "Belgrade Airport",
    },
    { id: 2, name: "Novi Beograd" },
  ];

  return {
    lang,
    locations,
    message: context.VALUE_FROM_EXPRESS,
  };
}

const times = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];

const navigation = {
  main: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
    { name: "Accessibility", href: "#" },
    { name: "Partners", href: "#" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "X",
      href: "#",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "#",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "#",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

export default function Home({ actionData, loaderData }: Route.ComponentProps) {
  const [pickDate, setPickDate] = useState<Date | undefined>(new Date());
  const [dropDate, setDropDate] = useState<Date | undefined>(
    addDays(new Date(), 7)
  );

  const [pickUpTime, setPickUpTime] = useState("15:00");
  const [dropOfTime, setDropOfTime] = useState("15:00");

  return (
    <div className="w-full">
      <header className="fixed z-40 top-0 h-18 w-full bg-[#FF9B17]">
        <div className="max-w-7xl justify-between items-center mx-auto px-2 flex h-18 py-1">
          <img className="h-16" src={logoWhite} />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Menu className="text-white mr-2" size={34} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-col w-full mt-18">
        <div className="gap-4 flex flex-col bg-gradient-to-b from-[#FF9B17]">
          <div className="mx-4 mt-8">
            <h1 className="text-center text-white font-black uppercase text-xl">
              {loaderData.lang.title}
            </h1>
            <h2 className="text-center text-[#614B80] font-black uppercase text-2xl">
              {loaderData.lang.subTitle}
            </h2>
          </div>

          <div className="mx-auto mt-8 ">
            <h3 className="px-4 pb-1 font-black text-2xl text-white">
              Create a reservation
            </h3>
            <div className="bg-white shadow rounded-lg p-4 mb-8 flex flex-col lg:items-end lg:flex-row gap-4">
              <div className="flex flex-col gap-1">
                <Label>{loaderData.lang.pickUpLoacation}</Label>
                <Select>
                  <SelectTrigger className="w-[260px] md:w-[180px]">
                    <SelectValue placeholder={loaderData.lang.choose} />
                  </SelectTrigger>

                  <SelectContent>
                    {loaderData.locations.map((location) => (
                      <SelectItem key={location.id} value={`${location.id}`}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <Label>{loaderData.lang.dropOffLoacation}</Label>
                <Select>
                  <SelectTrigger className="w-[260px] md:w-[180px]">
                    <SelectValue placeholder={loaderData.lang.choose} />
                  </SelectTrigger>

                  <SelectContent>
                    {loaderData.locations.map((location) => (
                      <SelectItem key={location.id} value={`${location.id}`}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <Label>{loaderData.lang.pickUpTime}</Label>
                <div className="flex gap-0.5">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[170px] justify-start text-left font-normal",
                          !pickDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {pickDate ? (
                          format(pickDate, "PPP")
                        ) : (
                          <span>{loaderData.lang.choose}</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={pickDate}
                        fromDate={new Date()}
                        onSelect={setPickDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <Select value={pickUpTime} onValueChange={setPickUpTime}>
                    <SelectTrigger className="w-[90px]">
                      <SelectValue placeholder={loaderData.lang.choose} />
                    </SelectTrigger>

                    <SelectContent>
                      {times.map((time) => (
                        <SelectItem key={`pickUp${time}`} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Label>{loaderData.lang.dropOffTime}</Label>
                <div className="flex gap-0.5">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[170px] justify-start text-left font-normal",
                          !dropDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dropDate ? (
                          format(dropDate, "PPP")
                        ) : (
                          <span>{loaderData.lang.choose}</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dropDate}
                        fromDate={new Date()}
                        onSelect={setDropDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Select value={dropOfTime} onValueChange={setDropOfTime}>
                    <SelectTrigger className="w-[90px]">
                      <SelectValue placeholder={loaderData.lang.choose} />
                    </SelectTrigger>

                    <SelectContent>
                      {times.map((time) => (
                        <SelectItem key={`dropOff${time}`} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="bg-[#614B80]">Start</Button>
            </div>
          </div>
        </div>
      </div>

      <BlogSection />
      <Logos />
      <Feature />
      <GetInTouch />

      <TrustedBy />
      <FandQ />

      <footer className="bg-[#181320]">
        <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
          <nav
            aria-label="Footer"
            className="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6"
          >
            {navigation.main.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-white"
              >
                {item.name}
              </a>
            ))}
          </nav>
          <div className="mt-16 flex justify-center gap-x-10">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-gray-300"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" className="size-6" />
              </a>
            ))}
          </div>
          <p className="mt-10 text-center text-sm/6 text-gray-400">
            &copy; 2024 Your Company, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
