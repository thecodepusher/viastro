import compression from "compression";
import express from "express";
import morgan from "morgan";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { config } from "dotenv";

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const BUILD_PATH = join(__dirname, "build/server/index.js");
const DEVELOPMENT = process.env.NODE_ENV === "development";
const PORT = Number.parseInt(process.env.PORT || "9000");

const app = express();

app.use(compression());
app.disable("x-powered-by");

app.use((req, res, next) => {
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

  res.setHeader(
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

  res.setHeader("X-Frame-Options", "SAMEORIGIN");

  res.setHeader("X-Content-Type-Options", "nosniff");

  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  res.setHeader(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()"
  );

  next();
});

app.use((req, res, next) => {
  if (req.path.startsWith("/.well-known/")) {
    return res.status(404).end();
  }
  next();
});

if (DEVELOPMENT) {
  console.log("Starting development server");
  const viteDevServer = await import("vite").then((vite) =>
    vite.createServer({
      server: { middlewareMode: true },
    })
  );
  app.use(viteDevServer.middlewares);
  app.use(async (req, res, next) => {
    try {
      const source = await viteDevServer.ssrLoadModule("./server/app.ts");
      return await source.app(req, res, next);
    } catch (error) {
      if (typeof error === "object" && error instanceof Error) {
        viteDevServer.ssrFixStacktrace(error);
      }
      next(error);
    }
  });
} else {
  console.log("Starting production server");
  app.use(
    "/assets",
    express.static("build/client/assets", { immutable: true, maxAge: "1y" })
  );
  app.use(express.static("build/client", { maxAge: "1h" }));
  app.use(await import(BUILD_PATH).then((mod) => mod.app));
}

app.use(morgan("tiny"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
