import Image from "next/image";
import Link from "next/link";
import LocalTime from "@/components/dashboard/qrcode/LocalTime";
import { createClient } from "@/utils/supabase/client";
import { getSession } from "next-auth/react";

export const metadata = {
  metadataBase: new URL(`${process.env.NEXTAUTH_URL}`),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
};

export default async function Home() {
  
 
  const supabase = await createClient('')
  const { data, error } = await supabase.from('articles').select(`*,detail_user(slug,users(name,image))`).order('created_at', { ascending: false });
  console.log({error})
  // Fungsi untuk mendapatkan paragraf deskripsi
  const getParagraphs = (content) => {
    let description;
    const paragraphs = content.content
      .filter(item => item.type === 'p') // Filter paragraf
      .map(paragraph => {
        // Periksa jika content ada dan merupakan array
        if (Array.isArray(paragraph.content)) {
          return paragraph.content.join(' '); // Gabungkan elemen content
        }
        return ''; // Jika content tidak ada, kembalikan string kosong
      })
      .slice(0, 2) // Ambil hanya dua paragraf pertama
      .join(' ')
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 160)
      .trim();
    if (paragraphs.length === 160) {
      const lastSpace = paragraphs.lastIndexOf(" ");
      if (lastSpace > 0) {
        description = paragraphs.slice(0, lastSpace); // Potong di spasi terakhir
      }
    }
    return description;
  };

  // Fungsi untuk mendapatkan URL gambar
  const getImageUrl = (content) => {
    const images = content.content
      .filter((item) => item.type === "img")
      .map((image) => image.attributes.src);

    if (images.length > 0) {
      return images[0];
    }
  };
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: "Blog Teknologi Terbaru | Panduan dan Ulasan Terkini",
    description: "Temukan panduan dan ulasan terbaru tentang teknologi, gadget, dan inovasi di blog kami. Dapatkan informasi terkini dan tips berguna untuk membantu Anda tetap up-to-date.",
    url: 'https://e-qode.vercel.app',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: data.map((e, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Article',
          name: e.title,
          description: getParagraphs(e.content),
          url: `https://e-qode.vercel.app/${e.detail_user.slug}/${e.slug}`,
          image: getImageUrl(e.content),
          datePublished: e.created_at,
          author: {
            '@type': 'Person',
            name: e.detail_user.users.name
          },
          publisher: {
            '@type': 'Organization',
            name: 'eQode'
          }
        }
      }))
    },
    author: {
      '@type': 'Person',
      name: 'Fathullah Munadi'
    },
    publisher: {
      '@type': 'Organization',
      name: 'eQode'
    }
  };

  return (
    <div className="grid md:grid-cols-6 grid-cols-1 md:w-full max-w-screen py-2 gap-2">
      <div className="md:col-span-4 col-span-1">
        {data.map((e, i) => (
          <div className="w-full border-b p-2 flex-col gap-2 flex" key={i}>
            <div className="w-full flex items-center gap-2">
              <Image
                src={e.detail_user.users.image}
                width={24}
                height={24}
                alt={e.detail_user.users.name}
                className="overflow-hidden rounded-full"
              />
              <h2 className="text-xs font-semibold text-gray-600">
                {e.detail_user.users.name}
              </h2>
              <h3 className="text-xs text-gray-600">
                <LocalTime time={e.created_at} />
              </h3> 
            </div>
            <div className="w-full flex gap-2 items-center">
              <div className="">
                <Link href={`/${e.detail_user.slug}/${e.slug}`} className="hover:underline">
                  <h1 className="text-xl font-semibold">{e.title}</h1>
                </Link>
                <p className="text-xs text-gray-600">
                  {getParagraphs(e.content)}...
                </p>
              </div>
              {getImageUrl(e.content) && (
                <div className="w-max h-full">
                  <Image
                    src={getImageUrl(e.content)}
                    alt={e.title}
                    className="rounded-md"
                    width={100}
                    height={100}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="md:col-span-2 border rounded-md">Popular</div>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    </div>
  );
}
