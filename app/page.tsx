'use client'

import { useEffect, useState } from 'react'
import { getCurrentUser } from '@/lib/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default function HomePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    loadUser()
  }, [])

  async function loadUser() {
    try {
      const currentUser = await getCurrentUser()
      if (currentUser) {
        // Redirect to appropriate dashboard
        if (currentUser.user_type === 'buyer') {
          router.push('/buyer')
        } else if (currentUser.user_type === 'agent') {
          router.push('/agent/dashboard')
        } else if (currentUser.user_type === 'seller') {
          router.push('/seller')
        }
      }
      setUser(currentUser)
    } catch (err) {
      setUser(null)
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Real Estate Made Simple
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                A transparent marketplace where buyers submit offers, sellers receive bidding, and agents coordinate everything. No hidden bids. No surprises.
              </p>

              <div className="flex gap-4 flex-wrap">
                {!user ? (
                  <>
                    <Link
                      href="/signup"
                      className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-lg transition transform hover:scale-105"
                    >
                      Get Started Free →
                    </Link>
                    <Link
                      href="/properties"
                      className="px-8 py-4 bg-white hover:bg-gray-100 text-indigo-600 border-2 border-indigo-600 rounded-lg font-bold text-lg transition"
                    >
                      Browse Properties
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href={
                        user.user_type === 'buyer'
                          ? '/properties/search'
                          : user.user_type === 'agent'
                            ? '/agent/dashboard'
                            : '/seller'
                      }
                      className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-lg transition transform hover:scale-105"
                    >
                      Go to Dashboard →
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="hidden md:block">
              <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl p-8 text-white shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🏠</div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">For Buyers</h3>
                      <p className="text-indigo-100 text-sm">Browse properties, submit offers, track bids in real-time</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="text-3xl">📋</div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">For Sellers</h3>
                      <p className="text-indigo-100 text-sm">List properties, receive offers, manage negotiations transparently</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🤝</div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">For Agents</h3>
                      <p className="text-indigo-100 text-sm">Manage clients, track deals, close transactions faster</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
              Why Home Offer?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: '🎯',
                  title: 'Transparent Bidding',
                  desc: 'See the highest offer. No hidden bids. Fair competition.',
                },
                {
                  icon: '⚡',
                  title: 'Fast Offers',
                  desc: 'Submit offers in minutes. Receive responses in hours.',
                },
                {
                  icon: '🔒',
                  title: 'Secure & Legal',
                  desc: 'California DRE compliant. All transactions protected.',
                },
                {
                  icon: '📱',
                  title: 'Mobile First',
                  desc: 'Browse, bid, and close deals from your phone.',
                },
                {
                  icon: '🤝',
                  title: 'Agent Network',
                  desc: 'Connect with verified agents by DRE license.',
                },
                {
                  icon: '💰',
                  title: 'No Hidden Fees',
                  desc: 'Transparent pricing. See all costs upfront.',
                },
              ].map((feature, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gradient-to-br from-indigo-50 to-blue-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
              How It Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  number: '1',
                  title: 'List',
                  desc: 'Sellers create listings with property details',
                },
                {
                  number: '2',
                  title: 'Bid',
                  desc: 'Buyers browse and submit offer amounts',
                },
                {
                  number: '3',
                  title: 'Negotiate',
                  desc: 'Agents manage counter-offers transparently',
                },
                {
                  number: '4',
                  title: 'Close',
                  desc: 'Finalize terms and complete transaction',
                },
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="bg-white rounded-xl p-8 text-center shadow-lg">
                    <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.desc}</p>
                  </div>

                  {idx < 3 && (
                    <div className="hidden md:block absolute top-1/3 -right-3 w-6 h-1 bg-indigo-600" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-indigo-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of buyers, sellers, and agents using Home Offer.
            </p>

            {!user ? (
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  href="/signup"
                  className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
                >
                  Sign Up Free
                </Link>
                <Link
                  href="/login"
                  className="px-8 py-4 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg font-bold text-lg transition border-2 border-white"
                >
                  Sign In
                </Link>
              </div>
            ) : (
              <p className="text-indigo-100">Welcome back! Check your dashboard for the latest listings and offers.</p>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-white mb-4">Product</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/properties" className="hover:text-white transition">
                      Browse
                    </Link>
                  </li>
                  <li>
                    <Link href="/find-agent" className="hover:text-white transition">
                      Find Agent
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-white mb-4">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/privacy" className="hover:text-white transition">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:text-white transition">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-white mb-4">Support</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="mailto:support@homeoffer.pro" className="hover:text-white transition">
                      Support
                    </a>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-white transition">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-white mb-4">About</h3>
                <p className="text-sm">
                  Real estate marketplace built for transparency and fairness.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-8 text-center text-sm">
              <p>© 2026 Home Offer Pro. All rights reserved. California DRE License: TBD</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
