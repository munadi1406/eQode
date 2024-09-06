import { createClient } from "@/utils/supabase/server";

export async function GET() {
    const supabase = await createClient()
    const { data, error } = await supabase.from('articles').select(`*,detail_user(slug,users(name,image))`).order('created_at', { ascending: false });
    if(error){
        return new Response(JSON.stringify({ message:"Internal Server Error" }), { status: 500 })
    }
    return new Response(JSON.stringify({ data }), { status: 200 })
}