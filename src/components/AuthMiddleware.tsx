'use client'

import { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { usePathname, useRouter } from 'next/navigation'

const publicPaths = ['/login', '/signup']

export default function AuthMiddleware({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      const isPublicPath = publicPaths.includes(pathname)
      
      if (!user && !isPublicPath) {
        router.push('/login')
      } else if (user && isPublicPath) {
        router.push('/')
      }
    }
  }, [user, isLoading, pathname, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    )
  }

  return children
}