import { Router } from "express";
import { getMeController } from "../controllers/auth/index.js";

export const authRouter = Router();

authRouter.get('/me', getMeController);
