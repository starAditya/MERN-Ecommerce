import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: "",
    });

    const fields = ["name", "description", "price", "category", "image", "stock"];

    const loadProduct = async () => {
        try {
            const response = await api.get(`/products/${id}`);
            setForm(response.data);
        } catch (error) {
            console.error("Error loading product:", error);
        }
    };

    useEffect(() => {
        loadProduct();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/products/update/${id}`, formData);
            alert("Product updated successfully");
            navigate("/admin/products");
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Edit Product</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {fields.map((key) => (
                        <input
                            key={key}
                            name={key}
                            value={formData[key] || ""}
                            onChange={handleChange}
                            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    ))}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Update Product
                    </button>
                </form>
            </div>
        </div>
    );
}