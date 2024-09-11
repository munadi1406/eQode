
import { getSession } from "@/utils/auth";
import { createClient } from "@/utils/supabase/server"

export async function POST(request) {
    const supabase = await createClient();
    const { user } = await getSession()
    const { namaKelas, idTahunAjaran, idSekolah } = await request.json();

    
    const {data:getIdSekolahIdTahunAjaran,error} = await supabase.from('sekolah').select('id,tahun_ajaran(id)').eq('nama',idSekolah).eq('tahun_ajaran.tahun_ajaran',`${idTahunAjaran}/${Number(idTahunAjaran) + 1}`).eq('id_user',user.id).single()
    
    if(error){
        return new Response(JSON.stringify({ message:"Internal server error" }), { status: 500 });
    }
    
    const {data:checkKelasName,error:checkKelasNameError} = await supabase.from('kelas').select('*').eq('nama',namaKelas).eq('id_tahun_ajaran',getIdSekolahIdTahunAjaran.tahun_ajaran.id).eq('id_sekolah',getIdSekolahIdTahunAjaran.id)
    
    if(checkKelasName.length > 0){
        return new Response(JSON.stringify({
            message:"Nama Kelas Sudah Digunakan",
            statusCode:401
        }), { status: 404 });
    }
    
    const dataTahunAjaran = {
        nama:namaKelas,
        id_tahun_ajaran:getIdSekolahIdTahunAjaran.tahun_ajaran.id,
        id_sekolah: getIdSekolahIdTahunAjaran.id,
        id_user:user.id
    };

    console.log(dataTahunAjaran)


    // Insert data tahun_ajaran dan ambil id_tahun_ajaran yang baru saja dibuat
    const { data: insertTahunAjaran, error: errorKelas } = await supabase
        .from('kelas')
        .insert(dataTahunAjaran)
        .select()
        .single();

    // Handle error saat insert tahun_ajaran
    if (errorKelas) {
        console.error("Insert tahun_ajaran error:", errorKelas);
        return new Response(JSON.stringify({ error: errorKelas.message }), { status: 500 });
    }


   
   
    return new Response(JSON.stringify({
        message:"Data kelas berhasil disimpan",
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
    let query = supabase.from('kelas').select('*').order('created_at', { ascending: false });

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
