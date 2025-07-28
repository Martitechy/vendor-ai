import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import { RESPONSE } from "../_shared/_constants/response.js";
import { HTTP } from "../_shared/_constants/http.js";
import { createError } from "../_shared/_helpers/createError.js";
import { config } from "../_shared/_config/dotenvconfig.js";
import { db } from "../_shared/_config/db.js";
import { logger } from "../_shared/_utils/logger.js";
import { vendorRoutes } from "../Vendors/src/app/routes.entry.js";

// ✅ Initialize Database
db();

const app = express();
app.disable("x-powered-by");

// ✅ Core Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan("dev"));

// ✅ Home Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Martinez AI API!" });
});

// ✅ Syntax error handler (invalid JSON payloads)
app.use(function (_err, _req, _res, next) {
  if (_err instanceof SyntaxError && _err.status === 400 && "body" in _err) {
    return _res.status(HTTP.BAD_REQUEST).json({
      code: HTTP.UNPROCESSED_ENTITY,
      status: RESPONSE.ERROR,
      message: "Invalid JSON payload passed.",
      data: null,
    });
  }
  next(_err);
});

// ✅ Mount versioned API routes
const apiURL = `/api/vendor/${config.APP_VERSION}`;
app.use(apiURL, vendorRoutes()); // 👈 Call the function if vendorRoutes is a function

// ✅ 404 handler for unmatched API routes
app.use((req, res) => {
  res.status(404).json({
    code: HTTP.NOT_FOUND,
    status: RESPONSE.ERROR,
    message: "Route not found",
    data: null,
  });
});
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    code: err.code || statusCode,
    status: err.status || "error",
    message: err.message || "Internal Server Error",
    data: err.data || null,
  });
});

// ✅ Global error handler
app.use((error, _req, res, _next) => {
  logger.error(error);
  const initialError = error;

  if (!error.statusCode) {
    error = createError(HTTP.SERVER_ERROR, [
      {
        code: HTTP.SERVER_ERROR,
        status: RESPONSE.ERROR,
        message: initialError.message || "Internal Server Error",
        data: error.data,
        stack: error.stack,
      },
    ]);
  }

  res.status(error.statusCode).json({
    code: error.code,
    status: error.status,
    message: error.message,
    data: error.data || null,
    ...(process.env.NODE_ENV === "development" && {
      stack: error.stack,
    }),
  });
});

// ✅ Start Server
app.listen(config.SERVER_PORT, () => {
  logger.info(
    `🏩 🍀 🌿  Server Running ${config.APP_NAME} version ${config.APP_VERSION} 🔛 on port ${config.SERVER_PORT} 😇 😇 🌿🌿`
  );
});
