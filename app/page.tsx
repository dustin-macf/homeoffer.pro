import Link from 'next/link'
import Navbar from '@/components/Navbar'

const listings = [
  { city: 'Granite Bay, CA', address: '8575 Hidden Lakes Drive', beds: 5, baths: 4, sqft: '4,218', offer: 612500, time: '18h 42m', hours: 18, crop: 'object-[70%_center]' },
  { city: 'Rocklin, CA', address: '1642 Poppy Circle', beds: 5, baths: 3, sqft: '2,729', offer: 438000, time: '2d 08h', hours: 56, crop: 'object-[82%_center]' },
  { city: 'Folsom, CA', address: '1064 Empire Mine Road', beds: 3, baths: 3, sqft: '2,184', offer: 526500, time: '4d 14h', hours: 110, crop: 'object-center' },
  { city: 'Roseville, CA', address: '2289 Pleasant Grove Blvd', beds: 4, baths: 3, sqft: '2,956', offer: 574000, time: '6d 03h', hours: 147, crop: 'object-[60%_center]' },
  { city: 'Loomis, CA', address: '6120 Colwell Lane', beds: 4, baths: 4, sqft: '3,604', offer: 697500, time: '8d 19h', hours: 211, crop: 'object-[75%_center]' },
  { city: 'Auburn, CA', address: '3390 Vista Robles Way', beds: 3, baths: 2, sqft: '2,310', offer: 459000, time: '10d 11h', hours: 251, crop: 'object-left' },
].sort((a, b) => a.hours - b.hours)

const money = (amount: number) => amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <Navbar />

      <section className="border-b border-blue-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-10 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
          <div>
            <h1 className="text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl">Homes open for offers</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">Browse every active property without an account. Homes are ordered by the time remaining, with the next closing property first.</p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm font-bold">
            <button className="rounded-full bg-blue-600 px-5 py-2.5 text-white">Ending soon</button>
            <button className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-slate-700 hover:border-blue-300">Newest</button>
            <button className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-slate-700 hover:border-blue-300">Price</button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-500"><span className="font-black text-slate-900">{listings.length}</span> active properties</p>
          <p className="hidden text-sm font-semibold text-slate-500 sm:block">11-day offer period · $500 increments</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {listings.map((home) => {
            const platformFee = home.offer * 0.005
            const buyerAgentCommission = home.offer * 0.025
            const total = home.offer + platformFee + buyerAgentCommission

            return (
              <article key={home.address} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/10">
                <div className="relative h-60 overflow-hidden bg-slate-200">
                  <img src="/homeoffer-hero.webp" alt={`${home.address}, ${home.city}`} className={`h-full w-full object-cover transition duration-500 group-hover:scale-[1.03] ${home.crop}`} />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 to-transparent px-5 pb-5 pt-14 text-white">
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-100">Time remaining</p>
                    <p className="mt-1 text-2xl font-black">{home.time}</p>
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-black tracking-tight">{home.address}</h2>
                  <p className="mt-1 text-sm font-medium text-slate-500">{home.city}</p>
                  <p className="mt-3 text-sm text-slate-600">{home.beds} beds · {home.baths} baths · {home.sqft} sq ft</p>

                  <div className="mt-5 rounded-xl bg-blue-50 p-4">
                    <div className="flex items-end justify-between gap-3 border-b border-blue-100 pb-3">
                      <span className="text-sm font-bold text-slate-600">Current offer</span>
                      <span className="text-2xl font-black text-blue-700">{money(home.offer)}</span>
                    </div>
                    <dl className="mt-3 space-y-2 text-sm">
                      <div className="flex justify-between gap-3"><dt className="text-slate-600">Platform fee <span className="text-xs">(0.5%)</span></dt><dd className="font-bold">{money(platformFee)}</dd></div>
                      <div className="flex justify-between gap-3"><dt className="text-slate-600">Buyer&apos;s agent commission <span className="text-xs">(2.5%)</span></dt><dd className="font-bold">{money(buyerAgentCommission)}</dd></div>
                      <div className="flex justify-between gap-3 border-t border-blue-100 pt-2"><dt className="font-black">Estimated total</dt><dd className="font-black text-blue-700">{money(total)}</dd></div>
                    </dl>
                  </div>

                  <Link href="/properties" className="mt-5 flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-black text-white transition hover:bg-blue-700">View property</Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="mt-10 border-t border-blue-100 bg-white px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div><h2 className="text-3xl font-black tracking-tight">Selling a home?</h2><p className="mt-2 text-slate-600">Create a focused 11-day offer period and keep every cost clear for buyers.</p></div>
          <Link href="/login" className="rounded-xl border-2 border-blue-600 px-6 py-3 font-black text-blue-700 transition hover:bg-blue-600 hover:text-white">Sign in to list a property</Link>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-950 px-5 py-10 text-slate-400 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-sm sm:flex-row"><p>© 2026 HomeOffer.pro</p><div className="flex gap-6"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/sms-policy">SMS policy</Link></div></div>
      </footer>
    </main>
  )
}
