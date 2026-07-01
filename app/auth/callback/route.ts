import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const error_description = searchParams.get('error_description')

  // Handle errors
  if (error) {
    return NextResponse.redirect(
      new URL(`/login?error=${error}&error_description=${error_description}`, request.url)
    )
  }

  // If we have a code, Supabase will handle it - redirect to select-role
  if (code) {
    return NextResponse.redirect(new URL('/select-role', request.url))
  }

  // Fallback
  return NextResponse.redirect(new URL('/login', request.url))
}
