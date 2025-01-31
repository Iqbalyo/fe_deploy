import { useContext, useEffect, useState } from "react";
import "./App.scss";
import { Button, Typography } from '@mui/joy';
import { ThemeContext } from "./context/ThemeContext";
import { DARK_THEME } from "./constants/themeConstants";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import BaseLayout from "./layout/BaseLayout";
import { Dashboard, PageNotFound, InformasiKehadiran, InformasiUkt, LoginPage, Oke } from "./screens";
import { DetailKehadiran} from "./components";
import IpkMahasiswa from "./screens/ipk/IpkScreen";

function App() {
  const { theme } = useContext(ThemeContext);

  // State untuk status login
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulasi pengecekan login dari localStorage (misalnya token)
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Function untuk handle login
  const handleLogin = () => {
    localStorage.setItem("authToken", "dummyToken");
    setIsLoggedIn(true);
  };

  // Function untuk handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  // Komponen untuk proteksi rute
  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <>
   
      <Router>
        <Routes>
          {/* Route Login */}
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

          {/* Proteksi Rute dengan ProtectedRoute */}
          <Route
            element={
              <ProtectedRoute>
                <BaseLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Dashboard onLogout={handleLogout} />} />
            <Route path="/informasikehadiran" element={<InformasiKehadiran />} />
            <Route path="/ipk" element={<IpkMahasiswa />} />
            <Route path="/informasiukt" element={<InformasiUkt />} />
            <Route path="/informasi-kehadiran/:matakuliah_nama" element={<Oke />} />

            <Route path="/detail/:namaMatakuliah" element={<DetailKehadiran />} /> {/* Route detail kehadiran */}
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

