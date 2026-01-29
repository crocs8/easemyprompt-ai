import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { deductDerekTokens } from "../middleware/token.middleware.js";

const router = express.Router();

router.post(
  "/generate",
  authMiddleware,
  deductDerekTokens,
  async (req, res) => {
    const { idea } = req.body;

    if (!idea) {
      return res.status(400).json({ message: "Idea is required" });
    }

    // TEMP MOCK RESPONSE (until Derek model is integrated)
    const detailedPrompt = `
You are a professional AI prompt engineer.

Convert the following idea into a highly detailed, production-ready AI prompt:

"${idea}"

Include:
- Visual style
- Camera angles
- Lighting & mood
- Environment & motion
- Artistic direction
- Technical realism
- Output format compatibility
`;

    res.json({
      prompt: detailedPrompt.trim()
    });
  }
);

export default router;
