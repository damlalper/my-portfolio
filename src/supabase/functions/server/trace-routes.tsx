import { Hono } from "npm:hono";
import * as kv from "./kv_store.tsx";

export const traceRouter = new Hono();

// POST /traces - Create a new trace drawing
traceRouter.post("/traces", async (c) => {
  try {
    const body = await c.req.json();
    const { image, timestamp } = body;

    if (!image) {
      return c.json({ success: false, error: "Image data is required" }, 400);
    }

    // Generate unique ID for the trace
    const traceId = `trace_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Store the trace in the KV store
    await kv.set(traceId, {
      image,
      timestamp: timestamp || new Date().toISOString(),
      createdAt: new Date().toISOString(),
    });

    console.log(`Trace saved successfully: ${traceId}`);

    return c.json({
      success: true,
      traceId,
      message: "Trace saved successfully",
    });
  } catch (error) {
    console.error("Error saving trace:", error);
    return c.json(
      {
        success: false,
        error: `Failed to save trace: ${error instanceof Error ? error.message : String(error)}`,
      },
      500
    );
  }
});

// GET /traces - Get all traces
traceRouter.get("/traces", async (c) => {
  try {
    const traces = await kv.getByPrefix("trace_");

    return c.json({
      success: true,
      traces: traces || [],
      count: traces?.length || 0,
    });
  } catch (error) {
    console.error("Error fetching traces:", error);
    return c.json(
      {
        success: false,
        error: `Failed to fetch traces: ${error instanceof Error ? error.message : String(error)}`,
      },
      500
    );
  }
});

// GET /traces/:id - Get a specific trace
traceRouter.get("/traces/:id", async (c) => {
  try {
    const traceId = c.req.param("id");
    const trace = await kv.get(traceId);

    if (!trace) {
      return c.json({ success: false, error: "Trace not found" }, 404);
    }

    return c.json({
      success: true,
      trace,
    });
  } catch (error) {
    console.error("Error fetching trace:", error);
    return c.json(
      {
        success: false,
        error: `Failed to fetch trace: ${error instanceof Error ? error.message : String(error)}`,
      },
      500
    );
  }
});
