'use client'

export default function LOAPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-12 font-serif">
        {/* Header */}
        <div className="text-center mb-8 border-b-2 border-gray-300 pb-8">
          <h1 className="text-2xl font-bold text-gray-900">LETTER OF AUTHORIZATION</h1>
          <p className="text-gray-600 mt-2 text-sm">Twilio SMS & Voice Services</p>
          <p className="text-gray-600 text-sm">California Probate & Trust</p>
        </div>

        {/* Opening */}
        <div className="mb-8">
          <p className="text-gray-800 leading-relaxed">
            TO WHOM IT MAY CONCERN:
          </p>
          <p className="text-gray-800 leading-relaxed mt-4">
            This Letter of Authorization ("LOA") is submitted to Twilio Inc. to authorize the use of telephone services and messaging capabilities for California Probate & Trust.
          </p>
        </div>

        {/* Company Information */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 underline">COMPANY INFORMATION</h2>
          <table className="w-full text-gray-800 space-y-2">
            <tbody>
              <tr>
                <td className="font-semibold w-1/3">Company Name:</td>
                <td>California Probate & Trust</td>
              </tr>
              <tr>
                <td className="font-semibold">Principal Contact:</td>
                <td>Dustin MacFarlane</td>
              </tr>
              <tr>
                <td className="font-semibold">Email:</td>
                <td>Dustin@cpt.law</td>
              </tr>
              <tr>
                <td className="font-semibold">Phone Number:</td>
                <td>916-604-9494</td>
              </tr>
              <tr>
                <td className="font-semibold">Address:</td>
                <td>California, USA</td>
              </tr>
              <tr>
                <td className="font-semibold">Business Type:</td>
                <td>Law Firm (Probate & Trust Administration)</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Authorized Use */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 underline">AUTHORIZED USE</h2>
          <p className="text-gray-800 leading-relaxed mb-4">
            California Probate & Trust hereby authorizes Twilio Inc. to:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-gray-800">
            <li>Provide SMS (Short Message Service) messaging services for transactional notifications</li>
            <li>Deliver text messages related to account activity, approvals, offers, and marketplace updates</li>
            <li>Send appointment confirmations, password resets, and service notifications</li>
            <li>Deliver informational messages regarding California Probate & Trust services</li>
            <li>Provide voice capabilities for customer support and notifications (if applicable)</li>
          </ol>
        </section>

        {/* Telephone Numbers */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 underline">TELEPHONE NUMBERS</h2>
          <p className="text-gray-800 leading-relaxed mb-4">
            The following telephone number(s) have been authorized for use with Twilio services:
          </p>
          <p className="text-gray-800 font-semibold">Primary Number: +1 (916) 604-9494</p>
          <p className="text-gray-800 leading-relaxed mt-4">
            All traffic on this number(s) is authorized and originates from California Probate & Trust's legitimate business operations.
          </p>
        </section>

        {/* Compliance */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 underline">COMPLIANCE STATEMENT</h2>
          <p className="text-gray-800 leading-relaxed mb-4">
            California Probate & Trust certifies that:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-gray-800">
            <li>The company has explicit consent from all message recipients to send SMS notifications</li>
            <li>All recipients have opted-in through documented consent mechanisms</li>
            <li>All messages comply with TCPA (Telephone Consumer Protection Act) requirements</li>
            <li>The company maintains records of consumer opt-in consent</li>
            <li>The company respects consumer opt-out requests and promptly processes STOP commands</li>
            <li>All messaging content is truthful and not deceptive</li>
            <li>Messages include proper identification of the sender and opt-out instructions</li>
            <li>The company has a documented privacy policy available to consumers</li>
            <li>The company will not use the service for spam, fraud, or illegal activity</li>
            <li>All traffic complies with applicable federal and state laws</li>
          </ol>
        </section>

        {/* Trademark */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 underline">TRADEMARK & BRANDING</h2>
          <p className="text-gray-800 leading-relaxed mb-4">
            California Probate & Trust ("the Company") grants Twilio permission to display the company name and logo in the following contexts only:
          </p>
          <div className="ml-6 mb-4 text-gray-800">
            <p className="font-semibold mb-2">Permitted Uses:</p>
            <ol className="list-decimal pl-6 space-y-1">
              <li>Identification of the message sender to recipients</li>
              <li>Twilio's internal business records</li>
              <li>Twilio's compliance documentation</li>
            </ol>
          </div>
          <div className="ml-6 text-gray-800">
            <p className="font-semibold mb-2">Prohibited Uses:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Marketing purposes without written consent</li>
              <li>Third-party promotions</li>
              <li>Misleading caller identification</li>
              <li>Any purpose outside of legitimate SMS/voice service delivery</li>
            </ul>
          </div>
        </section>

        {/* Authorized Signatory */}
        <section className="mb-8 border-t-2 border-gray-300 pt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 underline">AUTHORIZED SIGNATORY</h2>
          <p className="text-gray-800 leading-relaxed mb-4">
            I certify that I have the authority to sign this Letter of Authorization on behalf of California Probate & Trust and that all statements herein are true and accurate.
          </p>
          <table className="w-full text-gray-800 space-y-3 mb-8">
            <tbody>
              <tr>
                <td className="font-semibold">Name:</td>
                <td>Dustin MacFarlane</td>
              </tr>
              <tr>
                <td className="font-semibold">Title:</td>
                <td>Owner/Attorney</td>
              </tr>
              <tr>
                <td className="font-semibold">Company:</td>
                <td>California Probate & Trust</td>
              </tr>
              <tr>
                <td className="font-semibold">Email:</td>
                <td>Dustin@cpt.law</td>
              </tr>
              <tr>
                <td className="font-semibold">Phone:</td>
                <td>916-604-9494</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-8 space-y-6">
            <div>
              <p className="text-gray-800">Signature: ________________________________</p>
              <p className="text-gray-600 text-sm">(Print and sign)</p>
            </div>
            <div>
              <p className="text-gray-800">Date: ________________________________</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section className="mt-12 pt-8 border-t-2 border-gray-300 text-center text-sm text-gray-600">
          <p>California Probate & Trust | Dustin@cpt.law | 916-604-9494</p>
          <p className="mt-2">https://cpt.law</p>
          <p className="mt-4 text-xs">
            This document should be printed, signed, and submitted to Twilio for authorization.
          </p>
        </section>
      </div>

      {/* Download Instructions */}
      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-3">How to Use This LOA:</h3>
          <ol className="list-decimal pl-6 space-y-2 text-blue-800 text-sm">
            <li>Print this page</li>
            <li>Sign and date the signature section</li>
            <li>Have it notarized (optional but recommended)</li>
            <li>Submit to Twilio compliance: <span className="font-semibold">compliance@twilio.com</span></li>
            <li>Include your Twilio Account SID in the email</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
