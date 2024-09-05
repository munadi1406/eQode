import Editor from '@/app/dashboard/write/Editor'
import { createClient } from '@/utils/supabase/client'
import React from 'react'
import View from './view'
import Image from 'next/image'


const getData = async (username, title) => {

  const supabase = await createClient()
  const { data, error } = await supabase.from('articles').select(`*,detail_user!inner(slug,users(name,image,email))`).eq('slug', title).eq('detail_user.slug', username).single()
  return data
}

export async function generateMetadata({ params }) {
  const data = await getData(params.username, params.title);

  if (!data) {
    return {
      title: 'Article Not Found',
      openGraph: {
        title: 'Article Not Found',
        url: `${process.env.NEXTAUTH_URL}/404`,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Article Not Found',
        description: 'Article not found on the site',
        image: `${process.env.NEXTAUTH_URL}/404-image.jpg`, // Gambar default atau logo
      },
    };
  }

  let description = 'No description available';
  let imageUrl = ''; // Inisialisasi variabel untuk URL gambar

  try {
    const contentJson = data.content; // Langsung menggunakan objek

    // Mengambil teks dari beberapa paragraf pertama
    const paragraphs = contentJson.content
      .filter(item => item.type === 'paragraph')
      .map(paragraph => paragraph.content.map(text => text.text).join(''))
      .slice(0, 2) // Ambil dua paragraf pertama
      .join(' ');

    // Membersihkan dan memotong teks untuk SEO
    description = paragraphs
      .replace(/\s+/g, ' ') // Hapus spasi berlebih
      .trim() // Hapus spasi di awal dan akhir
      .slice(0, 160) // Ambil 160 karakter pertama
      .trim(); // Pastikan tidak ada spasi berlebih di akhir

    // Memastikan deskripsi tidak terpotong di tengah kata
    if (description.length === 160) {
      const lastSpace = description.lastIndexOf(' ');
      if (lastSpace > 0) {
        description = description.slice(0, lastSpace); // Potong di spasi terakhir
      }
    }

    // Mengambil URL gambar pertama dari konten JSON
    const images = contentJson.content
      .filter(item => item.type === 'image')
      .map(image => image.attrs.src);
      
    // Gunakan gambar pertama sebagai URL gambar utama
    if (images.length > 0) {
      imageUrl = images[0];
    }

  } catch (error) {
    console.error('Error processing content:', error);
  }

  return {
    title: data.title,
    description: description || 'No description available', // Tambahkan deskripsi
    openGraph: {
      title: data.title,
      description: description || 'No description available',
      url: `${process.env.NEXTAUTH_URL}${data.detail_user.slug}/${data.slug}`,
      type: 'article', // Type yang lebih sesuai untuk artikel
      article: {
        author: data.detail_user.users.name, // Penulis artikel
        publishedTime: data.created_at || new Date().toISOString(), // Waktu publikasi
        modifiedTime: data.updated_at || new Date().toISOString(), // Waktu modifikasi
      },
      images: [imageUrl], // Tambahkan URL gambar
    },
    twitter: {
      card: imageUrl ? 'summary_large_image' : 'summary', // Gunakan gambar besar jika ada
      title: data.title,
      description: description || 'No description available',
      image: imageUrl || `${process.env.NEXTAUTH_URL}/default-twitter-image.jpg`, // Gambar default jika tidak ada
    },
    authors: [{ name: data.detail_user.users.name }],
    creator: data.detail_user.users.name,
    publisher: data.detail_user.users.name,
    formatDetection: {
      email: data.detail_user.users.email,
    },
    verification: {
      other: {
        me: [data.detail_user.users.email],
      },
    },
    // Tambahkan meta tags untuk SEO tambahan
    metaTags: [
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: data.detail_user.users.name },
    ],
  };
}



const page = async ({ params }) => {


  const data = await getData(params.username, params.title)


  return (
    <div className="p-4 md:p-6 flex w-full justify-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl md:text-3xl font-semibold mb-4">{data.title}</h1>
        <div className='flex gap-2 py-4'>
          <div>
            <Image
              src={data.detail_user.users.image}
              width={36}
              height={36}
              alt={data.detail_user.users.name}
              className="overflow-hidden rounded-full"
            />
          </div>
          <div>
            <h3 className='text-md font-semibold'>{data.detail_user.users.name}</h3>
            <h3 className='text-xs text-gray-600'>{new Date(data.created_at).toLocaleString()}</h3>
          </div>
        </div>
        <View initialValue={data.content} />
      </div>
    </div>

  )
}

export default page