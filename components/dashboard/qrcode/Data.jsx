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



const Data = () => {

    const { Image } = useQRCode()
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['data'], queryFn: async () => {
            const datas = await axios.get('/api/qrcode')
            return datas.data.data
        },
        staleTime: 3000,
        refetchInterval: 3000,
    })



    const handleClick = async (id) => {
        try {
            // Membangun URL API
            const url = `/api/qrcode/download?id=${id}`;

            // Membuka URL API di tab baru
            window.open(url, '_blank');
        } catch (error) {
            console.error('Error opening the QR code URL:', error);
        }
    };

    const handleDelete = useMutation({
        mutationFn: async (id) => {
            const isDelete = await axios.delete(`/api/qrcode?id=${id}`)
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
        <div className="grid grid-cols-1 gap-2 mt-2">
            {data.map((e, index) => (
                <ContextMenu key={e.id}>
                    <ContextMenuTrigger>
                        <Card >
                            <CardHeader>
                                <CardTitle>{new Date(e.created_at).toLocaleString()}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between">
                                    <div>
                                        <p>Tujuan: {e.tujuan}</p>
                                        <p>Keperluan : {e.keperluan}</p>
                                    </div>
                                    <div className="flex w-max justify-center items-center ">
                                        <div className="bg-white shadow-md w-max m-auto rounded-md ">
                                            <Image
                                                text={`${process.env.NEXTAUTH_URL}v/${e.id}`}
                                                options={{
                                                    scale: 2,
                                                    width: 50,
                                                }}

                                            />

                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center mt-4">
                                    <Button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => handleClick(e.id)}
                                    >
                                        Download
                                    </Button>
                                </div>
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