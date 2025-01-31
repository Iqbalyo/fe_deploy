import React from "react";
import { Paper, Typography, Grid, Avatar } from "@mui/material";

const MahasiswaInfoPaper = ({ photo, name, nim, angkatan, ipk }) => {
  return (
    <Paper elevation={3} sx={{ padding: 2, display: "flex", alignItems: "center" }}>
      <Avatar alt={name} src={photo} sx={{ width: 60, height: 60, marginRight: 2 }} />
      <div>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2">NIM: {nim}</Typography>
        <Typography variant="body2">Angkatan: {angkatan}</Typography>
        <Typography variant="body2">IPK: {ipk}</Typography>
      </div>
    </Paper>
  );
};

const MahasiswaInfo = () => {
  const mahasiswa = {
    photo: "https://via.placeholder.com/150", // Ganti dengan URL gambar mahasiswa
    name: "John Doe",
    nim: "123456789",
    angkatan: "2020",   
    ipk: "3.80"
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <MahasiswaInfoPaper {...mahasiswa} />
      </Grid>
    </Grid>
  );
};

export default MahasiswaInfo;
