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
    return NextResponse.redirect(new URL('/select-role', request.url))
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  // If we have a code, try to exchange it (email confirmation case)
  if (code) {
    try {
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (exchangeError) {
        console.warn('Exchange error (continuing anyway):', exchangeError)
        // Don't fail - Supabase might have already authenticated the user
      }

      // Redirect to role selection regardless of exchange result
      // If user is authenticated, they'll see the role selection form
      // If not, login will redirect them back to /login
      return NextResponse.redirect(new URL('/select-role', request.url))
    } catch (err: any) {
      console.warn('Callback error (continuing anyway):', err)
      // Still redirect to /select-role - user might be authenticated
      return NextResponse.redirect(new URL('/select-role', request.url))
    }
  }

  // No code = OAuth callback from Supabase (Google, Meta)
  // Supabase already authenticated the user and set cookies
  // Redirect to role selection
  return NextResponse.redirect(new URL('/select-role', request.url))
}
