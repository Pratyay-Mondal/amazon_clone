import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useCartStore } from '../context/cartStore';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addItem } = useCartStore();

  return (
    <div className="bg-white flex flex-col p-6 z-30 justify-between cursor-pointer hover:shadow-xl transition-shadow w-full h-[400px]">
      <div className="flex-1 flex flex-col h-full">
        <Link to={`/product/${product.id}`} className="text-black no-underline hover:text-orange-600">
          <p className="font-bold line-clamp-2 min-h-[48px]">{product.title}</p>
        </Link>
        
        <div className="flex text-yellow-500 my-1">
          {Array(Math.floor(product.rating || 0))
            .fill(0)
            .map((_, i) => (
              <span key={i}>★</span>
            ))}
          <span className="text-blue-500 text-sm ml-2 block mt-0.5 hover:underline cursor-pointer">
            {product.rating_count}
          </span>
        </div>

        <p className="text-2xl font-bold mt-2">
          <span className="text-xs align-top">$</span>
          {Math.floor(product.price)}
          <span className="text-xs align-top">
            {(product.price % 1).toFixed(2).substring(2)}
          </span>
        </p>

        <div className="flex-1 flex justify-center items-center my-4 overflow-hidden">
          {product.image_url ? (
             <img 
               src={product.image_url} 
               alt={product.title} 
               className="object-contain max-h-[160px] w-auto transition-transform duration-300 hover:scale-105" 
             />
          ) : (
             <div className="h-[160px] w-full bg-gray-200 flex items-center justify-center text-gray-400">
               No Image
             </div>
          )}
        </div>
      </div>

      <button 
        onClick={() => addItem(product)} 
        className="mt-auto w-full p-2 bg-amazon-button border border-[#a88734] rounded-full text-sm hover:bg-amazon-button_hover"
      >
        Add to Cart
      </button>
    </div>
  );
}
