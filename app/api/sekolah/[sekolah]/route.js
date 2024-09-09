import { getSession } from "@/utils/auth"
import { createClient } from "@/utils/supabase/server"


export async function GET(request,{params}) {
    const supabase = await createClient()
    const sekolah = params.sekolah

    const { user } = await getSession()
    const session = await getSession()
    
    const { data, error } = await supabase.from('sekolah').select('*').eq('id_user', user.id).eq('nama',sekolah).single();

    if(error){
        return new Response(JSON.stringify({ message:"internal server error" }), { status: 500 })
    }

    return new Response(JSON.stringify({ data }), { status: 200 })
}

