import { useCartStore } from '../context/cartStore';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { useState } from 'react';

export default function Cart() {
  const { items, removeItem, updateQuantity, getCartTotal, getCartCount, clearCart } = useCartStore();
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState('');

  const handleCheckout = async () => {
    setCheckingOut(true);
    setCheckoutMessage('');
    try {
      const orderData = {
        items: items.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price_at_purchase: item.price
        }))
      };
      await api.post('/orders', orderData);
      setCheckoutMessage('Order placed successfully!');
      clearCart();
    } catch (error: any) {
      setCheckoutMessage(error.message || 'Checkout failed. Are you logged in?');
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8">
      {/* Left side: Cart Items */}
      <div className="flex-[0.75] bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-normal mb-1 pb-4 border-b">Shopping Cart</h1>
        <p className="text-right text-sm text-gray-500 mb-4">Price</p>
        
        {items.length === 0 ? (
          <div className="py-8">
            <h2 className="text-xl">Your Amazon Cart is empty.</h2>
            <Link to="/" className="text-blue-600 hover:text-orange-600 hover:underline">Shop today's deals</Link>
          </div>
        ) : (
          items.map(item => (
            <div key={item.id} className="flex py-4 border-b gap-4">
              <div className="w-[180px] h-[180px] flex-shrink-0 flex items-center justify-center p-2">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.title} className="max-h-full max-w-full object-contain" />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
                )}
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between">
                  <Link to={`/product/${item.id}`} className="text-lg font-medium text-black hover:text-orange-600 line-clamp-2">
                    {item.title}
                  </Link>
                  <p className="text-xl font-bold ml-4">${item.price.toFixed(2)}</p>
                </div>
                <p className="text-green-600 text-xs my-1">In Stock</p>
                <div className="flex items-center gap-4 mt-auto">
                  <select 
                    value={item.quantity} 
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="bg-gray-100 border border-gray-300 rounded-md px-2 py-1 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none hover:bg-gray-200 cursor-pointer text-sm"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i+1} value={i+1}>Qty: {i+1}</option>
                    ))}
                  </select>
                  <div className="border-l border-gray-300 h-4 mx-2"></div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-sm text-blue-600 hover:underline hover:text-orange-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        
        {items.length > 0 && (
          <div className="text-right mt-4 pt-2">
            <p className="text-lg">Subtotal ({getCartCount()} items): <span className="font-bold">${getCartTotal().toFixed(2)}</span></p>
          </div>
        )}
      </div>

      {/* Right side: Subtotal & Checkout */}
      {items.length > 0 && (
        <div className="flex-[0.25] bg-white p-6 shadow-sm h-min">
          <p className="text-lg mb-4">
            Subtotal ({getCartCount()} items): <span className="font-bold">${getCartTotal().toFixed(2)}</span>
          </p>
          <button 
            onClick={handleCheckout}
            disabled={checkingOut}
            className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-full py-1.5 text-sm cursor-pointer shadow-sm"
          >
            {checkingOut ? 'Processing...' : 'Proceed to checkout'}
          </button>
          {checkoutMessage && (
            <p className="mt-4 text-sm font-medium text-center text-[#B12704]">{checkoutMessage}</p>
          )}
        </div>
      )}
    </div>
  );
}
