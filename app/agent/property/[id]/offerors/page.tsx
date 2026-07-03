'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function OfferorsPage() {
  const params = useParams()
  const router = useRouter()
  const propertyId = params.id as string

  const [property, setProperty] = useState<any>(null)
  const [offers, setOffers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [selectedOfferor, setSelectedOfferor] = useState<any>(null)
  const [contactMode, setContactMode] = useState<'email' | 'sms' | null>(null)
  const [messageText, setMessageText] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    loadData()
  }, [propertyId])

  async function loadData() {
    try {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        router.push('/login')
        return
      }

      setUser(currentUser)

      // Get property
      const { data: prop } = await supabase
        .from('properties')
        .select('*')
        .eq('id', propertyId)
        .single()

      if (!prop || prop.listing_agent_id !== currentUser.id) {
        router.push('/agent/dashboard')
        return
      }

      setProperty(prop)

      // Get all offers with buyer info
      const { data: allOffers } = await supabase
        .from('offers')
        .select(`
          *,
          users:buyer_id (
            id,
            first_name,
            last_name,
            email,
            phone_number,
            user_type,
            sms_opt_in
          )
        `)
        .eq('property_id', propertyId)
        .order('amount', { ascending: false })

      setOffers(allOffers || [])
    } catch (err) {
      console.error('Error:', err)
      router.push('/agent/dashboard')
    } finally {
      setLoading(false)
    }
  }

  async function handleSendMessage() {
    if (!selectedOfferor || !messageText) return

    setSending(true)
    try {
      // SMS placeholder - ready for Twilio
      if (contactMode === 'sms') {
        console.log(`[SMS PLACEHOLDER] To: ${selectedOfferor.users.phone_number}`)
        console.log(`[SMS PLACEHOLDER] Message: ${messageText}`)
        alert('SMS sent! (Placeholder - Twilio not live yet)')
      }
      // Email - ready for Resend
      else if (contactMode === 'email') {
        console.log(`[EMAIL PLACEHOLDER] To: ${selectedOfferor.users.email}`)
        console.log(`[EMAIL PLACEHOLDER] Message: ${messageText}`)
        alert('Email sent! (Placeholder - email service not live yet)')
      }

      setMessageText('')
      setSelectedOfferor(null)
      setContactMode(null)
    } catch (err: any) {
      alert('Error: ' + err.message)
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Property not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Offerors</h1>
              <p className="text-gray-600 mt-1">{property.address}</p>
            </div>
            <Link
              href={`/agent/property/${propertyId}`}
              className="text-gray-600 hover:text-gray-900 font-semibold"
            >
              ← Back
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {offers.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600 text-lg">No offers yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Offerors List */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {offers.length} Total Offerors
              </h2>

              <div className="space-y-4">
                {offers.map((offer, idx) => (
                  <div
                    key={offer.id}
                    onClick={() => setSelectedOfferor(offer)}
                    className={`p-6 rounded-lg border-2 cursor-pointer transition ${
                      selectedOfferor?.id === offer.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-gray-900">
                            {offer.users.first_name} {offer.users.last_name}
                          </h3>
                          {idx === 0 && (
                            <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                              HIGHEST
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{offer.users.email}</p>
                        {offer.users.phone_number && (
                          <p className="text-gray-600 text-sm">{offer.users.phone_number}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-indigo-600">
                          ${offer.amount.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(offer.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Dual Representation Info */}
                    <div className="bg-gray-50 rounded p-3 text-sm">
                      <p className="text-gray-700 mb-2">
                        <strong>Buyer Status:</strong> {offer.users.user_type === 'agent' ? 'Agent' : 'Individual Buyer'}
                      </p>
                      <p className="text-gray-700 mb-3">
                        <strong>SMS Notifications:</strong> {offer.users.sms_opt_in ? '✅ Yes' : '⚫ No'}
                      </p>

                      {/* Dual Rep Option */}
                      <div className="bg-blue-100 border border-blue-300 rounded p-2 text-blue-900 text-xs">
                        💡 <strong>Dual Representation:</strong> California allows dual agency. You can represent this buyer too.
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-1">
              {selectedOfferor ? (
                <div className="sticky top-4 bg-white rounded-lg shadow p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Contact {selectedOfferor.users.first_name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Offer: ${selectedOfferor.amount.toLocaleString()}
                    </p>
                  </div>

                  {/* Contact Method Selector */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Choose Contact Method
                    </label>
                    <div className="space-y-2">
                      <button
                        onClick={() => setContactMode('email')}
                        className={`w-full p-3 rounded-lg border-2 font-semibold transition ${
                          contactMode === 'email'
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        📧 Send Email
                      </button>
                      {selectedOfferor.users.phone_number && selectedOfferor.users.sms_opt_in ? (
                        <button
                          onClick={() => setContactMode('sms')}
                          className={`w-full p-3 rounded-lg border-2 font-semibold transition ${
                            contactMode === 'sms'
                              ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                              : 'border-gray-300 text-gray-700 hover:border-gray-400'
                          }`}
                        >
                          📱 Send SMS
                        </button>
                      ) : (
                        <button disabled className="w-full p-3 rounded-lg border-2 border-gray-300 text-gray-400 font-semibold cursor-not-allowed">
                          📱 SMS (Not opted in)
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Message Input */}
                  {contactMode && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Message
                        </label>
                        <textarea
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          rows={6}
                          placeholder={
                            contactMode === 'sms'
                              ? 'Keep SMS messages under 160 characters...'
                              : 'Type your message...'
                          }
                        />
                        {contactMode === 'sms' && (
                          <p className="text-xs text-gray-500 mt-1">
                            {messageText.length} / 160 characters
                          </p>
                        )}
                      </div>

                      <button
                        onClick={handleSendMessage}
                        disabled={sending || !messageText}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg font-semibold disabled:opacity-50 transition"
                      >
                        {sending ? 'Sending...' : `Send ${contactMode === 'sms' ? 'SMS' : 'Email'}`}
                      </button>

                      <button
                        onClick={() => {
                          setContactMode(null)
                          setMessageText('')
                        }}
                        className="w-full bg-gray-300 hover:bg-gray-400 text-gray-900 px-4 py-3 rounded-lg font-semibold transition"
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {/* Quick Actions */}
                  <div className="pt-4 border-t space-y-2">
                    <button className="w-full text-left text-sm text-indigo-600 hover:underline font-semibold">
                      🤝 Offer Dual Representation
                    </button>
                    <button className="w-full text-left text-sm text-indigo-600 hover:underline font-semibold">
                      📋 View Complete Profile
                    </button>
                    <button className="w-full text-left text-sm text-gray-600 hover:underline font-semibold">
                      🚫 Block This Offeror
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow p-6 text-center text-gray-600">
                  <p>Select an offeror to contact</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
