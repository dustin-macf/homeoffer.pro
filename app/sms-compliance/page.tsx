'use client'

export default function SMSCompliancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">SMS Compliance & Campaign Details</h1>

        {/* Use Case Type */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Use Case Type</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-900 font-semibold">Real Estate Offer Marketplace - Buyer & Agent Notifications</p>
            <p className="text-gray-700 mt-2">
              Home Offer is a transparent real estate offer platform. We send SMS notifications to listing agents and buyers regarding property offer requests, approvals, and marketplace updates.
            </p>
          </div>
        </section>

        {/* Campaign Description */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Campaign Description</h2>
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <div>
              <p className="text-gray-900 font-semibold mb-2">Campaign Name:</p>
              <p className="text-gray-700">Home Offer Real Estate Marketplace - Transactional Notifications</p>
            </div>
            <div>
              <p className="text-gray-900 font-semibold mb-2">Purpose:</p>
              <p className="text-gray-700">
                Send transactional SMS messages to listing agents and buyers regarding real estate offers, approvals, and marketplace activity.
              </p>
            </div>
            <div>
              <p className="text-gray-900 font-semibold mb-2">Frequency:</p>
              <p className="text-gray-700">
                As-needed transactional messages (buyer approval requests, agent notifications, offer confirmations). Users can opt-out at any time.
              </p>
            </div>
            <div>
              <p className="text-gray-900 font-semibold mb-2">Recipients:</p>
              <p className="text-gray-700">
                Listing agents (with explicit consent), Buyers (with explicit consent), Active marketplace participants
              </p>
            </div>
          </div>
        </section>

        {/* Message Contents */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Message Contents & Examples</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-900 font-semibold mb-2">Message Type 1: Buyer Approval Request</p>
              <div className="bg-white p-3 rounded border border-gray-200 font-mono text-sm text-gray-800">
                <p>New buyer request for 456 Downtown Plaza, San Francisco. Log in to approve or reject: https://homeoffer-pro.vercel.app/seller</p>
                <p className="mt-2 text-xs text-gray-600">Reply STOP to opt-out. Privacy: https://homeoffer-pro.vercel.app/privacy</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-900 font-semibold mb-2">Message Type 2: Buyer Approval Confirmation</p>
              <div className="bg-white p-3 rounded border border-gray-200 font-mono text-sm text-gray-800">
                <p>Your access approved! You can now submit offers on 456 Downtown Plaza. Start offering: https://homeoffer-pro.vercel.app/properties</p>
                <p className="mt-2 text-xs text-gray-600">Reply STOP to opt-out. Privacy: https://homeoffer-pro.vercel.app/privacy</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-900 font-semibold mb-2">Message Type 3: New Offer Notification</p>
              <div className="bg-white p-3 rounded border border-gray-200 font-mono text-sm text-gray-800">
                <p>New offer: $525,000 on 456 Downtown Plaza. Current highest: $525,000. View details: https://homeoffer-pro.vercel.app/properties/[id]</p>
                <p className="mt-2 text-xs text-gray-600">Reply STOP to opt-out. Privacy: https://homeoffer-pro.vercel.app/privacy</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-900 font-semibold mb-2">Links Included in All Messages:</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Privacy Policy: https://homeoffer-pro.vercel.app/privacy</li>
                <li>Terms of Service: https://homeoffer-pro.vercel.app/terms</li>
                <li>SMS Policy: https://homeoffer-pro.vercel.app/sms-policy</li>
                <li>Data Deletion: https://homeoffer-pro.vercel.app/data-deletion</li>
              </ul>
            </div>
          </div>
        </section>

        {/* End-User Consent */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. End-User Consent Details</h2>
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <div>
              <p className="text-gray-900 font-semibold mb-2">Consent Method:</p>
              <p className="text-gray-700">
                Explicit opt-in checkbox during signup and when requesting buyer approval. Users must check "I agree to receive SMS notifications about offers and approvals" before proceeding.
              </p>
            </div>
            <div>
              <p className="text-gray-900 font-semibold mb-2">Consent Language:</p>
              <div className="bg-white p-3 rounded border border-gray-200 text-gray-800">
                <p className="text-sm">
                  "By checking this box, I agree to receive SMS text messages from Home Offer regarding offer requests, approvals, and marketplace notifications. Standard message and data rates may apply. I understand I can opt-out at any time by replying STOP."
                </p>
              </div>
            </div>
            <div>
              <p className="text-gray-900 font-semibold mb-2">Documentation:</p>
              <p className="text-gray-700">
                Consent is recorded in our database with timestamp. Users can view their consent status in account settings.
              </p>
            </div>
          </div>
        </section>

        {/* Keywords */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Opt-in, Opt-out & Help Keywords</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-900 font-semibold mb-2">Opt-in Keywords:</p>
              <div className="bg-white p-3 rounded border border-gray-200">
                <p className="text-gray-800 font-mono">START, YES, ENROLL, OPT-IN</p>
                <p className="text-gray-700 text-sm mt-2">Response: "You're enrolled! You'll receive SMS notifications about offers and approvals. Reply STOP to unsubscribe."</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-900 font-semibold mb-2">Opt-out Keywords:</p>
              <div className="bg-white p-3 rounded border border-gray-200">
                <p className="text-gray-800 font-mono">STOP, UNSUBSCRIBE, NO, QUIT, CANCEL, OPT-OUT</p>
                <p className="text-gray-700 text-sm mt-2">Response: "You've unsubscribed from Home Offer SMS. You won't receive further messages. Text START to re-enroll or visit https://homeoffer-pro.vercel.app/sms-policy for help."</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-900 font-semibold mb-2">Help Keywords:</p>
              <div className="bg-white p-3 rounded border border-gray-200">
                <p className="text-gray-800 font-mono">HELP, ?, INFO, SUPPORT</p>
                <p className="text-gray-700 text-sm mt-2">Response: "Home Offer sends SMS about real estate offers & approvals. Text STOP to opt-out. More info: https://homeoffer-pro.vercel.app/sms-policy or contact support@homeoffer.pro"</p>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Additional Compliance Info</h2>
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg space-y-2">
            <p className="text-gray-900 font-semibold">Company Name:</p>
            <p className="text-gray-700">Home Offer Inc.</p>

            <p className="text-gray-900 font-semibold mt-4">Support Contact:</p>
            <p className="text-gray-700">support@homeoffer.pro</p>

            <p className="text-gray-900 font-semibold mt-4">Message Type:</p>
            <p className="text-gray-700">Transactional (time-sensitive notifications required for marketplace operation)</p>

            <p className="text-gray-900 font-semibold mt-4">Message Frequency:</p>
            <p className="text-gray-700">Variable, as-needed (typically 0-5 per user per day during active marketplace participation)</p>

            <p className="text-gray-900 font-semibold mt-4">Standard Disclaimers:</p>
            <p className="text-gray-700">All messages include opt-out instructions and links to privacy policy, terms of service, and SMS policy.</p>
          </div>
        </section>

        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-900 font-semibold">✅ This page provides all information needed for Twilio SMS compliance & registration.</p>
        </div>
      </div>
    </div>
  )
}
