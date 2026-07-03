'use client'

export default function CPTOfferPrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">California Probate & Trust - Offer Marketplace</p>
        <p className="text-gray-600 text-sm mb-8">Last Updated: July 3, 2026</p>

        {/* 1. Introduction */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
          <p className="text-gray-700 mb-4">
            California Probate & Trust ("we," "us," "our," or "Company") operates the offer marketplace platform (the "Service"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
          </p>
          <p className="text-gray-700">
            Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our Service.
          </p>
        </section>

        {/* 2. Information We Collect */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">A. Information You Provide</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>Account Registration:</strong> Name, email address, phone number, password, role (buyer/seller/agent)</li>
            <li><strong>Profile Information:</strong> Company name, business address, professional credentials</li>
            <li><strong>Transaction Data:</strong> Offers submitted, property interests, offer amounts, approval status</li>
            <li><strong>Communication:</strong> Messages, inquiries, support requests</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">B. Information Collected Automatically</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>Device Information:</strong> IP address, browser type, operating system, device type</li>
            <li><strong>Usage Data:</strong> Pages visited, time spent, clicks, search queries</li>
            <li><strong>Location Data:</strong> General location (city/state level) from IP address</li>
            <li><strong>Cookies & Tracking:</strong> Session data, preferences, authentication tokens</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">C. Third-Party Information</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>OAuth Providers:</strong> Google and Meta provide name, email, and profile picture</li>
            <li><strong>SMS Provider (Twilio):</strong> Phone number and message delivery status</li>
          </ul>
        </section>

        {/* 3. How We Use Your Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>To create and maintain your account</li>
            <li>To process transactions and offers</li>
            <li>To send transactional notifications (approvals, offers, status updates)</li>
            <li>To send SMS messages via Twilio (with your consent)</li>
            <li>To provide customer support and respond to inquiries</li>
            <li>To improve our Service and user experience</li>
            <li>To comply with legal obligations</li>
            <li>To detect and prevent fraud or abuse</li>
            <li>To enforce our Terms of Service</li>
          </ul>
        </section>

        {/* 4. SMS & Text Messages */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. SMS & Text Messages</h2>
          <p className="text-gray-700 mb-4">
            We use Twilio to send SMS notifications regarding offers, approvals, and marketplace activity.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>Consent:</strong> You must explicitly opt-in to receive SMS messages</li>
            <li><strong>Frequency:</strong> Messages are sent as-needed for transactional purposes (typically 0-5 per day during active participation)</li>
            <li><strong>Standard Rates Apply:</strong> Your mobile carrier's message and data rates may apply</li>
            <li><strong>Opt-Out:</strong> Reply STOP to any message to unsubscribe. Reply HELP for assistance</li>
            <li><strong>Data:</strong> Phone numbers are encrypted and securely stored</li>
          </ul>
        </section>

        {/* 5. Data Sharing */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Sharing & Disclosure</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">A. We Share Information With:</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>Service Providers:</strong> Supabase (database), Vercel (hosting), Twilio (SMS), Google/Meta (authentication)</li>
            <li><strong>Marketplace Participants:</strong> Limited information shared between buyers, sellers, and agents as necessary for marketplace operation</li>
            <li><strong>Legal Requirements:</strong> Law enforcement or government agencies when legally required</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">B. We Do NOT:</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Sell your personal information to third parties</li>
            <li>Share data for marketing purposes without consent</li>
            <li>Disclose financial information beyond what's necessary for transactions</li>
          </ul>
        </section>

        {/* 6. Data Retention */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Active Accounts:</strong> Data retained while account is active</li>
            <li><strong>After Deletion:</strong> Data deleted within 30 days of account closure request</li>
            <li><strong>Legal Compliance:</strong> Some data may be retained longer if required by law</li>
            <li><strong>Transaction Records:</strong> Offer history retained for 7 years for legal compliance</li>
          </ul>
        </section>

        {/* 7. Your Rights */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Privacy Rights</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">A. General Rights</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>Access:</strong> Request a copy of your personal data</li>
            <li><strong>Correction:</strong> Request correction of inaccurate information</li>
            <li><strong>Deletion:</strong> Request deletion of your account and data</li>
            <li><strong>Portability:</strong> Request your data in a portable format</li>
            <li><strong>Opt-Out:</strong> Opt-out of SMS messages, cookies, or tracking</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">B. GDPR Rights (EU Users)</h3>
          <p className="text-gray-700 mb-2">If you are in the EU, you have additional rights including the right to withdraw consent, lodge complaints with your data protection authority, and restrict processing.</p>

          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">C. CCPA Rights (California Users)</h3>
          <p className="text-gray-700">
            If you are a California resident, you have the right to know what data we collect, delete your data, and opt-out of any future sales (though we do not sell data).
          </p>
        </section>

        {/* 8. Security */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Security</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>All data transmitted via HTTPS encryption</li>
            <li>Passwords hashed and salted</li>
            <li>Phone numbers encrypted at rest</li>
            <li>OAuth tokens securely managed</li>
            <li>Regular security audits and updates</li>
            <li>No public data access without authentication</li>
          </ul>
        </section>

        {/* 9. Third-Party Links */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Third-Party Links & Services</h2>
          <p className="text-gray-700">
            Our Service may contain links to third-party websites. We are not responsible for their privacy practices. Please review their privacy policies independently.
          </p>
        </section>

        {/* 10. Children's Privacy */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children's Privacy</h2>
          <p className="text-gray-700">
            Our Service is not directed to individuals under 18 years of age. We do not knowingly collect information from children. If we learn we have collected information from a child, we will delete it immediately.
          </p>
        </section>

        {/* 11. Changes to This Policy */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. We will notify you of significant changes via email or prominent notice on our website. Your continued use of our Service constitutes acceptance of the updated policy.
          </p>
        </section>

        {/* 12. Contact Us */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
          <p className="text-gray-700 mb-4">If you have questions about this Privacy Policy or our privacy practices:</p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-900 font-semibold">California Probate & Trust</p>
            <p className="text-gray-700">Email: support@cpt.law</p>
            <p className="text-gray-700">Website: https://cpt.law</p>
            <p className="text-gray-700 mt-4 text-sm">
              For GDPR/CCPA requests, email: privacy@cpt.law
            </p>
          </div>
        </section>

        {/* 13. Data Deletion */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Request Account Deletion</h2>
          <p className="text-gray-700 mb-4">
            To request complete deletion of your account and personal data:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700">
            <li>Log into your account</li>
            <li>Go to Account Settings</li>
            <li>Select "Delete My Account"</li>
            <li>Confirm deletion request</li>
            <li>All data will be deleted within 30 days</li>
          </ol>
          <p className="text-gray-700 mt-4">
            Or email <strong>privacy@cpt.law</strong> with your request.
          </p>
        </section>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-900 text-sm">
            ✓ This Privacy Policy complies with GDPR, CCPA, and Twilio SMS requirements.
          </p>
        </div>
      </div>
    </div>
  )
}
