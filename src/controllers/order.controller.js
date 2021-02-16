import Order from "../models/order.model";
import { isValidObjectId } from "mongoose";
import { compile } from "joi";
class orderController {
  static async makeAnOrder(req, res) {
    try {
      const {
        orderItems,
        sellerStatus,
        orderStatus,
        deliveryAddress,
      } = req.body;
      const { userId } = req.user;
      const newOrder = await new Order({
        orderItems,
        sellerStatus,
        orderStatus,
        deliveryAddress,
        userId,
      }).save();

      return res.status(201).json({
        status: "success",
        message: "order created successfully",
        data: newOrder,
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  }
  static async removeItemFromOrder(req, res) {
    try {
      const { orderItemId, orderId } = req.params;
      if (!isValidObjectId(orderItemId)) {
        throw new Error("orderItemId passed is not a valid objectid");
      }
      if (!isValidObjectId(orderId)) {
        throw new Error("orderId passed is not a valid objectid");
      }
      const orderFound = await Order.findOne({
        _id: orderId,
      });
      if (!orderFound) {
        throw new Error(`order with id: ${orderId} doesn't exists`);
      }
      const parseData = JSON?.stringify(orderFound.orderItems);
      const toUpdateOrder =
        parseData && Array(parseData).filter((itm) => itm._id !== orderItemId.toString())

      await Order.updateOne(
        { _id: orderId },
        {
          orderItems: JSON.parse(toUpdateOrder) || orderFound.orderItems,
        }
      ).exec();

      return res.status(200).json({
        status: "success",
        message: "removed an item from order successfully",
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
      console.log(error);
    }
  }
  static async getAllOrders(req, res) {
    try {
      const { page = 1, limit = 21 } = req.query;
      const getAllOrders = await Order.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const count = await Order.countDocuments();

      return res.status(200).json({
        status: "success",
        message: "got all orders successfully",
        data: getAllOrders,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  }
  static async getAnOrder(req, res) {
    try {
      const { orderId } = req.params;
      if (!isValidObjectId(orderId)) {
        throw new Error("orderId passed is not a valid objectid");
      }
      const orderFound = await Order.findOne({
        _id: orderId,
      });
      if (!orderFound) {
        throw new Error(`order with id: ${orderId} doesn't exists`);
      }
      return res.status(200).json({
        message: "got a order successfully",
        data: orderFound,
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  }
}

export default orderController;
