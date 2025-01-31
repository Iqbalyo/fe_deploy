import React, { useEffect, useState } from "react";
import { Table } from 'antd';
import './UktTable.module.css'; // Import CSS Modules
import "./Ukt.scss";

const UktTable = () => {
  // State untuk menyimpan data dari API
  const [data, setData] = useState([]);

  // Mengambil NIM dari localStorage
  const nim = localStorage.getItem('nim');

  // Mengambil data dari API berdasarkan nim saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ganti URL dengan endpoint API Anda, dengan menambahkan nim sebagai query parameter
        const response = await fetch(`http://localhost:3000/monitoring/unama/v1/mahasiswa/pembayaran?nim=${nim}`);
        const result = await response.json();

        // Periksa jika data ada
        if (result && Array.isArray(result)) {
          // Map data untuk memastikan status pembayaran sesuai
          const mappedData = result.map(item => ({
            nim: item.nim,
            nama: item.nama,
            semester_ke: item.semester_ke,
            status_pembayaran: item.status_pembayaran === 'Lunas' ? 'Lunas' : 'Belum Lunas',
          }));
          setData(mappedData); // Menyimpan data yang sudah dimodifikasi ke dalam state
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (nim) {
      fetchData(); // Panggil fungsi jika NIM tersedia
    } else {
      console.error("NIM tidak ditemukan di localStorage.");
    }
  }, [nim]); // Menambahkan nim sebagai dependensi agar data diperbarui jika nim berubah

  // Kolom yang ingin ditampilkan
  const columns = [
    {
      title: 'Semester',
      dataIndex: 'semester_ke', // Data dari API yang menunjukkan semester
      key: 'semester_ke',
    },
    {
      title: 'Status Pembayaran',
      dataIndex: 'status_pembayaran', // Data status pembayaran (Lunas / Belum Lunas)
      key: 'status_pembayaran',
    },
  ];

  return (
    <div className="ukt-table-container">
      <h3 className="ukt-title">Riwayat Pembayaran UKT</h3>
      <Table 
        columns={columns} 
        dataSource={data} // Menggunakan data yang telah diambil dari API
        scroll={{ x: '100%' }} // Menambahkan scroll horizontal
        rowKey={(record) => `${record.nim}-${record.semester_ke}`} // Memberikan kunci unik per baris
      />
    </div>
  );
};

export default UktTable;
