import type Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

export const runtime = 'nodejs'

function unixToIso(value?: number | null) {
  return value ? new Date(value * 1000).toISOString() : null
}

async function syncSubscription(subscription: Stripe.Subscription) {
  const userId = subscription.metadata.homeoffer_user_id
  if (!userId) return

  const admin = getSupabaseAdmin()
  const subscriptionData = subscription as Stripe.Subscription & {
    current_period_end?: number
    current_period_start?: number
  }

  await admin.from('agent_memberships').upsert(
    {
      user_id: userId,
      stripe_customer_id:
        typeof subscription.customer === 'string'
          ? subscription.customer
          : subscription.customer.id,
      stripe_subscription_id: subscription.id,
      stripe_price_id: subscription.items.data[0]?.price.id || null,
      status: subscription.status,
      current_period_start: unixToIso(subscriptionData.current_period_start),
      current_period_end: unixToIso(subscriptionData.current_period_end),
      cancel_at_period_end: subscription.cancel_at_period_end,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' }
  )
}

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!signature || !webhookSecret) {
    return Response.json({ error: 'Stripe webhook is not configured' }, { status: 503 })
  }

  try {
    const payload = await request.text()
    const event = getStripe().webhooks.constructEvent(payload, signature, webhookSecret)
    const admin = getSupabaseAdmin()
    const { error: eventError } = await admin
      .from('stripe_webhook_events')
      .insert({ event_id: event.id, event_type: event.type })

    if (eventError?.code === '23505') {
      return Response.json({ received: true, duplicate: true })
    }
    if (eventError) throw eventError

    if (
      event.type === 'customer.subscription.created' ||
      event.type === 'customer.subscription.updated' ||
      event.type === 'customer.subscription.deleted'
    ) {
      await syncSubscription(event.data.object as Stripe.Subscription)
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const subscriptionId =
        typeof session.subscription === 'string' ? session.subscription : session.subscription?.id
      if (subscriptionId) {
        await syncSubscription(await getStripe().subscriptions.retrieve(subscriptionId))
      }
    }

    await admin
      .from('stripe_webhook_events')
      .update({ processed_at: new Date().toISOString() })
      .eq('event_id', event.id)

    return Response.json({ received: true })
  } catch (error) {
    console.error('Stripe webhook error:', error)
    return Response.json(
      { error: error instanceof Error ? error.message : 'Invalid webhook' },
      { status: 400 }
    )
  }
}
