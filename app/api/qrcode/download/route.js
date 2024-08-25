import QRCode from 'qrcode'; // Pastikan Anda mengimpor QRCode dari library yang sesuai

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    try {
        // Ambil parameter 'id' dari URL
        // Validasi parameter 'id'
        if (!id) {
            return new Response('ID parameter is required', {
                status: 400,
                headers: { 'Content-Type': 'text/plain' },
            });
        }

        // Buat URL untuk QR code
        const verifyUrl = `${process.env.NEXTAUTH_URL}/v/${id}`;
       
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
                'Content-Disposition': 'attachment; filename="qrcode.png"',
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
