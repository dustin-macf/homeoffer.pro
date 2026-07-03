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

  // If we have a code, try to exchange it
  if (code) {
    try {
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (exchangeError) {
        console.warn('Exchange error:', exchangeError)
        return NextResponse.redirect(new URL('/login?error=exchange_failed', request.url))
      }

      // User is now authenticated - create profile if it doesn't exist
      if (data.user) {
        const { data: existingUser } = await supabase
          .from('users')
          .select('id')
          .eq('id', data.user.id)
          .single()

        if (!existingUser) {
          // Create new user profile from OAuth data
          const [firstName, ...lastNameParts] = (data.user.user_metadata?.name || data.user.email || '').split(' ')
          
          const { error: insertError } = await supabase
            .from('users')
            .insert({
              id: data.user.id,
              email: data.user.email,
              first_name: firstName || 'User',
              last_name: lastNameParts.join(' ') || '',
              user_type: null, // Will be set on /select-role
              sms_opt_in: false,
            })

          if (insertError) {
            console.warn('Profile creation error:', insertError)
            // Don't fail - user is authenticated, just might not have full profile
          }
        }
      }

      // Redirect to role selection
      return NextResponse.redirect(new URL('/select-role', request.url))
    } catch (err: any) {
      console.warn('Callback error:', err)
      return NextResponse.redirect(new URL('/login?error=callback_error', request.url))
    }
  }

  // No code = OAuth callback from Supabase (user already authenticated)
  return NextResponse.redirect(new URL('/select-role', request.url))
}
