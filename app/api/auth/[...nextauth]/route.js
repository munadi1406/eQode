import { authOptions } from "@/utils/auth";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import NextAuth from "next-auth";



const handler = NextAuth({
    ...authOptions,
    adapter: SupabaseAdapter({
        url: process.env.SUPABASE_URL,
        secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
    }),
});
export { handler as GET, handler as POST };