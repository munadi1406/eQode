import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const loading = () => {
  return (
    <div>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">

        <Skeleton className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col h-screen sm:flex" />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <div className='px-2'>
            <Skeleton className="sticky top-0 z-30 flex h-14 items-center w-full  px-4 sm:static  sm:border-0 sm:px-6" />
          </div>
          <main className="p-2">
            <Skeleton className="w-full h-[300px] rounded-md p-2 " />
          </main>
        </div>
      </div>
    </div>
  )
}

export default loading