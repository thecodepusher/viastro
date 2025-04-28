import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route(":lang?", "routes/home.tsx", []),
  route(":lang?/success", "routes/success.tsx", []),
  route(":lang?/vehicle", "routes/cars-page.tsx", []),
  route(":lang?/reservation", "routes/reservation-page.tsx", [
    index("./routes/reservation.tsx"),
    route("vehicle", "./routes/vehicle.tsx"),
    route("extras", "./routes/extras.tsx"),
    route("review", "./routes/review.tsx"),
  ]),
] satisfies RouteConfig;
