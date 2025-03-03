import React, { useState, useEffect, useContext } from "react";
import { Icon } from "semantic-ui-react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FaBars } from "react-icons/fa";
import { SidebarContext } from "../../../context/SidebarContext";

const TopProfil = () => {
  const { openSidebar } = useContext(SidebarContext);
  const nim = localStorage.getItem("nim");
  const nama = localStorage.getItem("nama");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding={2}
      sx={{ backgroundColor: "#ffffff", borderRadius: "8px", width: "100%" }}
    >
      <Box display="flex" alignItems="center">
        {isMobile && (
          <FaBars size={24} style={{ marginRight: 10, cursor: "pointer" }} onClick={openSidebar} />
        )}
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {isMobile ? "UNAMA" : "Universitas Dinamika Bangsa"}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Typography variant="body1" sx={{ fontWeight: "bold", marginRight: 1 }}>
          {nama || "Nama Tidak Ditemukan"}
        </Typography>
        <Icon name="user circle" size="big" style={{ color: "#ff207d", marginRight: "16px" }} />
      </Box>
    </Box>
  );
};

export default TopProfil;
