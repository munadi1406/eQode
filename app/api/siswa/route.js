
import { getSession } from "@/utils/auth";
import { createClient } from "@/utils/supabase/server"

export async function POST(request) {
    const supabase = await createClient();
    const { user } = await getSession()
    const { nisn, namaLengkap, idKelas,jenisKelamin,tanggalLahir } = await request.json();

    
   
    
    const {data:checkNISN,error:checkNISNError} = await supabase.from('siswa').select('*)').eq('nisn',nisn).single()
    
    if(checkNISN){
        return new Response(JSON.stringify({
            message:"NISN Sudah Digunakan",
            statusCode:401
        }), { status: 404 });
    }
    
    const dataSiswa = {
        nisn:Number(nisn),
        nama:namaLengkap,
        id_kelas:Number(idKelas),
        tanggal_lahir:tanggalLahir,
        jenis_kelamin:jenisKelamin
    };

    


    // Insert data tahun_ajaran dan ambil id_tahun_ajaran yang baru saja dibuat
    const { error: errorSiswa } = await supabase
        .from('siswa')
        .insert(dataSiswa)

    // Handle error saat insert tahun_ajaran
    if (errorSiswa) {
        console.error("Insert tahun_ajaran error:", errorSiswa);
        return new Response(JSON.stringify({ error: errorSiswa.message }), { status: 500 });
    }


   
   
    return new Response(JSON.stringify({
        message:"Data siswa berhasil disimpan",
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
    const idKelas = searchParams.get('kelas'); // Ambil parameter all dari query string

    // Inisialisasi query tanpa kondisi apapun
    let query = supabase.from('siswa').select('*,kelas(nama)').eq('id_kelas',idKelas).order('created_at', { ascending: false });

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
