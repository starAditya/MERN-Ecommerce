import Product from "../models/product.js";

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json({
            message: "Product created successfully",
            product: newProduct,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }   
};

// Get all products
export const getProducts = async (req, res) => {
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
            const normalizedCategory = category.trim();
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

            const finalCategory = categoryMap[normalizedCategory.toLowerCase()] || normalizedCategory;
            filter.category = { $regex: `^${finalCategory.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, $options: "i" };
        }

        const products = await Product.find(filter).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update a product
export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({
            message: "Product updated successfully",
            product: updatedProduct,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};