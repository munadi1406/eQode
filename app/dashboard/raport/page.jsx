import Link from 'next/link'
import React from 'react'

const page = () => {
  const style = {
    link:"bg-blue-800 h-[100px] text-white text-2xl p-2 rounded-md font-semibold justify-center flex items-center"
  }
  return (
    <div className='grid grid-cols-3 gap-2'>
      <Link href={"raport/sekolah"} className={style.link}>Sekolah</Link>
      <Link href={"raport/kelas"} className={style.link}>Kelas</Link>
      <Link href={"raport/mapel"} className={style.link}>Mata Pelajaran</Link>
    </div>
  )
}

export default page