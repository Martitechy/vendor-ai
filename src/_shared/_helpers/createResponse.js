/**
 * Creates a reusable response payload
 *
 * @returns Response
 */
export const createResponse =
  (message, data = [], pagination, status = "success") =>
  (res, code) => {
    res.status(code).json({ code, status, message, data, pagination });
  };
