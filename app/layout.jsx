
import { Inter } from "next/font/google";
import "./globals.css";
import { getSession } from "./auth";
import Providers from "./providers";
const inter = Inter({ subsets: ["latin"] });
import { GoogleAnalytics } from '@next/third-parties/google'


export const metadata = {
  metadataBase: new URL('https://e-qode.vercel.app'),
  title: "Buat Tanda Tangan dengan QR Code | Aplikasi Tanda Tangan Digital",
  description: "Buat tanda tangan digital Anda dengan mudah menggunakan aplikasi kami. Hasilkan QR code yang aman dan terverifikasi untuk dokumen penting Anda.",
  keywords: "tanda tangan digital, QR code, aplikasi tanda tangan, tanda tangan online, verifikasi dokumen, tanda tangan QR code",
  
  openGraph: {
    title: "Buat Tanda Tangan dengan QR Code | Aplikasi Tanda Tangan Digital",
    description: "Gunakan aplikasi kami untuk membuat tanda tangan digital dengan QR code. Aman, cepat, dan mudah untuk semua kebutuhan verifikasi dokumen Anda.",
    url: "https://e-qode.vercel.app",
    type: "website",
  },

  robots: "index, follow",
  charset: "UTF-8",
  language: "id-ID",
  generator: 'Next.js',
  applicationName: 'eQode',
  referrer: 'origin-when-cross-origin',
  authors: [{ name: 'Fathullah Munadi' }],
  creator: 'Fathullah Munadi',
  publisher: 'Fathullah Munadi',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: 'Bkl-eMCNP_0U8nibDj-Q9312z_PPLMkX4Rt6mEadY3k',
    yandex: 'yandex',
    yahoo: 'yahoo',
    other: {
      me: ['fathullahmunadi1406@gmail.com', 'https://github.com/munadi1406'],
    },
  },

};

export default async function RootLayout({ children }) {

  const session = await getSession()
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}>


          {children}

        </Providers>
      </body>
      <GoogleAnalytics gaId="G-M8CCCSY7SJ" />
    </html>
  );
}
