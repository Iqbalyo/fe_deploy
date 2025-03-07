import React, { useEffect, useState } from "react";
import "./MainCard.scss";
import StatusPembayaranUkt from "./StatusPembayaranUkt";
import { Icon, Table } from "semantic-ui-react";

const MainCard = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentDate, setPaymentDate] = useState("15 November 2024");
  const nim = localStorage.getItem("nim");
  const [mahasiswa, setMahasiswa] = useState(null);
  const [ipk, setIpk] = useState(null);
  const [semester, setSemester] = useState(null);
  const [jurusan, setJurusan] = useState("Loading..."); // ⬅️ Default Loading
  const nama = localStorage.getItem("nama");

  useEffect(() => {
    if (nim) {
      fetch(`https://be-deploy-sage.vercel.app/monitoring/unama/v1/user/${nim}/payment-status`)
        .then((response) => response.json())
        .then((data) => setPaymentStatus(data.sts_bayar))
        .catch((error) => console.error("Error fetching payment status:", error));

      fetch(`https://be-deploy-sage.vercel.app/monitoring/unama/v1/ipk/dataipk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nim: nim }),
      })
        .then((response) => response.json())
        .then((data) => setIpk(data.ipk))
        .catch((error) => console.error("Error fetching IPK data:", error));

      fetch(`https://be-deploy-sage.vercel.app/api/mahasiswa/${nim}`)
        .then((response) => response.json())
        .then((data) => setMahasiswa(data))
        .catch((error) => console.error("Error fetching mahasiswa data:", error));

      fetch(`https://be-deploy-sage.vercel.app/monitoring/unama/v1/aktivitas_kuliahs/semester/${nim}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.semester_ke && data.semester) {
            const semesterText = `${data.semester_ke} (${data.semester === 'ganjil' ? 'Ganjil' : 'Genap'})`;
            setSemester(semesterText);
          } else {
            setSemester("Data semester tidak tersedia");
          }
        })
        .catch((error) => console.error("Error fetching semester data:", error));
//
      // ⬇️ Fetch jurusan berdasarkan nim dan atur tampilannya
      fetch(`https://be-deploy-sage.vercel.app/monitoring/unama/v1/ipk/dataipk`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nim: nim }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.jurusan !== undefined) {
            setJurusan(data.jurusan === 2 ? "SI" : "TI");
          } else {
            setJurusan("Tidak Diketahui");
          }
        })
        .catch((error) => console.error("Error fetching jurusan:", error));
    }
  }, [nim]);

  return (
    <div className="main-card-container">
      <div className="main-card">
        {/* Card Kedua - Informasi Mahasiswa sebagai Tabel */}
        <div className="sub-card center-card">
          <h3>Informasi Mahasiswa</h3>
          {mahasiswa ? (
            <>
              <Icon name="user circle" size="huge" style={{ color: "#ff207d", marginBottom: "10px" }} />
              <Table celled striped>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell width={3}><strong>NAMA</strong></Table.Cell>
                    <Table.Cell>{nama}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell><strong>NIM</strong></Table.Cell>
                    <Table.Cell>{nim}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell><strong>IPK</strong></Table.Cell>
                    <Table.Cell>{ipk || "Loading..."}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell><strong>Semester</strong></Table.Cell>
                    <Table.Cell>{semester || "Loading semester..."}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell><strong>Jurusan</strong></Table.Cell>
                    <Table.Cell>{jurusan}</Table.Cell> {/* ⬅️ Menampilkan Jurusan */}
                  </Table.Row>
                </Table.Body>
              </Table>
            </>
          ) : (
            <p>Loading data mahasiswa...</p>
          )}
        </div>

        {/* Card Ketiga - Status Pembayaran */}
        <div className="sub-card right-card">
          {paymentStatus !== null ? (
            <StatusPembayaranUkt
              paymentInfo={{
                status: paymentStatus,
              }}
            />
          ) : (
            <p>Loading status pembayaran...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainCard;
