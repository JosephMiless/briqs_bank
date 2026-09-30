import { Router } from "express";
import { registerController } from "../controllers/user.register.controller.js";
import { loginController } from "../controllers/user.login.controller.js";

export const userRouter = Router();

userRouter.post("/register", registerController);
userRouter.post("/login", loginController);