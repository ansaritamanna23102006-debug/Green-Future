'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { User, Lock, ArrowRight, ShieldCheck, KeyRound, AlertCircle } from 'lucide-react';
import CanvasBackground from '@/components/admin/CanvasBackground';
import GFTLogo from '@/components/GFTLogo';
import { API_URL } from '@/lib/apiConfig';
import { cn } from '@/lib/utils';

export default function AdminLogin() {
  const router = useRouter();
  const formRef = useRef(null);
  const logoRef = useRef(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(logoRef.current,
      { y: -30, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.5)' }
    )
    .fromTo(formRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    );
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const cleanUser = username.trim();
      const cleanPass = password.trim();

      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: cleanUser,
          password: cleanPass,
        }),
      });

      const data = await res.json();

      if (data.status !== 'success' || !data.data) {
        throw new Error(data.message || 'Invalid administrator credentials');
      }

      const { user, accessToken, refreshToken } = data.data;

      // Verify that the user has administrative privileges
      if (user.role !== 'admin' && user.role !== 'superadmin') {
        throw new Error('Access denied: account does not have administrative privileges');
      }

      // Persist authenticated tokens and state
      localStorage.setItem('gft_token', accessToken);
      if (refreshToken) localStorage.setItem('gft_refresh', refreshToken);
      localStorage.setItem('gft_auth', 'true');
      localStorage.setItem('gft_user', JSON.stringify(user));

      // Route according to administrative tier
      if (user.role === 'superadmin') {
        router.push('/superadmin/dashboard');
      } else {
        router.push('/admin/dashboard');
      }
    } catch (err) {
      console.error('Admin login failed:', err);
      setError(err.message || 'Authentication error. Please check your backend connection.');
      setIsLoading(false);
    }
  };

  const handleQuickFillSuperAdmin = () => {
    setUsername('superadmin');
    setPassword('AdminPass123!');
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#031716]">
      <CanvasBackground />
      
      <div className="z-10 w-full max-w-md px-6 py-10">
        <div ref={logoRef} className="flex flex-col items-center mb-6 text-center">
          <div className="mb-3">
            <GFTLogo className="h-20 w-auto" light={true} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Administrative Portal</h1>
          <p className="text-[#8CD83D] mt-0.5 text-xs font-medium uppercase tracking-wider">
            Secure Ledger & Infrastructure Access
          </p>
        </div>

        <div ref={formRef} className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden">
          {/* Decorative gradients */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#65B300]/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#0A4D45]/40 rounded-full blur-3xl pointer-events-none"></div>

          <form onSubmit={handleLogin} className="relative z-10 flex flex-col gap-4">
            {error && (
              <div className="bg-red-500/15 border border-red-500/40 text-red-300 text-xs px-4 py-3 rounded-xl flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-200 mb-1.5 uppercase tracking-wider">
                Admin Username or Email
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black/30 border border-white/15 text-white rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#65B300] focus:border-[#65B300] transition-all placeholder:text-gray-500"
                  placeholder="superadmin or admin@greenfuturetech.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-200 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/30 border border-white/15 text-white rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#65B300] focus:border-[#65B300] transition-all placeholder:text-gray-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Quick Demo Helper */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleQuickFillSuperAdmin}
                className="text-[11px] text-[#8CD83D] hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <KeyRound size={13} />
                <span>Use default Super Admin credentials</span>
              </button>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="mt-3 w-full bg-gradient-to-r from-[#65B300] to-[#0A4D45] text-white font-bold py-3 rounded-xl shadow-[0_4px_20px_rgba(101,179,0,0.3)] hover:shadow-[0_4px_25px_rgba(101,179,0,0.5)] transition-all flex items-center justify-center gap-2 group relative overflow-hidden cursor-pointer disabled:opacity-70"
            >
              <div className={cn("absolute inset-0 bg-white/20 translate-x-[-100%] transition-transform duration-500", !isLoading && "group-hover:translate-x-[100%]")}></div>
              
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In to Admin Portal</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
        
        <p className="text-center text-gray-500 text-xs mt-6">
          © {new Date().getFullYear()} Green Future Technology. All rights reserved.
        </p>
      </div>
    </div>
  );
}
