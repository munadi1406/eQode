import { getSession } from '@/utils/auth'
import { createBrowserClient } from '@supabase/ssr'




export async function createClient() {
  const session = await getSession()
  let token;
  const data= session

  token = data ? data.supabaseAccessToken : ''
  return createBrowserClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    {
        global: { 
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
  )
}