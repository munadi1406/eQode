import { getSession } from "@/utils/auth"
import { createClient } from "@/utils/supabase/server"
import CryptoJS from 'crypto-js';

export async function POST(request) {
    const supabase = await createClient();
    const { tujuan, keperluan, idUser } = await request.json();


    // Data yang akan disimpan
    const data = {
        tujuan,
        keperluan,
        id_user: idUser
    };

    // Fungsi untuk menghitung hash
    function calculateHash(data) {
        // Menghitung hash dari JSON string
        return CryptoJS.SHA256(JSON.stringify(data)).toString(CryptoJS.enc.Hex);
    }

    // Menghitung hash dari data
    const hash = calculateHash(data);

    // Menambahkan hash ke data
    const dataWithHash = {
        ...data,
        hash
    };

    // Menyimpan data dengan hash ke Supabase
    const { data: insertData, error } = await supabase.from('qrcode').insert(dataWithHash).select();

    if (error) {
        console.error("Insert error:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ data: insertData }), { status: 200 });
}
export async function GET() {
    const supabase = await createClient()

    const { user } = await getSession()



    const { data, error } = await supabase.from('qrcode').select().order('created_at', { ascending: false }).eq('id_user', user.id).is('is_deleted', null);


    return new Response(JSON.stringify({ data }), { status: 200 })
}
export async function DELETE(request) {
    const supabase = await createClient()
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    const { user } = await getSession()



    const { data, error } = await supabase
        .from('qrcode')
        .update({ is_deleted: true })
        .eq('id_user', user.id)
        .eq('id', id);

    if (error) {

        return new Response(JSON.stringify({ message: "Tanda Tangan Gagal Dihapus" }), { status: 404 })
    }
    return new Response(JSON.stringify({ message: "Tanda Tangan Berhasil Dihapus" }), { status: 200 })
}
