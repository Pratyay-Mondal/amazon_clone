import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import type { Product } from '../types';
import { useCartStore } from '../context/cartStore';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Failed to load product", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading product details...</div>;
  if (!product) return <div className="p-10 text-center">Product not found. <Link to="/" className="text-blue-600">Return home</Link></div>;

  return (
    <div className="bg-white p-6 mt-4 flex flex-col md:flex-row gap-10">
      {/* Image */}
      <div className="flex-1 flex justify-center items-center p-4">
        {product.image_url ? (
          <img src={product.image_url} alt={product.title} className="max-h-[500px] object-contain" />
        ) : (
           <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center text-gray-400">No Image</div>
        )}
      </div>

      {/* Details */}
      <div className="flex-[1.2]">
        <h1 className="text-2xl md:text-3xl font-medium">{product.title}</h1>
        <div className="flex items-center text-sm mt-2 border-b pb-2">
          <span className="text-yellow-500 mr-2">
             {Array(Math.floor(product.rating || 0)).fill('★').join('')}
             {Array(5 - Math.floor(product.rating || 0)).fill('☆').join('')}
          </span>
          <span className="text-blue-600 hover:underline cursor-pointer">{product.rating_count} ratings</span>
        </div>
        <div className="my-4">
           <p className="text-3xl font-normal">${product.price.toFixed(2)}</p>
           <p className="text-sm text-gray-500 mt-1">Free Returns</p>
        </div>
        <div className="text-sm text-black">
          <h3 className="font-bold mb-2">About this item</h3>
          <p>{product.description || "No description provided."}</p>
        </div>
      </div>

      {/* Buy Box */}
      <div className="flex-[0.6] border border-gray-300 rounded-md p-4 flex flex-col h-min">
        <p className="text-3xl font-normal mb-2">${product.price.toFixed(2)}</p>
        <p className="text-sm text-green-700 font-medium mb-4">In Stock</p>
        <button 
          onClick={() => addItem(product)}
          className="bg-amazon-button hover:bg-amazon-button_hover border border-[#a88734] rounded-full py-2 text-sm shadow-sm mb-3"
        >
          Add to Cart
        </button>
        <button className="bg-[#FFA41C] hover:bg-[#FF8F00] border border-[#a88734] rounded-full py-2 text-sm shadow-sm">
          Buy Now
        </button>
        <div className="mt-4 text-xs text-gray-500">
           <div className="flex justify-between py-1"><span>Ships from</span> <span>Amazon Clone</span></div>
           <div className="flex justify-between py-1"><span>Sold by</span> <span>Amazon Clone</span></div>
           <div className="flex justify-between py-1"><span>Returns</span> <span>30-day refund</span></div>
        </div>
      </div>
    </div>
  );
}
