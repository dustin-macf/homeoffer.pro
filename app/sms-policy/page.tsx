'use client'

export default function SMSPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">SMS Policy</h1>
        <p className="text-gray-600 mb-8">California Probate & Trust - Offer Marketplace</p>
        <p className="text-gray-600 text-sm mb-8">Last Updated: July 3, 2026</p>

        {/* 1. Overview */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Overview</h2>
          <p className="text-gray-700">
            California Probate & Trust uses SMS (text message) notifications to keep you updated about your marketplace activity. This policy explains how we use SMS, your rights, and how to manage your preferences.
          </p>
        </section>

        {/* 2. What SMS We Send */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. What SMS We Send</h2>
          <p className="text-gray-700 font-semibold mb-3">We send SMS for:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Buyer Approval Requests</strong> - When a buyer requests access to submit offers</li>
            <li><strong>Approval Confirmations</strong> - When your access is approved</li>
            <li><strong>New Offer Alerts</strong> - When you receive a new offer</li>
            <li><strong>Offer Updates</strong> - Status changes on your offers</li>
            <li><strong>Account Notifications</strong> - Password resets, verification, important updates</li>
            <li><strong>Appointment Confirmations</strong> - Scheduled meetings and follow-ups</li>
          </ul>
        </section>

        {/* 3. Opt-In & Consent */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Opt-In & Consent</h2>
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <p className="text-gray-700">
              <strong>How You Opt-In:</strong> You must explicitly opt-in to receive SMS notifications during signup by checking the box "I agree to receive SMS notifications about my account and marketplace activity."
            </p>
            <p className="text-gray-700">
              <strong>Consent is Required:</strong> We will not send SMS without your prior written consent. You must have a valid phone number on file.
            </p>
            <p className="text-gray-700">
              <strong>You Can Change Your Mind:</strong> You can toggle SMS notifications on/off at any time in your Account Settings or by replying to any message.
            </p>
          </div>
        </section>

        {/* 4. Message Frequency */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Message Frequency</h2>
          <p className="text-gray-700 mb-3">
            SMS frequency depends on your marketplace activity:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li><strong>During active bidding:</strong> 0-5 messages per day (offer alerts, approvals, updates)</li>
            <li><strong>After bidding ends:</strong> 1-2 messages per day (status updates, results)</li>
            <li><strong>During inactive periods:</strong> 0 messages (no activity = no notifications)</li>
          </ul>
          <p className="text-gray-700 mt-3">
            <em>All message times depend on your activity. These are approximate frequencies, not guaranteed counts.</em>
          </p>
        </section>

        {/* 5. Message & Data Rates */}
        <section className="mb-8 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Standard Message & Data Rates Apply</h2>
          <p className="text-gray-700">
            Your mobile carrier's standard message and data rates apply to all SMS messages we send. We are not responsible for carrier charges. Check your mobile plan for details on text message costs.
          </p>
          <p className="text-gray-700 mt-3 text-sm">
            <strong>Example:</strong> If your carrier charges $0.20 per text message, and you receive 5 messages, you may be charged $1.00.
          </p>
        </section>

        {/* 6. How to Opt-Out */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. How to Opt-Out</h2>
          <p className="text-gray-700 font-semibold mb-3">You can disable SMS notifications in 3 ways:</p>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-900 font-semibold mb-2">Method 1: Account Settings</p>
              <ol className="list-decimal pl-6 space-y-1 text-gray-700 text-sm">
                <li>Log into your account</li>
                <li>Go to Account Settings → SMS Notifications</li>
                <li>Toggle "Receive SMS Updates" to OFF</li>
              </ol>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-900 font-semibold mb-2">Method 2: Reply STOP</p>
              <p className="text-gray-700 text-sm">
                Reply STOP to any SMS message from us. You will receive a confirmation: "You've unsubscribed from California Probate & Trust SMS."
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-900 font-semibold mb-2">Method 3: Contact Support</p>
              <p className="text-gray-700 text-sm">
                Email support@cpt.law with your request to opt-out.
              </p>
            </div>
          </div>

          <p className="text-gray-700 mt-4">
            <strong>Important:</strong> If you opt-out, you may miss critical marketplace notifications (offers, approvals, status updates). You can re-enroll at any time by replying START or toggling SMS back on in settings.
          </p>
        </section>

        {/* 7. Opt-In Keywords */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Keyword Commands</h2>
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-900">
                  Keyword
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-900">
                  Action
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-900">
                  Response
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  START, YES, ENROLL, OPT-IN
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  Opt-in to SMS
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700 text-sm">
                  "You're enrolled! You'll receive SMS notifications about your status."
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  STOP, UNSUBSCRIBE, NO, QUIT, CANCEL, OPT-OUT
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  Opt-out of SMS
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700 text-sm">
                  "You've unsubscribed. Text START to re-enroll."
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  HELP, ?, INFO, SUPPORT
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  Get help
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700 text-sm">
                  "California Probate & Trust sends SMS about status updates. Text STOP to opt-out."
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 8. Data & Privacy */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data & Privacy</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Your phone number is encrypted and securely stored</li>
            <li>We do not share your phone number with third parties</li>
            <li>SMS data is retained for 90 days for compliance purposes</li>
            <li>You can request deletion of your phone number and SMS history anytime</li>
            <li>For more details, see our <a href="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</a></li>
          </ul>
        </section>

        {/* 9. Carrier Disclaimer */}
        <section className="mb-8 bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Carrier Disclaimer</h2>
          <p className="text-gray-700">
            We are not responsible for SMS delivery delays or failures. Carriers (AT&T, Verizon, T-Mobile, etc.) control SMS delivery. Delays may occur due to carrier issues, network problems, or device settings. If you don't receive an SMS within 15 minutes, contact support@cpt.law.
          </p>
        </section>

        {/* 10. Questions */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Questions or Issues?</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-900 font-semibold mb-2">Contact Us:</p>
            <p className="text-gray-700">Email: support@cpt.law</p>
            <p className="text-gray-700">Phone: 916-604-9494</p>
            <p className="text-gray-700">Website: https://cpt.law</p>
            <p className="text-gray-700 mt-3 text-sm">
              We typically respond to SMS support requests within 24 hours.
            </p>
          </div>
        </section>

        {/* Related Links */}
        <div className="mt-8 flex justify-center gap-6 text-sm text-gray-600">
          <a href="/privacy" className="hover:text-gray-900 font-semibold">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-gray-900 font-semibold">
            Terms of Service
          </a>
          <a href="/cpt-offer-privacy" className="hover:text-gray-900 font-semibold">
            CPT Privacy Policy
          </a>
        </div>
      </div>
    </div>
  )
}
