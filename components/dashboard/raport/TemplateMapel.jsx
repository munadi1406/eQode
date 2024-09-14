'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoaderTemplateMapel from './loader.jsx/LoaderTemplateMapel'
import BadgeColor from './BadgeColor'
import { Button } from '@/components/ui/button'


export default function TemplateMapel({ sekolah, setFormData,setTabsValue }) {

    const { data: templateMapel, isLoading, isError, refetch, isSuccess } = useQuery({
        queryKey: [`template-${sekolah}`], queryFn: async () => {
            const res = await axios.get('/api/mapel/template', {
                params: {
                    sekolah: decodeURIComponent(sekolah)
                }
            })
            return res.data.data
        }
    })
    const handleClick = (data) => {
        const { mapel } = data;
        setFormData(() => {
            return mapel.map((e) => ({
                nama: e.nama,
                kkm: e.kkm
            }));
        });
        setTabsValue('mapel')

    }


    if (isError) {
        return <div><Button onClick={refetch}>Reload</Button></div>
    }

    return (
        <>
            <h2 className="text-md font-semibold">Template Mata Pelajaran</h2>
            <div className='md:h-[65vh] h-[300px] overflow-auto flex flex-col gap-2'>
                {isLoading && <LoaderTemplateMapel />}
                {isSuccess && templateMapel.length > 0 && templateMapel.map((e, i) => (
                    <Card key={i} className="cursor-pointer" onClick={() => handleClick(e)}>
                        <CardHeader>
                            <CardTitle>Kelas {e.kelas}</CardTitle>
                            <CardDescription className="text-xs">
                                Pada kelas ini terdapat <span className='font-semibold text-black'>{e.mapel.length} mata pelajaran</span> dengan rincian sebagai berikut:
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex gap-2 flex-wrap">
                            {e.mapel.map((dataMapel, mapelIndex) => (
                                <BadgeColor key={mapelIndex} index={mapelIndex} data={dataMapel} />
                                // <Badge key={mapelIndex} className={`${bgColor}`}>{dataMapel.nama}: {dataMapel.kkm}</Badge>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )
}
