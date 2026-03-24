import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await api.post('/auth/register', { email, password, name });
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 mb-20">
      <Link to="/" className="mb-6">
        <span className="font-bold text-3xl tracking-tighter">amazon</span>
      </Link>
      
      <div className="border border-gray-300 rounded-md p-6 w-full max-w-[350px] bg-white text-sm">
        <h1 className="text-3xl font-normal mb-4">Create account</h1>
        
        {error && <div className="text-[#B12704] text-sm mb-4 font-bold">{error}</div>}
        
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="font-bold mb-1">Your name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-400 rounded-sm px-2 py-1 mb-4 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="First and last name"
            required
          />

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
            className="border border-gray-400 rounded-sm px-2 py-1 mb-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="At least 6 characters"
            required
            minLength={6}
          />
          
          <button 
            type="submit" 
            disabled={loading}
            className="bg-[#F0C14B] hover:bg-[#f4d078] border border-[#a88734] rounded-sm py-1 shadow-sm mt-4 text-sm"
          >
            {loading ? 'Creating...' : 'Continue'}
          </button>
        </form>
        
        <p className="text-xs mt-6 pt-4 border-t">
          Already have an account? <Link to="/login" className="text-blue-600 hover:text-orange-600 hover:underline">Sign in ⯈</Link>
        </p>
      </div>
    </div>
  );
}
