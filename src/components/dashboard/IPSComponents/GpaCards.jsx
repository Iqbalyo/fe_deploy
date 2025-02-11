import React, { useEffect, useState } from "react";
import GpaCard from "./GpaCard";
import "./GpaCards.scss";
import Avatar from "@mui/material/Avatar";

const GpaCards = ({onSemesterChange}) => { //todo,onSemester sebagai props,untuk mengirim data ke komponen induk
  const [mahasiswa, setMahasiswa] = useState(null); // State untuk menyimpan data mahasiswa
  const [ipk, setIpk] = useState(null); // State untuk menyimpan IPK
  const [ips, setIps] = useState(null); // State untuk menyimpan IPS
  const [semester, setSemester] = useState(null); // State untuk menyimpan data semester

  const nim = localStorage.getItem("nim"); // Ambil NIM dari localStorage
  const nama = localStorage.getItem("nama"); // Ambil Nama dari localStorage

  useEffect(() => {
    if (nim) {
      // Fetch data IPK dan IPS dari API
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
          setIps(data.ips);
        })
        .catch((error) => console.error("Error fetching IPK data:", error));

      // Fetch data mahasiswa (optional, jika Anda ingin menampilkan info mahasiswa)
      fetch(`https://be-deploy-sage.vercel.app/api/mahasiswa/${nim}`)
        .then((response) => response.json())
        .then((data) => setMahasiswa(data))
        .catch((error) => console.error("Error fetching mahasiswa data:", error));

      // Fetch data semester terbaru berdasarkan NIM
      fetch(`https://be-deploy-sage.vercel.app/monitoring/unama/v1/aktivitas_kuliahs/semester/${nim}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.semester_ke && data.semester) {
            const semesterText = `${data.semester_ke} (${data.semester === 'ganjil' ? 'Ganjil' : 'Genap'})`;
            setSemester(semesterText);
            if(onSemesterChange) onSemesterChange(semesterText); //?Kirim data semester ke komponen induk
          } else {
            setSemester("Data semester tidak tersedia");
          }
        })
        .catch((error) => console.error("Error fetching semester data:", error));
    }
  }, [nim]);

  return (
    <section className="content-area-cards">
      {ips ? (
        <GpaCard
          colors={["#e4e8ef", "#475be8"]}
          cardInfo={{
            title: "Indeks Prestasi ",
            value: ipk,
            text: `IP semester ini.`,
          }}
        />
      ) : (
        <p>Loading IPK...</p>
      )}

      {/* Card kedua - Informasi Mahasiswa */}
      {mahasiswa ? (
        <GpaCard
          colors={["#e4e8ef", "#475be8"]}
          cardInfo={{
            text: (
              <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                {/* Memperbesar avatar */}
                <Avatar
                  alt={mahasiswa.nama}
                  src="https://via.placeholder.com/150" // Ganti dengan URL avatar jika tersedia
                  style={{ width: 80, height: 80 }} // Avatar lebih besar
                />
                <div>
                  {/* Menambahkan fontSize 18px pada nama */}
                  <h1 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>{nama}</h1>
                  <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>NIM: {nim}</p>
                  {/* IPK di samping NIM */}
                  <p style={{ margin: "8px 0", fontSize: "16px", color: "#555" }}>IPK: {ipk}</p> {/* Tampilkan IPK */}
                  {/* Semester Terakhir */}
                  <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>Semester: {semester || "Loading semester..."}</p>
                </div>
              </div>
              
            ),
          }}
          className="gpa-card-secondary"
        />
      ) : (
        <p>Loading data mahasiswa...</p>
      )}
    </section>
  );
};

export default GpaCards;
