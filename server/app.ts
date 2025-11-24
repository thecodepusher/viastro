import { createRequestHandler } from "@react-router/express";
import { createRequestListener } from "@react-router/node";
import "react-router";

declare module "react-router" {
  interface AppLoadContext {
    VALUE_FROM_EXPRESS: string;
  }
}

const getLoadContext = () => {
  return {
    VALUE_FROM_EXPRESS: "Hello from Express",
  };
};

// For Vercel - export handler
export const handler = createRequestListener({
  build: () => import("virtual:react-router/server-build"),
  getLoadContext,
});

// For local Express development - export app middleware
export const app = createRequestHandler({
  build: () => import("virtual:react-router/server-build"),
  getLoadContext,
});
