'use client'

import { useEffect, useState } from 'react'
import { getCurrentUser } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProperties: 0,
    totalOffers: 0,
    totalAgents: 0,
    unverifiedAgents: 0,
    activeListings: 0,
  })

  const [agents, setAgents] = useState<any[]>([])
  const [tabActive, setTabActive] = useState<'overview' | 'agents' | 'properties' | 'offers'>('overview')

  useEffect(() => {
    checkAdminAccess()
  }, [])

  async function checkAdminAccess() {
    try {
      const currentUser = await getCurrentUser()
      if (!currentUser || currentUser.user_type !== 'admin') {
        router.push('/')
        return
      }

      setUser(currentUser)
      loadStats()
    } catch (err) {
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  async function loadStats() {
    try {
      // Get all stats
      const { data: users } = await supabase.from('users').select('id, user_type')
      const { data: properties } = await supabase.from('properties').select('id, status')
      const { data: offers } = await supabase.from('offers').select('id')

      const agents = users?.filter((u: any) => u.user_type === 'agent') || []
      const unverifiedAgents = agents.filter((a: any) => !a.dre_verified) || []
      const activeListings = properties?.filter((p: any) => p.status === 'active') || []

      setStats({
        totalUsers: users?.length || 0,
        totalProperties: properties?.length || 0,
        totalOffers: offers?.length || 0,
        totalAgents: agents.length,
        unverifiedAgents: unverifiedAgents.length,
        activeListings: activeListings.length,
      })

      // Load agents
      const { data: agentList } = await supabase
        .from('users')
        .select('*')
        .eq('user_type', 'agent')
        .order('created_at', { ascending: false })

      setAgents(agentList || [])
    } catch (err) {
      console.error('Error loading stats:', err)
    }
  }

  async function verifyAgent(agentId: string) {
    try {
      const { error } = await supabase
        .from('users')
        .update({ dre_verified: true, dre_verified_at: new Date().toISOString() })
        .eq('id', agentId)

      if (error) throw error

      alert('✅ Agent verified!')
      loadStats()
    } catch (err: any) {
      alert('Error: ' + err.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={() => {
                localStorage.removeItem('auth_token')
                router.push('/')
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 font-semibold mb-2">Total Users</p>
            <p className="text-4xl font-bold text-indigo-600">{stats.totalUsers}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 font-semibold mb-2">Active Properties</p>
            <p className="text-4xl font-bold text-green-600">{stats.activeListings}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 font-semibold mb-2">Total Offers</p>
            <p className="text-4xl font-bold text-blue-600">{stats.totalOffers}</p>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 font-semibold mb-2">Total Properties</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalProperties}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 font-semibold mb-2">Verified Agents</p>
            <p className="text-3xl font-bold text-gray-900">
              {stats.totalAgents - stats.unverifiedAgents}/{stats.totalAgents}
            </p>
          </div>

          <div className={`rounded-lg shadow p-6 ${stats.unverifiedAgents > 0 ? 'bg-orange-50' : 'bg-white'}`}>
            <p className="text-gray-600 font-semibold mb-2">Unverified Agents</p>
            <p className={`text-3xl font-bold ${stats.unverifiedAgents > 0 ? 'text-orange-600' : 'text-green-600'}`}>
              {stats.unverifiedAgents}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="flex border-b">
            <button
              onClick={() => setTabActive('overview')}
              className={`flex-1 px-6 py-4 font-semibold ${
                tabActive === 'overview'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setTabActive('agents')}
              className={`flex-1 px-6 py-4 font-semibold ${
                tabActive === 'agents'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Agents ({stats.totalAgents})
            </button>
            <button
              onClick={() => setTabActive('properties')}
              className={`flex-1 px-6 py-4 font-semibold ${
                tabActive === 'properties'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Properties
            </button>
            <button
              onClick={() => setTabActive('offers')}
              className={`flex-1 px-6 py-4 font-semibold ${
                tabActive === 'offers'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Offers
            </button>
          </div>

          <div className="p-6">
            {tabActive === 'overview' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">Platform Health</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg">
                    <p className="font-semibold text-gray-900 mb-2">User Distribution</p>
                    <p className="text-sm text-gray-600">
                      {stats.totalUsers} total users ({stats.totalAgents} agents)
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <p className="font-semibold text-gray-900 mb-2">Marketplace Activity</p>
                    <p className="text-sm text-gray-600">
                      {stats.activeListings} active listings, {stats.totalOffers} total offers
                    </p>
                  </div>

                  <div className={`p-4 border rounded-lg ${stats.unverifiedAgents > 0 ? 'bg-orange-50 border-orange-200' : ''}`}>
                    <p className={`font-semibold mb-2 ${stats.unverifiedAgents > 0 ? 'text-orange-900' : 'text-gray-900'}`}>
                      DRE Verification
                    </p>
                    <p className={`text-sm ${stats.unverifiedAgents > 0 ? 'text-orange-700' : 'text-gray-600'}`}>
                      {stats.unverifiedAgents} agents pending DRE verification
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <p className="font-semibold text-gray-900 mb-2">System Status</p>
                    <p className="text-sm text-green-600 font-semibold">✅ All systems operational</p>
                  </div>
                </div>
              </div>
            )}

            {tabActive === 'agents' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Agents</h2>

                {agents.length === 0 ? (
                  <p className="text-gray-600">No agents found</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-4 px-4 font-bold text-gray-900">Name</th>
                          <th className="text-left py-4 px-4 font-bold text-gray-900">Email</th>
                          <th className="text-left py-4 px-4 font-bold text-gray-900">DRE License</th>
                          <th className="text-left py-4 px-4 font-bold text-gray-900">Status</th>
                          <th className="text-left py-4 px-4 font-bold text-gray-900">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {agents.map((agent: any) => (
                          <tr key={agent.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-4 px-4 text-gray-900 font-semibold">
                              {agent.first_name} {agent.last_name}
                            </td>
                            <td className="py-4 px-4 text-gray-600">{agent.email}</td>
                            <td className="py-4 px-4 text-gray-600">{agent.dre_license_number || '—'}</td>
                            <td className="py-4 px-4">
                              {agent.dre_verified ? (
                                <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                                  ✅ Verified
                                </span>
                              ) : (
                                <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full">
                                  ⏳ Pending
                                </span>
                              )}
                            </td>
                            <td className="py-4 px-4">
                              {!agent.dre_verified && agent.dre_license_number ? (
                                <button
                                  onClick={() => verifyAgent(agent.id)}
                                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded font-semibold text-sm transition"
                                >
                                  Verify
                                </button>
                              ) : (
                                '—'
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {tabActive === 'properties' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Properties</h2>
                <p className="text-gray-600">Property management coming soon</p>
              </div>
            )}

            {tabActive === 'offers' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Offers</h2>
                <p className="text-gray-600">Offer management coming soon</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
