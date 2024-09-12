
import { getSession } from "@/utils/auth";
import { createClient } from "@/utils/supabase/server"

export async function POST(request) {
    const supabase = await createClient();
    const { user } = await getSession()
    const { nama,kkm,namaSekolah } = await request.json();

    
    
    const {data:getIdSekolah,error} = await supabase.from('sekolah').select('id').eq('nama',namaSekolah).eq('id_user',user.id).single()
  
    
    const {data:checkNamaMapel,error:checkNamaMapelError} = await supabase.from('mapel').select('nama').eq('nama',nama).eq('id_sekolah',getIdSekolah.id).single()
    if(checkNamaMapel){
        return new Response(JSON.stringify({
            message:"NISN Sudah Digunakan",
            statusCode:401
        }), { status: 404 });
    }
    
    
    
    const dataMapel = {
        nama,
        kkm:Number(kkm),
        id_sekolah:getIdSekolah.id
    };

    


    // Insert data tahun_ajaran dan ambil id_tahun_ajaran yang baru saja dibuat
    const { error: errorMapel } = await supabase
        .from('mata_pelajaran')
        .insert(dataMapel)

    // Handle error saat insert tahun_ajaran
    if (errorMapel) {
        console.error("Insert tahun_ajaran error:", errorMapel);
        return new Response(JSON.stringify({ error: errorMapel.message }), { status: 500 });
    }


   
   
    return new Response(JSON.stringify({
        message:"Mata pelajaran berhasil disimpan, Silahkan tambahkan kriteria penilaian",
        statusCode:201
    }), { status: 201 });
}

export async function GET(request) {
    const supabase = await createClient();

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id'); // Ambil parameter id dari query string
    const row = searchParams.get('row'); // Ambil parameter row dari query string
    const all = searchParams.get('all'); // Ambil parameter all dari query string
    const limit = row;

    // Inisialisasi query tanpa kondisi apapun
    let query = supabase.from('mata_pelajaran').select('*').order('created_at', { ascending: false });

    // Jika all tidak bernilai true, terapkan kondisi limit dan lt
    if (!all) {
        if (limit) {
            query = query.limit(limit);
        }
        if (id != 0) {
            query = query.lt('id', id);
        }
    }

    const { data, error } = await query;

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    // Dapatkan last_id dari data yang diambil
    const last_id = data.length > 0 ? data[data.length - 1].id : null;

    return new Response(JSON.stringify({ data, last_id }), { status: 200 });
}


export async function DELETE(request) {
    const supabase = await createClient()
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    const { data, error } = await supabase.from('sekolah').delete().eq('id', id);
    


    return new Response(JSON.stringify({ message: "Sekolah Berhasil DiHapus" }), { status: 200 })
}
