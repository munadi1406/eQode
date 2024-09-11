import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import  Icon from "@/components/ui/icon";

const featureList = [
  {
    icon: "TabletSmartphone",
    title: "Mobile Friendly",
    description:
      "Nikmati kemudahan akses raport dari perangkat mobile Anda. Aplikasi kami dioptimalkan untuk smartphone dan tablet, memungkinkan Anda mengelola laporan kapan saja dan di mana saja dengan mudah.",
  },
  {
    icon: "FileText",
    title: "Dokumen Terstruktur",
    description:
      "Raport Generator menyajikan data penilaian siswa dengan format yang terstruktur dan jelas. Setiap laporan dirancang untuk memudahkan pembaca dalam memahami informasi dengan cepat dan akurat.",
  },
  {
    icon: "CloudUpload",
    title: "Ekspor ke PDF atau CSV",
    description:
      "Simpan dan unduh laporan Anda dalam format PDF atau CSV. Fitur ini memudahkan Anda untuk berbagi laporan dengan berbagai format, baik untuk dokumentasi atau analisis lebih lanjut.",
  },
  {
    icon: "Settings",
    title: "Kustomisasi Laporan",
    description:
      "Sesuaikan format dan konten laporan sesuai dengan kebutuhan spesifik sekolah atau institusi Anda. Raport Generator mendukung berbagai opsi kustomisasi untuk memenuhi standar pelaporan Anda.",
  },
  {
    icon: "Clock",
    title: "Penghematan Waktu",
    description:
      "Hemat waktu berharga Anda dengan otomatisasi pembuatan raport. Dengan sistem kami, Anda dapat menghasilkan laporan dalam hitungan menit, mengurangi kebutuhan untuk entri data manual.",
  },
  {
    icon: "ShieldCheck",
    title: "Keamanan Data",
    description:
      "Pastikan keamanan data penilaian siswa dengan sistem yang dirancang untuk melindungi informasi sensitif. Kami menjaga data Anda dengan standar keamanan yang tinggi untuk melindungi privasi.",
  },
];

export default function Features() {
  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Fitur Utama
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Apa yang Membuat Raport Generator Berbeda
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        Temukan berbagai fitur unggulan yang dirancang untuk mempermudah proses pembuatan raport dan meningkatkan efisiensi administrasi pendidikan Anda.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-blue-500/20 p-2 rounded-full ring-8 ring-indigo-600/10 mb-4">
                  <Icon
                    name={icon}
                    size={24}
                    className="text-indigo-600"
                  />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
