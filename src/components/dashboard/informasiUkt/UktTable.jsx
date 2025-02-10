import React, { useEffect, useState } from "react";
import "./Ukt.scss"; // Menggunakan SCSS yang sudah kamu impor

const UktTable = () => {
  const [data, setData] = useState([]);

  const nim = localStorage.getItem("nim");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://be-deploy-sage.vercel.app/monitoring/unama/v1/mahasiswa/pembayaran?nim=${nim}`
        );
        const result = await response.json();

        if (result && Array.isArray(result)) {
          const mappedData = result.map((item) => ({
            semester: `Semester ${item.semester_ke}`,
            status: item.status_pembayaran === "Lunas" ? "Lunas" : "Belum Lunas",
          }));

          setData(mappedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (nim) {
      fetchData();
    } else {
      console.error("NIM tidak ditemukan di localStorage.");
    }
  }, [nim]);

  return (
    <div className="ukt-container">
      <h2 className="ukt-title">Status Pembayaran Kuliah</h2>
      <div className="ukt-list">
        {data.map((item, index) => (
          <div key={index} className="ukt-item">
            <span className="semester">{item.semester}</span>
            <span className={`status ${item.status.toLowerCase()}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UktTable;
