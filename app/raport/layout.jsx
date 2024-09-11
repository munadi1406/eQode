import { Navbar } from "@/components/raport/Navbar";

export const metadata = {
    metadataBase: `${process.env.NEXTAUTH_URL}raport`, // URL dasar aplikasi Anda
    title: "RaportID | Solusi Pembuatan Raport Terbaik dan Tercepat",
    description: "RaportID menyederhanakan pembuatan dan pengelolaan raport dengan otomatisasi dan kustomisasi. Hemat waktu dan dapatkan laporan akurat dalam menit.",
    keywords: "pembuatan raport, laporan siswa, otomatisasi laporan, aplikasi raport, pengelolaan nilai, sistem raport canggih",
    openGraph: {
      title: "RaportID | Solusi Pembuatan Raport Terbaik dan Tercepat",
      description: "Dengan RaportID, Anda mendapatkan solusi cepat dan akurat untuk pembuatan dan pengelolaan raport. Nikmati fitur otomatisasi dan kustomisasi yang memudahkan pekerjaan Anda.",
      url: `${process.env.NEXTAUTH_URL}raport`, // URL aplikasi Anda
      type: "website",
    },
    robots: "index, follow",
    charset: "UTF-8",
    language: "id-ID",
    generator: 'Next.js',
    applicationName: 'RaportID',
    referrer: 'origin-when-cross-origin',
    authors: [{ name: 'Fathullah Munadi' }],
    creator: 'Fathullah Munadi',
    publisher: 'Fathullah Munadi',
    alternates: {
        canonical: `${process.env.NEXTAUTH_URL}raport`,
      },
  };
  
export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <div className="border">
                {children}
            </div>
        </>
    )
}
