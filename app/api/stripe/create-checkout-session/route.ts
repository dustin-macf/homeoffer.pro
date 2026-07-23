import { getStripe } from '@/lib/stripe'
import { requireAgent } from '@/lib/server-auth'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const auth = await requireAgent(request)
    if ('error' in auth) {
      return Response.json({ error: auth.error }, { status: auth.status })
    }

    const priceId = process.env.STRIPE_AGENT_PRICE_ID
    if (!priceId) {
      return Response.json(
        { error: 'The $7 agent membership is not configured yet.' },
        { status: 503 }
      )
    }

    const stripe = getStripe()
    const { data: existingMembership } = await auth.admin
      .from('agent_memberships')
      .select('stripe_customer_id, status')
      .eq('user_id', auth.user.id)
      .maybeSingle()

    if (existingMembership?.status === 'active' || existingMembership?.status === 'trialing') {
      return Response.json(
        { error: 'Your membership is already active. Use Manage billing instead.' },
        { status: 409 }
      )
    }

    let customerId = existingMembership?.stripe_customer_id || null
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: auth.user.email,
        name: [auth.user.first_name, auth.user.last_name].filter(Boolean).join(' '),
        metadata: { homeoffer_user_id: auth.user.id },
      })
      customerId = customer.id
    }

    await auth.admin.from('agent_memberships').upsert(
      {
        user_id: auth.user.id,
        stripe_customer_id: customerId,
        status: existingMembership?.status || 'incomplete',
      },
      { onConflict: 'user_id' }
    )

    const origin = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${origin}/agent/network?membership=success`,
      cancel_url: `${origin}/agent/network?membership=canceled`,
      metadata: { homeoffer_user_id: auth.user.id },
      subscription_data: {
        metadata: { homeoffer_user_id: auth.user.id },
      },
    })

    return Response.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return Response.json(
      { error: error instanceof Error ? error.message : 'Unable to start checkout' },
      { status: 500 }
    )
  }
}
