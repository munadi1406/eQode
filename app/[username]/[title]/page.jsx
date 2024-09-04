import Editor from '@/app/dashboard/write/Editor'
import { createClient } from '@/utils/supabase/client'
import React from 'react'
import View from './view'

const getData = async (username, title) => {
 
  const supabase = await createClient()
  const { data, error } = await supabase.from('articles').select(`*,detail_user!inner(slug)`).eq('title', title).eq('detail_user.slug', username).single()

  return data
}
export async function generateMetadata({ params }) {
 
  

  const data = await getData(params.username, params.title)

  

  


  return {
    title:data.title,
    openGraph: {
      title:data.title,
      url: `${process.env.NEXTAUTH_URL}${data.detail_user.slug}/${data.title}`,
      type: "website",
    },
  };
}

const page = async ({ params }) => {
  const data = await getData(params.username, params.title)


  return (
    <div className='p-2 flex w-full justify-center m-2'>
      <div className='md:w-[80vw] w-full'>
      <h1 className='text-3xl font-semibold'>{data.title}</h1>
      <View initialValue={data.content} />
      </div>
    </div>
  ) 
}
 
export default page