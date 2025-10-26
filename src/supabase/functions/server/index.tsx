import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { blogRouter } from "./blog-routes.tsx";
import { traceRouter } from "./trace-routes.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-8dae514e/health", (c) => {
  return c.json({ status: "ok" });
});

// Blog routes
app.route("/make-server-8dae514e/blog", blogRouter);

// Trace routes
app.route("/make-server-8dae514e", traceRouter);

Deno.serve(app.fetch);