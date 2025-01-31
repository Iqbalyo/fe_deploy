import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Impor useParams
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const Oke = () => {
  const { matakuliah_nama } = useParams(); // Ambil matakuliah_nama dari URL
  const nim = localStorage.getItem('nim'); // Ambil NIM dari localStorage
  const [dataKehadiran, setDataKehadiran] = useState([]);

  // Fungsi untuk memformat tanggal ke dalam format dd/mm/yyyy
  const formatDate = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1; // Bulan dimulai dari 0
    let year = date.getFullYear();

    // Tambahkan leading zero jika perlu
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchKehadiran = async () => {
      try {
        const response = await fetch(`http://localhost:3000/monitoring/unama/v1/informasi-kehadiran/${matakuliah_nama}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("Data dari API:", data); // Log data dari API

        // Filter data berdasarkan NIM yang login
        const filteredData = data.filter(item => item.nim === nim);
        console.log("Data setelah filter:", filteredData); // Log data setelah filter
        setDataKehadiran(filteredData);
      } catch (error) {
        console.error("Error fetching kehadiran:", error);
      }
    };

    if (nim) {
      fetchKehadiran();
    } else {
      console.error("NIM tidak ditemukan di localStorage");
    }
  }, [nim, matakuliah_nama]); // Tambahkan matakuliah_nama ke dalam dependency array

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" component="div" style={{ padding: '16px' }}>
        Informasi Kehadiran
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            {/* <TableCell>NIM</TableCell> */}
            <TableCell>Nama Mata Kuliah</TableCell>
            <TableCell>Pertemuan Ke</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Tanggal Kuliah</TableCell>
            <TableCell>Waktu</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataKehadiran.length > 0 ? (
            dataKehadiran.map((row, index) => (
              <TableRow key={index}>
                {/* <TableCell>{row.nim}</TableCell> */}
                <TableCell>{row.matakuliah_nama}</TableCell>
                <TableCell>{row.pertemuan_ke}</TableCell>
                <TableCell>{row.status !== null ? row.status : 'A'}</TableCell> {/* Ganti null dengan 'A' */}
                <TableCell>{row.pertemuan ? formatDate(new Date(row.pertemuan.tanggal_kuliah)) : 'N/A'}</TableCell> {/* Format tanggal */}
                <TableCell>{row.pertemuan ? row.pertemuan.waktu : 'N/A'}</TableCell> {/* Cek apakah pertemuan ada */}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                Tidak ada data kehadiran untuk NIM ini.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Oke;