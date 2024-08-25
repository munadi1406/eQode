'use client'
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useQRCode } from 'next-qrcode';
import { useRef, Fragment,forwardRef,useEffect ,useCallback} from 'react';
import { Button } from "@/components/ui/button";


const Data = () => {

    const {Image} = useQRCode()
    const { data, isLoading } = useQuery({
        queryKey: ['data'], queryFn: async () => {
            const datas = await axios.get('/api/qrcode')
            return datas.data.data
        }
    })

    const canvasRefs = useRef([]);

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
    
    if (isLoading) {
        return <>Loading...</>
    }

    return (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-2 mt-2">
            {data.map((e, index) => (
                <Card key={e.id}>
                    <CardHeader>
                        <CardTitle>{new Date(e.created_at).toLocaleString()}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Tujuan: {e.tujuan}</p>
                        <p>Keperluan : {e.keperluan}</p>
                        <div className="flex w-full justify-center items-center ">

                            <div className="bg-white shadow-md w-max m-auto rounded-md ">
                                
                                    <Image
                                        text={'https://github.com/bunlong/next-qrcode'}
                                        options={{
                                            scale: 2,
                                            width: 150,
                                        }}
                                       
                                    /> 
                                
                            </div>
                        </div>
                        <div className="flex justify-center mt-4">
                            <Button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleClick(e.id)}
                            >
                                Share QR Code
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default Data