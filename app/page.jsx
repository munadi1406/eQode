import Image from "next/image";
import Link from "next/link";
import LocalTime from "@/components/dashboard/qrcode/LocalTime";
import { createClient } from "@/utils/supabase/client";

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
  const supabase = await  createClient()
  const { data, error } = await supabase.from('articles').select(`*,detail_user(slug,users(name,image))`).order('created_at', { ascending: false });

  // Fungsi untuk mendapatkan paragraf deskripsi
  const getParagraphs = (content) => {
    let description;
    const paragraphs = content.content
      .filter((item) => item.type === "paragraph")
      .map((paragraph) => paragraph.content.map((text) => text.text).join(""))
      .slice(0, 2)
      .join(" ")
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
      .filter((item) => item.type === "image")
      .map((image) => image.attrs.src);

    if (images.length > 0) {
      return images[0];
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
              <h3 className="text-xs font-semibold text-gray-600">
                {e.detail_user.users.name}
              </h3>
              <p className="text-xs text-gray-600">
                <LocalTime time={e.created_at} />
              </p>
            </div>
            <div className="w-full flex gap-2 items-center">
              <div className="">
                <Link href={`/${e.detail_user.slug}/${e.slug}`} className="hover:underline">
                  <h3 className="text-xl font-semibold">{e.title}</h3>
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
    </div>
  );
}
