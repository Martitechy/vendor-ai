import JoiBase from "joi";
import JoiDate from "@joi/date";
const Joi = JoiBase.extend(JoiDate);

export const registerVendorSchema = Joi.object({
  businessName: Joi.string().required(),
  phone: Joi.string().required(),
  whatsappNumber: Joi.string().optional(),
  currentPlan: Joi.string()
    .valid("free", "daily", "weekly", "monthly", "yearly")
    .optional(),
  role: Joi.string().valid("vendor", "admin").optional(), // ✅ Role validation added
});
