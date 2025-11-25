import { createRequestHandler } from "react-router";
import { createRequestHandler as createExpressRequestHandler } from "@react-router/express";

import * as build from "virtual:react-router/server-build";

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

// For Vercel - export default Web API-compatible function
const handler = createRequestHandler(build);

export default async function (request: Request): Promise<Response> {
  return handler(request, {
    // Add your "load context" here based on the current request
    ...getLoadContext(),
  });
}

// For local Express development - export app middleware
export const app = createExpressRequestHandler({
  build: () => Promise.resolve(build),
  getLoadContext,
});
