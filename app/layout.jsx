import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import { GoogleAnalytics } from '@next/third-parties/google'
import { getSession } from "../utils/auth";
import Providers from "../utils/providers";
 
 
export const metadata = {
  metadataBase: new URL('https://e-qode.vercel.app'),
  title: "Blog Teknologi Terbaru | Panduan dan Ulasan Terkini",
  description: "Temukan panduan dan ulasan terbaru tentang teknologi, gadget, dan inovasi di blog kami. Dapatkan informasi terkini dan tips berguna untuk membantu Anda tetap up-to-date.",
  keywords: "blog teknologi, panduan teknologi, ulasan gadget, berita teknologi, tips teknologi",
  openGraph: {
    title: "Blog Teknologi Terbaru | Panduan dan Ulasan Terkini",
    description: "Blog kami memberikan panduan dan ulasan terkini tentang teknologi dan gadget. Ikuti perkembangan terbaru dan temukan tips berguna untuk teknologi.",
    url: new URL('https://e-qode.vercel.app'),
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
        <main>
          <Providers session={session}>
            <div>
            {children}
            </div>
          </Providers>
        </main>
      </body>
      <GoogleAnalytics gaId="G-M8CCCSY7SJ" />
    </html>
  );
}
