'use client'

import { useEffect, useState } from 'react'
import Editor from './Editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'


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
      {
        type: "heading",
        attrs: {
          level: 1,
        },
        content: [
          {
            type: "text",
            text: "H1",
          },
        ],
      },
      {
        type: "heading",
        attrs: {
          level: 2,
        },
        content: [
          {
            type: "text",
            text: "H2",
          },
        ],
      },
      {
        type: "heading",
        attrs: {
          level: 3,
        },
        content: [
          {
            type: "text",
            text: "H3",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "text",
          },
        ],
      },
      {
        type: "bulletList",
        attrs: {
          tight: true,
        },
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "new idea",
                  },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "idea",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  })

  const [title, setTitle] = useState("")
  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const datas = await axios.post('/api/write', {
        title, content: value
      })
      return datas.data
    },
    onError: (error) => {
      console.log(error)
    },
    onSuccess: (data) => {
      console.log(data)
    }
  },
  )



  useEffect(() => {
    console.log(value)
  }, [value])
  return (
    <div className='flex flex-col gap-2'>
      <Button onClick={mutate} disabled={isPending}>Publish</Button>
      <Input type="text" placeholder={"Title"} onChange={(e) => setTitle(e.target.value)} value={title} />
      <Editor initialValue={value} onChange={setValue} />
    </div>
  )
}

export default page