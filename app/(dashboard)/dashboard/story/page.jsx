'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CiMenuKebab } from "react-icons/ci";
import Link from 'next/link'



const Page = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['story'], queryFn: async () => {
            const data = await axios.get('/api/story')
            return data.data.data
        }
    })
    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <div className='flex flex-col gap-2'>
            <h1 className='text-2xl font-semibold'>Your Story</h1>
            {data.map(({ title, created_at, slug, detail_user }, i) => (
                <div className='rounded-md p-2' key={i}>
                    <div className='flex justify-end w-full px-2'>
                        <DropdownMenu>
                            <DropdownMenuTrigger><CiMenuKebab /></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <a target="_blank" rel="noopener noreferrer" href={`/${detail_user.slug}/${slug}`}>Visit</a>
                                </DropdownMenuItem>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Stat</DropdownMenuItem>
                                <DropdownMenuItem>Setting</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className='flex gap-2 flex-col'>
                        <h1 className='text-md font-semibold'>{title}</h1>
                        <p className="text-sm text-gray-600">{new Date(created_at).toLocaleString()}</p>
                    </div>
                </div>

            ))}
        </div>
    )
}

export default page