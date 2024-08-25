export function convertUTCToLocal(utcDateString, timeZone = "Asia/Jakarta") {
    // Buat objek Date dari string waktu UTC
    const utcDate = new Date(utcDateString);

    // Konversi ke waktu lokal berdasarkan zona waktu spesifik
    const localDateString = utcDate.toLocaleString('en-US', {
        timeZone: timeZone, 
        hour12: false, // format 24 jam
    });

    return localDateString;
}
