
import { createClient } from "@/utils/supabase/server"

export async function POST(request) {
    const supabase = await createClient()
    const { user } = await getSession()
    const { tahunAwal,tahunAkhir,idSekolah } = await request.json()

    const data = {
       tahun_ajaran:`${tahunAwal}/${tahunAkhir}`,
       id_sekolah:idSekolah

    }

    const { data: insertData, error } = await supabase.from('tahun_ajaran').insert(data).select().single()
    
    


    if (error) {
        console.error("Insert error:", error)
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }


    return new Response(JSON.stringify({ data: insertData }), { status: 200 })
}
export async function GET(request) {
    const supabase = await createClient()

    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')


    const { data, error } = await supabase.from('tahun_ajaran').select('*').order('created_at', { ascending: false }).eq('id_sekolah',id);


    return new Response(JSON.stringify({ data }), { status: 200 })
}
export async function DELETE(request) {
    const supabase = await createClient()
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    const { data, error } = await supabase.from('sekolah').delete().eq('id', id);
    


    return new Response(JSON.stringify({ message: "Sekolah Berhasil DiHapus" }), { status: 200 })
}
