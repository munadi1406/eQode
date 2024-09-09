import { getSession } from "@/utils/auth";
import { createClient } from "@/utils/supabase/server";
import { Badge } from "@/components/ui/badge";
const getData = async (params) => {
  try {
    const supabase = await createClient();
    const sekolah = decodeURIComponent(params.sekolah);
    const session = await getSession();
    

    const { data, error } = await supabase
      .from('sekolah')
      .select('*')
      .eq('id_user', session?.user?.id)
      .eq('nama', sekolah)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return {};
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {};
  }
};

export async function generateMetadata({ params }) {
  const data = await getData(params);
  return {
    title: data.nama ?? 'Not Found',
  };
}
export default async function Layout({children,params}) {
    const data = await getData(params)
  return (
    <div className="space-y-2">
      <div className="bg-white shadow-md rounded-md w-full p-2 flex flex-col gap-2">
          <h1 className="text-2xl text-gray-600 text-semibold">{data?.nama}</h1>
          <div className="flex gap-2">
            <Badge>{data?.kepala_sekolah}</Badge>
            <Badge>{data?.nip}</Badge>
          </div>
          <h2 className="text-xs">{data?.alamat}</h2>
        </div>
    {children}
    </div>
  )
}
