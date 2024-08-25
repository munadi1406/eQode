import { createClient } from "@/utils/supabase/client"


export default async function Page({ params }) {
  console.log(params.id);
  
  // Initialize Supabase client
  const supabase = await createClient();
  
  // Fetch data from Supabase
  const { data, error } = await supabase
    .from('qrcode')
    .select('id, keperluan, created_at, tujuan')
    .eq('id', params.id)
    .single(); // Use .single() if expecting a single record

  // Check for errors
  if (error) {
    console.error(error);
    return <div>Error fetching data</div>;
  }

  // Determine if the QR code is verified or not
  const isVerified = data ? 'QR Code Terverifikasi' : 'QR Code Tidak Terverifikasi';

  return (
    <div className="p-6 max-w-4xl mx-auto">
    <h1 className="text-2xl font-bold mb-4">{isVerified}</h1>
    {data ? (
      <div className="border border-gray-300 rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Label</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">Tujuan</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-900">{data.tujuan}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">Keperluan</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-900">{data.keperluan}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">Created At</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-900">{new Date(data.created_at).toLocaleString()}</td>
            </tr>
          </tbody>    
        </table>
      </div>
    ) : (
      <div className="text-red-500 mt-4">Data tidak ditemukan</div>
    )}
  </div>
  );
}

