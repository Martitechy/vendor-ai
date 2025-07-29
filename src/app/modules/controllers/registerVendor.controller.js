import { createError } from "../../../../../_shared/_helpers/createError.js";
import { HTTP } from "../../../../../_shared/_constants/http.js";
import { RESPONSE } from "../../../../../_shared/_constants/response.js";
import VendorService from "../services/vendor.services.js";
import { logger } from "../../../../../_shared/_utils/logger.js";
import { generateVendorToken } from "../../../../../_shared/_utils/generateToken.js";

export const registerVendor = async (req, res, next) => {
  try {
    const { phone, businessName, whatsappNumber } = req.body;

    const existing = await VendorService.findVendor({ phone });
    if (existing) {
      return next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: RESPONSE.ERROR,
            message: "Phone number already registered",
            statusCode: HTTP.BAD_REQUEST,
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    }

    const newVendor = await VendorService.createVendor({
      businessName,
      phone,
      whatsappNumber,
    });

    const token = generateVendorToken(newVendor._id); // ✅ Correct ID used
    logger.info(token, "Generated token for new vendor", newVendor._id);

    return res.status(200).json({
      code: 200,
      status: RESPONSE.SUCCESS,
      message: "Vendor registered successfully",
      data: {
        vendor: newVendor,
        vendorToken: token, // ✅ Send token to frontend
      },
    });
  } catch (error) {
    logger.error("registerVendor.controller:", error);
    return next(createError.InternalServerError(error));
  }
};
