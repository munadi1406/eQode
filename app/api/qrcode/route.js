import { getSession } from "@/app/auth"
import { createClient } from "@/utils/supabase/server"

export async function POST(request) {
    const supabase = await createClient()
    const { tujuan, keperluan, idUser } = await request.json()

    const data = {
        tujuan,
        keperluan,
        id_user: idUser
    }

    const { data: insertData, error } = await supabase.from('qrcode').insert(data).select()

    if (error) {
        console.error("Insert error:", error)
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }

    
    return new Response(JSON.stringify({ data: insertData }), { status: 200 })
}
export async function GET() {
    const supabase = await createClient()

    const { user } = await getSession()



    const { data, error } = await supabase.from('qrcode').select().order('created_at', { ascending: false }).eq('id_user', user.id);


    return new Response(JSON.stringify({ data }), { status: 200 })
}
export async function DELETE(request) {
    const supabase = await createClient()
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    const { user } = await getSession()



    const { data, error } = await supabase.from('qrcode').delete().eq('id_user', user.id).eq('id', id);


    return new Response(JSON.stringify({ message: "Tanda Tangan Berhasil Dihapus" }), { status: 200 })
}
