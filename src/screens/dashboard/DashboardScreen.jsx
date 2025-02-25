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
    <div className="content-area">
      {/* <AreaTop /> */}

      <div className="top-section">

      <MaincardIpk/>
      <TopProfil />
      </div>
 <br />

      {/* Bungkus dalam div dengan flexbox */}
      <div className="table-container">
        <TableKehadiran />
        <UktTable />
      </div>

      <MainCard />
      <Ipk />
    </div>
  );
};

export default Dashboard;
