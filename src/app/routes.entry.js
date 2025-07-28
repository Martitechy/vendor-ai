import { Router } from "express";
import { Vendor } from "../app/modules/routes/vendor.routes.js";

export const vendorRoutes = () => {
  const router = Router();
  router.use("/", Vendor);
  return router;
};
