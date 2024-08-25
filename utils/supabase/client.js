import { getSession } from '@/app/auth'
import { createBrowserClient } from '@supabase/ssr'




export async function createClient() {
  const session = await getSession()
  const { supabaseAccessToken } = session
  
  return createBrowserClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    {
        global: {
          headers: {
            Authorization: `Bearer ${supabaseAccessToken}`,
          },
        },
      }
  )
}