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
import React, { useEffect, useRef, useState } from "react";
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
import { useInView } from "react-intersection-observer";
import Mapel from "./Mapel";
import { FaBook, FaChartBar, FaPen, FaUser } from "react-icons/fa";
import { buttonData } from "./buttonAction";
import Siswa from "./Siswa";






export default function Kelas({ params }) {

  const [dialogKelas, setDialogKelas] = useState(false);
  const [row, setRow] = useState(10)
  const [buttonClickValue, setButtonValueClick] = useState({ value: '', index: null });
  const handleClick = (value, index) => {
    if (buttonClickValue === value) {
      console.log(buttonClickValue === value)
      setButtonValueClick({ value: '', index: null })
      return;
    }
    setButtonValueClick({ value, index })
  }


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

  useEffect(() => {
    refetch()
  }, [row])
  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate(formData);
  };
  return (
    <div className="w-full">
      <div className="p-2 flex justify-end w-full">
        <Button className="bg-blue-600" onClick={() => setDialogKelas(true)} >Tambah Data Kelas</Button>
      </div>
      <Select value={row} onValueChange={(e) => setRow(e)}>
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
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.pages.map((page, pageIndex) =>
            page?.data.map((kelas, index) => (
              <React.Fragment key={kelas.id}>
                <TableRow>
                  <TableCell>{pageIndex * 10 + index + 1}</TableCell>
                  <TableCell className="w-[200px] relative">Kelas {kelas.nama}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {buttonData.map((button, idx) => (
                        <Button
                          key={idx}
                          onClick={()=>handleClick(button.value,index)}
                          className={`${button.color} text-white flex items-center gap-2`}
                        >
                          {button.icon} {button.label}
                        </Button>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
                {buttonClickValue.index === index && (
                  <TableRow className={buttonClickValue.index === index && 'bg-slate-100'}>
                    <TableCell colSpan={3}>
                      <div className="max-h-[300px] overflow-auto">
                        {buttonClickValue.value === 'mapel' && buttonClickValue.index === index && (
                          <div className="p-2  w-full flex flex-col gap-2 items-center">
                            <p className="text-lg font-semibold text-center">
                              Daftar Mata Pelajaran Kelas {kelas.nama}
                            </p>
                            <div className="border-l-2 px-3 border-blue-600 w-full">
                              < Mapel params={params} idKelas={kelas.id} />
                            </div>
                          </div>
                        )}
                        {buttonClickValue.value === 'siswa' && buttonClickValue.index === index && (
                          <div className="p-2  w-full flex flex-col gap-2 items-center">
                            <p className="text-lg font-semibold text-center">
                              Daftar Siswa Kelas {kelas.nama}
                            </p>
                            <div className="border-l-2 px-3 border-blue-600 w-full">
                              < Siswa idKelas={kelas.id} />
                            </div>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
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
