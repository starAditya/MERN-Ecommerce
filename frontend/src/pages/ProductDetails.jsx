import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState("");

    const loadProduct = async () => {
        try {
            const res = await api.get(`/products/${id}`);
            setProduct(res.data);
        } catch (error) {
            setError(error.response?.data?.message || error.message || "Failed to load product");
            console.error("Error loading product:", error);
        }
    };

    useEffect(() => {
        loadProduct();
    }, [id]);

    if (error) {
        return <div className="p-6 text-red-600">Error: {error}</div>;
    }

    if (!product) {
        return <div className="p-6">Loading...</div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <img src={product.image} alt={product.name} className="w-full h-96 object-cover mb-6" />
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-gray-600 mb-4">${product.price}</p>
        </div>
    );
}