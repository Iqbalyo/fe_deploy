import { useState } from "react";
import {
  AreaTop,
  Ipk,
  MaincardIpk,
  TopProfil,
} from "../../components";
import TableKehadiran from "../../components/dashboard/TableKehadiran";
import MainCard from "../../components/dashboard/MainCard/MainCard";
import UktTable from "../../components/dashboard/informasiUkt/UktTable"; // Import UktTable
import Sidebar from "../../components/Sidebar";
import "./dashboard.scss"

const Dashboard = () => {
  const [semester, setSemester] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state


  return (
    <div className="dashboard-container">
      {/* Tombol Toggle Sidebar */}
      <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        ☰
      </button>

      {/* Sidebar dengan class dinamis */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="content-area">
        <div className="top-section">
          <MaincardIpk/>
          <TopProfil />
        </div>
        <br />

        <div className="table-container">
          <TableKehadiran />
          <UktTable />
        </div>

        <MainCard />
        <Ipk />
      </div>
    </div>
  );
};



export default Dashboard;
