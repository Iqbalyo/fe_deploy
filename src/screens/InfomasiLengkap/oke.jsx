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
  const [mataKuliah, setMataKuliah] = useState("");
  const [dosen, setDosen] = useState("");

  const formatDate = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchKehadiran = async () => {
      try {
        const response = await fetch(
          `https://be-deploy-sage.vercel.app/monitoring/unama/v1/informasi-kehadiran/${matakuliah_nama}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Data dari API:", data);

        // Filter data berdasarkan NIM
        const filteredData = data.filter((item) => item.nim === nim);
        console.log("Data setelah filter:", filteredData);
        setDataKehadiran(filteredData);

        // Ambil mata kuliah dan dosen dari entri pertama
        if (filteredData.length > 0) {
          setMataKuliah(filteredData[0].matakuliah_nama);
          setDosen(filteredData[0].dosen);
        }
      } catch (error) {
        console.error("Error fetching kehadiran:", error);
      }
    };

    if (nim) {
      fetchKehadiran();
    } else {
      console.error("NIM tidak ditemukan di localStorage");
    }
  }, [nim, matakuliah_nama]);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" component="div" style={{ padding: "16px" }}>
        Informasi Kehadiran
      </Typography>
      <Typography variant="subtitle1" style={{ padding: "8px 16px" }}>
        Mata Kuliah: {mataKuliah}
      </Typography>
      <Typography variant="subtitle1" style={{ padding: "8px 16px" }}>
        Dosen: {dosen}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Pertemuan Ke</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Tanggal Kuliah</TableCell>
            <TableCell>Waktu</TableCell>
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