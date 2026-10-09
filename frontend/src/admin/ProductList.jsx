import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function ProductList() {
    const [products, setProducts] = useState([]);
   
    const loadProducts = async () => {
        try {
            const response = await api.get("/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Error loading products:", error);
        }
    };

    const deleteProduct = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await api.delete(`/products/${id}`);
                alert("Product deleted successfully");
                loadProducts();
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Product List</h1>
            <Link to="/admin/products/add" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
                Add Product
            </Link>
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Time</th>
                        <th className="py-2 px-4 border">Price</th>
                        <th className="py-2 px-4 border">Category</th>
                        <th className="py-2 px-4 border">Stock</th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id} className="text-center">
                            <td className="py-2 px-4 border">{product.name}</td>
                            <td className="py-2 px-4 border">{new Date(product.createdAt).toLocaleDateString()}</td>
                            <td className="py-2 px-4 border">${product.price.toFixed(2)}</td>
                            <td className="py-2 px-4 border">{product.category}</td>
                            <td className="py-2 px-4 border">{product.stock}</td>
                            <td className="py-2 px-4 border">
                                <Link to={`/admin/products/${product._id}/update`} className="bg-green-500 text-white px-2 py-1 rounded mr-2">
                                    Edit
                                </Link>
                                <button 
                                    onClick={() => deleteProduct(product._id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}