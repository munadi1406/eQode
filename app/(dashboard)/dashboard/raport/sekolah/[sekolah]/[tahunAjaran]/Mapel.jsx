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
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";



export default function Mapel({ params: { sekolah } }) {
    const [dialogSiswa, setDialogSiswa] = useState(false);
    const [dialogKriteria, setDialogKriteria] = useState(false);
    const [currentData, setCurrentData] = useState({ id: null, nama: '' });
    const [kriteria, setKriteria] = useState([
        { nama: "", bobot: "",idMapel:currentData.id }, // State awal dengan satu kriteria
    ]);

    // Menangani perubahan input
    const handleKriteriaChange = (index, e) => {
        const { name, value } = e.target;
        const updatedKriteria = [...kriteria];
        updatedKriteria[index][name] = value;
        updatedKriteria[index].idMapel = currentData.id;
        setKriteria(updatedKriteria);
    };
    useEffect(()=>{
        console.log(kriteria)
    },[kriteria])
    // Fungsi untuk menambah kriteria baru
    const handleAddKriteria = () => {
        setKriteria([...kriteria, { nama: "", bobot: "",idMapel:currentData.id }]); // Tambah kriteria baru
    };



    const [formData, setFormData] = useState({
        nama: '',
        kkm: '',
        namaSekolah: decodeURIComponent(sekolah)
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
            nama: '',
            kkm: '',

        });
    };





    const [row, setRow] = useState(10)
    const fetchMapel = async ({ pageParam = null }) => {
        const res = await axios.get('/api/mapel', {
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
        queryKey: [`mapel-${row}`],
        queryFn: fetchMapel,
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

    useEffect(() => {
        refetch()
    }, [row])
    const mutation = useMutation({
        mutationFn: async (formData) => {
            const response = await axios.post('/api/mapel', formData);
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
                <Button className="bg-blue-600" onClick={() => setDialogSiswa(true)}>Tambah Data Mata Pelajaran</Button>
            </div>
            <Table>
                <TableCaption>Daftar Mata Pelajaran</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">NISN</TableHead>
                        <TableHead>Mata Pelajaran</TableHead>
                        <TableHead>KKM</TableHead>
                        <TableHead>Created At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {data?.pages.map((page, pageIndex) =>
                        page?.data.map((mapel, index) => (
                            <TableRow key={mapel.id}>
                                <TableCell className="font-medium">{pageIndex * 10 + index + 1}</TableCell>
                                <TableCell>{mapel.nama}</TableCell>
                                <TableCell>{mapel.kkm}</TableCell>
                                <TableCell>{new Date(mapel.created_at).toLocaleString()}</TableCell>
                                <TableCell>
                                    <div>
                                        <Badge className={"bg-green-600 cursor-pointer"} onClick={() => {
                                            setDialogKriteria(true);
                                            setCurrentData({ id: mapel.id, nama: mapel.nama })
                                        }}>Kriteria Penilaian</Badge>
                                    </div>
                                </TableCell>
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
            <Dialog open={dialogKriteria} onOpenChange={setDialogKriteria}>
                <DialogContent >
                    <DialogHeader>
                        <DialogTitle>Kriteria Penilaian Mata Pelajaran {currentData.nama}</DialogTitle>
                        <DialogDescription>
                            Silahkan isi form dibawah ini untuk menambahkan data kriteria pada mata
                            pelajaran {currentData.nama}
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="w-full px-2">
                        <div className="max-h-[400px] w-full overflow-auto flex flex-col  p-2">
                            {kriteria.map((item, index) => (
                                <div key={index} className="grid grid-cols-1 w-full">
                                    <div>
                                        <Label htmlFor={`nama-${index}`}>Nama Kriteria</Label>
                                        <Input
                                            type="text"
                                            id={`nama-${index}`}
                                            name="nama"
                                            value={item.nama}
                                            onChange={(e) => handleKriteriaChange(index, e)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor={`bobot-${index}`}>Bobot</Label>
                                        <Input
                                            type="number"
                                            id={`bobot-${index}`}
                                            name="bobot"
                                            value={item.bobot}
                                            onChange={(e) => handleKriteriaChange(index, e)}
                                            required
                                            min={0}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2 justify-between w-full">

                            <Button type="button" onClick={handleAddKriteria} className="bg-green-500">
                                Tambah Kriteria
                            </Button>

                            <Button type="submit" className="bg-blue-600">
                                Simpan
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
