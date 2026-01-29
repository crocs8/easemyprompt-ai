import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import tokenMiddleware from "../middleware/token.middleware.js";
import { TOKENS } from "../utils/constants.js";

const router = express.Router();

router.post(
  "/gpt-test",
  authMiddleware,
  tokenMiddleware(TOKENS.GPT_COST),
  (req, res) => {
    res.json({
      message: "GPT tokens deducted",
      remainingTokens: req.user.tokens
    });
  }
);

router.post(
  "/derek-test",
  authMiddleware,
  tokenMiddleware(TOKENS.DEREK_COST),
  (req, res) => {
    res.json({
      message: "Derek tokens deducted",
      remainingTokens: req.user.tokens
    });
  }
);

export default router;
