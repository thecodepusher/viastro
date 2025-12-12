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

const handler = createRequestHandler(build);

export default async function (request: Request): Promise<Response> {
  const response = await handler(request, {
    ...getLoadContext(),
  });

  const headers = new Headers(response.headers);

  const databaseUrl =
    process.env.DATABASE_URL ||
    "https://rentacar-manager.com/client/viastro/api/";
  let databaseDomain = "https://rentacar-manager.com";
  try {
    const url = new URL(databaseUrl);
    databaseDomain = `${url.protocol}//${url.hostname}`;
  } catch (e) {
    console.error("Error parsing DATABASE_URL:", e);
  }

  headers.set(
    "Content-Security-Policy",
    "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://www.googleadservices.com; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "font-src 'self' https://fonts.gstatic.com data:; " +
      "img-src 'self' data: https: blob:; " +
      "connect-src 'self' ws://* wss://* ws://localhost:* wss://localhost:* http://localhost:* https://localhost:* " +
      `${databaseDomain} https://api.brevo.com https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://analytics.google.com https://stats.g.doubleclick.net https://formtest.wspay.biz https://form.wspay.biz; ` +
      "frame-src 'self' https://www.googletagmanager.com https://www.youtube.com https://www.google.com; " +
      "object-src 'none'; " +
      "base-uri 'self'; " +
      "form-action 'self' https://formtest.wspay.biz https://form.wspay.biz; " +
      "frame-ancestors 'self'; " +
      "upgrade-insecure-requests;"
  );

  headers.set("X-Frame-Options", "SAMEORIGIN");

  headers.set("X-Content-Type-Options", "nosniff");

  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  headers.set(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()"
  );

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: headers,
  });
}

export const app = createExpressRequestHandler({
  build: () => Promise.resolve(build),
  getLoadContext,
});
