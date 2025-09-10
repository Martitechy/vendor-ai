import express from "express";
import { authorizeRole } from "../_shared/auth/authorizeRole.js";
import { createAuthMiddleware } from "../_shared/auth/authMiddleware.js";
import { validateRequest } from "../_shared/middleware/validate.js";
import { registerVendorSchema } from "../validators.js/registerVendor.validator.js";
import { getVendorProfile } from "../controllers/getVendorProfile.controller.js";
import { loginVendor } from "../controllers/loginVendor.controller.js";
import { registerVendor } from "../controllers/registerVendor.controller.js";
import { updateVendor } from "../controllers/updateVendor.controller.js";
import { getVendorById } from "../controllers/getVendorById.controller.js";
import { listVendors } from "../controllers/listVendors.controller.js";
import { deleteOneVendor } from "../controllers/deleteOneVendor.controller.js";
import { deleteManyVendor } from "../controllers/deleteManyVendors.controller.js";
import Vendor from "../models/vendor.js";

export const router = express.Router();
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
  authorizeRole(["admin", "vendor"]),
  getVendorProfile
);
router.put(
  "/vendor/:id",
  authVendor,
  authorizeRole(["admin", "vendor"]),
  updateVendor
);
// ✅ VENDOR-ONLY ROUTES
router.get("/vendor/:id", authVendor, authorizeRole(["admin"]), getVendorById);
// List or get all vendors
router.get("/vendors", authVendor, authorizeRole(["admin"]), listVendors);
// Delete a vendors
router.delete(
  "/vendor/:id",
  authVendor,
  authorizeRole(["admin"]),
  deleteOneVendor
);
// Delete all/ many vendors
router.delete(
  "/vendors",
  authVendor,
  authorizeRole(["admin"]),
  deleteManyVendor
);
// ✅ HEALTH CHECK
router.get("/health", (_, res) => res.send("Vendor service live ✅"));

export const vendorRoutes = router;
