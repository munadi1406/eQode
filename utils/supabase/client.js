import { getSession } from '@/app/auth'
import { createBrowserClient } from '@supabase/ssr'



const session = await getSession()
const { supabaseAccessToken } = session

export function createClient() {
  // Create a supabase client on the browser with project's credentials
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