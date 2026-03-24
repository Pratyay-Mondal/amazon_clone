import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await api.get('/products');
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="relative">
      {/* Banner */}
      <div className="w-full h-[200px] md:h-[400px] bg-gradient-to-b from-gray-200 to-amazon-bg relative z-0 flex items-center justify-center">
         <div className="text-4xl text-gray-400 font-bold opacity-50">Amazon Clone Deals</div>
      </div>

      {loading ? (
        <div className="text-center py-20">Loading products...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 -mt-20 md:-mt-48 z-10 relative mb-10">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          {products.length === 0 && (
            <div className="col-span-full text-center bg-white p-10 mt-10">
              <h2 className="text-2xl font-bold">No products found.</h2>
              <p>Add products via the admin API or seed script.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
