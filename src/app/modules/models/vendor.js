import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    whatsappNumber: {
      type: String,
      trim: true,
    },
    currentPlan: {
      type: String,
      enum: ["free", "daily", "weekly", "monthly", "yearly"],
      default: "free",
    },
    subscriptionStatus: {
      type: String,
      enum: ["active", "inactive", "expired", "suspended"],
      default: "active",
    },
    trialEndsAt: {
      type: Date,
    },
    planExpiresAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["vendor", "admin"],
      default: "vendor",
      select: false,
    },
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default mongoose.model("Vendor", schema);
