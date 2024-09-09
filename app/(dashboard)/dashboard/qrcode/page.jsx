
import Data from '@/components/dashboard/qrcode/Data';
import Form from '@/components/dashboard/qrcode/Form';
export const metadata = {
  title: "QR CODE",
};

export default function SchoolForm() {


  return (
    <div className="bg-white rounded-md p-2 shadow-md">
      <Form />
      <Data />
    </div>

  );
}
