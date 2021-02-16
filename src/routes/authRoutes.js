import AuthController from "../controllers/auth.controller";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/signup", AuthController.signup);
authRouter.post("/login", AuthController.login)

module.exports = authRouter;