import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    emailVerified: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
