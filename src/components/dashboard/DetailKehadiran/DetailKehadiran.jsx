import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const DetailKehadiran = () => {
  const nim = localStorage.getItem('nim'); // Ambil nim dari localStorage
  const [kehadiranData, setKehadiranData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/kehadiran/${nim}`); // Ganti URL API dengan nim yang sesuai
        console.log('Response Status:', response.status); // Log status code
        
        const responseText = await response.text();  // Ambil teks dari response
        console.log('Response Text:', responseText); // Log response text untuk verifikasi
        
        if (response.status === 200) {
          const data = await response.json(); 
          console.log("Response Data adalah:", data);
          
          // Pastikan data ada dan merupakan array
          if (Array.isArray(data)) {
            setKehadiranData(data); // Simpan data kehadiran ke dalam state
          } else {
            console.error('Data yang diterima bukan array:', data);
          }
        } else {
          console.error('Gagal mengambil data, status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching kehadiran data:', error);
      }
    };

    if (nim) {
      console.log('Mencoba mengambil data untuk NIM:', nim);
      fetchData(); // Pastikan nim ada sebelum fetch data
    } else {
      console.error('NIM tidak ditemukan di localStorage');
    }
  }, [nim]);

  return (
    <div>
      {/* Tabel Kehadiran */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'white', backgroundColor: 'black' }}>No</TableCell>
              <TableCell sx={{ color: 'white', backgroundColor: 'black' }}>Matakuliah</TableCell>
              <TableCell sx={{ color: 'white', backgroundColor: 'black' }}>Tanggal</TableCell>
              <TableCell sx={{ color: 'white', backgroundColor: 'black' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {kehadiranData.length > 0 ? (
              kehadiranData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: 'black' }}>{index + 1}</TableCell> {/* Ubah warna teks ke hitam */}
                  <TableCell sx={{ color: 'black' }}>{data.matakuliah_nama}</TableCell> {/* Ubah warna teks ke hitam */}
                  <TableCell sx={{ color: 'black' }}>
                    {data.absen_at ? new Date(data.absen_at).toLocaleString() : 'Tidak Hadir'}
                  </TableCell> {/* Ubah warna teks ke hitam */}
                  <TableCell sx={{ color: 'black' }}>{data.status || 'Belum Absen'}</TableCell> {/* Ubah warna teks ke hitam */}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ color: 'black' }}>
                  Tidak ada data kehadiran
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DetailKehadiran;
