import Link from 'next/link'
import Navbar from '@/components/Navbar'

const listings = [
  { city: 'Granite Bay, CA', beds: 5, baths: 4, sqft: '4,218', offer: '$612,500', time: '2d 08h', tone: 'from-slate-900/10 to-slate-950/80' },
  { city: 'Rocklin, CA', beds: 4, baths: 3, sqft: '2,729', offer: '$438,000', time: '6d 14h', tone: 'from-blue-900/10 to-slate-950/85' },
  { city: 'Folsom, CA', beds: 3, baths: 3, sqft: '2,184', offer: '$526,500', time: '9d 03h', tone: 'from-amber-900/10 to-slate-950/85' },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] text-[#13231d]">
      <Navbar />

      <section className="relative isolate min-h-[690px] overflow-hidden bg-[#10241d]">
        <img src="/homeoffer-hero.webp" alt="Modern California home at sunset" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07150f]/95 via-[#0a1812]/75 to-[#0a1812]/10" />
        <div className="relative mx-auto flex min-h-[690px] max-w-7xl items-center px-6 py-24 lg:px-8">
          <div className="max-w-2xl text-white">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#d5ff62]" /> California&apos;s transparent home marketplace
            </div>
            <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-7xl">
              The smarter way to make a home offer.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/78 sm:text-xl">
              Real homes. Visible competition. A focused 13-day offer window that gives buyers confidence and sellers momentum.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/signup" className="rounded-full bg-[#d5ff62] px-7 py-4 text-center text-base font-bold text-[#10241d] transition hover:bg-white">
                Create free account
              </Link>
              <Link href="/login" className="rounded-full border border-white/35 bg-white/10 px-7 py-4 text-center text-base font-bold text-white backdrop-blur transition hover:bg-white hover:text-[#10241d]">
                Sign in to browse homes
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-white/75">
              <span>13-day offer window</span><span>$500 increments</span><span>Verified agents</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#dfe4de] bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-[#e5e9e4] px-6 py-8 md:grid-cols-4 lg:px-8">
          {[
            ['13 days', 'Focused offer period'],
            ['$500', 'Offer increments'],
            ['Live', 'Offer activity'],
            ['DRE', 'Agent verification'],
          ].map(([big, small]) => (
            <div key={big} className="px-4 text-center first:pl-0 last:pr-0">
              <p className="text-2xl font-bold tracking-tight text-[#173e30]">{big}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[#6d7d75]">{small}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#4d725f]">Live marketplace</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Homes open for offers</h2>
          </div>
          <Link href="/login" className="font-bold text-[#173e30] underline decoration-[#9bc132] decoration-2 underline-offset-8">View all properties</Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {listings.map((home, index) => (
            <article key={home.city} className="group overflow-hidden rounded-[28px] border border-[#dfe5df] bg-white shadow-[0_18px_60px_rgba(15,35,27,0.08)]">
              <div className="relative h-64 overflow-hidden">
                <img src="/homeoffer-hero.webp" alt={`${home.city} property`} className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${index === 1 ? 'object-[70%_center]' : index === 2 ? 'object-left' : ''}`} />
                <div className={`absolute inset-0 bg-gradient-to-t ${home.tone}`} />
                <div className="absolute left-5 top-5 rounded-full bg-[#d5ff62] px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#173e30]">Accepting offers</div>
                <div className="absolute bottom-5 left-5 text-white">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/70">Time remaining</p>
                  <p className="mt-1 text-2xl font-bold">{home.time}</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold tracking-tight">{home.city}</h3>
                <p className="mt-2 text-sm text-[#687870]">{home.beds} beds · {home.baths} baths · {home.sqft} sq ft</p>
                <div className="mt-6 flex items-end justify-between border-t border-[#e5e9e4] pt-5">
                  <div><p className="text-xs font-bold uppercase tracking-wider text-[#829087]">Current offer</p><p className="mt-1 text-xl font-bold">{home.offer}</p></div>
                  <Link href="/login" className="grid h-11 w-11 place-items-center rounded-full bg-[#173e30] text-xl text-white transition group-hover:bg-[#d5ff62] group-hover:text-[#173e30]">→</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#10241d] px-6 py-24 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#d5ff62]">Built for every side of the deal</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Clearer offers. Better decisions.</h2>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-[28px] bg-white/15 md:grid-cols-3">
            {[
              ['01', 'Buyers', 'Browse active homes, follow the countdown, and submit offers in simple $500 increments.'],
              ['02', 'Sellers', 'Create urgency, see real offer activity, and keep control of the final decision.'],
              ['03', 'Agents', 'Manage clients, verify readiness, and guide every offer from one clean dashboard.'],
            ].map(([num, title, copy]) => (
              <div key={title} className="bg-[#163126] p-8 sm:p-10">
                <p className="text-sm font-bold text-[#d5ff62]">{num}</p>
                <h3 className="mt-12 text-2xl font-bold">{title}</h3>
                <p className="mt-4 leading-7 text-white/65">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 rounded-[32px] bg-[#d5ff62] px-8 py-14 text-center md:flex-row md:px-14 md:text-left">
          <div><p className="text-sm font-bold uppercase tracking-[0.18em] text-[#466016]">Ready when you are</p><h2 className="mt-3 text-4xl font-semibold tracking-[-0.035em] text-[#10241d]">Make your next move with clarity.</h2></div>
          <Link href="/signup" className="shrink-0 rounded-full bg-[#10241d] px-7 py-4 font-bold text-white transition hover:scale-105">Get started free</Link>
        </div>
      </section>

      <footer className="border-t border-[#dfe4de] bg-white px-6 py-10 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-sm text-[#66766e] sm:flex-row">
          <p>© 2026 HomeOffer.pro</p>
          <div className="flex gap-6"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/sms-policy">SMS policy</Link></div>
        </div>
      </footer>
    </main>
  )
}
