import type { BaseLocale } from "@/locales/base-locale";
import { publicPaths } from "@/lib/paths";

type StepStatus = "complete" | "current" | "upcoming";

export const reservationSteps = (
  loaderData: { lang: BaseLocale; langCode: string },
  currentRoute: { id: string; pathname: string }
) => {
  const langCode = loaderData.langCode || "sr";

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
      href: publicPaths.reservation(langCode),
      pathname: publicPaths.reservation(),
      status: "upcoming",
    },
    {
      id: "2",
      name: loaderData.lang.vehicles,
      routeId: "routes/vehicle",
      href: publicPaths.reservationVehicle(langCode),
      pathname: publicPaths.reservationVehicle(),
      status: "upcoming",
    },
    {
      id: "3",
      name: loaderData.lang.accessories,
      routeId: "routes/extras",
      href: publicPaths.reservationExtras(langCode),
      pathname: publicPaths.reservationExtras(),
      status: "upcoming",
    },
    {
      id: "4",
      name: loaderData.lang.review,
      routeId: "routes/review",
      href: publicPaths.reservationReview(langCode),
      pathname: publicPaths.reservationReview(),
      status: "upcoming",
    },
  ];

  const normalizePathname = (pathname: string): string => {
    let normalized = pathname.replace(/^\/(sr|en|ru)/, "");
    normalized = normalized.replace(/\/$/, "") || publicPaths.reservation();
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
