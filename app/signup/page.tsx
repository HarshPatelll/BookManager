'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert('Account created! Redirecting to login...');
      router.push('/login');
    } else {
      setError(data.message || 'Signup failed');
    }
  }

  function handleLogin() {
    router.push('/login');
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-black">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-black z-0" />

      {/* Main content */}
      <div className="relative z-20 w-full max-w-md px-4">
        <div
          className={`transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Form Card */}
          <div className="bg-gray-900 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-800">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Join Us</h1>
              <p className="text-sm text-gray-400">Start your reading adventure today</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSignup} className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-100 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-700 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-100 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-700 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-100 mb-2">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-700 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Error Message */}
              {error && <p className="text-sm text-red-400 text-center">{error}</p>}

              {/* Signup Button */}
              <button
                type="submit"
                className="w-full py-2.5 text-sm font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all duration-300 hover:shadow-lg active:scale-95"
              >
                Create Account
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-gray-900 text-gray-400">Have an account?</span>
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="w-full py-2.5 text-sm font-semibold rounded-lg border-2 border-gray-700 text-gray-100 hover:bg-gray-800 transition-all duration-300 hover:shadow-lg active:scale-95"
            >
              Sign In
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 mt-6">
            Build your personal library and track your reading journey
          </p>
        </div>
      </div>




    </div>
  );
}
