import express from "express";
import { authorizeRole } from "../../../../../_shared/auth/authorizeRole.js";
import { createAuthMiddleware } from "../../../../../_shared/auth/authMiddleware.js";
import { validateRequest } from "../../../../../_shared/middleware/validate.js";
import { registerVendorSchema } from "../../validators.js/registerVendor.validator.js";
import { getVendorProfile } from "../controllers/getVendorProfile.controller.js";
import { loginVendor } from "../controllers/loginVendor.controller.js";
import { registerVendor } from "../controllers/registerVendor.controller.js";
import { updateVendor } from "../controllers/updateVendor.Controller.js";
import { getVendorById } from "../controllers/getVendorById.controller.js";
import Vendor from "../models/vendor.js";

const router = express.Router();
const authVendor = createAuthMiddleware(Vendor);

// ✅ PUBLIC ROUTES
router.post(
  "/register",
  validateRequest(registerVendorSchema, "body"),
  registerVendor
);

router.post("/login", loginVendor); // no auth needed on login

// ✅ AUTHENTICATED VENDOR/ADMIN ROUTES
router.get(
  "/profile/:id",
  authVendor,
  authorizeRole(["vendor", "admin"]),
  getVendorProfile
);

// ✅ VENDOR-ONLY ROUTES
router.get("/vendor/:id", authVendor, authorizeRole(["vendor"]), getVendorById);
router.put("/vendor/:id", authVendor, authorizeRole(["vendor"]), updateVendor);
// ✅ HEALTH CHECK
router.get("/health", (_, res) => res.send("Vendor service live ✅"));

export { router as Vendor };
