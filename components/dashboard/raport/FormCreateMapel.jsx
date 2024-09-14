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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FaRegTrashCan } from "react-icons/fa6"
import TemplateMapel from "./TemplateMapel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



export default function FormCreateMapel({ dialogMapel, setDialogMapel, mutation, sekolah }) {
    const fetchClasses = async () => {
        const res = await axios.get('/api/kelas', {
            params: { all: true },
        });
        return res.data;
    };
    const { data: classesData, isLoading, error } = useQuery({ queryKey: ['kelas'], queryFn: fetchClasses });
    const [formData, setFormData] = useState([
        { nama: '', kkm: '' } // Awalnya satu set input untuk nama dan kkm
    ]);
    const [tabsValue,setTabsValue] = useState('mapel')
    
    const [selectedKelas, setSelectedKelas] = useState(''); // State untuk Kelas yang dipilih
    
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const newFormData = [...formData];
        newFormData[index][name] = value;
        setFormData(newFormData);
    };
    const [errors, setErrors] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedKelas) {
            toast.error('Kelas harus dipilih');
            return;
        }
        const namaSet = new Set();
        const newErrors = [];

        formData.forEach((item, index) => {
            if (namaSet.has(item.nama)) {
                newErrors[index] = 'Nama mata pelajaran sudah ada.';
            } else {
                namaSet.add(item.nama);
                newErrors[index] = ''; // Kosongkan error jika tidak ada duplikat
            }
        });

        setErrors(newErrors);

        // Jika ada error (nama duplikat), hentikan proses submit
        if (newErrors.some(error => error !== '')) {
            return;
        }
        // Gabungkan kelas yang dipilih ke semua formData sebelum dikirim
        const fullFormData = formData.map(item => ({
            ...item,
            idKelas: selectedKelas,
            namaSekolah: decodeURIComponent(sekolah)
        }));


        mutation.mutate(fullFormData, {
            onSuccess: () => {

                setDialogMapel(false);
                setFormData([{ nama: '', kkm: '' }]);
                setSelectedKelas(''); // Reset pilihan kelas
            },
            onError: (error) => {
                // Tangani error jika ada
                console.error('Error menyimpan data:', error);
            }
        });

    };

    const handleAddField = () => {
        setFormData([...formData, { nama: '', kkm: '' }]);
    };

    const handleRemoveField = (index) => {
        const newFormData = formData.filter((_, idx) => idx !== index);
        setFormData(newFormData);
    };




    return (
        <Dialog open={dialogMapel} onOpenChange={setDialogMapel}>
            <DialogContent className="min-w-[80vw] max-h-[90vh]  md:overflow-hidden overflow-auto">
                <DialogHeader>
                    <DialogTitle>Tambah Data Mata Pelajaran</DialogTitle>
                    <DialogDescription>Silahkan isi form dibawah ini untuk menambahkan data mata pelajaran</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="h-max ">
                    {/* dekstop */}
                    <div className="h-max w-full border grid grid-cols-3 md:relative hidden   gap-2">
                        <div className="h-[65vh] w-full col-span-2 overflow-auto p-2 ">
                            <div>
                                <Label htmlFor="kelas">Kelas</Label>
                                <Select
                                    onValueChange={(e) => setSelectedKelas(e)}
                                    required={true}
                                    disabled={isLoading}
                                    value={selectedKelas ? Number(selectedKelas) : ''}
                                >
                                    <SelectTrigger className="w-full">
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

                            {formData.map((data, index) => (
                                <div key={index} className="space-y-4 relative">
                                    <div>
                                        <Label htmlFor={`nama-${index}`}>Nama Mata Pelajaran</Label>
                                        <Input
                                            type="text"
                                            id={`nama-${index}`}
                                            name="nama"
                                            value={data.nama}
                                            onChange={(e) => handleChange(e, index)}
                                            required
                                        />
                                        {errors[index] && (
                                            <p className="text-red-500 text-sm">{errors[index]}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor={`kkm-${index}`}>KKM</Label>
                                        <Input
                                            type="number"
                                            id={`kkm-${index}`}
                                            name="kkm"
                                            value={data.kkm}
                                            onChange={(e) => handleChange(e, index)}
                                            required
                                        />
                                    </div>

                                    {formData.length > 1 && (
                                        <Button
                                            type="button"
                                            onClick={() => handleRemoveField(index)}
                                            className="absolute top-0 right-0 mt-2 mr-2 bg-red-600 hover:bg-red-900"
                                        >
                                            <FaRegTrashCan />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="space-y-2 col-span-auto ">
                            <TemplateMapel setTabsValue={setTabsValue} setFormData={setFormData} sekolah={sekolah} />
                        </div>
                    </div>
                    {/* mobile */}
                    <div className="md:hidden relative w-full">
                        <Tabs  className="flex justify-center flex-col" value={tabsValue} >
                            <TabsList className=" w-max m-auto">
                                <TabsTrigger value="mapel" onClick={()=>setTabsValue('mapel')}>Buat Mapel</TabsTrigger>
                                <TabsTrigger value="template" onClick={()=>setTabsValue('template')}>Template</TabsTrigger>
                            </TabsList>
                            <TabsContent value="mapel" >
                                <div className="max-h-[300px] w-full overflow-auto p-2 ">
                                    <div>
                                        <Label htmlFor="kelas">Kelas</Label>
                                        <Select
                                            onValueChange={(e) => setSelectedKelas(e)}
                                            required={true}
                                            disabled={isLoading}
                                            value={selectedKelas ? Number(selectedKelas) : ''}
                                        >
                                            <SelectTrigger className="w-full">
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

                                    {formData.map((data, index) => (
                                        <div key={index} className="space-y-4 relative">
                                            <div>
                                                <Label htmlFor={`nama-${index}`}>Nama Mata Pelajaran</Label>
                                                <Input
                                                    type="text"
                                                    id={`nama-${index}`}
                                                    name="nama"
                                                    value={data.nama}
                                                    onChange={(e) => handleChange(e, index)}
                                                    required
                                                />
                                                {errors[index] && (
                                                    <p className="text-red-500 text-sm">{errors[index]}</p>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor={`kkm-${index}`}>KKM</Label>
                                                <Input
                                                    type="number"
                                                    id={`kkm-${index}`}
                                                    name="kkm"
                                                    value={data.kkm}
                                                    onChange={(e) => handleChange(e, index)}
                                                    required
                                                />
                                            </div>

                                            {formData.length > 1 && (
                                                <Button
                                                    type="button"
                                                    onClick={() => handleRemoveField(index)}
                                                    className="absolute top-0 right-0 mt-2 mr-2 bg-red-600 hover:bg-red-900"
                                                >
                                                    <FaRegTrashCan />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="template"><TemplateMapel setTabsValue={setTabsValue} setFormData={setFormData} sekolah={sekolah} /></TabsContent>
                        </Tabs>
                    </div>

                    <div className="flex justify-between items-center ">
                        <Button type="button" onClick={handleAddField}>
                            Tambah Pelajaran
                        </Button>

                        <Button type="submit" disabled={mutation.isPending} className="bg-blue-600 hover:bg-blue-900">
                            Simpan
                        </Button>
                    </div>
                </form>
            </DialogContent>

        </Dialog>
    )
}
