import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import { FaBars } from "react-icons/fa"; // Import hamburger icon
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "@mui/material";

const TopProfil = () => {
  const [setMahasiswa] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const nim = localStorage.getItem("nim");
  const nama = localStorage.getItem("nama");

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
        justifyContent="space-between" // Pisahkan kiri & kanan
        padding={2}
        sx={{ backgroundColor: "#ffffff", borderRadius: "8px", width: "100%" }}
      >
        {/* Bagian KIRI: Menu + UNAMA */}
        <Box display="flex" alignItems="center" gap={1}>
          {isMobile && (
            <FaBars
              size={24}
              style={{ cursor: "pointer" }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
          )}
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {isMobile ? "UNAMA" : "Universitas Dinamika Bangsa"}
          </Typography>
        </Box>

        {/* Bagian KANAN: Nama User & Icon */}
        <Box display="flex" alignItems="center">
          <Typography variant="body1" sx={{ fontWeight: "bold", marginRight: 1 }}>
            {nama || "Nama Tidak Ditemukan"}
          </Typography>
          <Icon name="user circle" size="big" style={{ color: "#ff207d", marginRight: "16px" }} />
        </Box>
      </Box>

      {/* Sidebar */}
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
