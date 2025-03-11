import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const Oke = () => {
  const { matakuliah_nama } = useParams();
  const nim = localStorage.getItem("nim");
  const [dataKehadiran, setDataKehadiran] = useState([]);

  const formatDate = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year}`;
  };

  useEffect(() => {
    const fetchKehadiran = async () => {
      try {
        const response = await fetch(
          `https://be-deploy-sage.vercel.app/monitoring/unama/v1/informasi-kehadiran/${matakuliah_nama}`
        );

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        const filteredData = data.filter((item) => item.nim === nim);
        setDataKehadiran(filteredData);
      } catch (error) {
        console.error("Error fetching kehadiran:", error);
      }
    };

    if (nim) fetchKehadiran();
    else console.error("NIM tidak ditemukan di localStorage");
  }, [nim, matakuliah_nama]);

  const matkul = dataKehadiran[0]?.matakuliah_nama || "Mata Kuliah Tidak Ditemukan";
  const dosen = dataKehadiran[0]?.dosen || "Dosen Tidak Ditemukan";

  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: "#f5f5f5",
        padding: "16px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Header Nama Mata Kuliah & Dosen */}
      <Typography variant="h5" fontWeight="bold" color="#333" gutterBottom>
        {matkul}
      </Typography>
      <Typography variant="subtitle1" fontStyle="italic" color="#555" mb={2}>
        Dosen: {dosen}
      </Typography>

      {/* Tabel */}
      <Table sx={{ backgroundColor: "#fff", borderRadius: "8px" }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#e0e0e0" }}>
            <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Pertemuan Ke</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Status</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Tanggal Kuliah</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Waktu</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataKehadiran.length > 0 ? (
            dataKehadiran.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.pertemuan_ke}</TableCell>
                <TableCell>{row.status !== null ? row.status : "A"}</TableCell>
                <TableCell>
                  {row.pertemuan ? formatDate(new Date(row.pertemuan.tanggal_kuliah)) : "N/A"}
                </TableCell>
                <TableCell>{row.pertemuan ? row.pertemuan.waktu : "N/A"}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
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
