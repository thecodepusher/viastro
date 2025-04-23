import { createCookie } from "react-router";
export const prefs = createCookie("prefs", {
  path: "/",
});
