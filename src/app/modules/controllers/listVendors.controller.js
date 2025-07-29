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
    const vendors = await VendorService.findAllVendors(
      Number(limit),
      Number(page),
      filter
    );
    return createResponse("Vendors retrieved", vendors)(res, HTTP.OK);
  } catch (error) {
    logger.error("listVendors.controller:", error);
    return next(createError.InternalServerError(error));
  }
};
