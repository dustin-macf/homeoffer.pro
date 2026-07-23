import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-white text-[#0b1220]">
      <Navbar />

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black tracking-[-0.04em]">
          <span className="text-slate-950">HomeOffer</span><span className="text-blue-600">.pro</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          A clear offer process from browsing a home to submitting your offer.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ['01', 'Browse homes', 'See the leading offer, buyer premium, total price and time remaining.'],
            ['02', 'Get approved', 'Review the property and confirm your financing and representation details.'],
            ['03', 'Make an offer', 'Submit in clear $500 increments during the property’s 11-day offer window.'],
          ].map(([number, title, copy]) => (
            <div key={number} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">{number}</span>
              <h2 className="mt-5 text-xl font-black">{title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="rounded-full bg-blue-600 px-6 py-3 font-black text-white hover:bg-blue-700">Browse live listings</Link>
          <Link href="/seller/create-listing" className="rounded-full border border-slate-300 px-6 py-3 font-black text-slate-950 hover:border-blue-300 hover:text-blue-700">List a property</Link>
        </div>
      </section>
    </main>
  )
}
