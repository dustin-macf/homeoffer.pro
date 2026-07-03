'use client'

import { useEffect, useState } from 'react'
import { getCurrentUser } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function BuyerAgentAdvancedDashboard() {
  const router = useRouter()
  const [clients, setClients] = useState<any[]>([])
  const [allOffers, setAllOffers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [filterProperty, setFilterProperty] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'clients' | 'properties' | 'analytics'>('clients')

  const [stats, setStats] = useState({
    totalClients: 0,
    totalOffers: 0,
    activeOffers: 0,
    winRate: 0,
    avgOfferSize: 0,
    totalValue: 0,
    conflictCount: 0,
  })

  useEffect(() => {
    loadAdvancedData()
  }, [])

  async function loadAdvancedData() {
    try {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        router.push('/login')
        return
      }

      if (currentUser.user_type !== 'agent') {
        router.push('/buyer')
        return
      }

      setUser(currentUser)

      // Get all offers for this buyer agent
      const { data: buyerAgentOffers } = await supabase
        .from('offers')
        .select(`
          *,
          users:buyer_id (
            id,
            first_name,
            last_name,
            email,
            phone_number,
            sms_opt_in
          ),
          properties:property_id (
            id,
            address,
            city,
            state,
            starting_offer,
            offer_end_date,
            status
          )
        `)
        .eq('buyer_agent_id', currentUser.id)
        .order('created_at', { ascending: false })

      if (!buyerAgentOffers) {
        setLoading(false)
        return
      }

      setAllOffers(buyerAgentOffers)

      // Group offers by buyer client
      const clientMap = new Map<string, any>()

      buyerAgentOffers.forEach((offer) => {
        const buyerId = offer.users.id
        if (!clientMap.has(buyerId)) {
          clientMap.set(buyerId, {
            id: buyerId,
            ...offer.users,
            offers: [],
            totalBid: 0,
            maxOffer: 0,
            propertiesCount: new Set(),
          })
        }

        const client = clientMap.get(buyerId)
        client.offers.push(offer)
        client.totalBid += offer.amount
        client.maxOffer = Math.max(client.maxOffer, offer.amount)
        client.propertiesCount.add(offer.properties.id)
      })

      const clientsArray = Array.from(clientMap.values()).map((client) => ({
        ...client,
        propertiesCount: client.propertiesCount.size,
      }))

      setClients(clientsArray)

      // Calculate stats
      const now = new Date()
      const activeOffers = buyerAgentOffers.filter((o) => {
        const endDate = new Date(o.properties.offer_end_date)
        return endDate > now && o.properties.status === 'active'
      })

      // Detect conflicts (multiple clients offering on same property)
      const propertyMap = new Map<string, any[]>()
      buyerAgentOffers.forEach((offer) => {
        const propId = offer.properties.id
        if (!propertyMap.has(propId)) {
          propertyMap.set(propId, [])
        }
        propertyMap.get(propId)!.push(offer)
      })

      const conflicts = Array.from(propertyMap.values()).filter(
        (offers) => new Set(offers.map((o) => o.buyer_id)).size > 1
      )

      setStats({
        totalClients: clientsArray.length,
        totalOffers: buyerAgentOffers.length,
        activeOffers: activeOffers.length,
        winRate: 0, // Calculate from historical data
        avgOfferSize: buyerAgentOffers.length > 0
          ? Math.round(
              buyerAgentOffers.reduce((sum, o) => sum + o.amount, 0) /
                buyerAgentOffers.length
            )
          : 0,
        totalValue: buyerAgentOffers.reduce((sum, o) => sum + o.amount, 0),
        conflictCount: conflicts.length,
      })
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Get unique properties
  const properties = Array.from(
    new Map(
      allOffers.map((o) => [
        o.properties.id,
        {
          id: o.properties.id,
          address: o.properties.address,
          city: o.properties.city,
          state: o.properties.state,
        },
      ])
    ).values()
  )

  // Detect properties with multiple of your clients offering
  const propertyConflicts = properties
    .map((prop) => {
      const propOffers = allOffers.filter(
        (o) => o.properties.id === prop.id
      )
      const buyerIds = new Set(propOffers.map((o) => o.buyer_id))
      return {
        ...prop,
        buyerCount: buyerIds.size,
        offers: propOffers,
        highestOffer: Math.max(...propOffers.map((o) => o.amount)),
      }
    })
    .filter((p) => p.buyerCount > 1)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Buyer Agent Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Manage all your buyer clients</p>
            </div>
            <Link
              href="/agent/buyer-clients"
              className="text-gray-600 hover:text-gray-900 font-semibold"
            >
              ← Simple View
            </Link>
          </div>

          {/* View Mode Tabs */}
          <div className="flex gap-4 border-b">
            <button
              onClick={() => setViewMode('clients')}
              className={`px-4 py-2 font-semibold text-sm ${
                viewMode === 'clients'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Clients
            </button>
            <button
              onClick={() => setViewMode('properties')}
              className={`px-4 py-2 font-semibold text-sm ${
                viewMode === 'properties'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Properties
            </button>
            <button
              onClick={() => setViewMode('analytics')}
              className={`px-4 py-2 font-semibold text-sm ${
                viewMode === 'analytics'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-indigo-50 rounded-lg p-4">
              <p className="text-gray-600 text-sm font-semibold mb-1">Clients</p>
              <p className="text-3xl font-bold text-indigo-600">{stats.totalClients}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-gray-600 text-sm font-semibold mb-1">Total Offers</p>
              <p className="text-3xl font-bold text-blue-600">{stats.totalOffers}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-gray-600 text-sm font-semibold mb-1">Active Offers</p>
              <p className="text-3xl font-bold text-green-600">{stats.activeOffers}</p>
            </div>
            <div className={`rounded-lg p-4 ${stats.conflictCount > 0 ? 'bg-red-50' : 'bg-gray-50'}`}>
              <p className="text-gray-600 text-sm font-semibold mb-1">Conflicts</p>
              <p className={`text-3xl font-bold ${stats.conflictCount > 0 ? 'text-red-600' : 'text-gray-600'}`}>
                {stats.conflictCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* CLIENTS VIEW */}
        {viewMode === 'clients' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Your Clients ({stats.totalClients})
            </h2>

            {clients.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-600 text-lg">No clients yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {clients.map((client) => (
                  <Link
                    key={client.id}
                    href={`/agent/buyer-clients/${client.id}`}
                    className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {client.first_name} {client.last_name}
                        </h3>
                        <p className="text-gray-600 text-sm">{client.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-indigo-600">
                          ${client.maxOffer.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-600">Highest</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 py-3 border-y border-gray-200 mb-3">
                      <div>
                        <p className="text-xs text-gray-600">Offers</p>
                        <p className="font-bold text-gray-900">{client.offers.length}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Properties</p>
                        <p className="font-bold text-gray-900">{client.propertiesCount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Total offer</p>
                        <p className="font-bold text-gray-900">
                          ${(client.totalBid / 1000).toFixed(0)}K
                        </p>
                      </div>
                    </div>

                    <p className="text-indigo-600 font-semibold text-sm hover:underline">
                      View Profile →
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PROPERTIES VIEW */}
        {viewMode === 'properties' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Properties ({properties.length})
            </h2>

            {propertyConflicts.length > 0 && (
              <div className="mb-8 bg-red-50 border-2 border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-red-900 mb-4">
                  ⚠️ offer Conflicts ({propertyConflicts.length})
                </h3>
                <p className="text-red-800 text-sm mb-4">
                  Multiple of your clients are offering on the same properties. Coordinate strategies to avoid conflicts.
                </p>

                <div className="space-y-3">
                  {propertyConflicts.map((prop) => (
                    <div
                      key={prop.id}
                      className="bg-white rounded p-4 border-l-4 border-red-500"
                    >
                      <h4 className="font-bold text-gray-900">{prop.address}</h4>
                      <p className="text-sm text-gray-600">
                        {prop.buyerCount} of your clients offering • Highest: ${prop.highestOffer.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Clients involved:{' '}
                        {prop.offers
                          .map((o: any) => `${o.users.first_name} (${o.amount.toLocaleString()})`)
                          .join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              {properties.map((prop) => {
                const propOffers = allOffers.filter(
                  (o) => o.properties.id === prop.id
                )
                const highestOffer = Math.max(
                  ...propOffers.map((o) => o.amount),
                  0
                )

                return (
                  <div
                    key={prop.id}
                    className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {prop.address}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {prop.city}, {prop.state}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-indigo-600">
                          ${highestOffer.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-600">Your highest</p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600">
                      {propOffers.length} offer{propOffers.length !== 1 ? 's' : ''} from{' '}
                      <strong>
                        {new Set(propOffers.map((o) => o.buyer_id)).size} client
                        {new Set(propOffers.map((o) => o.buyer_id)).size !== 1 ? 's' : ''}
                      </strong>
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ANALYTICS VIEW */}
        {viewMode === 'analytics' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Overall Stats */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Overall Performance
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Average Offer Size</p>
                    <p className="text-3xl font-bold text-indigo-600">
                      ${stats.avgOfferSize.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Portfolio Value</p>
                    <p className="text-3xl font-bold text-green-600">
                      ${(stats.totalValue / 1000000).toFixed(1)}M
                    </p>
                  </div>
                </div>
              </div>

              {/* Risk Metrics */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Risk Metrics
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Active Offers</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {stats.activeOffers}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Internal Conflicts</p>
                    <p className={`text-3xl font-bold ${stats.conflictCount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {stats.conflictCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Client Performance */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Client Rankings
              </h3>

              <div className="space-y-3">
                {clients
                  .sort((a, b) => b.maxOffer - a.maxOffer)
                  .slice(0, 5)
                  .map((client, idx) => (
                    <div
                      key={client.id}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-bold text-gray-900">
                          #{idx + 1} - {client.first_name} {client.last_name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {client.offers.length} offers on {client.propertiesCount} properties
                        </p>
                      </div>
                      <p className="text-2xl font-bold text-indigo-600">
                        ${client.maxOffer.toLocaleString()}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
