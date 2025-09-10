import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const config = {
  SERVER_PORT: process.env.SERVER_PORT,
  MONGODB: process.env.MONGODB,
  MONGOURI: process.env.MONGOURI,
  MONGODBURI: process.env.MONGODBURI,
  APP_NAME: process.env.APP_NAME,
  APP_VERSION: process.env.APP_VERSION,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  SESSION_SECRET: process.env.SESSION_SECRET,
  ADMIN_SERVICE_URI: process.env.ADMIN_SERVICE_URI || "http://localhost:5000",
  USER_SERVICE_URI: process.env.USER_SERVICE_URI || "http://localhost:5001",
  AUTH_URI: process.env.AUTH_URI || "http://localhost:7001",
  AUTH_SERVICE_URI: process.env.AUTH_SERVICE_URI || "http://localhost:7002",
  NODE_ENV_DEV: process.env.NODE_ENV_DEV,
  NODE_ENV_PROD: process.env.NODE_ENV_PROD,
};
export { config };
