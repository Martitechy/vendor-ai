import { RESPONSE } from "../_constants/response.js";
import { HTTP } from "../_constants/http.js";

class AppError extends Error {
  constructor(
    statusCode,
    { message, data = null, code = null, status = null }
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code || statusCode;
    this.data = data;
    this.status = status || RESPONSE.ERROR;
    Error.captureStackTrace(this, this.constructor);
  }
}

const createError = (statusCode, errors) => {
  const errorInfo = errors?.[0] || {};
  return new AppError(statusCode, {
    message: errorInfo.message || "Something went wrong",
    data: errorInfo.data || null,
    code: errorInfo.code || statusCode,
    status: errorInfo.status || RESPONSE.ERROR,
  });
};

// Shortcuts
createError.BadRequest = (message = "Bad Request", data = null) =>
  createError(HTTP.BAD_REQUEST, [{ message, data, code: HTTP.BAD_REQUEST }]);

createError.Unauthorized = (message = "Unauthorized", data = null) =>
  createError(HTTP.UNAUTHORIZED, [{ message, data, code: HTTP.UNAUTHORIZED }]);

createError.Forbidden = (message = "Forbidden", data = null) =>
  createError(HTTP.FORBIDDEN, [{ message, data, code: HTTP.FORBIDDEN }]);

createError.NotFound = (message = "Not Found", data = null) =>
  createError(HTTP.NOT_FOUND, [{ message, data, code: HTTP.NOT_FOUND }]);

createError.InternalServerError = (data = null) =>
  createError(HTTP.SERVER_ERROR, [
    {
      message: "Internal Server Error.",
      data:
        data?.message ||
        "Server downtime, unable to complete request. Try again later.",
      code: HTTP.SERVER_ERROR,
    },
  ]);

export { createError };
