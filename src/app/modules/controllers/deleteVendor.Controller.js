import { createError } from "../../../../../../_shared/_helpers/createError.js";
import { createResponse } from "../../../../../../_shared/_helpers/createResponse.js";
import { HTTP } from "../../../../../../_shared/_constants/http.js";
import { RESPONSE } from "../../../../../../_shared/_constants/response.js";
import VendorService from "../services/vendor.services.js";
import { logger } from "../../../../../../_shared/_utils/logger.js";
export const deleteVendor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const vendor = await VendorService.findVendorById(id);
    if (!vendor || vendor.isDeleted) {
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

    await VendorService.update({ _id: id }, { isDeleted: true });

    return createResponse("Vendor deleted (soft) successfully")(res, HTTP.OK);
  } catch (error) {
    logger.error("deleteVendor.controller:", error);
    return next(createError.InternalServerError(error));
  }
};
