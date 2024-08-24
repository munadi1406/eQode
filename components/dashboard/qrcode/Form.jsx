'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useState } from "react"

const Form = () => {
    const {data:{user:{id}}} = useSession()
   const [open,setOpen] = useState(false);
    
    const [tujuan, setTujuan] = useState()
    const [keperluan, setKepeluan] = useState()

    const { mutate } = useMutation({
        mutationFn: async (e) => {
            console.log("running")
            e.preventDefault()
            const data = await axios.post('/api/qrcode', {
                tujuan,
                keperluan,
                idUser:id
                
            })
            return data
        },
        onSuccess:()=>{
            setOpen(false);
        }
    })



    return (
        
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild className="flex justify-end items-end w-full">
                    <div>
                        <Button onClick={()=>setOpen(true)} type="button" className="bg-blue-600 hover:bg-blue-400 w-max">Buat Tanda Tangan</Button>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Buat Tanda Tangan</DialogTitle>
                        <DialogDescription>
                            Silakan Isi Form Dibawah Ini Untuk Membuat Tanda Tangan
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={mutate} className="grid grid-cols-1 gap-2">
                        <div>
                            <Label htmlFor="tujuan">Tujuan/Orang Yang Menerima</Label>
                            <Input type="text" placeholder="Masukkan Tujuan" id="tujuan" required onChange={(e) => setTujuan(e.target.value)} />
                        </div>
                        <div>
                            <Label htmlFor="keperluan">Keperluan</Label>
                            <Textarea id="keperluan" placeholder="Masukkan keperluan" required onChange={(e) => setKepeluan(e.target.value)} />
                        </div>
                    <Button type="submit">Simpan</Button>
                    </form>
                    
                </DialogContent>
            </Dialog>

     
    )
}

export default Form