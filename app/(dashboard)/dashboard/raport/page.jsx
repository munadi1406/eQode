
import Data from '@/components/dashboard/sekolah/Data';
import Form from '@/components/dashboard/sekolah/Form';
export const metadata = {
  title: "Raport",
};

export default function SchoolForm() {


  return (
    <div>
      <Form />
      <Data />
    </div>

  );
}
