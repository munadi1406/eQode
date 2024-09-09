
import { createClient } from "@/utils/supabase/server"

export async function POST(request) {
    const supabase = await createClient();
    const { tahunAwal, tahunAkhir, idSekolah } = await request.json();

    // Data untuk tabel tahun_ajaran
    const dataTahunAjaran = {
        tahun_ajaran: `${tahunAwal}/${tahunAkhir}`,
        id_sekolah: idSekolah
    };

    // Insert data tahun_ajaran dan ambil id_tahun_ajaran yang baru saja dibuat
    const { data: insertTahunAjaran, error: errorTahunAjaran } = await supabase
        .from('tahun_ajaran')
        .insert(dataTahunAjaran)
        .select()
        .single();

    // Handle error saat insert tahun_ajaran
    if (errorTahunAjaran) {
        console.error("Insert tahun_ajaran error:", errorTahunAjaran);
        return new Response(JSON.stringify({ error: errorTahunAjaran.message }), { status: 500 });
    }

    // Data untuk tabel semester
    const dataSemester = [
        {
            nama: "Semester 1",
            id_sekolah: idSekolah,
            id_tahun_ajaran: insertTahunAjaran.id
        },
        {
            nama: "Semester 2",
            id_sekolah: idSekolah,
            id_tahun_ajaran: insertTahunAjaran.id
        }
    ];

    // Insert data semester
    const { data: insertSemester, error: errorSemester } = await supabase
        .from('semester')
        .insert(dataSemester)
        .select();

    // Handle error saat insert semester
    if (errorSemester) {
        console.error("Insert semester error:", errorSemester);
        return new Response(JSON.stringify({ error: errorSemester.message }), { status: 500 });
    }

    // Return response jika semuanya berhasil
    return new Response(JSON.stringify({
        data: {
            tahun_ajaran: insertTahunAjaran,
            semester: insertSemester
        }
    }), { status: 200 });
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
