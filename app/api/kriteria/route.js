
import { getSession } from "@/utils/auth";
import { createClient } from "@/utils/supabase/server"

export async function POST(request) {
    const supabase = await createClient();
    const { kriteria } = await request.json();

    // Pisahkan data dengan ID dan tanpa ID
    const dataToInsert = kriteria.filter(item => item.id === null || item.id === undefined);
    const dataToUpdate = kriteria.filter(item => item.id !== null && item.id !== undefined);

    // Insert data baru (tanpa ID)
    const { data: insertedData, error: insertError } = await supabase
        .from('kriteria')
        .upsert(dataToInsert)
        .select();

    if (insertError) {
        console.error("Insert data baru error:", insertError);
        return new Response(JSON.stringify({ error: insertError.message }), { status: 500 });
    }

    // Update data yang sudah ada (dengan ID)
    const { data: updatedData, error: updateError } = await supabase
        .from('kriteria')
        .upsert(dataToUpdate)
        .select();

    if (updateError) {
        console.error("Update data lama error:", updateError);
        return new Response(JSON.stringify({ error: updateError.message }), { status: 500 });
    }

    return new Response(JSON.stringify({
        message: "Data kriteria berhasil disimpan",
        statusCode: 201
    }), { status: 201 });
}


export async function GET(request) {
    const supabase = await createClient();

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id'); // Ambil parameter id dari query string
   

    // Inisialisasi query tanpa kondisi apapun
    let query = supabase.from('kriteria').select('*').eq('id_mapel',id).order('created_at',{ascending:false});
    const { data, error } = await query;

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

   
   

    return new Response(JSON.stringify({ data }), { status: 200 });
}



export async function PUT(request) {
    const supabase = await createClient();
    const { ids } = await request.json();
   

    // Validasi input
    if (!Array.isArray(ids) || ids.length === 0) {
        return new Response(JSON.stringify({ error: 'No ids provided for deletion' }), { status: 400 });
    }

    try {
        // Melakukan penghapusan secara bulk
        const { data, error } = await supabase
            .from('kriteria')
            .delete()
            .in('id', ids);

        if (error) {
            console.error('Bulk delete error:', error);
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        return new Response(JSON.stringify({
            message: 'Data berhasil dihapus',
            statusCode: 200
        }), { status: 200 });
    } catch (error) {
        console.error('Unexpected error:', error);
        return new Response(JSON.stringify({ error: 'Unexpected error occurred' }), { status: 500 });
    }
}

