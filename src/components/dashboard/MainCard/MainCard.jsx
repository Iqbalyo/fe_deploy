import React, { useEffect, useState } from "react";
import "./MainCard.scss"; // Styling utama untuk MainCard
import StatusPembayaranUkt from "./StatusPembayaranUkt"; // Import komponen baru
import { Icon } from "semantic-ui-react";

const MainCard = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [nim, setNim] = useState(localStorage.getItem("nim"));
  const [nama, setNama] = useState(localStorage.getItem("nama"));
  const [mahasiswa, setMahasiswa] = useState(null);
  const [ipk, setIpk] = useState(null);
  const [semester, setSemester] = useState(null);

  useEffect(() => {
    if (nim) {
      // Fetch status pembayaran
      fetch(`https://be-deploy-sage.vercel.app/monitoring/unama/v1/user/${nim}/payment-status`)
        .then((response) => response.json())
        .then((data) => setPaymentStatus(data.sts_bayar))
        .catch((error) => console.error("Error fetching payment status:", error));

      // Fetch IPK
      fetch(`https://be-deploy-sage.vercel.app/monitoring/unama/v1/ipk/dataipk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nim: nim }),
      })
        .then((response) => response.json())
        .then((data) => setIpk(data.ipk))
        .catch((error) => console.error("Error fetching IPK data:", error));

      // Fetch data mahasiswa
      fetch(`https://be-deploy-sage.vercel.app/api/mahasiswa/${nim}`)
        .then((response) => response.json())
        .then((data) => setMahasiswa(data))
        .catch((error) => console.error("Error fetching mahasiswa data:", error));

      // Fetch semester
      fetch(`https://be-deploy-sage.vercel.app/monitoring/unama/v1/aktivitas_kuliahs/semester/${nim}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.semester_ke && data.semester) {
            setSemester(`${data.semester_ke} (${data.semester === "ganjil" ? "Ganjil" : "Genap"})`);
          } else {
            setSemester("Data semester tidak tersedia");
          }
        })
        .catch((error) => console.error("Error fetching semester data:", error));
    }
  }, [nim]);

  return (
    <div className="main-card-container">
      <div className="main-card">
        {/* Card kedua - Informasi Mahasiswa */}
        <div className="sub-card center-card">
          <h3>Informasi Mahasiswa</h3>
          {mahasiswa ? (
            <div className="info-container">
              <Icon name="user circle" size="huge" style={{ color: "#ff207d", marginRight: "16px" }} />
              <div className="info-text">
                <h1 className="nama-mahasiswa">NAMA: {nama}</h1>
                <p className="nim-mahasiswa">NIM: {nim}</p>
                <p className="ipk-mahasiswa">IPK: {ipk || "Loading IPK..."}</p>
                <p className="semester-mahasiswa">Semester: {semester || "Loading semester..."}</p>
              </div>
            </div>
          ) : (
            <p>Loading data mahasiswa...</p>
          )}
        </div>

        {/* Card ketiga - Status Pembayaran */}
        <div className="sub-card right-card">
          {paymentStatus !== null ? (
            <StatusPembayaranUkt paymentInfo={{ status: paymentStatus }} />
          ) : (
            <p>Loading status pembayaran...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainCard;
