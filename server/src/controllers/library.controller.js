import Category from "../models/Category.js";
import Prompt from "../models/Prompt.js";

// GET all active categories (ordered)
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ active: true })
      .sort({ order: 1 })
      .select("title slug order");

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

// GET prompts by category slug
export const getPromptsByCategory = async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await Category.findOne({ slug, active: true });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const prompts = await Prompt.find({
      category: category._id,
      active: true
    }).select("title prompt tags");

    res.json({
      category: category.title,
      prompts
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch prompts" });
  }
};
