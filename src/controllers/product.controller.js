import { isValidObjectId } from "mongoose";
import Product from "../models/product.model";

class ProductController {
  static async createProduct(req, res) {
    try {
      const { productName, productDescription, productImage, stock } = req.body;

      const { userId } = req.user;

      const newProduct = await new Product({
        productName,
        productDescription,
        productImage,
        stock,
        sellerId: userId,
      }).save();

      return res.status(201).json({
        status: "success",
        message: "product created successfully",
        data: newProduct,
      });
    } catch (error) {
      return res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  }
  static async deleteProduct(req, res) {
    try {
      const { productId } = req.params;
      if (!isValidObjectId(productId)) {
        throw new Error("productId passed is not a valid objectid");
      }
      const productToDelete = await Product.findOne({
        _id: productId,
      });
      if (!productToDelete) {
        throw new Error(`product with id: ${productId} doesn't exists`);
      }
      await Product.deleteOne({ _id: productId }).exec();

      return res.status(200).json({
        status: "success",
        message: "product was deleted successfully",
      });
    } catch (error) {
      return res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  }
  static async updateproduct(req, res) {
    try {
      const { productId } = req.params;
      const { productName, productDescription, productImage, stock } = req.body;
      if (!isValidObjectId(productId)) {
        throw new Error("productId passed is not a valid objectid");
      }
      const productToUpdate = await Product.findOne({
        _id: productId,
      });
      if (!productToUpdate) {
        throw new Error(`product with id: ${productId} doesn't exists`);
      }
      await Product.updateOne(
        { _id: productId },
        {
          productImage: productImage || productToUpdate.productImage,
          stock: stock || productToUpdate.stock,
          productName: productName || productToUpdate.productName,
          productDescription:
            productDescription || productToUpdate.productDescription,
        }
      ).exec();

      return res.status(200).json({
        status: "success",
        message: "product was updated successfully",
      });
    } catch (error) {
      return res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  }
  static async getAProduct(req, res) {
    try {
      const { productId } = req.params;
      if (!isValidObjectId(productId)) {
        throw new Error("productId passed is not a valid objectid");
      }
      const productFound = await Product.findOne({
        _id: productId,
      });
      if (!productFound) {
        throw new Error(`product with id: ${productId} doesn't exists`);
      }
      return res.status(200).json({
        status: "success",
        message: "got a product successfully",
        data: productFound,
      });
    } catch (error) {
      return res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  }
  static async getAllProducts(req, res) {
    try {
      const { page = 1, limit = 21 } = req.query;
      const getAllProducts = await Product.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const count = await Product.countDocuments();

      return res.status(200).json({
        status: "success",
        message: "got all products successfully",
        data: getAllProducts,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } catch (error) {
      return res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  }
}

export default ProductController;
