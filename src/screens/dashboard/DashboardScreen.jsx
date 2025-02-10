import { useState } from "react";
import {
  AreaCards,
  AreaCharts,
  AreaTable,
  AreaTop,
  AttendanceCards,
  GpaCards,
  UktCards,
  Ipk,
  TopProfil,
} from "../../components";
import AttendancCardsu from "../../components/dashboard/all";
import TableKehadiran from "../../components/dashboard/TableKehadiran";
import MainCard from "../../components/dashboard/MainCard/MainCard";
import UktTable from "../../components/dashboard/UktTable"; // Import UktTable
import "./dashboard.scss"

const Dashboard = () => {
  const [semester, setSemester] = useState(null);

  return (
    <div className="content-area">
      <AreaTop />
      <TopProfil />
      <h2>Informasi kehadiran</h2>

      {/* Bungkus dalam div dengan flexbox */}
      <div className="table-container">
        <TableKehadiran />
        <UktTable />
      </div>

      <h2>Informasi Akademik</h2>
      <MainCard />
      <Ipk />
    </div>
  );
};

export default Dashboard;
