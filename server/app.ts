import { createRequestHandler } from "@react-router/express";
import express from "express";
import "react-router";

declare module "react-router" {
  interface AppLoadContext {
    VALUE_FROM_EXPRESS: string;
  }
}

export const app = express();

// Handle .well-known paths (used by Chrome DevTools and other tools)
// Return 404 without triggering React Router
app.use((req, res, next) => {
  if (req.path.startsWith("/.well-known/")) {
    return res.status(404).end();
  }
  next();
});

app.use(
  createRequestHandler({
    build: () => import("virtual:react-router/server-build"),
    getLoadContext() {
      return {
        VALUE_FROM_EXPRESS: "Hello from Express",
      };
    },
  })
);
