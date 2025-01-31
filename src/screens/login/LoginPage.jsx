import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, Container } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/action/userData.action";

const LoginPage = ({ onLogin }) => {
  const [params, setParams] = useState({ user_id: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(params)); // Tunggu sampai login selesai
      onLogin(); // Panggil onLogin jika berhasil
      navigate("/"); // Navigasi ke halaman utama
    } catch (error) {
      setErrorMessage(error.message); // Tampilkan pesan error
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 3,
          backgroundColor: "white",
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center", mb: 3, fontWeight: "bold" }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            id="user_id"
            name="user_id"
            value={params.user_id}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            
          />
          <TextField
            label="Password"
            id="password"
            name="password"
            value={params.password}
            onChange={handleChange}
            type="password"
            fullWidth
            margin="normal"
            required
          />
          {errorMessage && (
            <Typography color="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, backgroundColor: "#ff207d", color: "white" }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
