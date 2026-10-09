import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const loadProducts = async () => {
        console.log("Loading products with search:", search, "category:", category);  // Debug log
        try {
            const res = await api.get(
                `/products?search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}`
            );
            console.log("Products loaded:", res.data);  // Debug log
            setProducts(res.data);
        } catch (error) {
            console.error("Error loading products:", error);
        }
    };

    useEffect(() => {
        loadProducts();
    }, [search, category]);

    const addToCart = async (productId) => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            alert("Please log in to add items to your cart.");
            return;
        }

        try {
            const response = await api.post("/cart/add", { userId, productId });
            window.dispatchEvent(new Event("cartUpdated"));
            alert(response.data.message || "Product added to cart.");
        } catch (error) {
            const backendMessage = error.response?.data?.message;
            console.error("Cart API error:", error.response?.data || error.message);
            alert(backendMessage || "Unable to add product to cart.");
        }
    };

    return (
        <div className="p-6">
            <div className="mb-4 flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 rounded w-full"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border p-2 rounded md:w-56"
                >
                    <option value="">All Categories</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Mobiles">Mobiles</option>
                    <option value="Tablets">Tablets</option>
                    <option value="Watches">Watches</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.length === 0 ? (
                    <div className="col-span-full text-center text-gray-600 py-10">
                        No products found for this search or category.
                    </div>
                ) : (
                    products.map((product) => (
                        <div
                            key={product._id}
                            className="border p-3 rounded shadow hover:shadow-lg transition"
                        >
                            <Link to={`/product/${product._id}`}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-40 object-contain bg-white rounded"
                                />
                                <h2 className="mt-2 font-semibold text-lg">
                                    {product.name}
                                </h2>
                            </Link>

                            <div className="mt-2 flex items-center justify-between">
                                <p className="text-gray-700 font-semibold">
                                    ${product.price}
                                </p>
                                <button
                                    onClick={() => addToCart(product._id)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}