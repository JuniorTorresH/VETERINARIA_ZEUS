import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes.js";
import { setupAuth } from "./auth.js";
import { serveStatic } from "./static.js";
import { createServer } from "http";

const app = express();

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

// Initialization state
let isInitialized = false;

// Initialization function to be called before handling requests
async function initializeServer() {
  if (isInitialized) return;

  try {
    log("Initializing server components...");
    setupAuth(app);
    const httpServer = createServer(app);
    await registerRoutes(httpServer, app);

    app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      console.error("Express Error Handler:", err);

      if (res.headersSent) {
        return next(err);
      }

      return res.status(status).json({ message, stack: process.env.NODE_ENV === 'development' ? err.stack : undefined });
    });

    if (process.env.NODE_ENV === "production") {
      serveStatic(app);
    } else {
      const { setupVite } = await import("./vite.js");
      await setupVite(httpServer, app);
    }

    isInitialized = true;
    log("Server components initialized successfully.");
    return httpServer;
  } catch (error) {
    console.error("Critical Server Initialization Error:", error);
    isInitialized = false;
    throw error;
  }
}

// Middleware to ensure initialization on Vercel
app.use(async (req, res, next) => {
  if (process.env.VERCEL && !isInitialized) {
    try {
      await initializeServer();
      next();
    } catch (error) {
      res.status(500).json({
        message: "Failed to initialize server. Check logs for details.",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  } else {
    next();
  }
});

// Export the app for Vercel
export default app;

// For local development
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  initializeServer().then((httpServer) => {
    if (httpServer) {
      const port = parseInt(process.env.PORT || "5000", 10);
      httpServer.listen(port, "0.0.0.0", () => {
        log(`Servidor corriendo en http://0.0.0.0:${port}`);
      });
    }
  });
}
