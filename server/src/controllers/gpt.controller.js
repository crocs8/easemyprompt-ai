import OpenAI from "openai";
import { TOKENS } from "../utils/constants.js";

export const chatWithGPT = async (req, res) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ message: "OpenAI API key not configured" });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });

    res.json({
      reply: completion.choices[0].message.content
    });
  } catch (error) {
  console.error("GPT FULL ERROR:", error);

  res.status(500).json({
    message: "GPT request failed",
    error: error.message
  });
}

};
