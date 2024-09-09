'use client'
import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter, useSearchParams } from 'next/navigation'

export default function SemesterSelect({ semester }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value) => {
    const params = new URLSearchParams(searchParams);

    // Ubah nilai semester di query params
    params.set('semester', value);
    
    // Update URL tanpa reload halaman
    router.push(`${window.location.pathname}?${params.toString()}`, undefined, { shallow: true });
  };
 
  return (
    <>
      <div>
        <h1 className='text-gray-600 text-lg capitalize'>
          Saat Ini Semester Yang Aktif Adalah {semester}
        </h1>
        <p className='text-sm capitalize'>
          Silahkan Pilih Semester Jika ingin melihat data pada semester lain
        </p>
      </div>
      <Select defaultValue={semester} onValueChange={handleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Semester" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Semester 1">Semester 1</SelectItem>
          <SelectItem value="Semester 2">Semester 2</SelectItem>
        </SelectContent>
      </Select>
    </>
  )
}
