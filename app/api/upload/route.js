import { createClient } from "@/utils/supabase/server";
import { v4 as uuidv4 } from 'uuid';

export async function POST(request) {
    try {
        const supabase = await createClient()

        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return new Response('No file uploaded', { status: 400 });
        }

        // Generate a unique file name
        const fileName = uuidv4();

        // Upload file to Supabase Storage
        const { data, error } = await supabase.storage
            .from('image')
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false,
            });

        if (error) {
            throw error;
        }

        // Return the URL of the uploaded file
        const { data: { publicUrl }, error: publicURLError } = supabase.storage
            .from('image')
            .getPublicUrl(fileName);

        if (publicURLError) {
            throw publicURLError;
        }

        return new Response(JSON.stringify({ url: publicUrl }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {

        return new Response(`Internal Server Error`, { status: 500 });
    }
}
export async function DELETE(request) {
    const supabase = await createClient()
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('path')
    // console.log(id)

    const { data, error } = await supabase.storage
        .from('image')
        .remove([`./${id}`])
   


    if (error) {
        return new Response(JSON.stringify({ message: "Tanda Tangan Gagal Dihapus" }), { status: 404 })
    }
    return new Response(JSON.stringify({ message: "Tanda Tangan Berhasil Dihapus" }), { status: 200 })
}