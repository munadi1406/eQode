import { createClient } from "@/utils/supabase/client";
import { getSession } from "@/utils/auth";
import Link from 'next/link'

const page = async ({params}) => {
  const supabase =  await createClient()
  const session = await getSession()
 
  const style = {
    link:"bg-blue-800 h-[100px] text-white text-2xl p-2 rounded-md font-semibold justify-center flex items-center"
  }
 
  const {data} = await supabase.from('sekolah').select('id,nama').eq('id_user',session.user.id).eq('nama',decodeURIComponent(params.sekolah)).single()
  if(!data){
    return <div>Data Sekolah Tidak Ada</div>
  }
  const {data:semester} = await supabase.from('semester').select('*').eq('id_sekolah',data.id).select()
 
  
  return (
    <div>
    <h1 className="text-2xl p-2">{data.nama}</h1>
    <div className="grid grid-cols-3 gap-2">
      {semester.map((e)=>(
        <Link href={'#'} key={e.id} className={style.link}>Semester {e.nama}</Link>
      ))}
       <Link href={'#'} className={style.link}>Siswa</Link>
       <Link href={'#'} className={style.link}>Mata Pelajaran</Link>
       <Link href={'#'} className={style.link}>Kelas</Link>
    </div>
      </div>
  )
}

export default page