'use client'

import { useEffect, useState } from 'react'
import { getCurrentUser, signOut } from '@/lib/auth'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    loadUser()
  }, [])

  async function loadUser() {
    try {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    } catch (err) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  async function handleSignOut() {
    try {
      await signOut()
      setUser(null)
      setMenuOpen(false)
      router.refresh()
      router.push('/')
    } catch (err) {
      console.error('Sign out error:', err)
    }
  }

  // Get dashboard link based on user type
  const getDashboardLink = () => {
    if (!user) return '/'
    if (user.user_type === 'buyer') return '/buyer'
    if (user.user_type === 'seller') return '/seller'
    if (user.user_type === 'agent') return '/agent/dashboard'
    return '/'
  }

  // Navigation links based on user type
  const getNavLinks = () => {
    if (!user) {
      return []
    }

    if (user.user_type === 'buyer') {
      return [
        { label: 'Dashboard', href: '/buyer' },
        { label: 'Browse', href: '/properties/search' },
        { label: 'Find Agent', href: '/find-agent' },
        { label: 'Settings', href: '/settings' },
      ]
    }

    if (user.user_type === 'agent') {
      return [
        { label: 'Dashboard', href: '/agent/dashboard' },
        { label: 'Clients', href: '/agent/dashboard-advanced' },
        { label: 'Profile', href: '/agent/profile' },
        { label: 'Settings', href: '/settings' },
      ]
    }

    if (user.user_type === 'seller') {
      return [
        { label: 'Dashboard', href: '/seller' },
        { label: 'Create Listing', href: '/seller/create-listing' },
        { label: 'All Offers', href: '/seller/all-offers' },
        { label: 'Settings', href: '/settings' },
      ]
    }

    return []
  }

  const navLinks = getNavLinks()
  const dashboardLink = getDashboardLink()

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - always clickable to go home/dashboard */}
          <Link 
            href={dashboardLink}
            className="flex items-center gap-2 font-bold text-xl text-indigo-600 hover:text-indigo-700 transition"
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
              🏠
            </div>
            <span className="hidden sm:inline">Home Offer</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                  pathname === link.href
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side - Sign Out / Sign In */}
          <div className="flex items-center gap-3">
            {loading ? (
              <div className="w-10 h-10 animate-pulse bg-gray-300 rounded-lg" />
            ) : user ? (
              <>
                {/* User name + avatar - Desktop */}
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-100">
                  <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user.first_name?.charAt(0) || '?'}
                  </div>
                  <span className="text-indigo-900 font-semibold text-sm">{user.first_name || 'User'}</span>
                </div>

                {/* Sign Out Button */}
                <button
                  onClick={handleSignOut}
                  className="hidden sm:block px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-indigo-600 hover:text-indigo-700 font-semibold text-sm"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-sm transition"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-gray-200 pt-4">
            {/* User info - Mobile */}
            {user && (
              <div className="px-4 py-2 bg-indigo-100 rounded-lg mb-2">
                <p className="text-indigo-900 font-semibold">{user.first_name || 'User'}</p>
                <p className="text-indigo-700 text-xs">{user.email}</p>
              </div>
            )}

            {/* Navigation links - Mobile */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-semibold text-sm transition"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Sign Out - Mobile */}
            {user && (
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-sm transition mt-4"
              >
                Sign Out
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
