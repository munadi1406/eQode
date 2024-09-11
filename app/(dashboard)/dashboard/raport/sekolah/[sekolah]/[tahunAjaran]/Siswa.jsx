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
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
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
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";



export default function Siswa() {
  const [dialogSiswa, setDialogSiswa] = useState(false);
  const [formData, setFormData] = useState({
    nisn: '',
    namaLengkap: '',
    tanggalLahir: '',
    jenisKelamin: '',
    idKelas:null,
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
      jenisKelamin: '',
      idKelas: ''
    });
  };

  

  const fetchClasses = async () => {
    const res = await axios.get('/api/kelas', {
      params: { all: true },
    });
    return res.data;
  };

  const { data: classesData, isLoading, error } = useQuery({ queryKey: ['kelas'], queryFn: fetchClasses });
  const [row, setRow] = useState(10)
  const fetchStudents = async ({ pageParam = null }) => {
    const res = await axios.get('/api/siswa', {
      params: { id: pageParam, row },
    });
    return res.data;
  };
  const {
    data,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [`siswa-${row}`],
    queryFn: fetchStudents,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.last_id,
    
  })
  
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(()=>{
    refetch()
  },[row])
  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post('/api/siswa', formData);
      return response.data;
    },
    onSuccess: (data) => {
      setDialogSiswa(false);
      toast.success(data.message)
      clearData();
      refetch()
    },
    onError: (error) => {
      console.error("Error:", error);
      toast.error(error.response.data.message)
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData); // Panggil mutasi di sini
  };

  return (
    <div className="w-full">
      <div className="p-2 flex justify-end w-full">
        <Button className="bg-blue-600" onClick={() => setDialogSiswa(true)}>Tambah Data Siswa</Button>
      </div>

      <Table>
        <TableCaption>Daftar Siswa</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">NISN</TableHead>
            <TableHead>Nama Lengkap</TableHead>
            <TableHead>Jenis Kelamin</TableHead>
            <TableHead>Tanggal Lahir</TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        
          {data?.pages.map((page, pageIndex) =>
            page?.data.map((siswa, index) => (
              <TableRow key={siswa.id}>
                <TableCell className="font-medium">{pageIndex * 10 + index + 1}</TableCell>
                <TableCell>{siswa.nama}</TableCell>
                <TableCell>{siswa.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</TableCell>
                <TableCell>{siswa.tanggal_lahir}</TableCell>
                <TableCell>{siswa.kelas.nama}</TableCell>
                <TableCell>{new Date(siswa.created_at).toLocaleString()}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <div ref={ref} style={{ height: 20 }} />
      {isFetchingNextPage && <p>Loading more...</p>}

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
              <RadioGroup onValueChange={(value) => setFormData({ ...formData, jenisKelamin: value })} required>
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
              <Select
                onValueChange={(value) => setFormData({ ...formData, idKelas: value })}
                required
                disabled={isLoading}
                value={
                 formData.idKelas ? Number(formData.idKelas) :''
                }
              >
                <SelectTrigger className="w-full"  >
                  <SelectValue placeholder="Silahkan Pilih Kelas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Kelas</SelectLabel>
                    {classesData && classesData.data.map((kelas) => (
                      <SelectItem key={kelas.id} value={kelas.id}>
                        {kelas.nama}
                      </SelectItem>
                    ))}
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
