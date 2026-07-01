'use client'

import Link from 'next/link'

export default function DataDeletionPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-8">User Data Deletion Policy</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Your Right to Delete Your Data</h2>
              <p>You have the right to request the deletion of your personal data from Home Offer at any time. We respect your privacy and will process deletion requests in accordance with applicable laws, including the California Consumer Privacy Act (CCPA), General Data Protection Regulation (GDPR), and other data protection regulations.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. What Data Can Be Deleted</h2>
              <p>Upon request, Home Offer will delete the following personal data associated with your account:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your name and email address</li>
                <li>Your phone number</li>
                <li>Your mailing address</li>
                <li>Your account login credentials</li>
                <li>OAuth authentication data (Google, Meta)</li>
                <li>Your profile information and preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. What Data May Not Be Deleted</h2>
              <p>Some data may not be deleted due to legal, contractual, or operational requirements:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Transaction Records:</strong> Property offers, listings, and historical transactions must be retained for legal compliance, tax purposes, and dispute resolution</li>
                <li><strong>Legal Communications:</strong> Records of disputes, complaints, or legal proceedings</li>
                <li><strong>Anonymized Data:</strong> Aggregated, de-identified, or anonymized data used for analytics</li>
                <li><strong>Audit Logs:</strong> System logs required by law or for security purposes</li>
              </ul>
              <p className="mt-4">However, personal identifiers will be removed from these records to protect your privacy.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How to Request Data Deletion</h2>
              <p>To request deletion of your personal data, you can:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Self-Service:</strong> Log into your account and use the "Delete Account" option in your account settings</li>
                <li><strong>Email:</strong> Send a written request to support@homeoffer.pro with the subject line "Data Deletion Request"</li>
                <li><strong>Mail:</strong> Send a signed letter requesting data deletion (we will respond with verification instructions)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Verification Process</h2>
              <p>To prevent unauthorized deletion of accounts, we will verify your identity by:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Confirming your email address and phone number match our records</li>
                <li>Verifying your login credentials</li>
                <li>Sending a confirmation link to your registered email (valid for 7 days)</li>
              </ul>
              <p className="mt-4">You must confirm the deletion request within 7 days. If not confirmed, the request will expire.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Processing Timeline</h2>
              <p>Home Offer will process deletion requests as follows:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Initial Response:</strong> Within 5 business days of receipt</li>
                <li><strong>Verification:</strong> Within 7 days of verification link being sent</li>
                <li><strong>Deletion Completion:</strong> Within 30 days of verified request (required by CCPA and GDPR)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Deletion Confirmation</h2>
              <p>Once your data deletion request is completed, you will receive:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>An email confirmation that your account and personal data have been deleted</li>
                <li>A summary of what was deleted and what was retained (and why)</li>
                <li>A statement confirming compliance with applicable data protection laws</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Backup Data</h2>
              <p>Home Offer maintains backup copies of databases for security and disaster recovery purposes. These backups will be deleted according to our standard backup retention schedule (typically 90 days). Personal data will be purged from active systems immediately upon verification of deletion requests.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Third-Party Data</h2>
              <p>If your data has been shared with third parties (such as other users in connection with active offers), we will:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Notify those third parties of your deletion request where legally required</li>
                <li>Request that they delete your personal data from their systems</li>
                <li>Note that we cannot guarantee third-party deletion compliance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Account Reactivation</h2>
              <p>Once your account is deleted, you may create a new account with the same or different email address. Previous deletion will not prevent you from using Home Offer in the future.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
              <p>For questions about this Data Deletion Policy or to submit a deletion request:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Email:</strong> support@homeoffer.pro</li>
                <li><strong>Subject:</strong> Data Deletion Request</li>
                <li><strong>Response Time:</strong> Within 5 business days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Your Rights</h2>
              <p>Under data protection laws, you also have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Request access to your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request portability of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>File a complaint with your local data protection authority</li>
              </ul>
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
