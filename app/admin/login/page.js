'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { User, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import CanvasBackground from '@/components/admin/CanvasBackground';
import { cn } from '@/lib/utils';

export default function AdminLogin() {
  const router = useRouter();
  const formRef = useRef(null);
  const logoRef = useRef(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(logoRef.current,
      { y: -50, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
    )
    .fromTo(formRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    );
  }, []);

  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate login
    setTimeout(() => {
      if (username === 'superadmin' && password === 'superadmin123') {
        window.location.href = '/superadmin/dashboard';
      } else if (username === 'admin' && password === 'admin123') {
        window.location.href = '/admin/dashboard';
      } else {
        setError('Invalid username or password');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#062F2D]">
      <CanvasBackground />
      
      <div className="z-10 w-full max-w-md px-6">
        <div ref={logoRef} className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#65B300] to-[#0A4D45] rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_40px_rgba(101,179,0,0.4)] border border-[#8CD83D]/30 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#8CD83D] opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <ShieldCheck size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">GFT Portal</h1>
          <p className="text-[#8CD83D] mt-1 text-sm font-medium">Secure Access Management</p>
        </div>

        <div ref={formRef} className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden">
          {/* Decorative gradients */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#65B300]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#0A4D45]/40 rounded-full blur-3xl"></div>

          <form onSubmit={handleLogin} className="relative z-10 flex flex-col gap-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm px-4 py-3 rounded-xl flex items-center justify-center">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#65B300] focus:bg-white/10 transition-all placeholder:text-gray-500"
                  placeholder="admin or superadmin"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#65B300] focus:bg-white/10 transition-all placeholder:text-gray-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm mt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#65B300] focus:ring-[#65B300] focus:ring-offset-[#062F2D]" />
                <span className="text-gray-300 group-hover:text-white transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-[#8CD83D] hover:text-[#65B300] transition-colors font-medium">Forgot Password?</a>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="mt-4 w-full bg-gradient-to-r from-[#65B300] to-[#0A4D45] text-white font-bold py-3.5 rounded-xl shadow-[0_4px_20px_rgba(101,179,0,0.3)] hover:shadow-[0_4px_25px_rgba(101,179,0,0.5)] transition-all flex items-center justify-center gap-2 group relative overflow-hidden"
            >
              <div className={cn("absolute inset-0 bg-white/20 translate-x-[-100%] transition-transform duration-500", !isLoading && "group-hover:translate-x-[100%]")}></div>
              
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
        
        <p className="text-center text-gray-500 text-sm mt-8">
          © {new Date().getFullYear()} Green Future Tech. All rights reserved.
        </p>
      </div>
    </div>
  );
}
