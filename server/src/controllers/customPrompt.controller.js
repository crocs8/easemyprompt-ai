import CustomPrompt from "../models/CustomPrompt.js";

export const submitCustomPrompt = async (req, res) => {
  try {
    const { name, email, contact, idea } = req.body;

    if (!name || !email || !contact || !idea) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await CustomPrompt.create({
      name,
      email,
      contact,
      idea
    });

    res.status(201).json({
      message: "Your request has been submitted successfully"
    });
  } catch (error) {
    console.error("CUSTOM PROMPT ERROR:", error.message);
    res.status(500).json({ message: "Failed to submit request" });
  }
};
