import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import testRoutes from "./routes/test.routes.js";
import libraryRoutes from "./routes/library.routes.js";
import gptRoutes from "./routes/gpt.routes.js";
import customPromptRoutes from "./routes/customPrompt.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/library", libraryRoutes);
app.use("/api/gpt", gptRoutes);
app.use("/api/custom-prompt", customPromptRoutes);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

export default app;
