'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useSession } from "next-auth/react"; // Import useSession
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { useRouter } from "next/navigation";

export default function Data({params,data}) {
    const { data: session } = useSession();

    const [dialogTa, setDialogTa] = useState(false);
    const [formData, setFormData] = useState({
      tahunAwal: '',
      tahunAkhir: '',
    });
  
    const clearData = () => {
      setFormData({
        tahunAwal: '',
        tahunAkhir: '',
      });
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    
  
    const mutation = useMutation({
      mutationFn: async (formData) => {
        const response = await axios.post('/api/tahun-ajaran', {
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
    
  
    const {data:dataTahunAjaran,isLoading,refetch} = useQuery({queryKey:['dataTahunAjaran'],queryFn:async()=>{
      const datas  = await axios.get(`/api/tahun-ajaran?id=${data.id}`)
      return datas.data.data
    }})
    const handleDelete = useMutation({
        mutationFn: async (id) => {
            const isDelete = await axios.delete(`/api/sekolah?id=${id}`)
            return isDelete.data
        },
        onSuccess: () => {
            refetch()
        }
    })
    const route = useRouter()
    const handleClick = (tahunAjaran)=>{
        const tahunAwal = tahunAjaran.split('/')
        route.push(`/dashboard/sekolah/${data.nama}/${tahunAwal[0]}`)
    }
    if(isLoading){
        return <div>Loading....</div>
    }


    return (
      <div className="flex gap-2 flex-col">
        
      
        <div className="bg-white rounded-md p-2 shadow-md">
          <div className="w-full flex justify-end">
            <Button className="bg-blue-600" onClick={() => setDialogTa(true)}>
              Tambah Data Tahun Ajaran
            </Button>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-2 py-2">
{dataTahunAjaran.map((e)=>(
     <ContextMenu key={e.id}>
     <ContextMenuTrigger>
         <Card onClick={()=>handleClick(e.tahun_ajaran)} className="cursor-pointer">
             <CardHeader>
                 <CardTitle>{e.tahun_ajaran}</CardTitle>
             </CardHeader>
         </Card>
     </ContextMenuTrigger>
     <ContextMenuContent>
         <ContextMenuItem onClick={() => handleDelete.mutate(e.id)}>Hapus</ContextMenuItem>
     </ContextMenuContent>
 </ContextMenu>
))}
          </div>
          <Dialog open={dialogTa} onOpenChange={setDialogTa}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambahkan Data Tahun Ajaran</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 p-4">
                <div>
                  <Label htmlFor="tahunAwal">Tahun Awal</Label>
                  <Input
                    type="text"
                    id="tahunAwal"
                    name="tahunAwal"
                    value={formData.tahunAwal}
                    onChange={handleChange}
                    required
                  />
                </div>
  
                <div>
                  <Label htmlFor="tahunAkhir">Tahun Akhir</Label>
                  <Input
                    type="text"
                    id="tahunAkhir"
                    name="tahunAkhir"
                    value={formData.tahunAkhir}
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
      </div>
    );
}
