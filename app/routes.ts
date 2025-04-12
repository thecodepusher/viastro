import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [route(":lang?", "routes/home.tsx", [])] satisfies RouteConfig;
