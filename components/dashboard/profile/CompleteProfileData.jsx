'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useState } from "react"



const Form = () => {
    const { data: { user: { id } } } = useSession()
    const [open, setOpen] = useState(true);

    const [namaLengkap, setNamaLengkap] = useState()
    const [nip, setNip] = useState()

    const { mutate,isPending } = useMutation({
        mutationFn: async (e) => {

            e.preventDefault()
            const data = await axios.post('/api/profile', {
                namaLengkap,
                nip,
                idUser: id

            })
            return data
        },
        onSuccess: () => {
            setOpen(false);
            document.location.reload();
        }
    })



    return (

        <Dialog open={open} >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Lengkapi Data Anda</DialogTitle>
                    <DialogDescription>
                        Silakan Isi Form Dibawah Ini Untuk Melengkapi Profile Anda
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={mutate} className="grid grid-cols-1 gap-2">
                    <div>
                        <Label htmlFor="nama">Nama Lengkap Beserta Title</Label>
                        <Input type="text" placeholder="Andi, S.Pd." id="nama" required onChange={(e) => setNamaLengkap(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="nip">NIP</Label>
                        <Input type="number" id="nip" placeholder="123456789" required onChange={(e) => setNip(e.target.value)} />
                    </div>
                    <Button type="submit" disabled={isPending}>{isPending ? "Loading..." : 'Simpan'}</Button>
                </form>

            </DialogContent>
        </Dialog>


    )
}

export default Form