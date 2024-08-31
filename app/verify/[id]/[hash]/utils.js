export async function fetchQRCodeData(supabase, id) {
    const { data, error } = await supabase
        .from('qrcode')
        .select(`id, keperluan, created_at, tujuan, hash, users(detail_user(full_name))`)
        .eq('id', id)
        .single();

    return { data, error };
}


export function isHashValid(dataHash, hash) {
    return dataHash === hash;
}