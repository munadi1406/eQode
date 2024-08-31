import { getSession } from "@/app/auth"
import { createClient } from "@/utils/supabase/server"

export async function POST(request) {
    
    const supabase = await createClient()
    const { namaLengkap, nip,idUser } = await request.json()

    const data = {
        full_name:namaLengkap,
        nip,
        id: idUser
    }

    const { data: insertData, error } = await supabase.from('detail_user').insert(data).select()

    if (error) {
        console.error("Insert error:", error)
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }

    
    return new Response(JSON.stringify({ data: insertData }), { status: 200 })
}