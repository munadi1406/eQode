import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Utilitas untuk membuat Supabase client dengan token dinamis
export const createClient = (supabaseAccessToken = '') => {
  return createSupabaseClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${supabaseAccessToken}`,
        },
      },
    }
  );
};
