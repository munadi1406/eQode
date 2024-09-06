import { createClient } from "@/utils/supabase/server"

import { getSession } from "@/utils/auth"
import { convertTitleToSlug } from "@/utils/convertUrl";


export async function POST(request) {
    const supabase = await createClient();
    const { content,title } = await request.json();
    const { user } = await getSession()
    

    const slug = convertTitleToSlug(title)
    const data = {
        content,
        title,
        slug,
        id_user: user.id
    };

    
    

   
    const { data: insertData, error } = await supabase.from('articles').insert(data).select();

    if (error) {
        console.error("Insert error:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ data: insertData }), { status: 200 });
}