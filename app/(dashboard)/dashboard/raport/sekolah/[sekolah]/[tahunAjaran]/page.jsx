import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Siswa from './Siswa'
import Kelas from './Kelas'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
const SemesterSelect = dynamic(() => import('./SemesterSelect'),
  {
    loading: () => <p>Loading select</p>,
  })



export default function Page({ params, searchParams }) {
  const semester = searchParams.semester


  return (
    <div className='space-y-2'>
      <div className='w-full bg-white shadow-md rounded-md p-2 flex justify-between'>

        <SemesterSelect semester={semester} />

      </div>
      <div className="w-full bg-white shadow-md rounded-md p-2 ">
        <Tabs defaultValue="siswa" className="w-full">
          <TabsList>
            <TabsTrigger value="siswa">Siswa</TabsTrigger>
            <TabsTrigger value="mapel">Mata Pelajaran</TabsTrigger>
            <TabsTrigger value="kelas">Kelas</TabsTrigger>
            <TabsTrigger value="raport">Raport</TabsTrigger>
          </TabsList>
          <TabsContent value="siswa">
            <Siswa />
          </TabsContent>
          <TabsContent value="mapel">Mapel</TabsContent>
          <TabsContent value="kelas"><Kelas /></TabsContent>
          <TabsContent value="raport">raport</TabsContent>
        </Tabs>

      </div>
    </div>
  )
}
