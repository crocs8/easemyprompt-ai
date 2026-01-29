import express from "express";
import { submitCustomPrompt } from "../controllers/customPrompt.controller.js";

const router = express.Router();

router.post("/submit", submitCustomPrompt);

export default router;
