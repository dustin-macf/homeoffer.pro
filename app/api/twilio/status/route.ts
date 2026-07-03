import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const params = new URLSearchParams(body)

    // Twilio sends these parameters:
    // MessageSid, AccountSid, From, To, MessageStatus, etc.
    const messageSid = params.get('MessageSid')
    const messageStatus = params.get('MessageStatus')
    const to = params.get('To')

    console.log(`SMS Status Update: ${messageSid} → ${messageStatus} (to: ${to})`)

    // Log to Supabase or your database if needed
    // For now, just acknowledge receipt

    return new NextResponse('OK', { status: 200 })
  } catch (error) {
    console.error('Twilio webhook error:', error)
    return new NextResponse('Error', { status: 500 })
  }
}

// Twilio will GET the URL to validate it exists
export async function GET(request: NextRequest) {
  return new NextResponse('OK', { status: 200 })
}
