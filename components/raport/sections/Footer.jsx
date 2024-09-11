import { Separator } from "@/components/ui/separator";

import Link from "next/link";
import { ImFileText } from "react-icons/im";

export default function Footer ()  {
  return (
    <footer id="footer" className="container py-24 sm:py-32">
      <div className="p-10 bg-card border border-secondary rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
          <div className="col-span-full xl:col-span-2">
            <Link href="#" className="flex font-bold items-center">
              <ImFileText className="w-9 h-9 mr-2 bg-gradient-to-r from-blue-400 to-indigo-900 p-2 rounded-md text-white" />

              <h3 className="text-2xl">RaportID</h3>
            </Link>
          </div>

          
        </div>

        <Separator className="my-6" />
        <section >
          <h3 >
            &copy; 2024 RaportID
          </h3>
        </section>
      </div>
    </footer>
  );
};