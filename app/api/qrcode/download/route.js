import { createClient } from "@/utils/supabase/server"
import QRCode from 'qrcode'

export async function GET(request) {
    try {


        const searchParams = request.nextUrl.searchParams
        const id = searchParams.get('id')


        const verifyUrl = `${process.env.NEXTAUTH_URL}v/${id}`;
       

        const qrBuffer = await QRCode.toBuffer(verifyUrl, {
            type: 'png', color: {
                dark: '#000000',  // Warna untuk titik QR (default hitam)
                light: '#0000'    // Warna untuk latar belakang (transparan)
            }
        });

        // Kembalikan response dengan QR code sebagai file gambar PNG
        return new Response(qrBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/png',
                'Content-Disposition': 'attachment; filename="qrcode.png"',
                'Content-Length': qrBuffer.length,
            },
        });
    } catch (error) {
       
    }
}