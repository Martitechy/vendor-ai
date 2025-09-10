import mongoose from "mongoose";
import { logger } from "../_utils/logger.js";
import { config } from "./dotenvconfig.js";

// const MONGODB_URI = || config.MONGODB;

const db = async () => {
  try {
    await mongoose.connect(config.MONGODBURI);
    logger.info("✅ MongoDB connected successfully"); // Log the successful connection
  } catch (error) {
    logger.info("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};
export { db };
