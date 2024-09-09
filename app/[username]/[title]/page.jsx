import Editor from '@/app/(dashboard)/dashboard/write/Editor';
import { createClient } from '@/utils/supabase/client';
import React from 'react';
import View from './view';
import Image from 'next/image';

const getData = async (username, title) => {
  const supabase =  createClient('');
  const { data, error } = await supabase
    .from('articles')
    .select(`*,detail_user!inner(slug,users(name,image,email))`)
    .eq('slug', title)
    .eq('detail_user.slug', username)
    .single();
  return data;
};

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
        image: `${process.env.NEXTAUTH_URL}/404-image.jpg`,
      },
    };
  }

  let description = 'No description available';
  let imageUrl = ''; // Inisialisasi variabel untuk URL gambar
 
  try {
    const contentJson = data.content; // Langsung menggunakan objek

    // Mengambil teks dari beberapa paragraf pertama
    const paragraphs = contentJson.content
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



    // Membersihkan dan memotong teks untuk SEO
    description = paragraphs
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 160)
      .trim();

    if (description.length === 160) {
      const lastSpace = description.lastIndexOf(' ');
      if (lastSpace > 0) {
        description = description.slice(0, lastSpace);
      }
    }

    // Mengambil URL gambar pertama dari konten JSON
    const images = contentJson.content
      .filter(item => item.type === 'img')
      .map(image => image.attributes.src);

    if (images.length > 0) {
      imageUrl = images[0];
    }

  } catch (error) {
    console.error('Error processing content:', error);
  }

  const canonicalUrl = `${process.env.NEXTAUTH_URL}/${data.detail_user.slug}/${data.slug}`;

  return {
    title: data.title,
    description: description || 'No description available',
    openGraph: {
      title: data.title,
      description: description || 'No description available',
      url: canonicalUrl,
      type: 'article',
      article: {
        author: data.detail_user.users.name,
        publishedTime: data.created_at || new Date().toISOString(),
        modifiedTime: data.updated_at || new Date().toISOString(),
      },
      images: [imageUrl],
    },
    twitter: {
      card: imageUrl ? 'summary_large_image' : 'summary',
      title: data.title,
      description: description || 'No description available',
      image: imageUrl || `${process.env.NEXTAUTH_URL}/default-twitter-image.jpg`,
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
    metaTags: [
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: data.detail_user.users.name },
    ],
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

const Page = async ({ params }) => {
  const data = await getData(params.username, params.title);
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    name: data.title,
    image: data.content.content
      .filter(item => item.type === 'img')
      .map(image => image.attributes.src)[0] || '',
    description : data.content.content.filter(item => item.type === 'p').map(paragraph => {
      // Periksa jika content ada dan merupakan array
      if (Array.isArray(paragraph.content)) {
        return paragraph.content.join(' '); // Gabungkan elemen content
      }
      return ''; // Jika content tidak ada, kembalikan string kosong
    }).slice(0, 2).join(' ').replace(/\s+/g, ' ').trim().slice(0, 160),
    author: {
      '@type': 'Person',
      name: data.detail_user.users.name,
    },
    datePublished: data.created_at,
    dateModified: data.updated_at,
  };

  return (
    <section className="p-4 md:p-6 flex w-full justify-center">
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
            <h2 className='text-md font-semibold'>{data.detail_user.users.name}</h2>
            <h3 className='text-xs text-gray-600'>{new Date(data.created_at).toLocaleString()}</h3>
          </div>
        </div>
        <View initialValue={data.content} />
        {/* Add JSON-LD to your page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </div>
    </section>
  );
};

export default Page;
