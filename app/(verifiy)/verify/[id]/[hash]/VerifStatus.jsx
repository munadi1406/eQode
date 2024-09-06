import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

export default function VerificationStatus({ isValid }) {
    return isValid ? (
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
  }