import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getJadwalByNim } from '../../../store/action/userData.action'; // Sesuaikan dengan path action Anda

const TableJadwalKuliah = () => {
  const dispatch = useDispatch();
  const nim = localStorage.getItem('nim'); // Mengambil NIM mahasiswa dari localStorage
  const jadwal = useSelector((state) => state.data.jadwal || []); // Mengambil data jadwal dari Redux store, jika undefined, beri nilai default []
  const [loading, setLoading] = useState(true); // Menambahkan state loading

  // Fungsi untuk mengurutkan berdasarkan hari dan waktu
  const sortByDayAndTime = (data) => {
    const daysOrder = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

    return data.sort((a, b) => {
      const dayA = a.waktu.split(',')[0].trim();
      const dayB = b.waktu.split(',')[0].trim();
      const timeA = a.waktu.split(',')[1]?.trim() || '';
      const timeB = b.waktu.split(',')[1]?.trim() || '';
      

      const dayComparison = daysOrder.indexOf(dayA) - daysOrder.indexOf(dayB);
      if (dayComparison !== 0) return dayComparison;

      // Jika hari sama, bandingkan waktu
      return timeA.localeCompare(timeB);
    });
  };

  useEffect(() => {
    if (nim) {
      // Dispatch untuk mengambil data jadwal berdasarkan nim
      dispatch(getJadwalByNim(nim))
        .then(() => {
          setLoading(false); // Data selesai diambil, set loading ke false
        })
        .catch((error) => {
          console.error('Error fetching jadwal:', error);
          setLoading(false); // Jika terjadi error, set loading ke false
        });
    }
  }, [dispatch, nim]);

  if (loading) {
    return <div>Loading...</div>; // Tampilkan loading jika data masih dalam proses pengambilan
  }

  // Mengurutkan jadwal berdasarkan hari dan waktu
  const sortedJadwal = sortByDayAndTime(jadwal);
  console.log('Halo', sortedJadwal)

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Matakuliah</TableCell>
            <TableCell>Kelas</TableCell>
            <TableCell>Ruang</TableCell>
            <TableCell>Waktu</TableCell>
            <TableCell>Dosen</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(sortedJadwal) && sortedJadwal.length > 0 ? (
            sortedJadwal.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.matakuliah}</TableCell>
                <TableCell>{item.kelas}</TableCell>
                <TableCell>{item.ruang}</TableCell>
                <TableCell>{item.waktu}</TableCell>
                <TableCell>{item.dosen}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">Tidak ada jadwal yang ditemukan</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableJadwalKuliah;
