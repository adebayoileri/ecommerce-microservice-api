import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
    },
    productImage: {
      type: String,
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
