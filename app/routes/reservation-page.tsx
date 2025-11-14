import Header from "@/components/Header";
import type { Route } from "./+types/reservation-page";
import Footer from "@/components/Footer";
import { Link, Outlet, useMatches } from "react-router";
import { CheckIcon } from "lucide-react";
import { cn, getLocale } from "@/lib/utils";

export async function loader({ request, params }: Route.LoaderArgs) {
  const lang = await getLocale(params.lang, request);

  return {
    lang,
    langCode: params.lang ?? "en",
  };
}

export async function action({ request }: Route.ActionArgs) {}
export function meta({}: Route.MetaArgs) {}

export default function ReservationPage({ loaderData }: Route.ComponentProps) {
  const matches = useMatches();

  const currentRoute = matches[2];

  const steps = [
    {
      id: "01",
      name: loaderData.lang.reservation,
      routeId: "routes/reservation",
      href: "./",
      status: currentRoute.id == "routes/reservation" ? "current" : "",
    },
    {
      id: "02",
      name: loaderData.lang.vehicles,
      routeId: "routes/vehicle",
      href: "./vehicle",
      status: currentRoute.id == "routes/vehicle" ? "current" : "",
    },
    {
      id: "03",
      name: loaderData.lang.accessories,
      routeId: "routes/extras",
      href: "./extras",
      status: currentRoute.id == "routes/extras" ? "current" : "",
    },
    {
      id: "04",
      name: loaderData.lang.review,
      routeId: "routes/review",
      href: "./review",
      status: currentRoute.id == "routes/review" ? "current" : "",
    },
  ];

  const currentStep = steps.find((x) => x.routeId == currentRoute.id);

  steps.forEach((step, index) => {
    const currentStepIndex = steps.indexOf(currentStep!);

    if (index > currentStepIndex) {
      step.status = "upcoming";
    } else if (index < steps.indexOf(currentStep!)) {
      step.status = "complete";
    } else {
      step.status = "current";
    }
  });

  return (
    <div className="w-full">
      <Header lang={loaderData.lang} langCode={loaderData.langCode} />

      <div className="py-4 bg-p mt-18 lg:border-t lg:border-b lg:border-gray-200">
        <nav
          aria-label="Progress"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ol
            role="list"
            className="overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-r lg:border-l lg:border-gray-200">
            {steps.map((step, stepIdx) => (
              <li key={step.id} className="relative overflow-hidden lg:flex-1">
                <div
                  className={cn(
                    stepIdx === 0 ? "rounded-t-md border-b-0" : "",
                    stepIdx === steps.length - 1
                      ? "rounded-b-md border-t-0"
                      : "",
                    "overflow-hidden border border-gray-200 lg:border-0"
                  )}>
                  {step.status === "complete" ? (
                    <Link to={step.href} className="group">
                      <span
                        aria-hidden="true"
                        className="absolute top-0 left-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:top-auto lg:bottom-0 lg:h-1 lg:w-full"
                      />
                      <span
                        className={cn(
                          stepIdx !== 0 ? "lg:pl-9" : "",
                          "flex items-center px-6 py-5 text-sm font-medium"
                        )}>
                        <span className="shrink-0">
                          <span className="flex size-10 items-center justify-center rounded-full bg-s">
                            <CheckIcon
                              aria-hidden="true"
                              className="size-6 text-white"
                            />
                          </span>
                        </span>
                        <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
                          <span className="text-sm text-white font-medium">
                            {step.name}
                          </span>
                        </span>
                      </span>
                    </Link>
                  ) : step.status === "current" ? (
                    <Link to={step.href} aria-current="step">
                      <span
                        aria-hidden="true"
                        className="absolute top-0 left-0 h-full w-1 bg-s lg:top-auto lg:bottom-0 lg:h-1 lg:w-full"
                      />
                      <span
                        className={cn(
                          stepIdx !== 0 ? "lg:pl-9" : "",
                          "flex items-center px-6 py-5 text-sm font-medium"
                        )}>
                        <span className="shrink-0">
                          <span className="flex size-10 items-center justify-center rounded-full border-2 border-s">
                            <span className="text-s">{step.id}</span>
                          </span>
                        </span>
                        <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
                          <span className="text-sm font-medium text-s">
                            {step.name}
                          </span>
                        </span>
                      </span>
                    </Link>
                  ) : (
                    <div className="group">
                      <span
                        aria-hidden="true"
                        className="absolute top-0 left-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:top-auto lg:bottom-0 lg:h-1 lg:w-full"
                      />
                      <span
                        className={cn(
                          stepIdx !== 0 ? "lg:pl-9" : "",
                          "flex items-center px-6 py-5 text-sm font-medium"
                        )}>
                        <span className="shrink-0">
                          <span className="flex size-10 items-center justify-center rounded-full border-2 border-white/40">
                            <span className="text-white/70">{step.id}</span>
                          </span>
                        </span>
                        <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
                          <span className="text-sm font-medium text-white/70">
                            {step.name}
                          </span>
                        </span>
                      </span>
                    </div>
                  )}

                  {stepIdx !== 0 ? (
                    <>
                      {/* Separator */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 top-0 left-0 hidden w-3 lg:block">
                        <svg
                          fill="none"
                          viewBox="0 0 12 82"
                          preserveAspectRatio="none"
                          className="size-full text-gray-300">
                          <path
                            d="M0.5 0V31L10.5 41L0.5 51V82"
                            stroke="currentcolor"
                            vectorEffect="non-scaling-stroke"
                          />
                        </svg>
                      </div>
                    </>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <div className="min-h-[400px]">
        <Outlet />
      </div>
      <Footer lang={loaderData.lang} langCode={loaderData.langCode} />
    </div>
  );
}
