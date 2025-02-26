import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import { FaBars } from "react-icons/fa"; // Import hamburger icon
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "@mui/material";
import { SidebarContext } from "../../../context/SidebarContext";

const TopProfil = () => {
  const { openSidebar } = useContext(SidebarContext); // Ambil fungsi openSidebar
  const [setMahasiswa] = useState(null);
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
              onClick={openSidebar} // Panggil openSidebar saat diklik
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

    
    
    </>
  );
};

export default TopProfil;
