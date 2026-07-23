import { getSupabaseAdmin } from './supabase-admin'

export async function requireAgent(request: Request) {
  const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '')

  if (!token) {
    return { error: 'Authentication required', status: 401 } as const
  }

  const admin = getSupabaseAdmin()
  const { data: authData, error: authError } = await admin.auth.getUser(token)

  if (authError || !authData.user) {
    return { error: 'Invalid or expired session', status: 401 } as const
  }

  const { data: profile, error: profileError } = await admin
    .from('users')
    .select('id, email, first_name, last_name, user_type')
    .eq('id', authData.user.id)
    .single()

  if (profileError || !profile) {
    return { error: 'User profile not found', status: 404 } as const
  }

  if (profile.user_type !== 'agent') {
    return { error: 'Agent access required', status: 403 } as const
  }

  return { user: profile, admin } as const
}
