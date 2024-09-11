// import Image from 'next/image'; // Pastikan Anda menggunakan Next.js atau komponen gambar yang sesuai

export default function Example() {
  return (
    <section id="example" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Hasil Akhir
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Lihat Hasil Laporan Anda
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        Berikut adalah tampilan akhir dari laporan yang dihasilkan oleh Raport Generator. Desain yang profesional dan informasi yang terstruktur dengan baik memudahkan analisis dan pengambilan keputusan.
      </h3>

      <div className="flex justify-center">
        <div className="relative rounded-lg overflow-hidden w-full max-w-4xl bg-gray-600">
          {/* <Image
            src="/path/to/report-result.jpg" // Ganti dengan path ke gambar yang sesuai
            alt="Hasil Laporan"
            width={1200}
            height={800}
            className="object-cover"
          /> */}
          <div className="h-[1200px] w-[800px]"/>
        </div>
      </div>
    </section>
  );
}
