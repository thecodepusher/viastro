import { type RouteConfig, index, route } from "@react-router/dev/routes";

const routes = [
  route("select-lang", "routes/select-lang.tsx"),
  route(":lang?", "routes/home.tsx"),
  route(":lang?/faq", "routes/faq-page.tsx"),
  route(":lang?/contact", "routes/contact-page.tsx"),
  route(
    ":lang?/rent-a-car-aerodrom-beograd-nikola-tesla",
    "routes/landing-tesla.tsx"
  ),
  route(":lang?/rent-a-car-belgrade-airport", "routes/landing-airport.tsx"),
  route(":lang?/blog", "routes/blog-page.tsx"),
  route(":lang?/blog/:slug", "routes/blog-details.tsx"),
  route(":lang?/success", "routes/success.tsx"),
  route(":lang?/cars", "routes/cars-page.tsx"),
  route(":lang?/rental-conditions", "routes/rental-conditions-page.tsx"),
  route(":lang?/privacy-policy", "routes/privacy-policy-page.tsx"),
  route(":lang?/reservation", "routes/reservation-page.tsx", [
    index("routes/reservation/index.tsx"),
    route("vehicle", "routes/reservation/vehicle.tsx"),
    route("extras", "routes/reservation/extras.tsx"),
    route("review", "routes/reservation/review.tsx"),
  ]),
];

export default routes satisfies RouteConfig;
