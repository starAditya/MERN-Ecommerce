import express from "express";
import {
    addToCart,
    RemoveItem,
    updateQuantity,
    getCart,
} from "../controllers/cartController.js";

const router = express.Router();

//Add to cart
router.post("/add", addToCart);

//Remove from cart
router.post("/remove", RemoveItem);

//Update quantity
router.post("/update", updateQuantity);

//Get cart
router.get("/:userId", getCart);

export default router;