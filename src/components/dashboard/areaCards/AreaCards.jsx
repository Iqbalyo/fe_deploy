import AreaCard from "./AreaCard";
import "./AreaCards.scss";
import CardExampleCard from "../StudentCard/Carduser";


const AreaCards = () => {
  const studentInfo = {
    name: "John Doe",
    nim: "8030219888",
    attendancePercentage: 12, // Kehadiran dalam persen
    
  };




  
  return (
    <section className="content-area-cards">
      <AreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={studentInfo.attendancePercentage}
        studentInfo={studentInfo} // Kirim data mahasiswa
        cardInfo={{
          title: "Kehadiran",
          value: `${studentInfo.attendancePercentage}%`,
          text: `Kehadiran semester ini.`,
        }}
       
        />
     
      
    </section>
  );
};

export default AreaCards;
