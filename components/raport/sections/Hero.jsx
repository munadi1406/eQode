"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";


export const Hero = () => {

    return (
      <section className="container w-full">
        <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
          <div className="text-center space-y-8">
            <Badge variant="outline" className="text-sm py-2">
              <span className="mr-2 text-primary">
                <Badge className="bg-blue-600 hover:bg-blue-600/70">Baru</Badge>
              </span>
              <span> Raport Generator Sudah Tersedia! </span>
            </Badge>
  
            <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
              <h1>
                Buat Raport Siswa dengan
                <span className="text-transparent px-2 bg-gradient-to-r from-blue-400 to-indigo-900 bg-clip-text">
                  Mudah & Akurat
                </span>
              </h1>
            </div>
  
            <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
              {`Buat laporan siswa secara cepat dan akurat dengan Raport Generator kami yang mudah digunakan. Hemat waktu, hindari kesalahan, dan fokus pada hal yang paling penting—kesuksesan siswa Anda. Bergabunglah dengan komunitas pendidik yang semakin banyak menggunakan solusi sederhana ini untuk proses penilaian mereka.`}
            </p>
  
            <div className="space-y-4 md:space-y-0 md:space-x-4">
              <Button className="w-5/6 md:w-1/4 font-bold group/arrow bg-gradient-to-r from-blue-700 to-indigo-900">
                Mulai Sekarang
                <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
              </Button>
  
             
            </div>
          </div>
  
          <div className="relative group mt-14">
            <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl"></div>
  
            {/* Tambahkan gambar atau ilustrasi yang menggambarkan pembuatan raport */}
            <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
          </div>
        </div>
      </section>
    );
  };
  