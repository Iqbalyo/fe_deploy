import React, { useEffect, useState } from "react";
import "./main.scss"; // Styling utama untuk MainCard

import GpaCard from "../IPSComponents/GpaCard";


const MainCard = () => {
  const [paymentStatus, setPaymentStatus] = useState(null); // State untuk menyimpan status pembayaran
  const [paymentDate, setPaymentDate] = useState("15 November 2024"); // Default tanggal pembayaran
  const nim = localStorage.getItem("nim"); // Ambil NIM dari localStorage
  const [mahasiswa, setMahasiswa] = useState(null); // State untuk menyimpan data mahasiswa
  const [ipk, setIpk] = useState(null); // State untuk menyimpan IPK
  const [semester, setSemester] = useState(null); // State untuk menyimpan data semester
  const nama = localStorage.getItem("nama"); // Ambil Nama dari localStorag


  useEffect(() => {
    if (nim) {
      // Fetch data status pembayaran mahasiswa
      fetch(`https://be-deploy-sage.vercel.app/monitoring/unama/v1/user/${nim}/payment-status`)
        .then((response) => response.json())
        .then((data) => setPaymentStatus(data.sts_bayar)) // Simpan status pembayaran
        .catch((error) => console.error("Error fetching payment status:", error));


        // Fetch data IPK dan IPS
      fetch(`https://be-deploy-sage.vercel.app/monitoring/unama/v1/ipk/dataipk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nim: nim }),
      })
        .then((response) => response.json())
        .then((data) => {
          setIpk(data.ipk);
        })
        .catch((error) => console.error("Error fetching IPK data:", error));

      // Fetch data mahasiswa
      fetch(`https://be-deploy-sage.vercel.app/api/mahasiswa/${nim}`)
        .then((response) => response.json())
        .then((data) => setMahasiswa(data))
        .catch((error) => console.error("Error fetching mahasiswa data:", error));

      // Fetch data semester
      fetch(`https://be-deploy-sage.vercel.app/monitoring/unama/v1/aktivitas_kuliahs/semester/${nim}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.semester_ke && data.semester) {
            const semesterText = `${data.semester_ke} (${data.semester === 'ganjil' ? 'Ganjil' : 'Genap'})`;
            setSemester(semesterText);
          } else {
            setSemester("Data semester tidak tersedia");
          }
        })
    }
  }, [nim]);

  return (
    <div>
      {/* Card besar */}
      <div className="main-card">
        {/* Card pertama - Kiri */}
        <div className="sub-card left-card">
        <h3>Indeks Prestasi Kumulatif</h3>
        {ipk ? (
            <GpaCard
              colors={["#e4e8ef", "#ff207d"]}
              cardInfo={{
             /*    title: "Indeks Prestasi Kumulatif", */
                value: ipk,
                text: "IPK",
              }}
            />
          ) : (
            <p>Loading IPK...</p>
          )}
        </div>

       

       
      </div>
    </div>
  );
};

export default MainCard;
