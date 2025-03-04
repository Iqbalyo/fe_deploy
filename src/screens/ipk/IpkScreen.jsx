import { AreaTop, GpaCards, MaincardIpk, TopProfil } from "../../components";
import IpkChart from "../../components/dashboard/ipk/IpkChart";
import MainCard from "../../components/dashboard/MainCard/MainCard";
const IpkMahasiswa = () => {
  return (
    <>
    <TopProfil/>
    <br />
    <br />
    <div className="content-area">
       {/* <AreaTop/> */}
      <MaincardIpk/>
       {/* <MainCard/> */}
<IpkChart/>
      
   
      <p>Halaman ini berisi informasi mengenai IPS mahasiswa.</p>
    </div>
    </>
  );
};

export default IpkMahasiswa;
