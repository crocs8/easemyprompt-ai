import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import tokenMiddleware from "../middleware/token.middleware.js";
import { TOKENS } from "../utils/constants.js";
import { chatWithGPT } from "../controllers/gpt.controller.js";

const router = express.Router();

router.post(
  "/chat",
  authMiddleware,
  tokenMiddleware(TOKENS.GPT_COST),
  chatWithGPT
);

export default router;
