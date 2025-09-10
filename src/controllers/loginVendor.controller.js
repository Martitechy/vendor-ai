import { createError } from "../_shared/_helpers/createError.js";
import { createResponse } from "../_shared/_helpers/createResponse.js";
import { HTTP } from "../_shared/_constants/http.js";
import { RESPONSE } from "../_shared/_constants/response.js";
import { logger } from "../_shared/_utils/logger.js";
import VendorService from "../services/vendor.services.js";

export const loginVendor = async (req, res, next) => {
  try {
    const { phone } = req.body;

    const vendor = await VendorService.findVendor({ phone });
    if (!vendor) {
      return next(
        createError(HTTP.UNAUTHORIZED, [
          {
            status: RESPONSE.ERROR,
            message: "Vendor not found",
            statusCode: HTTP.UNAUTHORIZED,
            code: HTTP.UNAUTHORIZED,
          },
        ])
      );
    }
    // Optional: generate session/token here if needed
    return createResponse("Login successful", vendor)(res, HTTP.OK);
  } catch (error) {
    logger.error("loginVendor.controller:", error);
    return next(createError.InternalServerError(error));
  }
};
