'use client'

import Link from 'next/link'

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p>By accessing and using the Home Offer website and services, you accept and agree to be bound by and abide by these Terms and Conditions of Use. If you do not agree to abide by the above, please do not use this service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
              <p>Permission is granted to temporarily download one copy of the materials (information or software) on Home Offer's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Offer Submission</h2>
              <p>When submitting an offer through Home Offer:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You represent that you have the authority to submit the offer</li>
                <li>All information provided must be accurate and truthful</li>
                <li>Offer amounts must be in $1,000 increments</li>
                <li>You agree to pay any financing or closing costs associated with your offer</li>
                <li>Home Offer does not handle payments or financing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Limitation of Liability</h2>
              <p>In no event shall Home Offer or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Home Offer's website.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Accuracy of Materials</h2>
              <p>The materials appearing on Home Offer's website could include technical, typographical, or photographic errors. Home Offer does not warrant that any of the materials on the website are accurate, complete, or current. Home Offer may make changes to the materials contained on the website at any time without notice.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Links</h2>
              <p>Home Offer has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Home Offer of the site. Use of any such linked website is at the user's own risk.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Modifications</h2>
              <p>Home Offer may revise these Terms and Conditions for the website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these Terms and Conditions of Use.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Governing Law</h2>
              <p>These Terms and Conditions of Use and any separate agreements we provide to you as part of these Terms and Conditions shall be governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Information</h2>
              <p>If you have any questions about these Terms and Conditions, please contact us at: support@homeoffer.pro</p>
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
