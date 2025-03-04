import { AreaTop, AttendanceCards, DetailKehadiran, TableJadwal, TopProfil } from "../../components";
import AttendanceListCard from "../../components/dashboard/AttendanceDetail/AttendanceListcard";
import CardVariants from "../../components/dashboard/AttendanceDetail/AttendanceListcard";
import TableKehadiran from "../../components/dashboard/TableKehadiran";
const InformasiKehadiran = () => {
  return (
    <div className="content-area">
      {/* <AreaTop /> */}
    <TopProfil/>
      <TableKehadiran />
      <h1>Jadwal Perkuliahan </h1>
      <TableJadwal />
      
  
    </div>
  );
};

export default InformasiKehadiran;
