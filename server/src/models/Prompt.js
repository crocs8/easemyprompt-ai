import mongoose from "mongoose";

const promptSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    prompt: {
      type: String,
      required: true
    },
    tags: {
      type: [String],
      default: []
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Prompt", promptSchema);
