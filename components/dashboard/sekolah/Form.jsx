'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useState } from "react"

const Form = () => {
    
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        namaSekolah: '',
        alamat: '',
        kepalaSekolah: '',
        nip: '',
    });

    const clearData = ()=>{
        setFormData({
            namaSekolah: '',
            alamat: '',
            kepalaSekolah: '',
            nip: '',
            tahunAwal: '',
            tahunAkhir:'',
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

 

    const { mutate } = useMutation({
        mutationFn: async (e) => {

            e.preventDefault()
            const data = await axios.post('/api/sekolah', formData)
            return data
        },
        onSuccess: () => {
            setOpen(false);
            clearData()
        }
    })



    return (

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="flex justify-end items-end w-full">
                <div>
                    <Button onClick={() => setOpen(true)} type="button" className="bg-blue-600 hover:bg-blue-400 w-max">Tambah Data Sekolah</Button>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tambah Data Sekolah</DialogTitle>
                    <DialogDescription>
                        Silakan Isi Form Dibawah Ini Untuk Menambah Data Sekolah
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={mutate} className="space-y-4 p-4">
                    <div>
                        <Label htmlFor="namaSekolah">Nama Sekolah</Label>
                        <Input
                            type="text"
                            id="namaSekolah"
                            name="namaSekolah"
                            value={formData.namaSekolah}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="alamat">Alamat</Label>
                        <Input
                            type="text"
                            id="alamat"
                            name="alamat"
                            value={formData.alamat}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="kepalaSekolah">Nama Kepala Sekolah</Label>
                        <Input
                            type="text"
                            id="kepalaSekolah"
                            name="kepalaSekolah"
                            value={formData.kepalaSekolah}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="nip">NIP Kepala Sekolah</Label>
                        <Input
                            type="text"
                            id="nip"
                            name="nip"
                            value={formData.nip}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <Button type="submit">Submit</Button>
                </form>

            </DialogContent>
        </Dialog>


    )
}

export default Form