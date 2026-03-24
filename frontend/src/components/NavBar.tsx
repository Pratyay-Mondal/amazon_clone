import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu } from 'lucide-react';
import { useCartStore } from '../context/cartStore';
import { useAuthStore } from '../context/authStore';

export default function NavBar() {
  const { getCartCount } = useCartStore();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-amazon-nav text-white flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center px-4 py-2 space-x-4">
        {/* Logo */}
        <Link to="/" className="flex items-center mt-2 border border-transparent hover:border-white p-1 rounded-sm cursor-pointer">
          <span className="font-bold text-2xl tracking-tighter">amazon</span>
          <span className="text-orange-400 text-sm font-semibold ml-1 mt-1">clone</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-grow flex items-center h-10 rounded-md overflow-hidden bg-amazon-button hover:bg-amazon-button_hover focus-within:shadow-[0_0_0_2px_#f90_inset]">
          <select className="h-full bg-gray-100 text-gray-700 text-xs px-2 border-r border-gray-300 outline-none w-auto max-w-[50px] cursor-pointer">
            <option>All</option>
          </select>
          <input 
            type="text" 
            className="h-full px-3 text-black flex-grow outline-none border-none py-2"
          />
          <button className="h-full px-4 text-black flex items-center justify-center">
            <Search size={20} />
          </button>
        </div>

        {/* Right side links */}
        <div className="flex items-center space-x-4 text-sm whitespace-nowrap">
          {user ? (
            <div className="flex flex-col border border-transparent hover:border-white p-2 rounded-sm cursor-pointer" onClick={handleLogout}>
              <span className="text-gray-300 text-xs">Hello, {user.name || 'User'}</span>
              <span className="font-bold">Account & Lists (Logout)</span>
            </div>
          ) : (
            <Link to="/login" className="flex flex-col border border-transparent hover:border-white p-2 rounded-sm cursor-pointer">
              <span className="text-gray-300 text-xs">Hello, sign in</span>
              <span className="font-bold">Account & Lists</span>
            </Link>
          )}

          <Link to="/orders" className="flex flex-col border border-transparent hover:border-white p-2 rounded-sm cursor-pointer">
            <span className="text-gray-300 text-xs">Returns</span>
            <span className="font-bold">& Orders</span>
          </Link>

          <Link to="/cart" className="flex items-end border border-transparent hover:border-white p-2 rounded-sm cursor-pointer relative">
            <div className="relative flex items-center">
              <span className="absolute left-[13px] top-[-8px] text-[#f08804] font-bold text-base w-4 text-center">
                {getCartCount()}
              </span>
              <ShoppingCart size={32} />
            </div>
            <span className="font-bold mt-2 ml-1">Cart</span>
          </Link>
        </div>
      </div>

      {/* Bottom Nav Bar */}
      <div className="bg-amazon-nav_light flex items-center space-x-4 px-4 py-1 text-sm overflow-x-auto whitespace-nowrap">
        <button className="flex items-center border border-transparent hover:border-white p-1 rounded-sm gap-1">
          <Menu size={20} />
          <span className="font-bold">All</span>
        </button>
        <span className="cursor-pointer border border-transparent hover:border-white p-1 rounded-sm">Today's Deals</span>
        <span className="cursor-pointer border border-transparent hover:border-white p-1 rounded-sm">Customer Service</span>
        <span className="cursor-pointer border border-transparent hover:border-white p-1 rounded-sm">Registry</span>
        <span className="cursor-pointer border border-transparent hover:border-white p-1 rounded-sm">Gift Cards</span>
        <span className="cursor-pointer border border-transparent hover:border-white p-1 rounded-sm">Sell</span>
      </div>
    </nav>
  );
}
