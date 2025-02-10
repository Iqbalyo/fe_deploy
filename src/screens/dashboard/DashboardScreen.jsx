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
import UktTable from "../../components/dashboard/informasiUkt/UktTable";
const Dashboard = () => {
const [ semester, setSemester] = useState(null); // State untuk menyimpan semster
  
  return (
    <div className="content-area">
      <AreaTop />
      <TopProfil/>
      <h2>Rekap Presensi</h2> {/* Tampilkan teks sesuai semester */}
      <TableKehadiran />
      <UktTable/>
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
