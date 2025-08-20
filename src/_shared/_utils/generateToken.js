import jwt from "jsonwebtoken";
import { config } from "../_config/dotenvconfig.js";

const generateVendorToken = (vendorId) => {
  return jwt.sign({ id: vendorId }, config.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export { generateVendorToken };
