import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { config } from "../_config/dotenvconfig.js";
import { createError } from "../_helpers/createError.js";
import { logger } from "../_utils/logger.js";

const createAuthMiddleware = (Model) => {
  return async (req, res, next) => {
    try {
      const token =
        req.headers.authorization?.split(" ")[1] || req.cookies?.token;

      if (!token) {
        logger.warn("No authorization token provided");
        return next(
          createError.Unauthorized("No Authorization Headers Passed")
        );
      }

      const decoded = jwt.verify(token, config.JWT_SECRET);
      logger.info("Decoded JWT payload:", decoded);

      if (!mongoose.Types.ObjectId.isValid(decoded.id)) {
        logger.warn(`Invalid ObjectId format: ${decoded.id}`);
        return next(createError.Unauthorized("Invalid token payload"));
      }

      logger.info(`Using model: ${Model.modelName}`);
      const user = await Model.findById(decoded.id).select("+role").lean();

      if (!user) {
        logger.warn(`Token valid but no user found with ID: ${decoded.id}`);
        return next(createError.Unauthorized("User not found"));
      }

      req.user = {
        id: user._id,
        role: user.role,
        email: user.email || null,
        phone: user.phone || null,
      };

      next();
    } catch (error) {
      logger.error("authMiddleware error:", error);
      return next(createError.InternalServerError("Invalid or expired token"));
    }
  };
};
export { createAuthMiddleware };
