import { createError } from "../_shared/_helpers/createError.js";
import { createResponse } from "../_shared/_helpers/createResponse.js";
import { HTTP } from "../_shared/_constants/http.js";
import { RESPONSE } from "../_shared/_constants/response.js";
import { logger } from "../_shared/_utils/logger.js";
import VendorService from "../services/vendor.services.js";

export const updateVendor = async (req, res, next) => {
  try {
    const vendorId = req.params.id;
    const updates = req.body;

    const vendor = await VendorService.updateVendor({ _id: vendorId }, updates);
    if (!vendor) {
      return next(
        createError(HTTP.NOT_FOUND, [
          {
            status: RESPONSE.ERROR,
            message: "Vendor not found",
            statusCode: HTTP.NOT_FOUND,
            code: HTTP.NOT_FOUND,
          },
        ])
      );
    }
    return createResponse("Vendor updated", vendor)(res, HTTP.OK);
  } catch (error) {
    logger.error("updateVendor.controller:", error);
    return next(createError.InternalServerError(error));
  }
};
