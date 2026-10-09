import express from "express";
import Product from "../models/product.js";


const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all products (with search/category filter)
router.get("/", async (req, res) => {
  try {
    const { search = "", category = "" } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } }
      ];
    }

    if (category) {
      const normalized = String(category).trim();
      const categoryMap = {
        laptop: "Laptops",
        laptops: "Laptops",
        mobile: "Mobiles",
        mobiles: "Mobiles",
        phone: "Mobiles",
        phones: "Mobiles",
        tablet: "Tablets",
        tablets: "Tablets",
        watch: "Watches",
        watches: "Watches"
      };

      const finalCategory = categoryMap[normalized.toLowerCase()] || normalized;
      const safeCategory = finalCategory.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.category = { $regex: `^${safeCategory}$`, $options: "i" };
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update a product
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;