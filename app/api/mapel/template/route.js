
import { getSession } from "@/utils/auth";
import { createClient } from "@/utils/supabase/server"




export async function GET(request) {
    const supabase = await createClient();
    const { user } = await getSession();
    const searchParams = request.nextUrl.searchParams;
    const sekolah = searchParams.get('sekolah'); // Ambil parameter id dari query string
    const { data: getIdSekolah, error: errorGetIdSekolah } = await supabase
        .from('sekolah')
        .select('id')
        .eq('nama', sekolah)
        .eq('id_user', user.id)
        .single();
    const { data, error } = await supabase.from('mata_pelajaran').select('*,kelas(nama)').eq('id_sekolah', getIdSekolah.id);
   
    const groupedByClass = data.reduce((acc, item) => {
        const classId = item.kelas.nama;

        // Jika belum ada grup untuk ID kelas ini, buat satu dengan properti kelas
        if (!acc[classId]) {
            acc[classId] = { kelas: classId, mapel: [] };
        }

        // Tambahkan mata pelajaran ke grup yang sesuai
        acc[classId].mapel.push({
            nama: item.nama,
            kkm: item.kkm
        });

        return acc;
    }, {});

    // Mengubah objek yang dikelompokkan menjadi array dan mengurutkannya berdasarkan ID kelas
    const sortedGroupedByClass = Object.values(groupedByClass)
        .sort((a, b) => a.kelas - b.kelas)
    

    return new Response(JSON.stringify({ data: sortedGroupedByClass }), { status: 200 });
}



