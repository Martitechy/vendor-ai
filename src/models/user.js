import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      unique: false,
      lowercase: true,
    },
    phone: { type: String, unique: true },
    role: {
      type: String,
      enum: ["vendor", "admin", "super_admin"],
      default: "vendor",
    },
    password: {
      type: String,
    },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export default mongoose.model("User", schema);
