import { getStripe } from '@/lib/stripe'
import { requireAgent } from '@/lib/server-auth'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const auth = await requireAgent(request)
    if ('error' in auth) {
      return Response.json({ error: auth.error }, { status: auth.status })
    }

    const { data: membership } = await auth.admin
      .from('agent_memberships')
      .select('stripe_customer_id')
      .eq('user_id', auth.user.id)
      .maybeSingle()

    if (!membership?.stripe_customer_id) {
      return Response.json({ error: 'No Stripe membership was found.' }, { status: 404 })
    }

    const origin = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin
    const session = await getStripe().billingPortal.sessions.create({
      customer: membership.stripe_customer_id,
      return_url: `${origin}/agent/network`,
    })

    return Response.json({ url: session.url })
  } catch (error) {
    console.error('Stripe portal error:', error)
    return Response.json(
      { error: error instanceof Error ? error.message : 'Unable to open billing' },
      { status: 500 }
    )
  }
}
