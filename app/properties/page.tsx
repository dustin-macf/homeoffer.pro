'use client'

import { useEffect, useState } from 'react'
import { getCurrentUser } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default function PropertiesPage() {
  const router = useRouter()
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      router.push('/login')
      return
    }
    setUser(currentUser)
    loadProperties()
  }

  async function loadProperties() {
    try {
      const { data } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })

      setProperties(data || [])
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-900">Browse Properties</h1>
            <p className="text-gray-600 mt-1">Active listings on the marketplace</p>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <p className="text-gray-600 mb-6">
            Found <strong>{properties.length}</strong> active properties
          </p>

          {properties.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <p className="text-gray-600 text-lg">No active properties at this time</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => {
                const endDate = new Date(property.offer_end_date)
                const now = new Date()
                const isActive = endDate > now && property.status === 'active'
                const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

                return (
                  <Link
                    key={property.id}
                    href={`/properties/${property.id}`}
                    className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition group"
                  >
                    {/* Image */}
                    <div className="relative h-48 bg-gray-200 overflow-hidden group-hover:opacity-90 transition">
                      {property.images?.[0] ? (
                        <img
                          src={property.images[0]}
                          alt={property.address}
                          className="w-full h-full object-cover group-hover:scale-110 transition"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-300">
                          <span className="text-gray-500">No image</span>
                        </div>
                      )}

                      {/* Status Badge */}
                      <div className="absolute top-3 right-3">
                        {isActive ? (
                          <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                            🟢 Active
                          </span>
                        ) : (
                          <span className="bg-gray-100 text-gray-800 text-xs font-bold px-3 py-1 rounded-full">
                            ⚫ Closed
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      {/* Address */}
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                        {property.address}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {property.city}, {property.state}
                      </p>

                      {/* Price */}
                      <p className="text-2xl font-bold text-indigo-600 mb-3">
                        ${property.starting_offer.toLocaleString()}
                      </p>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 mb-3 pb-3 border-b border-gray-200 text-center">
                        <div>
                          <p className="text-xs text-gray-600">BEDS</p>
                          <p className="font-bold text-gray-900">{property.beds}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">BATHS</p>
                          <p className="font-bold text-gray-900">{property.baths}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">SQFT</p>
                          <p className="font-bold text-gray-900">
                            {(property.sqft / 1000).toFixed(1)}K
                          </p>
                        </div>
                      </div>

                      {/* Countdown or Closed */}
                      {isActive ? (
                        <div className="text-xs text-orange-600 font-semibold text-center">
                          ⏱️ {daysLeft}d left to offer
                        </div>
                      ) : (
                        <div className="text-xs text-gray-500 text-center">Offering closed</div>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
