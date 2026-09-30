import { Router } from "express";
import { depositController } from "../controllers/deposit.controller.js";
import {auth} from "../middleware/auth.js";
import { transferController } from "../controllers/transfer.controller.js";
import { createBankAccountController } from "../controllers/bank.controller.js";


export const bankRouter = Router();

bankRouter.patch("/deposit/:id", depositController);
bankRouter.post("/create-account", auth, createBankAccountController);
bankRouter.patch("/transfer", auth, transferController);