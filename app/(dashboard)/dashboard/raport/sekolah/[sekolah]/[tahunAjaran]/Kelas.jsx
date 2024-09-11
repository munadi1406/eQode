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
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge";
import { useInView } from "react-intersection-observer";






export default function Kelas({ params }) {

  const [dialogKelas, setDialogKelas] = useState(false);
  const [row, setRow] = useState(10)


  const [formData, setFormData] = useState({
    namaKelas: '',
    idSekolah: decodeURIComponent(params.sekolah),
    idTahunAjaran: params.tahunAjaran
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
      namaKelas: '',

    });
  };
  

  const fetchClasses = async ({ pageParam = null }) => {
    const res = await axios.get('/api/kelas', {
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
    queryKey: [`kelas-${row}`],
    queryFn: fetchClasses,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.last_id,
    
  })
  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post('/api/kelas', formData);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message)
      setDialogKelas(false);
      clearData();
      refetch()
    },
    onError: (error) => {
      toast.error(error.response.data.message)
    }
  });
  
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  // Intersection Observer untuk lazy loading
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(()=>{
    refetch()
  },[row])
  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate(formData);
  };
  return (
    <div className="w-full">
      <div className="p-2 flex justify-end w-full">
        <Button className="bg-blue-600" onClick={() => setDialogKelas(true)} >Tambah Data Kelas</Button>
      </div>
      <Select value={row} onValueChange={(e)=>setRow(e)}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder={row} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={10}>10</SelectItem>
          <SelectItem value={50}>50</SelectItem>
          <SelectItem value={100}>100</SelectItem>
        </SelectContent>
      </Select>

      <Table>
        <TableCaption>Daftar Kelas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead>Created At</TableHead>
            
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.pages.map((page, pageIndex) =>
            page?.data.map((kelas, index) => (
              <TableRow key={kelas.id}>
                <TableCell className="font-medium">{pageIndex * 10 + index + 1}</TableCell>
                <TableCell>{kelas.nama}</TableCell>
                <TableCell>{new Date(kelas.created_at).toLocaleString()}</TableCell>
                <TableCell><Badge>Tambah Data Siswa</Badge></TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <div ref={ref} style={{ height: 20 }} />
      {isFetchingNextPage && <p>Loading more...</p>}
      <Dialog open={dialogKelas} onOpenChange={setDialogKelas}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Data Siswa</DialogTitle>
            <DialogDescription>Silahkan isi form dibawah ini untuk menambahkan data kelas</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <Label htmlFor="namaKelas">Nama Kelas</Label>
              <Input
                type="text"
                id="namaKelas"
                name="namaKelas"
                value={formData.namaKelas}
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
    </div>
  )
}
