import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Utilitas untuk membuat Supabase client dengan token dinamis
export const createClient = (supabaseAccessToken = '') => {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${supabaseAccessToken}`,
        },
      },
    }
  );
};
