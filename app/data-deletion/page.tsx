'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { getCurrentUser } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export default function DataDeletionPage() {
  const router = useRouter()
  const [step, setStep] = useState<'form' | 'confirm' | 'processing' | 'success'>('form')
  const [email, setEmail] = useState('')
  const [reason, setReason] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleDeleteRequest(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Verify user is logged in or email is valid
      const currentUser = await getCurrentUser()
      
      if (!currentUser && !email) {
        throw new Error('Please log in or provide your email address')
      }

      const userEmail = currentUser?.email || email

      // Create deletion request
      const { error: insertError } = await supabase
        .from('data_deletion_requests')
        .insert({
          user_email: userEmail,
          reason: reason || 'User requested deletion',
          status: 'pending',
          created_at: new Date().toISOString(),
        })

      if (insertError) throw insertError

      setStep('processing')

      // Simulate processing
      setTimeout(() => {
        setStep('success')
      }, 2000)
    } catch (err: any) {
      setError(err.message || 'Error submitting deletion request')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Request Data Deletion</h1>
        <p className="text-gray-600 mb-8">GDPR & CCPA Compliance</p>

        {/* Form Step */}
        {step === 'form' && (
          <form onSubmit={handleDeleteRequest} className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <h2 className="font-semibold text-blue-900 mb-2">Before You Continue</h2>
              <ul className="space-y-2 text-blue-800 text-sm">
                <li>✓ This will delete your account and all associated data</li>
                <li>✓ Deletion is permanent and cannot be undone</li>
                <li>✓ Processing takes up to 30 days</li>
                <li>✓ Transaction history may be retained for legal compliance (7 years)</li>
                <li>✓ You will receive an email confirmation when deletion is complete</li>
              </ul>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* If not logged in, show email field */}
            {!getCurrentUser && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                  placeholder="your@email.com"
                  required={!getCurrentUser}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Or log in to your account before requesting deletion
                </p>
              </div>
            )}

            {/* Reason (optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Deletion (Optional)
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                placeholder="Let us know why you're deleting your account..."
                rows={4}
              />
            </div>

            {/* Confirmation checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="confirm"
                checked={confirmDelete}
                onChange={(e) => setConfirmDelete(e.target.checked)}
                className="mt-1 w-4 h-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              />
              <label htmlFor="confirm" className="text-sm text-gray-700">
                I understand this will permanently delete my account and data within 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!confirmDelete || loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Request Data Deletion'}
            </button>

            <p className="text-xs text-gray-500 text-center">
              This action cannot be undone. Please ensure you have backed up any important information.
            </p>
          </form>
        )}

        {/* Processing Step */}
        {step === 'processing' && (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mt-4">Processing</h2>
            <p className="text-gray-600 mt-2">Your deletion request is being processed...</p>
          </div>
        )}

        {/* Success Step */}
        {step === 'success' && (
          <div className="text-center py-12">
            <div className="text-green-600 text-5xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Deletion Request Submitted
            </h2>
            <p className="text-gray-600 mb-6">
              Your data deletion request has been received. We'll process it within 30 days.
            </p>

            <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6 text-left">
              <p className="text-green-800 text-sm mb-3">
                <strong>What happens next:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 text-green-800 text-sm">
                <li>You will receive a confirmation email</li>
                <li>Your account will be deactivated immediately</li>
                <li>All personal data will be deleted within 30 days</li>
                <li>Transaction history retained for 7 years (legal requirement)</li>
                <li>You will receive a final confirmation email when complete</li>
              </ul>
            </div>

            <p className="text-gray-600 mb-6">
              Questions? Contact <a href="mailto:privacy@cpt.law" className="text-indigo-600 font-semibold hover:underline">privacy@cpt.law</a>
            </p>

            <a
              href="/"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Return to Home
            </a>
          </div>
        )}

        {/* Information Section */}
        {step === 'form' && (
          <>
            <hr className="my-8" />

            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">GDPR Rights (EU Users)</h3>
                <p className="text-gray-700 text-sm mb-2">
                  If you are in the EU, you have the right to erasure ("right to be forgotten") under GDPR Article 17. We will delete your personal data within 30 days of your request.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">CCPA Rights (California Users)</h3>
                <p className="text-gray-700 text-sm mb-2">
                  If you are a California resident, you have the right to delete personal information we collected from you under CCPA § 1798.105. We will delete your data within 45 days of verification.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What Gets Deleted</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                  <li>Account information (name, email, password)</li>
                  <li>Phone number and SMS preferences</li>
                  <li>Profile data and settings</li>
                  <li>Offer submissions</li>
                  <li>Device and usage data</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What May Be Retained</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                  <li>Transaction records (7 years for legal/tax compliance)</li>
                  <li>Dispute resolution data (if applicable)</li>
                  <li>Anonymized analytics (cannot identify you)</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Us</h3>
                <p className="text-gray-700 text-sm">
                  For privacy inquiries or to discuss your deletion request:
                </p>
                <p className="text-gray-700 text-sm mt-2">
                  <strong>Email:</strong> <a href="mailto:privacy@cpt.law" className="text-indigo-600 hover:underline">privacy@cpt.law</a>
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Address:</strong> California Probate & Trust, California, USA
                </p>
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
