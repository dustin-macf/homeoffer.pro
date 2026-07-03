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
  const [dropdownOpen, setDropdownOpen] = useState(false)

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
      setDropdownOpen(false)
      setMenuOpen(false)
      router.refresh()
      router.push('/')
    } catch (err) {
      console.error('Sign out error:', err)
    }
  }

  // Navigation links based on user type
  const getNavLinks = () => {
    if (!user) {
      return [{ label: 'Home', href: '/' }]
    }

    if (user.user_type === 'buyer') {
      return [
        { label: 'Home', href: '/buyer' },
        { label: 'Browse', href: '/properties/search' },
        { label: 'My Offers', href: '/buyer' },
        { label: 'Find Agent', href: '/find-agent' },
      ]
    }

    if (user.user_type === 'agent') {
      return [
        { label: 'Dashboard', href: '/agent/dashboard' },
        { label: 'Clients', href: '/agent/dashboard-advanced' },
        { label: 'Profile', href: '/agent/profile' },
      ]
    }

    if (user.user_type === 'seller') {
      return [
        { label: 'Dashboard', href: '/seller' },
        { label: 'New Listing', href: '/seller/create-listing' },
        { label: 'All Offers', href: '/seller/all-offers' },
      ]
    }

    return []
  }

  const navLinks = getNavLinks()

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                🏠
              </div>
              <span className="hidden sm:inline">Home Offer</span>
            </Link>
          </div>

          {/* Desktop Nav */}
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

          {/* Right side */}
          <div className="flex items-center gap-3">
            {loading ? (
              <div className="w-8 h-8 animate-pulse bg-gray-300 rounded-lg" />
            ) : user ? (
              <>
                {/* User Menu - Desktop */}
                <div className="hidden md:block relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-900 font-semibold text-sm transition"
                  >
                    <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {user.first_name?.charAt(0) || '?'}
                    </div>
                    <span>{user.first_name || 'User'}</span>
                    <span className="text-indigo-600">▼</span>
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-2xl z-50">
                      <Link
                        href="/settings"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg font-semibold text-sm"
                        onClick={() => setDropdownOpen(false)}
                      >
                        ⚙️ Settings
                      </Link>
                      <a
                        href="/privacy"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 font-semibold text-sm"
                      >
                        🔒 Privacy
                      </a>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-b-lg font-semibold text-sm transition"
                      >
                        🚪 Sign Out
                      </button>
                    </div>
                  )}
                </div>
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
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-semibold text-sm"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-sm transition mt-2"
              >
                🚪 Sign Out
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
