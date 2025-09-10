import Vendor from "../models/vendor.js";
import { createResponse } from "../_shared/_helpers/createResponse.js";
import { createError } from "../_shared/_helpers/createError.js";
import { HTTP } from "../_shared/_constants/http.js";
import { RESPONSE } from "../_shared/_constants/response.js";

export const deleteManyVendor = async (req, res, next) => {
  try {
    const result = await Vendor.deleteMany({});
    return createResponse("All vendors deleted successfully", {
      deletedCount: result.deletedCount,
    })(res, HTTP.OK);
  } catch (error) {
    return next(
      createError(HTTP.INTERNAL_SERVER_ERROR, [
        {
          status: RESPONSE.ERROR,
          message: "Failed to delete all vendors",
          statusCode: HTTP.INTERNAL_SERVER_ERROR,
          code: HTTP.INTERNAL_SERVER_ERROR,
        },
      ])
    );
  }
};
