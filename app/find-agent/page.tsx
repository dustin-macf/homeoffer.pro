'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { getCurrentUser } from '@/lib/auth'
import Link from 'next/link'

export default function FindAgentPage() {
  const [agents, setAgents] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState<'dre' | 'name'>('dre')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [selectedAgent, setSelectedAgent] = useState<any>(null)
  const [linking, setLinking] = useState(false)

  useEffect(() => {
    loadUser()
  }, [])

  async function loadUser() {
    const currentUser = await getCurrentUser()
    setUser(currentUser)
  }

  async function searchAgents(query: string) {
    if (!query || query.length < 2) {
      setAgents([])
      return
    }

    setLoading(true)
    try {
      let dbQuery = supabase
        .from('users')
        .select('id, first_name, last_name, email, phone_number, dre_license_number, dre_verified, broker_name')
        .eq('user_type', 'agent')
        .eq('dre_verified', true)

      if (searchType === 'dre') {
        dbQuery = dbQuery.eq('dre_license_number', query)
      } else {
        dbQuery = dbQuery.or(
          `first_name.ilike.%${query}%,last_name.ilike.%${query}%`
        )
      }

      const { data } = await dbQuery

      setAgents(data || [])
    } catch (err) {
      console.error('Search error:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleLinkAgent(agent: any) {
    if (!user) {
      alert('Please log in first')
      return
    }

    setLinking(true)
    try {
      const { error } = await supabase
        .from('users')
        .update({ agent_id: agent.id })
        .eq('id', user.id)

      if (error) throw error

      alert(`✅ You're now connected with ${agent.first_name}!`)
      setSelectedAgent(null)
      setSearchQuery('')
    } catch (err: any) {
      alert('Error: ' + err.message)
    } finally {
      setLinking(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Real Estate Agent</h1>
          <p className="text-gray-600">
            Search agents by California DRE license number or name
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Search Box */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <div className="space-y-4">
            {/* Search Type Toggle */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setSearchType('dre')
                  setSearchQuery('')
                  setAgents([])
                }}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  searchType === 'dre'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🔍 Search by DRE #
              </button>
              <button
                onClick={() => {
                  setSearchType('name')
                  setSearchQuery('')
                  setAgents([])
                }}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  searchType === 'name'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                👤 Search by Name
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  searchAgents(e.target.value)
                }}
                placeholder={
                  searchType === 'dre'
                    ? 'Enter DRE license number (e.g., 12345678)...'
                    : 'Enter agent name (e.g., John Smith)...'
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {loading && (
                <div className="absolute right-4 top-3">
                  <div className="animate-spin h-6 w-6 border-b-2 border-indigo-600"></div>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-900 text-sm">
                <strong>💡 Tip:</strong> California DRE license numbers uniquely identify real estate agents. Only verified agents appear in this directory.
              </p>
            </div>
          </div>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Results {agents.length > 0 && `(${agents.length})`}
            </h2>

            {agents.length === 0 && !loading ? (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-600 text-lg">No verified agents found</p>
                <p className="text-gray-500 text-sm mt-2">
                  Try searching by a different DRE number or name
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    onClick={() => setSelectedAgent(agent)}
                    className={`p-6 rounded-lg border-2 cursor-pointer transition ${
                      selectedAgent?.id === agent.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {agent.first_name} {agent.last_name}
                        </h3>
                        <p className="text-gray-600 text-sm">{agent.broker_name}</p>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                        ✅ Verified
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-gray-700">
                        <strong>DRE #:</strong> {agent.dre_license_number}
                      </p>
                      {agent.phone_number && (
                        <p className="text-gray-700">
                          <strong>Phone:</strong>{' '}
                          <a href={`tel:${agent.phone_number}`} className="text-indigo-600 hover:underline">
                            {agent.phone_number}
                          </a>
                        </p>
                      )}
                      <p className="text-gray-700">
                        <strong>Email:</strong>{' '}
                        <a href={`mailto:${agent.email}`} className="text-indigo-600 hover:underline">
                          {agent.email}
                        </a>
                      </p>
                    </div>

                    {selectedAgent?.id === agent.id && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleLinkAgent(agent)
                        }}
                        disabled={linking || !user}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50 transition"
                      >
                        {!user ? 'Log in to Connect' : linking ? 'Connecting...' : '✅ Connect With This Agent'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {!searchQuery && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">
              👆 Start searching to find a verified real estate agent
            </p>
            <p className="text-gray-500 text-sm">
              Once you connect with an agent, they'll be able to represent you in offers.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
