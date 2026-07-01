'use client'

import Link from 'next/link'

export default function SmsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4">
          <Link href="/" className="text-2xl sm:text-3xl font-bold text-white">
            Home Offer
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">SMS and SMS Marketing Policy</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. SMS Communications</h2>
              <p>By creating an account on Home Offer, you consent to receive SMS (text) messages from us regarding:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Account verification and security alerts</li>
                <li>Property listing updates and notifications</li>
                <li>Offer submission confirmations</li>
                <li>Important account information</li>
                <li>Promotional messages and special offers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Opt-In Consent</h2>
              <p>By providing your phone number and confirming your account, you explicitly opt-in to receive SMS messages from Home Offer. You acknowledge that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You own the phone number provided</li>
                <li>You have authorized SMS communications to this number</li>
                <li>You understand standard message and data rates may apply</li>
                <li>Messages may be sent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Message Frequency</h2>
              <p>Message frequency varies based on your activity on the Home Offer platform. During active offer periods, you may receive multiple messages daily. You can manage your message frequency by adjusting notification preferences in your account settings.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Opting Out</h2>
              <p>You can opt out of promotional SMS messages by:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Replying "STOP" to any text message from Home Offer</li>
                <li>Updating your notification preferences in your account settings</li>
                <li>Contacting us at support@homeoffer.pro</li>
              </ul>
              <p className="mt-4"><strong>Note:</strong> Opting out of promotional messages will not stop transactional messages related to your account or active offers.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Message and Data Rates</h2>
              <p>Standard message and data rates may apply to SMS messages sent and received. Home Offer is not responsible for charges incurred by your carrier. Please check with your wireless provider for information about your SMS plan and any associated charges.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Content</h2>
              <p>SMS messages from Home Offer will contain relevant information about your offers, properties, and account. Messages may include links, offer details, and time-sensitive notifications. We do not share your phone number with third parties for their marketing purposes.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Privacy</h2>
              <p>Your phone number is protected under our Privacy Policy. We collect and store phone numbers only for the purposes outlined in this SMS Policy and our Privacy Policy. Your information is not sold or shared with third parties without your consent, except as required by law.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Compliance</h2>
              <p>Home Offer complies with the Telephone Consumer Protection Act (TCPA) and all applicable SMS marketing regulations. If you believe we are not complying with this policy, please contact us immediately at support@homeoffer.pro.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Support</h2>
              <p>For questions about this SMS Policy or to manage your preferences, contact us at:</p>
              <p className="font-semibold">Email: support@homeoffer.pro</p>
            </section>

            <p className="text-sm text-gray-500 mt-8">Last updated: July 1, 2026</p>
          </div>

          <div className="mt-8 flex gap-4">
            <Link href="/" className="text-indigo-600 hover:underline">← Back to Home</Link>
            <Link href="/privacy" className="text-indigo-600 hover:underline">View Privacy Policy</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
