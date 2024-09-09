'use client'
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useQRCode } from 'next-qrcode';
import { Button } from "@/components/ui/button";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";



const Data = () => {


    const { data, isLoading, refetch } = useQuery({
        queryKey: ['sekolah'], queryFn: async () => {
            const datas = await axios.get('/api/sekolah')
            return datas.data.data
        },
        staleTime: 3000,
        refetchInterval: 3000,
    })


    const route = useRouter()
    const handleClick = (nama)=>{
        route.push(`/dashboard/sekolah/${nama}`)
    }

    const handleDelete = useMutation({
        mutationFn: async (id) => {
            const isDelete = await axios.delete(`/api/sekolah?id=${id}`)
            return isDelete.data
        },
        onSuccess: () => {
            refetch()
        }
    })

    if (isLoading) {
        return <>Loading...</>
    }

    return (
        <div className="grid md:grid-cols-3 grid-cols-1  gap-2 mt-2">
            {data.map((e, index) => (
                <ContextMenu key={e.id}>
                    <ContextMenuTrigger>
                        <Card onClick={()=>handleClick(e.nama)} className="cursor-pointer">
                            <CardHeader>
                                <CardTitle>{e.nama}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Badge>Kepala Sekolah: {e.kepala_sekolah}</Badge>
                            </CardContent>
                        </Card>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuItem onClick={() => handleDelete.mutate(e.id)}>Hapus</ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>


            ))}
        </div>
    )
}

export default Data