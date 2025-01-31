import React from "react";
import AttendanceCardgu from "./all";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { Image } from "semantic-ui-react";
import './all.scss'
import CountUp from "react-countup";
import GpaCard from "../IPSComponents/GpaCard";
// Data for charts and student info
const studentInfo = {
  name: "John Doe",
  nim: "8030219888",
  gpa: 3.8,
};

const paymentInfo = {
  amount: 5000000,
};

const studentDetails = {
  avatar: "https://randomuser.me/api/portraits/men/1.jpg", // Example avatar URL
  name: "John Doe",
  nim: "8030219888",
  gpa: 3.8,
};

const pieData = [
  { name: "Completed", value: 80 },
  { name: "Remaining", value: 20 },
];

const AttendancCardsu = () => {
  return (
    
    <section className="content-area-cards">
      {/* First Card: Student Info with GPA */}
      <GpaCard
        colors={["#e4e8ef", "#475be8"]}
        cardInfo={{
          title: "Indeks Prestasi Sementara",
          value: 3.70, // Nilai IPK
          text: `IP semester ini.`,
        }}
 // Menambahkan class CSS baru
      />
      {/* Second Card: UKT Payment */}
      <AttendanceCardgu
        title="Pembayaran UKT"
        value={<strong>Sudah Membayar: Rp {paymentInfo.amount.toLocaleString()}</strong>}
      />

      {/* Third Card: Student Details */}
      <AttendanceCardgu
        title="Detail Mahasiswa"
        type="student"
        value={
          <div>
            <Image src={studentDetails.avatar} avatar />
            <strong>Nama: </strong>{studentDetails.name}
            <br />
            <strong>NIM: </strong>{studentDetails.nim}
            <br />
            <strong>IPK: </strong>{studentDetails.gpa}
          </div>
        }
      />
    </section>
  );
};

export default AttendancCardsu;
