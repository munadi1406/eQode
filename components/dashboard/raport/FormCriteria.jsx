'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaRegTrashCan } from "react-icons/fa6"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog"

export default function FormCriteria({nameErrors,dialogKriteria,setDialogKriteria,currentData,kriteria,handleKriteriaChange,handleAddKriteria,handleRemoveKriteria,handleSubmitKriteria,totalBobot,getTotalBobotStyle,isSubmitDisabled }) {
  return (
    <Dialog open={dialogKriteria} onOpenChange={setDialogKriteria}>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Kriteria Penilaian Mata Pelajaran {currentData.nama}</DialogTitle>
            <DialogDescription>
                Silahkan isi form dibawah ini untuk menambahkan data kriteria pada mata pelajaran {currentData.nama}

            </DialogDescription>
        </DialogHeader>
        <div className={`mb-4 text-sm ${getTotalBobotStyle()}`}>
            Total Bobot: {totalBobot <= 100 ? totalBobot : `${totalBobot} Total Bobot Anda Melebihi 100`}
        </div>
        <form onSubmit={handleSubmitKriteria} className="w-full px-2">
            <div className="max-h-[400px] w-full overflow-auto flex flex-col p-2">
                {kriteria.map((item, index) => (
                    <div key={index} className="grid grid-cols-1 w-full mb-4">
                        <div className="flex gap-4 items-end ">
                            <div className="flex-1">
                                <Label htmlFor={`nama-${index}`}>Nama Kriteria </Label>
                                <Input
                                    type="text"
                                    id={`nama-${index}`}
                                    name="nama"
                                    value={item?.nama}
                                    onChange={(e) => handleKriteriaChange(index, e)}
                                    required
                                    className={nameErrors[index] ? 'border-red-500' : ''} // Tambahkan class untuk border merah jika error
                                />



                            </div>

                            <div className="flex-1">
                                <Label htmlFor={`bobot-${index}`}>Bobot</Label>
                                <Input
                                    type="number"
                                    id={`bobot-${index}`}
                                    name="bobot"
                                    value={item?.bobot}
                                    onChange={(e) => handleKriteriaChange(index, e)}
                                    required
                                    min={0}
                                />
                            </div>
                            <div>
                                <Button
                                    type="button"
                                    onClick={() => handleRemoveKriteria(index, item?.id)}
                                    className={`${item.deleted ? 'bg-red-900' : 'bg-red-500'} hover:bg-red-900`}
                                >
                                    <FaRegTrashCan />
                                    {item.deleted && (
                                        <span className="text-white ml-2">Deleted</span> // Tampilkan status "Deleted"
                                    )}
                                </Button>
                            </div>
                        </div>
                        {nameErrors[index] && (
                            <p className="text-red-500 text-sm mt-1">Nama kriteria sudah digunakan.</p>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex gap-2 justify-between w-full">
                <Button type="button" onClick={handleAddKriteria} className="bg-green-500">
                    Tambah Kriteria
                </Button>

                <Button type="submit" className="bg-blue-600" disabled={isSubmitDisabled()}>
                    Simpan
                </Button>
            </div>
        </form> 
    </DialogContent>
</Dialog>
  )
}
