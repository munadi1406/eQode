import { createClient } from '@/utils/supabase/server';
import QRCode from 'qrcode'; // Pastikan Anda mengimpor QRCode dari library yang sesuai

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    try {
        // Ambil parameter 'id' dari URL
        // Validasi parameter 'id'
        const supabase = await createClient();

        if (!id) {
            return new Response('ID parameter is required', {
                status: 400,
                headers: { 'Content-Type': 'text/plain' },
            });
        }

        // Ambil data dari Supabase
        const { data, error } = await supabase
            .from('qrcode')
            .select('hash, created_at')
            .eq('id', id)
            .single();

        if (error || !data) {
            return new Response('QR Code not found', {
                status: 404,
                headers: { 'Content-Type': 'text/plain' },
            });
        }

        // Format created_at untuk nama file
        const createdAt = new Date(data.created_at).toLocaleString();
        
        const filename = `${createdAt}.png`;

        // Buat URL untuk QR code
        const verifyUrl = `${process.env.NEXTAUTH_URL}/v/${id}/${data.hash}`;
        // console.log(verifyUrl);

        // Generate QR code buffer dengan warna latar belakang transparan
        const qrBuffer = await QRCode.toBuffer(verifyUrl, {
            type: 'png',
            color: {
                dark: '#000000',  // Warna untuk titik QR (default hitam)
                light: '#0000'    // Warna untuk latar belakang (transparan)
            }
        });

        // Kembalikan response dengan QR code sebagai file gambar PNG
        return new Response(qrBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/png',
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Content-Length': qrBuffer.length,
            },
        });
    } catch (error) {
        console.error('Error generating QR code:', error);

        // Kembalikan response dengan status error dan pesan
        return new Response('Internal Server Error', {
            status: 500,
            headers: { 'Content-Type': 'text/plain' },
        });
    }
}
