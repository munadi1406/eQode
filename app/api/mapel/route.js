
import { getSession } from "@/utils/auth";
import { createClient } from "@/utils/supabase/server"

export async function POST(request) {
    const supabase = await createClient();
    const { user } = await getSession();
    
    // Dapatkan seluruh data dari satu properti "data"
    const { data } = await request.json(); 
    const namaSekolah = data[0].namaSekolah
    const idKelas =data[0].idKelas
    

    // Ambil ID sekolah berdasarkan namaSekolah dan user.id
    const { data: getIdSekolah, error: errorGetIdSekolah } = await supabase
        .from('sekolah')
        .select('id')
        .eq('nama', namaSekolah)
        .eq('id_user', user.id)
        .single();
  
    if (errorGetIdSekolah || !getIdSekolah) {
        return new Response(JSON.stringify({
            message: "Sekolah tidak ditemukan atau terjadi kesalahan.",
            statusCode: 404
        }), { status: 404 });
    }

    const sekolahId = getIdSekolah.id;

    
    
    

    // Query untuk memeriksa apakah ada nama mata pelajaran yang sudah ada di database
    const { data: allMapel, error: errorAllMapel } = await supabase
        .from('mata_pelajaran')
        .select('nama')
        .eq('id_sekolah', sekolahId).eq('id_kelas',idKelas);
    
    // Handle jika terjadi error saat mengambil semua mata pelajaran
    if (errorAllMapel) {
        return new Response(JSON.stringify({
            message: "Terjadi kesalahan saat mengambil data mata pelajaran.",
            statusCode: 500
        }), { status: 500 });
    }

    // Ambil nama-nama mata pelajaran yang sudah ada di database
    const existingNames = new Set(allMapel.map(mapel => mapel.nama));

    // Periksa apakah ada nama mata pelajaran dalam request yang sudah ada di database
    const duplicateNames = data
        .map(mapel => mapel.nama)
        .filter(nama => existingNames.has(nama));

    if (duplicateNames.length > 0) {
        return new Response(JSON.stringify({
            message: `Nama Mata Pelajaran berikut sudah digunakan: ${duplicateNames.join(', ')}`,
            statusCode: 401
        }), { status: 401 });
    }

    // Buat array data untuk di-insert secara bulk dan tambahkan idKelas ke setiap mata pelajaran
    const dataMapelBulk = data.map(mapel => ({
        nama: mapel.nama,
        kkm: Number(mapel.kkm),
        id_sekolah: sekolahId,
        id_kelas: idKelas  // Tambahkan idKelas dari request data
    }));

    // Insert data mata pelajaran secara bulk
    const { error: errorMapelBulk } = await supabase
        .from('mata_pelajaran')
        .insert(dataMapelBulk);

    // Handle error saat insert
    if (errorMapelBulk) {
        console.error("Insert mata pelajaran error:", errorMapelBulk);
        return new Response(JSON.stringify({ error: errorMapelBulk.message }), { status: 500 });
    }

    // Berhasil menyimpan data mata pelajaran
    return new Response(JSON.stringify({
        message: "Mata pelajaran berhasil disimpan, silahkan tambahkan kriteria penilaian.",
        statusCode: 201
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
    let query = supabase.from('mata_pelajaran').select('*,kelas(nama)').order('id', { ascending: false });

    // Jika all tidak bernilai true, terapkan kondisi limit dan lt
    if (!all) {
        if (limit) {
            query = query.limit(limit);
        }
        if (id > 0) {
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
