import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route(":lang?", "routes/home.tsx", []),
  route(":lang?/faq", "routes/faq-page.tsx", []),
  route(":lang?/contact", "routes/contact-page.tsx", []),
  route(":lang?/blog", "routes/blog-page.tsx", []),
  route(":lang?/success", "routes/success.tsx", []),
  route(":lang?/cars", "routes/cars-page.tsx", []),
  route(":lang?/rental-conditions", "routes/rental-conditions-page.tsx", []),
  route(":lang?/reservation", "routes/reservation-page.tsx", [
    index("./routes/reservation.tsx"),
    route("vehicle", "./routes/vehicle.tsx"),
    route("extras", "./routes/extras.tsx"),
    route("review", "./routes/review.tsx"),
  ]),
] satisfies RouteConfig;
