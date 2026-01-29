import express from "express";
import {
  getCategories,
  getPromptsByCategory
} from "../controllers/library.controller.js";

const router = express.Router();

router.get("/categories", getCategories);
router.get("/prompts/:slug", getPromptsByCategory);

export default router;
