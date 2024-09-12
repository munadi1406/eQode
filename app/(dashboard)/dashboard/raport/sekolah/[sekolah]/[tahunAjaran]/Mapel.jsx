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
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useInView } from "react-intersection-observer";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

import FormCreateMapel from "@/components/dashboard/raport/FormCreateMapel";
import FormCriteria from "@/components/dashboard/raport/FormCriteria";



export default function Mapel({ params: { sekolah } }) {
    const [dialogSiswa, setDialogSiswa] = useState(false);
    const [dialogKriteria, setDialogKriteria] = useState(false);
    const [currentData, setCurrentData] = useState({ id: null, nama: '' });
    const [nameErrors, setNameErrors] = useState({});
    const [kriteria, setKriteria] = useState([
        { nama: "", bobot: "", id_mapel: null, id: null, deleted: false }, // State awal dengan satu kriteria
    ]);

    // Menangani perubahan input
    const handleKriteriaChange = (index, e) => {
        const { name, value } = e.target;
        const updatedKriteria = [...kriteria];

        // Update nilai kriteria pada index yang diberikan
        updatedKriteria[index] = {
            ...updatedKriteria[index],
            [name]: value
        };
        updatedKriteria[index].id_mapel = currentData.id

        // Pengecekan apakah nama kriteria sudah digunakan (case-insensitive)
        if (name === "nama") {
            const isDuplicate = updatedKriteria.some(
                (item, idx) => item.nama?.toLowerCase() === value.toLowerCase() && idx !== index
            );

            setNameErrors((prevErrors) => ({
                ...prevErrors,
                [index]: isDuplicate
            }));
        }

        setKriteria(updatedKriteria);
    };
    
    // Fungsi untuk menambah kriteria baru
    const handleAddKriteria = () => {
        setKriteria([...kriteria, { nama: "", bobot: "", id_mapel: currentData.id, id: null, deleted: false }]); // Tambah kriteria baru
    };

    const [totalBobot, setTotalBobot] = useState(0);
    const [bobotError, setBobotError] = useState("");



    useEffect(() => {
        // Calculate the total bobot when kriteria changes
        const total = kriteria.reduce((sum, item) => sum + parseFloat(item.bobot || 0), 0);
        setTotalBobot(total);
    }, [kriteria]);

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
    const clearKriteriaData = () => {
        setKriteria([
            { nama: "", bobot: "", id_mapel: null, id: null, deleted: false }, // Mengatur ulang state ke nilai awal
        ]);
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
           
            toast.error(error.response.data.message)
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(formData); // Panggil mutasi di sini
    };
    const handleRemoveKriteria = (index) => {
        const updatedKriteria = [...kriteria];
        updatedKriteria[index].deleted = true; // Tandai sebagai deleted
        setKriteria(updatedKriteria);
    };
    // Mutation untuk menghapus kriteria secara bulk
    const generateToastId = () => `toast-${Date.now()}`;

    // Toast configuration to ensure new toasts stack on top
    const toastConfig = {
        autoClose: 5000,        // Duration for auto-close
        hideProgressBar: false, // Show progress bar
        closeOnClick: true,     // Allows to close the toast by clicking
        pauseOnHover: true,     // Pauses the toast on hover
        draggable: true,        // Allows dragging the toast
        progress: undefined,
    };

    const deleteKriteriaMutation = useMutation({
        mutationFn: async (ids) => {
            const toastId = generateToastId();
            toast.loading("Menghapus kriteria...", { ...toastConfig, id: toastId });
            try {
                const response = await axios.put('/api/kriteria', { ids });
                return { response, toastId };
            } catch (error) {
                return { error, toastId };
            }
        },
        onSuccess: ({ response, toastId }) => {
            toast.dismiss(toastId);
            toast.success('Kriteria berhasil dihapus', { ...toastConfig, id: toastId });
        },
        onError: ({ error, toastId }) => {
            toast.dismiss(toastId);
            toast.error(`Error saat menghapus kriteria: ${error.response?.data?.message || error.message}`, { ...toastConfig, toastId });
        },
    });

    const saveKriteriaMutation = useMutation({
        mutationFn: async (kriteria) => {
            const toastId = generateToastId(); // Generate a unique toast ID
            toast.loading('Menyimpan Kriteria...', { ...toastConfig, id: toastId });

            try {
                const response = await axios.post('/api/kriteria', { kriteria });
                return { response, toastId }; // Return both response and toastId
            } catch (error) {
                return { error, toastId }; // Return both error and toastId
            }
        },
        onSuccess: ({ response, toastId }) => {
           
            toast.dismiss(toastId); // Dismiss the loading toast
            toast.success(response.data.message, { ...toastConfig }); // Unique ID for success toast
            clearKriteriaData(); // Call this if needed
        },
        onError: ({ error, toastId }) => {
            toast.dismiss(toastId); // Dismiss the loading toast
            toast.error(`${error.response?.data?.message || 'Terjadi kesalahan'}`, { ...toastConfig, toastId: `${toastId}-error` }); // Unique ID for error toast
        },
    });


    const { data: kriteriaData, isLoading: kriteriaIsLoading } = useQuery({
        queryKey: [`kriteria-${currentData.id}`], queryFn: async () => {
            const datas = await axios.get(`/api/kriteria`, { params: { id: currentData.id } })
            return datas.data.data
        },
        enabled: currentData.id !== null
    })


    useEffect(() => {
        if (kriteriaData && kriteriaData.length > 0) {
            // Isi kriteria dengan data dari kriteriaData
            setKriteria(
                kriteriaData.map(item => ({
                    id: item.id || null,
                    nama: item.nama || "",
                    bobot: item.bobot || "",
                    id_mapel: item.id_mapel || null,
                    deleted: false // Properti tambahan jika ingin ditandai apakah dihapus atau tidak
                }))
            );
        } else {
            // Jika tidak ada kriteriaData, set ke default value (optional)
            setKriteria([
                { nama: "", bobot: "", id_mapel: null, id: null, deleted: false }
            ]);
        }
    }, [currentData, kriteriaData]);



    const handleSubmitKriteria = async (e) => {
        e.preventDefault();

        // Filter kriteria yang ditandai untuk dihapus
        const deletedKriteria = kriteria.filter(item => item.deleted && item.id);

        try {

            if (deletedKriteria.length > 0) {
                await deleteKriteriaMutation.mutateAsync(deletedKriteria.map(item => item.id));
            }

            // Kirim data kriteria yang tidak dihapus ke server untuk disimpan
            const updatedKriteria = kriteria
                .filter(item => !item.deleted)  // Filter out deleted items
                .map(({ deleted, id, ...rest }) => {
                    // Jika id tidak null, masukkan ke objek, jika null, abaikan id
                    const result = { ...rest };
                    if (id !== null) {
                        result.id = id;  // Masukkan id hanya jika id tidak null
                    }
                    return result;
                });

            // Panggil mutasi untuk menyimpan data kriteria yang tidak dihapus
            await saveKriteriaMutation.mutateAsync(updatedKriteria);

            // Handle sukses (misalnya menutup dialog, menampilkan notifikasi, dll.)
          
            setDialogKriteria(false)
        } catch (error) {
            
        }
    };
    const getTotalBobotStyle = () => {
        if (totalBobot < 100) {
            return 'text-red-500'; // Red color for values below 100
        }
        if (totalBobot === 100) {
            return 'text-green-500'; // Green color for exact 100
        }
        if (totalBobot > 100) {
            return 'text-red-500'
        }
        return 'text-orange-500'; // Orange color for values above 100
    };
    const isSubmitDisabled = () => {
        // Check if save or delete mutation is in progress
        const isMutationPending = saveKriteriaMutation.isLoading || deleteKriteriaMutation.isLoading;

        // Check if total bobot exceeds 100
        const isTotalBobotInvalid = totalBobot > 100 || totalBobot < 100;

        // Check if any kriteria item has empty nama or bobot
        const hasEmptyFields = kriteria.some(item => !item.nama || item.bobot === "");

        // Return true if any condition for disabling is met
        return isMutationPending || isTotalBobotInvalid || hasEmptyFields;
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
                        <TableHead className="w-[100px]">No</TableHead>
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

            <FormCreateMapel dialogMapel={dialogSiswa} formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} mutation={mutation} setDialogMapel={setDialogSiswa} />
            <FormCriteria currentData={currentData} dialogKriteria={dialogKriteria} handleSubmitKriteria={handleSubmitKriteria} handleAddKriteria={handleAddKriteria} getTotalBobotStyle={getTotalBobotStyle} handleRemoveKriteria={handleRemoveKriteria} isSubmitDisabled={isSubmitDisabled} handleKriteriaChange={handleKriteriaChange} kriteria={kriteria} setDialogKriteria={setDialogKriteria} totalBobot={totalBobot} nameErrors={nameErrors} />

        </div>
    )
}
