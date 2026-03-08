'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleGetStarted = () => {
    const token = localStorage.getItem('token')
    if (token) {
      router.push('/dashboard')
    } else {
      router.push('/signup')
    }
  }

  const handleLogin = () => {
    router.push('/login')
  }

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-[#f8f6f0] via-[#e8f3f8] to-[#f0e8f8] relative">
      {/* Animated gradient background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#d4c5e2] to-[#b8e6f0] rounded-full opacity-30 blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-[#fce4b6] to-[#c8e6f5] rounded-full opacity-30 blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-[#e6d5f0] to-[#d4c5e2] rounded-full opacity-20 blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          {/* Title */}
          <h1
            className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-[#2c1a3d] mb-6 text-pretty transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            Personal Book Manager
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg sm:text-xl text-[#5a4a7a] mb-12 text-pretty leading-relaxed transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '0.4s' }}
          >
            Track your reading journey and organize your personal book collection with ease
          </p>

          {/* Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-3 justify-center transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '0.6s' }}
          >
            <button
              onClick={handleGetStarted}
              className="px-6 py-2.5 text-sm font-semibold rounded-full bg-gradient-to-r from-[#8b7fa8] to-[#6b8fa8] text-white hover:from-[#7a6e97] hover:to-[#5a7e97] transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
            >
              Get Started
            </button>
            <button
              onClick={handleLogin}
              className="px-6 py-2.5 text-sm font-semibold rounded-full border-2 border-[#a89bb8] text-[#5a4a7a] hover:bg-white/50 transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 bg-white/30"
            >
              Login
            </button>
          </div>
        </div>
      </div>

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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes float-in {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
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

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-float-in {
          animation: float-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
