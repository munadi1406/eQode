import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { getSession } from '@/app/auth'
export async function createClient() {
  const session = await getSession()
  const cookieStore = cookies()
  const { supabaseAccessToken } = session



  return createServerClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,

    {

      global: {
        headers: {
          Authorization: `Bearer ${supabaseAccessToken}`,  // Menambahkan token ke header Authorization
        },
      },
      cookies: {
        getAll() {
          console.log(cookieStore.getAll())
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {

          }
        },
      },
    }
  )
}

