import { NextResponse } from 'next/server'
import { supabase } from '../../supabase'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Redirect to admin dashboard
  return NextResponse.redirect(new URL('/admin', request.url))
}