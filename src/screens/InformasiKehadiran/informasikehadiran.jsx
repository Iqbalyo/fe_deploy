import { AreaTop, AttendanceCards, DetailKehadiran, TableJadwal } from "../../components";
import AttendanceListCard from "../../components/dashboard/AttendanceDetail/AttendanceListcard";
import CardVariants from "../../components/dashboard/AttendanceDetail/AttendanceListcard";
import TableKehadiran from "../../components/dashboard/TableKehadiran";
const InformasiKehadiran = () => {
  return (
    <div className="content-area">
      {/* <AreaTop /> */}
    
      <TableKehadiran />
      <h1>Jadwal Perkuliahan </h1>
      <TableJadwal />
      
  
    </div>
  );
};

export default InformasiKehadiran;
