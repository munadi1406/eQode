

import { createClient } from "@/utils/supabase/server"

export async function GET(request,{params}) {
    const supabase = await createClient();
   
    const {id} = params
    const {data,error} = await supabase.from('mata_pelajaran').select(`*,kriteria(*),kelas(siswa(*))`).eq('id',id).single()
    if(error){
        return new Response(JSON.stringify({ error }), { status: 500 });
    }
   
   

    

    return new Response(JSON.stringify({ data }), { status: 200 });
}