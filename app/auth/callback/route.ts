import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const error_description = searchParams.get('error_description')

  // Handle OAuth errors
  if (error) {
    return NextResponse.redirect(
      new URL(`/login?error=${error}&error_description=${error_description}`, request.url)
    )
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.redirect(new URL('/login?error=config_error', request.url))
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  // If we have a code, exchange it for a session (email confirmation case)
  if (code) {
    try {
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (exchangeError || !data.session) {
        console.error('Exchange error:', exchangeError)
        return NextResponse.redirect(new URL('/login?error=exchange_error', request.url))
      }

      // Success! Redirect to role selection
      const response = NextResponse.redirect(new URL('/select-role', request.url))
      return response
    } catch (err: any) {
      console.error('Callback error:', err)
      return NextResponse.redirect(new URL('/login?error=callback_error', request.url))
    }
  }

  // No code = OAuth callback from Supabase (Google, Meta)
  // Supabase already authenticated the user and set cookies
  // Just redirect to select-role
  return NextResponse.redirect(new URL('/select-role', request.url))
}
