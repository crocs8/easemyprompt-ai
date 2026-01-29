import mongoose from "mongoose";

const customPromptSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    contact: {
      type: String,
      required: true
    },
    idea: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["new", "reviewed", "completed"],
      default: "new"
    }
  },
  { timestamps: true }
);

export default mongoose.model("CustomPrompt", customPromptSchema);
