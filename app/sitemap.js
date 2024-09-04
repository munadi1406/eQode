import { createClient } from "@/utils/supabase/client";

const getData = async()=>{
    const supabase = await createClient()
    const {data,error} = await supabase.from('articles').select(`*,detail_user(slug)`).order('created_at',{ascending:false});
    return data
}


export default async function sitemap() {
  const url = process.env.NEXTAUTH_URL
  
  return [
    { 
      url: url,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...(await getData()).map((o) => ({
      url: `${url}${o.detail_user.slug}/${o.title}`,
      lastModified: o.created_at,
      priority: 0.8,
    })),
  ]
}