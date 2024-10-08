import { getSession } from "@/utils/auth"
import { createClient } from "@/utils/supabase/server"

export async function POST(request) {
    const supabase = await createClient()
    const { user } = await getSession()
    const { namaSekolah, alamat, kepalaSekolah, nip, } = await request.json()

    const data = {
        nama:namaSekolah,
        alamat,
        kepala_sekolah:kepalaSekolah,
        nip,
        id_user: user.id
    }

    const { data: insertData, error } = await supabase.from('sekolah').insert(data).select().single()
    
    


    if (error) {
        console.error("Insert error:", error)
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }


    return new Response(JSON.stringify({ data: insertData }), { status: 200 })
}
export async function GET() {
    const supabase = await createClient()

    const { user } = await getSession()



    const { data, error } = await supabase.from('sekolah').select().order('created_at', { ascending: false }).eq('id_user', user.id);


    return new Response(JSON.stringify({ data }), { status: 200 })
}
export async function DELETE(request) {
    const supabase = await createClient()
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    const { data, error } = await supabase.from('sekolah').delete().eq('id', id);
    


    return new Response(JSON.stringify({ message: "Sekolah Berhasil DiHapus" }), { status: 200 })
}
