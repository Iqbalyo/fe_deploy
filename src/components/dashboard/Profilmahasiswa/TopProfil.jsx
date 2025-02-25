import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import { FaBars } from "react-icons/fa"; // Import hamburger icon dari react-icons
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "@mui/material";

const TopProfil = () => {
  const [setMahasiswa] = useState(null); // State untuk data mahasiswa
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const nim = localStorage.getItem("nim"); 
  const nama = localStorage.getItem("nama");

  // Deteksi jika layar di bawah 762px
  const isMobile = useMediaQuery("(max-width: 762px)");

  useEffect(() => {
    if (nim) {
      fetch(`https://be-deploy-sage.vercel.app/api/mahasiswa/${nim}`)
        .then((response) => response.json())
        .then((data) => setMahasiswa(data))
        .catch((error) => console.error("Error fetching mahasiswa data:", error));
    }
  }, [nim]);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding={2}
        sx={{ backgroundColor: "#ffffff", borderRadius: "8px", width: "100%" }}
      >
        {/* Hamburger menu */}
        {isMobile && (
          <FaBars
            size={24}
            style={{ cursor: "pointer", marginRight: "10px" }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
        )}

        {/* Ubah teks berdasarkan ukuran layar */}
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {isMobile ? "UNAMA" : "Universitas Dinamika Bangsa"}
        </Typography>

        <Box display="flex" alignItems="center">
          <Typography variant="body1" sx={{ fontWeight: "bold", marginRight: 1 }}>
            {nama || "Nama Tidak Ditemukan"}
          </Typography>
          <Icon name="user circle" size="big" style={{ color: "#ff207d", marginRight: "16px" }} />
        </Box>
      </Box>

      {/* Sidebar Menu */}
      {sidebarOpen && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "250px",
            height: "100%",
            backgroundColor: "#ffffff",
            boxShadow: "2px 0px 5px rgba(0,0,0,0.2)",
            padding: "20px",
            zIndex: 1000,
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "20px" }}>
            Menu Sidebar
          </Typography>
          {/* Tambahkan item menu di sini */}
        </Box>
      )}
    </>
  );
};

export default TopProfil;
