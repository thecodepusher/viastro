import type { BaseLocale } from "@/locales/base-locale";

type StepStatus = "complete" | "current" | "upcoming";

export const reservationSteps = (
  loaderData: { lang: BaseLocale },
  currentRoute: { id: string; pathname: string }
) => {
  const steps: Array<{
    id: string;
    name: string;
    routeId: string;
    href: string;
    pathname: string;
    status: StepStatus;
  }> = [
    {
      id: "1",
      name: loaderData.lang.reservation,
      routeId: "routes/reservation",
      href: "./",
      pathname: "/reservation/",
      status: "upcoming",
    },
    {
      id: "2",
      name: loaderData.lang.vehicles,
      routeId: "routes/vehicle",
      href: "./vehicle",
      pathname: "/reservation/vehicle",
      status: "upcoming",
    },
    {
      id: "3",
      name: loaderData.lang.accessories,
      routeId: "routes/extras",
      href: "./extras",
      pathname: "/reservation/extras",
      status: "upcoming",
    },
    {
      id: "4",
      name: loaderData.lang.review,
      routeId: "routes/review",
      href: "./review",
      pathname: "/reservation/review",
      status: "upcoming",
    },
  ];

  const normalizePathname = (pathname: string): string => {
    let normalized = pathname.replace(/^\/(sr|en|ru)/, "");
    normalized = normalized.replace(/\/$/, "") || "/reservation";
    if (!normalized.startsWith("/")) {
      normalized = "/" + normalized;
    }
    return normalized;
  };

  const currentPathname = normalizePathname(currentRoute.pathname);

  const currentStepIndex = steps.findIndex((step) => {
    const normalizedStepPath = normalizePathname(step.pathname);
    return normalizedStepPath === currentPathname;
  });

  if (currentStepIndex !== -1) {
    steps.forEach((step, index) => {
      if (index < currentStepIndex) {
        step.status = "complete";
      } else if (index === currentStepIndex) {
        step.status = "current";
      } else {
        step.status = "upcoming";
      }
    });
  }

  return steps;
};
