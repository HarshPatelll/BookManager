'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } else {
      setError(data.message || 'Login failed');
    }
  }

  function handleSignup() {
    router.push('/signup');
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5f0fa] via-[#e8f0f7] to-[#f0e8f5] z-0" />

      {/* Book Pages Background */}
      <div className="absolute inset-0 z-5 opacity-30 pointer-events-none">
        {/* Left page */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-40 h-96 bg-white/40 border-2 border-[#d4c5e2] rounded-r-2xl shadow-lg" />
        
        {/* Right page */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-96 bg-white/40 border-2 border-[#a89bb8] rounded-l-2xl shadow-lg" />
        
        {/* Book spine effect */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-96 bg-gradient-to-r from-[#8b7fa8] to-[#6b8fa8]" />
      </div>

      {/* Main content */}
      <div className="relative z-20 w-full max-w-md px-4">
        <div
          className={`transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Form Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#5a4a7a] mb-2">Welcome Back</h1>
              <p className="text-sm text-[#8b7fa8]">Sign in to continue your reading journey</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-[#5a4a7a] mb-2">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#d4c5e2] bg-white/50 text-[#5a4a7a] placeholder-[#a89bb8] focus:outline-none focus:ring-2 focus:ring-[#8b7fa8] focus:border-transparent transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-[#5a4a7a] mb-2">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#d4c5e2] bg-white/50 text-[#5a4a7a] placeholder-[#a89bb8] focus:outline-none focus:ring-2 focus:ring-[#8b7fa8] focus:border-transparent transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Error Message */}
              {error && <p className="text-sm text-red-500 text-center">{error}</p>}

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-2.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-[#8b7fa8] to-[#6b8fa8] text-white hover:from-[#7a6e97] hover:to-[#5a7e97] transition-all duration-300 hover:shadow-lg active:scale-95"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#d4c5e2]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-white/80 text-[#a89bb8]">New here?</span>
              </div>
            </div>

            {/* Signup Button */}
            <button
              onClick={handleSignup}
              className="w-full py-2.5 text-sm font-semibold rounded-lg border-2 border-[#a89bb8] text-[#5a4a7a] hover:bg-white/50 transition-all duration-300 hover:shadow-lg active:scale-95 bg-white/30"
            >
              Create Account
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-[#8b7fa8] mt-6">
            Discover your next favorite book with Personal Book Manager
          </p>
        </div>
      </div>

      {/* Animated gradient blobs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#d4c5e2]/30 to-[#c8e6f5]/30 rounded-full blur-3xl animate-blob z-0" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-[#c8e6f5]/30 to-[#fce4b6]/30 rounded-full blur-3xl animate-blob animation-delay-2000 z-0" />
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-[#fce4b6]/30 to-[#d4c5e2]/30 rounded-full blur-3xl animate-blob animation-delay-4000 z-0" />

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
