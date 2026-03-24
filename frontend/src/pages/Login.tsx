import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuthStore } from '../context/authStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);
      
      const data = await api.postForm('/auth/login', formData);
      setAuth(data.access_token, { id: 0, email, name: email.split('@')[0] });
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <Link to="/" className="mb-6">
        <span className="font-bold text-3xl tracking-tighter">amazon</span>
      </Link>
      
      <div className="border border-gray-300 rounded-md p-6 w-full max-w-[350px] bg-white text-sm">
        <h1 className="text-3xl font-normal mb-4">Sign in</h1>
        
        {error && <div className="text-[#B12704] text-sm mb-4 font-bold">{error}</div>}
        
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="font-bold mb-1">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-400 rounded-sm px-2 py-1 mb-4 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
          
          <label className="font-bold mb-1">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-400 rounded-sm px-2 py-1 mb-6 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
          
          <button 
            type="submit" 
            disabled={loading}
            className="bg-[#F0C14B] hover:bg-[#f4d078] border border-[#a88734] rounded-sm py-1 shadow-sm text-sm"
          >
            {loading ? 'Signing in...' : 'Continue'}
          </button>
        </form>
        
        <p className="text-xs mt-4">
          By continuing, you agree to Amazon Clone's Conditions of Use and Privacy Notice.
        </p>
      </div>
      
      <div className="mt-6 flex items-center w-full max-w-[350px]">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-2 text-xs text-gray-500 bg-amazon-bg relative z-10 px-2">New to Amazon Clone?</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>
      
      <Link 
        to="/register"
        className="mt-4 w-full max-w-[350px] text-center bg-[#e7e9ec] hover:bg-[#dfe3e8] border border-gray-400 shadow-sm rounded-sm py-1 text-sm shadow-[0_1px_0_rgba(255,255,255,0.6)_inset]"
      >
        Create your Amazon account
      </Link>
    </div>
  );
}
