import { AreaTop, InformasiUkt, TopProfil } from "../../components";
import UktTable from "../../components/dashboard/informasiUkt/UktTable";
const InformasiKehadiran = () => {
  return (
    <>
    <TopProfil/>
    <br />
    <br />
    <div className="content-area">
      {/* <AreaTop/> */}
    <UktTable/>

    
    </div>
    </>
  );
};

export default InformasiKehadiran;
