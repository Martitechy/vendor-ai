import { createError } from "../../../../../_shared/_helpers/createError.js";
import { createResponse } from "../../../../../_shared/_helpers/createResponse.js";
import { HTTP } from "../../../../../_shared/_constants/http.js";
import { RESPONSE } from "../../../../../_shared/_constants/response.js";
import VendorService from "../services/vendor.services.js";
import { logger } from "../../../../../_shared/_utils/logger.js";

export const updateVendor = async (req, res, next) => {
  try {
    // Check if user is logged in (assuming req.user is set by auth middleware)
    if (!req.user) {
      return res.redirect("/login");
    }

    const vendorId = req.params.id;
    const updates = req.body;

    // Only allow editing name and businessName
    const allowedUpdates = {};
    if ("name" in updates) allowedUpdates.name = updates.name;
    if ("businessName" in updates)
      allowedUpdates.businessName = updates.businessName;

    const vendor = await VendorService.updateVendor(
      { _id: vendorId },
      allowedUpdates
    );
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
