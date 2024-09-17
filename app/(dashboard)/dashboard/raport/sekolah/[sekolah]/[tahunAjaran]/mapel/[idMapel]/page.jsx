'use client'

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import './style.css'
import { FaSync, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function Page({ params }) {
  const [syncStatus, setSyncStatus] = useState('Belum Sinkron');
  const [isSyncing, setIsSyncing] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: [`kelas-${params.idMapel}`],
    queryFn: async () => {
      const res = await axios.get(`/api/mapel/${params.idMapel}`);
      return res.data.data;
    },
  });
  const [scores, setScores] = useState([]);
  // State to store the scores for each student
  useEffect(() => {
    if (data) {
      const subject = data;
      const students = subject.kelas.siswa;
      const criteria = subject.kriteria;

      // Initialize scores as an empty array
      const initialScores = students.flatMap((student) =>
        criteria.map((k) => ({
          nisn: student.nisn,
          id_kriteria: k.id,
          nilai: '', // Initialize with empty value
        }))
      );

      setScores(initialScores); // Set the initial scores state
    }
  }, [data]); // Only run when `data` is available

  // Handle input change to update the state in the array format
  const handleInputChange = (nisn, id_kriteria, value) => {
    if(value > 100) return
    if(value < 0) return
    const numericValue = Math.max(0, Math.min(100, parseFloat(value) || 0));
  
    // Limit the number of digits before decimal
    const formattedValue = numericValue.toFixed(0); 
    setScores((prevScores) =>
      prevScores.map((score) =>
        score.nisn === nisn && score.id_kriteria === id_kriteria
          ? { ...score, nilai: formattedValue }
          : score
      )
    );
    setSyncStatus('Menunggu sinkronisasi...');
  };
  
  let timeoutId = null;

  const handleDataSync = async () => {
    setIsSyncing(true);
    try {
      setSyncStatus('Data sudah sinkron');
    } catch {
      setSyncStatus('Gagal sinkron');
    } finally {
      setIsSyncing(false);
    }
  };


  useEffect(() => {
    // Jika ada timeout sebelumnya, bersihkan
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set timeout baru
    console.log("running")
    timeoutId = setTimeout(() => {
      handleDataSync();
      console.log("running2")
    }, 2000);

    // Bersihkan timeout saat komponen unmount
    return () => clearTimeout(timeoutId);
  }, [scores]);
  const getStatusIcon = () => {
    switch (syncStatus) {
      case 'Data sudah sinkron':
        return <FaCheckCircle className="text-green-500 text-xl" />;
      case 'Gagal sinkron':
        return <FaTimesCircle className="text-red-500 text-xl" />;
      case 'Menunggu sinkronisasi...':
        return <FaSync className="text-yellow-500 text-xl animate-spin" />;
      default:
        return null;
    }
  };
  

  if (isLoading) {
    return <div>Loading...</div>;
  }


  if (!data) {
    return <div>No data available</div>;
  }

  const subject = data;
  const students = subject.kelas.siswa;
  const criteria = subject.kriteria;
  const calculateAverage = (nisn) => {
    // Ambil nilai bobot dari kriteria
    const criteriaWeights = criteria.reduce((acc, k) => {
      acc[k.id] = k.bobot;
      return acc;
    }, {});
  
    // Ambil nilai yang diberikan oleh siswa
    const studentScores = scores.filter((score) => score.nisn === nisn);
  
    // Hitung total nilai terberat
    const weightedScores = studentScores.reduce((acc, curr) => {
      const weight = criteriaWeights[curr.id_kriteria] || 0;
      return acc + (parseFloat(curr.nilai) || 0) * weight;
    }, 0);
  
    // Hitung total bobot yang digunakan
    const totalWeight = studentScores.reduce((acc, curr) => {
      const weight = criteriaWeights[curr.id_kriteria] || 0;
      return acc + weight;
    }, 0);
  
    // Hitung rata-rata terberat
    return totalWeight > 0
      ? (weightedScores / totalWeight).toFixed(2)
      : 'N/A';
  };
  
  const getStudentRank = (nisn) => {
    // Hitung rata-rata setiap siswa dan urutkan berdasarkan nilai rata-rata
    const studentAverages = students.map((student) => {
      const averageScore = calculateAverage(student.nisn);
      return { nisn: student.nisn, average: parseFloat(averageScore) || 0 };
    });

    // Urutkan berdasarkan nilai rata-rata (descending)
    studentAverages.sort((a, b) => b.average - a.average);

    // Cari peringkat siswa yang sesuai dengan nisn
    const studentRank = studentAverages.findIndex((student) => student.nisn === nisn);

    // Peringkat dimulai dari 1, bukan 0
    return studentRank !== -1 ? studentRank + 1 : 'N/A';
  };
  const calculatePassStatus = (nisn, kkm) => {
    const average = parseFloat(calculateAverage(nisn)) || 0;
    return average >= kkm ? true : false;
  };

  return (
    <div className="p-2 rounded-md bg-white shadow-md">

      <h1 className="text-lg font-semibold text-center w-full p-2">Input Nilai {subject.nama}</h1>

      <div className="flex items-center space-x-2 shadow-md w-max rounded-md p-2">
        <div className="text-sm">
          {getStatusIcon()}
        </div>
        <p className={`text-sm ${isSyncing ? 'text-yellow-600' : ''}`}>{syncStatus}</p>
      </div>

      {isSyncing && <p className="text-yellow-600">Sinkronisasi berlangsung...</p>}
      <Table>
        <TableCaption>Input Nilai</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">NISN</TableHead>
            <TableHead >Nama Lengkap</TableHead>
            {criteria.map((k) => (
              <TableHead key={k.id}>{k.nama}({k.bobot}%)</TableHead>
            ))}
            <TableHead>Rata-rata</TableHead>
            <TableHead>Peringkat</TableHead>
            <TableHead>Keterangan</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.nisn} className={calculatePassStatus(student.nisn, subject.kkm) && "bg-green-100"}>
              <TableCell>{student.nisn}</TableCell>
              <TableCell className="whitespace-nowrap">{student.nama}</TableCell>
              {/* Dynamically generate input fields for each criteria */}
              {criteria.map((k) => (
                <TableCell key={k.id}>
                  <Input
                    type="number"
                    value={
                      scores.find(
                        (score) =>
                          score.nisn === student.nisn &&
                          score.id_kriteria === k.id
                      )?.nilai || ''
                    }
                    onChange={(e) =>
                      handleInputChange(student.nisn, k.id, e.target.value) // Handle input change
                    }
                    className="w-[80px]"
                    min="0"       // Minimum value
                    max="100"     // Maximum value
                    maxLength="3" 
                  />
                </TableCell>
              ))}
              <TableCell>{calculateAverage(student.nisn)}</TableCell>
              <TableCell>{getStudentRank(student.nisn)}</TableCell>
              <TableCell>{calculatePassStatus(student.nisn, subject.kkm) ? "Lulus" : "Tidak Lulus"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
