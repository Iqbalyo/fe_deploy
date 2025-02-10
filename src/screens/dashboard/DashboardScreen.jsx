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
const Dashboard = () => {
const [ semester, setSemester] = useState(null); // State untuk menyimpan semster
  
  return (
    <div className="content-area">
      <AreaTop />
      <TopProfil/>
      <h2>Rekap</h2> {/* Tampilkan teks sesuai semester */}
      <TableKehadiran />
      <h2>Informasi Akademik</h2>
  
      <MainCard/>
      <Ipk/>
      {/*   <AttendanceList/> */}
      {/* <AreaCharts /> */}
      {/*<AreaTable />
      <AreaTable /> */}
    </div>
  );
};

export default Dashboard;
