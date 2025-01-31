import React, { useEffect, useState } from "react";
import "./MainCard.scss"; // Styling utama untuk MainCard
import StatusPembayaranUkt from "./StatusPembayaranUkt"; // Import komponen baru
import Avatar from "@mui/material/Avatar"; // Import Avatar
import GpaCard from "../IPSComponents/GpaCard";
import { Icon } from "semantic-ui-react";

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
    <div className="main-card-container">
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

        {/* Card kedua - Tengah */}
        <div className="sub-card center-card">
          <h3>Informasi Mahasiswa</h3>
          {mahasiswa ? (
            <div className="info-container" >
             
                   {/* Ganti Avatar dengan Icon */}
          <Icon
            name="user circle"
            size="huge"
            style={{ color: "#ff207d", marginRight: "16px" }}// Spasi antara ikon dan teks
          />
              <div className="info-text">
                {/* Menambahkan fontSize 18px pada nama */}
                <h1 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>NAMA : {nama}</h1>
                <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>NIM: {nim}</p>
                {/* IPK di samping NIM */}
                <p style={{ margin: "8px 0", fontSize: "16px", color: "#555" }}>IPK: {ipk}</p>
                {/* Semester Terakhir */}
                <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>Semester: {semester || "Loading semester..."}</p>
              </div>
            </div>
          ) : (
            <p>Loading data mahasiswa...</p>
          )}
        </div>

        {/* Card ketiga - Kanan */}
        <div className="sub-card right-card">
          {paymentStatus !== null ? (
            <StatusPembayaranUkt
              paymentInfo={{
                status: paymentStatus,
               
              }}
            />
          ) : (
            <p>Loading status pembayaran...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainCard;
