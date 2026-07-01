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
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-4">Option 1: Self-Service Account Deletion</h3>
              <p>Follow these steps to delete your account immediately:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Log into your Home Offer account at homeoffer-pro.vercel.app</li>
                <li>Click on your profile icon (top right)</li>
                <li>Select "Account Settings" or "Profile"</li>
                <li>Scroll to the bottom and click "Delete Account"</li>
                <li>Review what will be deleted and what will be retained</li>
                <li>Type "DELETE" to confirm</li>
                <li>A verification email will be sent to your registered email address</li>
                <li>Click the link in the email within 7 days to confirm deletion</li>
                <li>Your account and personal data will be deleted within 30 days</li>
              </ol>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-4">Option 2: Email Request</h3>
              <p>Send an email to support@homeoffer.pro with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Subject Line:</strong> "Data Deletion Request"</li>
                <li><strong>Body Include:</strong> Your full name, email address, and phone number associated with your account</li>
                <li><strong>Statement:</strong> "I request the deletion of my personal data and account from Home Offer"</li>
              </ul>
              <p className="mt-4">We will respond within 5 business days with verification instructions and next steps.</p>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-4">Option 3: Phone Request</h3>
              <p>Call our support team (during business hours) to request account deletion:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Have your account email and phone number ready</li>
                <li>Speak with a support representative</li>
                <li>We will send you a verification email within 24 hours</li>
                <li>Confirm the deletion request via the verification link</li>
              </ul>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-4">Option 4: Certified Mail Request</h3>
              <p>Send a signed letter via certified mail to the address provided by support@homeoffer.pro requesting deletion of your personal data.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Verification Process</h2>
              <p>To prevent unauthorized deletion of accounts, we require verification:</p>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-4">Step-by-Step Verification</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>Submit Request:</strong> Use any of the 4 methods above to request deletion</li>
                <li><strong>Receive Email:</strong> Check your registered email for a verification message</li>
                <li><strong>Click Verification Link:</strong> The email will contain a unique link valid for 7 days</li>
                <li><strong>Confirm Identity:</strong> You may be asked to re-enter your password or answer security questions</li>
                <li><strong>Final Confirmation:</strong> Review what will be deleted and click "Confirm Deletion"</li>
                <li><strong>Processing:</strong> Your request will be processed within 30 days</li>
              </ol>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-4">Important Notes</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Verification links expire after 7 days - request a new one if needed</li>
                <li>You must have access to your registered email address</li>
                <li>If you've deleted your email account, contact support@homeoffer.pro immediately</li>
                <li>Deletion is permanent and cannot be undone</li>
              </ul>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Troubleshooting</h2>
              <h3 className="text-xl font-bold text-gray-900 mb-3">I didn't receive the verification email</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Check your spam/junk folder</li>
                <li>Wait 5-10 minutes for the email to arrive</li>
                <li>Request a new verification email (valid for 7 days)</li>
                <li>Contact support@homeoffer.pro if the problem persists</li>
              </ul>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-4">The verification link expired</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Submit a new deletion request</li>
                <li>You will receive a new verification email with a new 7-day link</li>
                <li>Click the new link to proceed with verification</li>
              </ul>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-4">I forgot my password</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the "Forgot Password" link on the login page</li>
                <li>Reset your password and log in</li>
                <li>Then follow the self-service deletion steps</li>
              </ul>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-4">I can't access my email account</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contact support@homeoffer.pro immediately</li>
                <li>Provide your name and phone number associated with the account</li>
                <li>We will assist you with the deletion process</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
              <p>For questions about this Data Deletion Policy or to submit a deletion request:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Email:</strong> support@homeoffer.pro</li>
                <li><strong>Subject:</strong> Data Deletion Request</li>
                <li><strong>Response Time:</strong> Within 5 business days</li>
                <li><strong>Hours:</strong> Monday - Friday, 9 AM - 5 PM Pacific Time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Your Rights</h2>
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
