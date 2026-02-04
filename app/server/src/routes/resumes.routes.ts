import { Router } from "express";
import { createRequireAuthMiddleware } from "../middlewares/require_auth.js";
import {
  getResumeController,
  getResumesController,
  postResumeController,
  deleteResumeController,
} from "../controllers/resumes/index.js";

export const resumesRouter = Router();

// 以下は認証が必要なAPIです
resumesRouter.use(createRequireAuthMiddleware());
resumesRouter.get("/", getResumesController);
resumesRouter.get("/:resumeId", getResumeController);
resumesRouter.post("/", postResumeController);
resumesRouter.delete("/:resumeId", deleteResumeController);
