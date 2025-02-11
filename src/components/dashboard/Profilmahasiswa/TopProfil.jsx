import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const TopProfil = () => {
  const [setMahasiswa] = useState(null); // State untuk data mahasiswa
  const nim = localStorage.getItem("nim"); // Ambil NIM dari localStorage
  const nama = localStorage.getItem("nama"); // Ambil Nama dari localStorage

  useEffect(() => {
    if (nim) {
      // Fetch data mahasiswa untuk mendapatkan profil
      fetch(`https://be-deploy-sage.vercel.app/api/mahasiswa/${nim}`)
        .then((response) => response.json())
        .then((data) => setMahasiswa(data))
        .catch((error) => console.error("Error fetching mahasiswa data:", error));
    }
  }, [nim]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding={2}
      sx={{ backgroundColor: "#ffffff", borderRadius: "8px",
        width: "50%" 
       }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", marginRight: "auto" }}>
        Universitas Dinamika Bangsa
      </Typography>
      <Box display="flex" alignItems="center">
        <Typography variant="body1" sx={{ fontWeight: "bold", marginRight: 1 }}>
          {nama || "Nama Tidak Ditemukan"}
        </Typography>
        <Icon name="user circle" size="big"  style={{ color: "#ff207d", marginRight: "16px" }} /> {/* Ikon user */}
      </Box>
    </Box>
  );
};

export default TopProfil;
