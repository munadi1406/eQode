'use client'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



export default function Kelas() {
  const [dialogSiswa, setDialogSiswa] = useState(false);
  const [formData, setFormData] = useState({
    nisn: '',
    namaLengkap: '',
    tanggalLahir: '',
    jenisKelamin: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const clearData = () => {
    setFormData({
      nisn: '',
      namaLengkap: '',
      tanggalLahir: '',
      jenisKelamin: ''
    });
  };
  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post('/api/siswa', {
        ...formData,
        idSekolah: data.id,
      });
      return response.data;
    },
    onSuccess: () => {
      setDialogTa(false);  // Tutup dialog setelah sukses
      clearData();         // Reset form setelah submit
    },
    onError: (error) => {
      console.error("Error:", error);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData); // Panggil mutasi di sini
  };
  return (
    <div className="w-full">
      <div className="p-2 flex justify-end w-full">
        <Button className="bg-blue-600" onClick={() => setDialogSiswa(true)} >Tambah Data Kelas</Button>
      </div>
      <Table>
        <TableCaption>Daftar Kelas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Dialog open={dialogSiswa} onOpenChange={setDialogSiswa}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Data Siswa</DialogTitle>
            <DialogDescription>Silahkan isi form dibawah ini untuk menambahkan data siswa</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <div>
              <Label htmlFor="nisn">NISN</Label>
              <Input
                type="number"
                id="nisn"
                name="nisn"
                value={formData.nisn}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="namaLengkap">Nama Lengkap</Label>
              <Input
                type="text"
                id="namaLengkap"
                name="namaLengkap"
                value={formData.namaLengkap}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="tanggalLahir">Tanggal Lahir</Label>
              <Input
                type="date"
                id="tanggalLahir"
                name="tanggalLahir"
                value={formData.tanggalLahir}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="jenisKelamin">Jenis Kelamin</Label>
              <RadioGroup required>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="L" id="option-one" />
                  <Label htmlFor="option-one">Laki-Laki</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="P" id="option-two" />
                  <Label htmlFor="option-two">Perempuan</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="kelas">Kelas</Label>
              <Select required >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>North America</SelectLabel>
                    <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                    <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                    <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                    <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                    <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
                    <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Europe & Africa</SelectLabel>
                    <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                    <SelectItem value="cet">Central European Time (CET)</SelectItem>
                    <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
                    <SelectItem value="west">
                      Western European Summer Time (WEST)
                    </SelectItem>
                    <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
                    <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Asia</SelectLabel>
                    <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
                    <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                    <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
                    <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                    <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
                    <SelectItem value="ist_indonesia">
                      Indonesia Central Standard Time (WITA)
                    </SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Australia & Pacific</SelectLabel>
                    <SelectItem value="awst">
                      Australian Western Standard Time (AWST)
                    </SelectItem>
                    <SelectItem value="acst">
                      Australian Central Standard Time (ACST)
                    </SelectItem>
                    <SelectItem value="aest">
                      Australian Eastern Standard Time (AEST)
                    </SelectItem>
                    <SelectItem value="nzst">New Zealand Standard Time (NZST)</SelectItem>
                    <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>South America</SelectLabel>
                    <SelectItem value="art">Argentina Time (ART)</SelectItem>
                    <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
                    <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
                    <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" disabled={mutation.isPending}>
              Simpan
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
