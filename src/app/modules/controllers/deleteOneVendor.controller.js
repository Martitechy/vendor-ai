import { createError } from "../../../../../_shared/_helpers/createError.js";
import { createResponse } from "../../../../../_shared/_helpers/createResponse.js";
import { HTTP } from "../../../../../_shared/_constants/http.js";
import { RESPONSE } from "../../../../../_shared/_constants/response.js";
import VendorService from "../services/vendor.services.js";
import { logger } from "../../../../../_shared/_utils/logger.js";

// Controller to hard delete a vendor by ID
// Expects the vendor ID to be provided in req.params.id
// Returns a success message if deletion is successful
// Returns a 404 error if the vendor does not exist
// Catches and logs any unexpected errors, returning a 500 error response in such cases
// Usage example: DELETE /vendors/:id
// where :id is the ID of the vendor to be deleted
// Requires authentication and appropriate permissions to delete a vendor
export const deleteOneVendor = async (req, res, next) => {
  try {
    const { id } = req.params;

    // First, check if the vendor exists
    const vendor = await VendorService.findVendorById(id);
    if (!vendor) {
      return next(
        createError(HTTP.NOT_FOUND, [
          {
            status: RESPONSE.ERROR,
            message: "Vendor does not exist or has already been deleted",
            statusCode: HTTP.NOT_FOUND,
            code: HTTP.NOT_FOUND,
          },
        ])
      );
    }

    // Hard delete the vendor
    const result = await VendorService.deleteVendor({ _id: id });

    if (!result || result.deletedCount === 0) {
      return next(
        createError(HTTP.NOT_FOUND, [
          {
            status: RESPONSE.ERROR,
            message: "Vendor could not be deleted or does not exist",
            statusCode: HTTP.NOT_FOUND,
            code: HTTP.NOT_FOUND,
          },
        ])
      );
    }

    return createResponse("Vendor deleted (hard) successfully")(res, HTTP.OK);
  } catch (error) {
    logger.error("deleteVendor.controller:", error);
    return next(createError.InternalServerError(error));
  }
};
