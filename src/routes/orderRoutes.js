import { Router } from "express";
import { checkToken } from "../middlewares/auth";

import orderController from "../controllers/order.controller";

const orderRouter = Router();

orderRouter.post("/create", checkToken, orderController.makeAnOrder);
orderRouter.put(
  "/update/:orderItemId/:orderId",
  checkToken,
  orderController.removeItemFromOrder
);
orderRouter.get("/getAllOrders", checkToken, orderController.getAllOrders);
orderRouter.get("/:orderId", checkToken, orderController.getAnOrder);


module.exports = orderRouter;
