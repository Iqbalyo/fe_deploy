import React, { useEffect, useState } from "react";
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "./Ipk.scss";

// Tooltip kustom untuk menambahkan informasi tambahan
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const ips = payload[0].value;
    let message;

    // Tentukan pesan berdasarkan nilai IPS
    if (ips >= 3.5 && ips <= 4.0) {
      message = "Prestasi Anda Sangat Baik, Pertahankan Prestasi Akademiknya";
    } else if (ips >= 3.0 && ips < 3.5) {
      message = "Prestasi Baik, Tingkatkan Prestasi Akademiknya";
    } else {
      message = "Lebih giat belajar dan mengikuti perkuliahan";
    }

    return (
      <div className="custom-tooltip">
        <p>{`${payload[0].payload.semester}`}</p>
        <p>{`IPS: ${ips}`}</p>
        <p className="tooltip-message">{message}</p>
      </div>
    );
  }

  return null;
};

const IpkChart = () => {
  const [ipkData, setIpkData] = useState([]); // State untuk menyimpan data IPS
  const nim = localStorage.getItem("nim"); // Ambil NIM dari localStorage

  useEffect(() => {
    if (nim) {
      fetch(`https://be-deploy-sage.vercel.app/monitoring/unama/v1/ipk/ips-semester/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nim: nim }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Response data adalah:", data); // Log respons API
          const formattedData = Array.isArray(data.data) // Sesuaikan jika respons memiliki properti `data`
            ? data.data.map((item) => ({
                semester: `Semester ${item.semester_ke}`,
                ips: item.ips,
              }))
            : [];
          setIpkData(formattedData);
        })
        .catch((error) => console.error("Error fetching IPS data:", error));
    }
  }, [nim]);

  return (
    <div className="ipk-chart-container">
      <h3 className="ipk-title">Grafik Perkembangan IPS</h3>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={ipkData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="semester" />
          <YAxis domain={[2.5, 4.0]} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="ips" fill="#ff207d" />
          <Line type="monotone" dataKey="ips" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IpkChart;
