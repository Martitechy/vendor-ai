import { createError } from "../../../../../_shared/_helpers/createError.js";
import { createResponse } from "../../../../../_shared/_helpers/createResponse.js";
import { HTTP } from "../../../../../_shared/_constants/http.js";
import VendorService from "../services/vendor.services.js";
import { logger } from "../../../../../_shared/_utils/logger.js";

export const listVendors = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const filter = search
      ? { businessName: { $regex: search, $options: "i" } }
      : {};

    // FIX: Pass a valid select argument (string or object)
    const selectFields = "businessName name email"; // adjust fields as needed

    const vendors = await VendorService.findAllVendors(
      Number(limit),
      Number(page),
      filter,
      selectFields // Pass selectFields as the 4th argument
    );

    if (!vendors.data || vendors.data.length === 0) {
      return next(
        createError(HTTP.NOT_FOUND, [
          {
            status: RESPONSE.ERROR,
            message: "No vendors found",
            statusCode: HTTP.NOT_FOUND,
            data: {},
            code: HTTP.NOT_FOUND,
          },
        ])
      );
    } else {
      logger.info("Vendors retrieved successfully");
      return createResponse("Vendors retrieved", vendors)(res, HTTP.OK);
    }
  } catch (error) {
    logger.error("listVendors controller:", error);
    return next(createError.InternalServerError(error));
  }
};
