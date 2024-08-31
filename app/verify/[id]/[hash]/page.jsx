
import { createClient } from "@/utils/supabase/client";
import { MdCancel } from "react-icons/md";

import { fetchQRCodeData, isHashValid } from "./utils";
import VerificationStatus from "./VerifStatus";
import QRCodeDetails from "./QrCodeDetail";

export async function generateMetadata({ params }) {
  const supabase = await createClient();
  const { id, hash } = params;

  const { data, error } = await fetchQRCodeData(supabase, id);

  if (error || !data) {
    return {
      title: `QR Code Tidak Terverifikasi`,
    };
  }

  const isValid = isHashValid(data.hash, hash);
  const title = isValid
    ? `QR Code Terverifikasi untuk ${data.users.detail_user.full_name}`
    : `QR Code Tidak Terverifikasi`;

  const description = isValid
    ? `Detail QR code untuk ${data.keperluan}, dibuat oleh ${data.users.detail_user.full_name}. Dibuat pada ${new Date(data.created_at).toLocaleDateString()}.`
    : `QR code ini tidak terverifikasi dan mungkin tidak sah.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://e-qode.vercel.app/v/${data.id}`,
      type: "website",
    },
  };
}

export default async function Page({ params }) {
  const supabase = await createClient();
  const { id, hash } = params;

  const { data, error } = await fetchQRCodeData(supabase, id);

  if (error || !data) {
    return (
      <div className="flex gap-2">
        <MdCancel className="text-red-600" />
        <p>Data tidak ditemukan atau terjadi kesalahan.</p>
      </div>
    );
  }

  const isValid = isHashValid(data.hash, hash);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 w-full flex justify-center">
        <VerificationStatus isValid={isValid} />
      </h1>
      {isValid && <QRCodeDetails data={data} />}
    </div>
  );
}

// Generate metadata based on verification status

