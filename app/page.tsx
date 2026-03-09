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
    <div className="min-h-screen overflow-hidden bg-black relative">

      {/* Main content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          {/* Title */}
          <h1
            className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 text-pretty transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            Personal Book Manager
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg sm:text-xl text-gray-400 mb-12 text-pretty leading-relaxed transition-all duration-1000 ${
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
              className="px-6 py-2.5 text-sm font-semibold rounded-full bg-white text-black hover:bg-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
            >
              Get Started
            </button>
            <button
              onClick={handleLogin}
              className="px-6 py-2.5 text-sm font-semibold rounded-full border-2 border-gray-700 text-gray-100 hover:bg-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Login
            </button>
          </div>
        </div>
      </div>


    </div>
  )
}
