import { createCookie } from "react-router";
export const prefs = createCookie("prefs", {
  path: "/",
});

export const langCookie = createCookie("lang", {
  path: "/",
});
