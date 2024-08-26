import { getSession } from "@/app/auth"
import { createClient } from "@/utils/supabase/server"

export async function POST(request) {
    const supabase = await createClient()
    const { user } = await getSession()
    const { namaSekolah, alamat, kepalaSekolah, nip,
        tahunAwal, tahunAkhir, } = await request.json()

    const data = {
        nama:namaSekolah,
        alamat,
        kepala_sekolah:kepalaSekolah,
        nip,
        tahun_ajaran: `${tahunAwal}/${tahunAkhir}`,
        id_user: user.id
    }

    const { data: insertData, error } = await supabase.from('sekolah').insert(data).select().single()
    
    const insert = await supabase.from('semester').insert([{
        nama:1,
        id_sekolah:insertData.id
    },{
        nama:2,
        id_sekolah:insertData.id
    },
])


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
