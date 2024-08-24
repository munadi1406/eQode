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

const CanvasWrapper = ({ text, options, canvasRef }) => {
    const { Canvas } = useQRCode();
    const localRef = useRef(null);
    console.log({canvasRef})

    useEffect(() => {
        if (canvasRef) {
            canvasRef(localRef.current); // Menyebarkan referensi ke parent component
        }
    }, [canvasRef]);

    return (
        <Canvas
            text={text}
            options={options}
            ref={localRef}
        />
    );
};

const QrCode = ({ text, options }) => {
    const { Canvas } = useQRCode();
    const canvasRef = useRef(null);

    // Callback ref to capture the canvas DOM element
    const handleRef = useCallback((node) => {
        if (node) {
            canvasRef.current = node; // Capture the DOM element
        } 
    }, []);

    const handleShare = async () => {
        if (!canvasRef.current) return;

        // Convert canvas to Blob
        canvasRef.current.toBlob(async (blob) => {
            if (!blob) {
                console.error('Failed to convert canvas to blob.');
                return;
            }

            const filesArray = [
                new File([blob], 'qrcode.png', {
                    type: 'image/png',
                    lastModified: new Date().getTime(),
                }),
            ];

            const shareData = {
                files: filesArray,
                title: 'QR Code',
                text: `QR Code for ${text}`,
            };

            try {
                await navigator.share(shareData);
                console.log('Share successful');
            } catch (error) {
                console.error('Error sharing:', error);
            }
        }, 'image/png');
    };

    return (
        <div>
            <Canvas
                text={text}
                options={options}
                ref={handleRef} // Use callback ref
            />
            <button onClick={handleShare}>Share QR Code</button>
        </div>
    );
};

const Data = () => {
    
    const { data, isLoading } = useQuery({
        queryKey: ['data'], queryFn: async () => {
            const datas = await axios.get('/api/qrcode')
            return datas.data.data
        }
    })

    const canvasRefs = useRef([]);

    const handleShare = async (index) => {
        const canvas = canvasRefs.current[index];
        console.log(canvas)
        if (!canvas) return;

        // Konversi canvas ke Blob
        canvas.toBlob(async (blob) => {
            if (!blob) {
                console.error('Failed to convert canvas to blob.');
                return;
            }

            const filesArray = [
                new File([blob], 'qrcode.png', {
                    type: 'image/png',
                    lastModified: new Date().getTime(),
                }),
            ];

            const shareData = {
                files: filesArray,
                title: 'QR Code',
                text: `QR Code for ${data[index].tujuan} - ${data[index].keperluan}`,
            };

            try {
                await navigator.share(shareData);
                console.log('Share successful');
            } catch (error) {
                console.error('Error sharing:', error);
            }
        }, 'image/png');
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
                                
                                    <QrCode
                                        text={'https://github.com/bunlong/next-qrcode'}
                                        options={{
                                            scale: 2,
                                            width: 150,
                                        }}
                                        ref={(el) => (canvasRefs.current[index] = el)}
                                    /> 
                                
                            </div>
                        </div>
                        <div className="flex justify-center mt-4">
                            <Button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleShare(index)}
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