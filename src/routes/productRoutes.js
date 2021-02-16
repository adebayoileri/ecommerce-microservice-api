import ProductController from "../controllers/product.controller";
import { checkToken } from "../middlewares/auth";
import { Router } from "express";

const productRouter = Router();

productRouter.post("/create", checkToken, ProductController.createProduct);
productRouter.put(
  "/update/:productId",
  checkToken,
  ProductController.updateproduct
);
productRouter.get(
  "/getAllProducts",
  checkToken,
  ProductController.getAllProducts
);
productRouter.get("/:productId", checkToken, ProductController.getAProduct);
productRouter.delete(
  "/delete/:productId",
  checkToken,
  ProductController.deleteProduct
);

module.exports = productRouter;
