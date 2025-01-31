import AttendancCard from "./AttendanceCard";
import "./AttendanceCard.scss"


const AttendancCards = () => {
  const studentInfo = {
    name: "John Doe",
    nim: "8030219888",
    attendancePercentage: 12, // Kehadiran dalam persen
    status: "Hadir",
  };


  const nextClassInfo = {
    title: "Perkuliahan Selanjutnya",
    value: "Mata Kuliah : Pemrograman Web",
    text: (
      <span>
        Status Kehadiran: <strong>Belum Dimulai</strong>.
        <br /> 
        Jadwal Perkuliahan: <strong>10:00 - 11:30</strong> {/* Teks tambahan */}
      </span>
    ),
    status: "Pending", // Status untuk perkuliahan belum dimulai
  };
  const endClassInfo = {
    title: "Perkuliahan selesai",
    value: "Mata Kuliah : bisnis",
    text: (
      <span>
        Status Kehadiran: <strong>Hadir</strong>.
        <br /> 
        Jadwal Perkuliahan: <strong>08:00 - 09:30</strong> {/* Teks tambahan */}
      </span>
    ),
    status: "Hadir", // Status untuk perkuliahan belum dimulai
  };

  
  return (
    <section className="content-area-cards">
      <AttendancCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={studentInfo.attendancePercentage}
        studentInfo={studentInfo} // Kirim data mahasiswa
        cardInfo={{
          title: "Anak anda sedang mengikuti Perkuliahan",
          value: "Mata Kuliah : Database",
          text: (
            <span>
              Status Kehadiran : <strong>Hadir</strong>.
              <br /> {/* Baris baru */}
              Waktu Perkuliahan: <strong>08:00 - 09:30</strong> {/* Teks tambahan */}
            </span>
          ),
         
        }}
        status={studentInfo.status} // Status "Hadir"
        />
      {/* Card untuk perkuliahan selanjutnya */}
      <AttendancCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={0} // Kehadiran untuk perkuliahan belum dimulai
        cardInfo={nextClassInfo} // Data perkuliahan selanjutnya
        status={nextClassInfo.status} // Status "Pending"
      />
      <AttendancCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={0} // Kehadiran untuk perkuliahan belum dimulai
        cardInfo={endClassInfo} // Data perkuliahan selanjutnya
        status={endClassInfo.status} // Status "Pending"
      />
      
    </section>
  );
};

export default AttendancCards;