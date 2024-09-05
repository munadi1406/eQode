'use client'

import { useEffect, useState } from 'react'
import Editor from './Editor'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'


const page = () => {
  const [value, setValue] = useState({
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "This is an example for the editor",
          },
        ],
      },
    ],
  })


  const navigate = useRouter()

  const [title, setTitle] = useState("")
  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const datas = await axios.post('/api/write', {
        title, content: value
      })
      return datas.data
    },
    onSuccess: () => {
      navigate.push('/dashboard/story')
    }
  },
  )



  useEffect(() => {
    console.log(value)
  }, [value])
  return (
    <div className='flex flex-col gap-2'>
      <Button onClick={mutate} disabled={isPending}>Publish</Button>
      <Textarea type="text" className="border-none text-3xl font-semibold active:border-none focus:border-none" placeholder={"Title"} onChange={(e) => setTitle(e.target.value)} value={title} />
      <Editor initialValue={value} onChange={setValue} />
    </div> 
  )
}

export default page