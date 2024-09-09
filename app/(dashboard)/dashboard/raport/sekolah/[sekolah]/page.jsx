import Data from './data';
import { Suspense } from 'react';
import { getSession } from "@/utils/auth";
import { createClient } from "@/utils/supabase/server";

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


const Page = async ({ params }) => {
  const data = await getData(params);

  return (
    <Suspense fallback={<div>Loading Data....</div>}>
      <Data params={params} data={data} />
    </Suspense>
  );
};

export default Page;
