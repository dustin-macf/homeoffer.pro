import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const { approvalId, approved } = await request.json()

    if (!approvalId || typeof approved !== 'boolean') {
      return NextResponse.json(
        { error: 'Missing approvalId or approved status' },
        { status: 400 }
      )
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: 'Supabase configuration missing' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Update the approval status
    const { data, error } = await supabase
      .from('agent_approvals')
      .update({
        approved,
        approved_at: approved ? new Date().toISOString() : null,
      })
      .eq('id', approvalId)
      .select()

    if (error) {
      console.error('Approval update error:', error)
      return NextResponse.json(
        { error: 'Failed to update approval' },
        { status: 500 }
      )
    }

    // TODO: Send SMS notification once Twilio is ready
    // const approval = data?.[0]
    // if (approval && approved) {
    //   await sendApprovalSMS(approval.buyer_id, approval.property_id)
    // }

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (err: any) {
    console.error('Approval API error:', err)
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
