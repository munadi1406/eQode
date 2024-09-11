import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import  Icon  from "@/components/ui/icon";






export default function Benefits() {
    const benefitList = [
        {
            icon: "FileText", // Ikon representatif untuk efisiensi pengelolaan file
            title: "Meningkatkan Efisiensi",
            description:
                "Otomatiskan pembuatan raport. Proses pembuatan raport menjadi lebih cepat dan mengurangi pekerjaan manual, memungkinkan Anda fokus pada tugas lain yang lebih penting.",
        },
        {
            icon: "Check", // Ikon terkait dengan validasi dan akurasi data
            title: "Data Akurat",
            description:
                "Pastikan keakuratan data penilaian dengan sistem yang mengurangi kesalahan manusia. Semua informasi terstruktur dengan baik untuk hasil yang lebih dapat diandalkan.",
        },
        {
            icon: "Settings", // Ikon untuk manajemen atau pengaturan
            title: "Pengelolaan Mudah",
            description:
                "Kelola nilai siswa dan laporan secara terorganisir. Aplikasi ini memudahkan Anda dalam mengatur dan memantau hasil akademik siswa dengan tampilan yang mudah dipahami.",
        },
        {
            icon: "Download", // Ikon ekspor atau unduh
            title: "Ekspor ke PDF atau CSV",
            description:
              "Simpan laporan dalam format PDF atau CSV untuk dokumentasi dan berbagi yang lebih mudah. Raport Generator mendukung berbagai format ekspor sesuai kebutuhan Anda.",
        },  
    ];
    
    return (
        <section id="benefits" className="container py-24 sm:py-32">
            <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
                <div>
                    <h2 className="text-lg text-primary mb-2 tracking-wider">Keunggulan</h2>

                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Solusi Tercepat untuk Pembuatan Raport
                    </h2>
                    <p className="text-xl text-muted-foreground mb-8">
                        Temukan kemudahan dalam mengelola raport dengan aplikasi Raport Generator. Dirancang khusus untuk mempermudah tugas administrasi Anda, aplikasi ini memberikan kemudahan, kecepatan, dan akurasi.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-4 w-full">
                    {benefitList.map(({ icon, title, description }, index) => (
                        <Card
                            key={title}
                            className="bg-blue-200/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"
                        >
                            <CardHeader>
                                <div className="flex justify-between">
                                    <Icon
                                        name={icon}
                                        size={32}
                                        color="hsl(var(--primary))"
                                        className="mb-6 text-primary"
                                    />
                                    <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                                        0{index + 1}
                                    </span>
                                </div>

                                <CardTitle>{title}</CardTitle>
                            </CardHeader>

                            <CardContent className="text-muted-foreground">
                                {description}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
