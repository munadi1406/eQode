import LocalTime from "@/components/dashboard/qrcode/LocalTime";
import { createClient } from "@/utils/supabase/client";
import { Suspense } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

// Function to generate metadata dynamically
export async function generateMetadata({ params }) {
  const supabase = await createClient();

  // Fetch data from Supabase
  const { data } = await supabase
    .from('qrcode')
    .select(`id, keperluan, created_at, tujuan, users(name)`)
    .eq('id', params.id)
    .single();
    
  if (!data) return {};

  return {
    title: `QR Code Detail for ${data.users.name}`,
    description: `Details of QR code used for ${data.keperluan}. Generated on ${new Date(data.created_at).toLocaleDateString()}.`,
    openGraph: {
      title: `QR Code Detail for ${data.users.name}`,
      description: `Details of QR code used for ${data.keperluan}. Generated on ${new Date(data.created_at).toLocaleDateString()}.`,
      url: `https://e-qode.vercel.app/v/${data.id}`,
      type: "website",
      
    },
    
  };
}

export default async function Page({ params }) {
  // Initialize Supabase client
  const supabase = await createClient();

  // Fetch data from Supabase
  const { data, error } = await supabase
    .from('qrcode')
    .select(`id, keperluan, created_at, tujuan, users(name)`)
    .eq('id', params.id)
    .single();
    

  // Determine if the QR code is verified or not
  const isVerified = data ? (
    <div className="flex gap-2">
      <FaCheckCircle className="text-green-600" />
      <p>QR Code Terverifikasi</p>
    </div>
  ) : (
    <div className="flex gap-2">
      <MdCancel className="text-red-600" />
      <p>QR Code Tidak Terverifikasi</p>
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 w-full flex justify-center">{isVerified}</h1>
      {data && (
        <div className="border border-gray-300 rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">Yang menandatangani</td>
                <td>:</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{data.users.name}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">Tujuan</td>
                <td>:</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{data.tujuan}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">Keperluan</td>
                <td>:</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{data.keperluan}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">Waktu Tanda Tangan</td>
                <td>:</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  <Suspense fallback={<>Loading...</>}>
                    <LocalTime time={data.created_at} />
                  </Suspense>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
