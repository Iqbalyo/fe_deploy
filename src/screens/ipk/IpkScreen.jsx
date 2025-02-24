import { AreaTop, GpaCards, MaincardIpk } from "../../components";
import IpkChart from "../../components/dashboard/ipk/IpkChart";
import MainCard from "../../components/dashboard/MainCard/MainCard";
const IpkMahasiswa = () => {
  return (
    <div className="content-area">
       {/* <AreaTop/> */}
      <MaincardIpk/>
       {/* <MainCard/> */}
<IpkChart/>
      
   
      <p>Halaman ini berisi informasi mengenai IPS mahasiswa.</p>
    </div>
  );
};

export default IpkMahasiswa;
