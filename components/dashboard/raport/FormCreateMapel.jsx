'use client'
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FormCreateMapel({dialogMapel, setDialogMapel, formData, handleChange, handleSubmit, mutation}) {
  return (
    <Dialog open={dialogMapel} onOpenChange={setDialogMapel}>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Tambah Data Mata Pelajaran</DialogTitle>
            <DialogDescription>Silahkan isi form dibawah ini untuk menambahkan data mata pelajaran</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <div>
                <Label htmlFor="nama">Nama Mata Pelajaran</Label>
                <Input
                    type="text"
                    id="nama"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <Label htmlFor="kkm">KKM</Label>
                <Input
                    type="number"
                    id="kkm"
                    name="kkm"
                    value={formData.kkm}
                    onChange={handleChange}
                    required
                />
            </div>



            <Button type="submit" disabled={mutation.isPending}>
                Simpan
            </Button>
        </form>
    </DialogContent>
</Dialog>
  )
}
