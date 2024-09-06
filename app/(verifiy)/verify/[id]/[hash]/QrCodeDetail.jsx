import LocalTime from "@/components/dashboard/qrcode/LocalTime";
import { Suspense } from "react";


export default function QRCodeDetails({ data }) {
    return (
      <div className="border border-gray-300 rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">Yang menandatangani</td>
              <td>:</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-900">{data.users.detail_user.full_name}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">NIP</td>
              <td>:</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-900">{data.users.detail_user.nip}</td>
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
    );
  }