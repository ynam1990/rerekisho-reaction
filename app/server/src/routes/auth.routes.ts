import { Router } from "express";
import { createRequireAuthMiddleware } from "../middlewares/require_auth.js";
import {
  signUpController,
  signInController,
  getMeController,
  deleteMeController,
  signOutController,
} from "../controllers/auth/index.js";

export const authRouter = Router();

authRouter.post('/signup', signUpController);
authRouter.post('/signin', signInController);

// 以下は認証が必要なAPIです
authRouter.use(createRequireAuthMiddleware());
authRouter.get('/me', getMeController);
authRouter.delete('/me', deleteMeController);
authRouter.post('/signout', signOutController);
