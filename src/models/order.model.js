import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    orderItems: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1
        },
      },
    ],
    sellerStatus: {
      type: String,
      enum: ["pending", "accepted", "completed", "cancelled"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["paid", "processing", "cancelled"],
      default: "processing",
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    paymentVerified: {
      type: Boolean,
      defaultValue: false,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
