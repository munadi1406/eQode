import { getSession } from "@/utils/auth";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
    const supabase = await createClient()

    const { user } = await getSession()



    const { data, error } = await supabase.from('articles').select(`title,created_at,slug,detail_user(slug)`).order('created_at', { ascending: false }).eq('id_user', user.id);
    if(error){
        return new Response(JSON.stringify({ message:"Internal Server Error" }), { status: 500 })
    }
    return new Response(JSON.stringify({ data }), { status: 200 })
}