import { createError } from "../../../../../_shared/_helpers/createError.js";
import { createResponse } from "../../../../../_shared/_helpers/createResponse.js";
import { HTTP } from "../../../../../_shared/_constants/http.js";
import { RESPONSE } from "../../../../../_shared/_constants/response.js";
import VendorService from "../services/vendor.services.js";
import { logger } from "../../../../../_shared/_utils/logger.js";

export const getVendorProfile = async (req, res, next) => {
  try {
    const requestedId = req.params.id; // Vendor ID from the URL
    const authenticatedUser = req.user; // Comes from middleware

    // Access Control: Admin can view any profile; Vendor only their own
    if (
      authenticatedUser.role !== "admin" &&
      authenticatedUser.id.toString() !== requestedId
    ) {
      return next(
        createError(HTTP.FORBIDDEN, [
          {
            status: RESPONSE.ERROR,
            message: "You do not have permission to view this profile",
            statusCode: HTTP.UNAUTHORIZED,
            code: HTTP.FORBIDDEN,
          },
        ])
      );
    }

    const vendor = await VendorService.findVendorById(requestedId);
    if (!vendor) {
      return next(
        createError(HTTP.NOT_FOUND, [
          {
            status: RESPONSE.ERROR,
            message: "Vendor profile not found",
            statusCode: HTTP.NOT_FOUND,
            code: HTTP.NOT_FOUND,
          },
        ])
      );
    }

    return createResponse("Vendor profile", vendor)(res, HTTP.OK);
  } catch (error) {
    logger.error("getVendorProfile.controller:", error);
    return next(createError.InternalServerError(error));
  }
};
