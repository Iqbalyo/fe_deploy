import React, { useEffect, useState } from "react";
import UktCard from "./UktCard";
import "./UktCard.scss"; // Styling tambahan untuk daftar kartu

const UktCards = () => {
  const [paymentStatus, setPaymentStatus] = useState(null); // State untuk menyimpan status pembayaran
  const [paymentDate, setPaymentDate] = useState("15 November 2024"); // Atau bisa diubah sesuai logika Anda
  const nim = localStorage.getItem("nim"); // Ambil NIM dari localStorage

  useEffect(() => {
    if (nim) {
      // Fetch data status pembayaran mahasiswa
      fetch(`https://be-deploy-sage.vercel.app/monitoring/unama/v1/user/${nim}/payment-status`)
        .then((response) => response.json())
        .then((data) => setPaymentStatus(data.sts_bayar)) // Simpan status pembayaran
        .catch((error) => console.error("Error fetching payment status:", error));
    }
  }, [nim]);

  return (
    <section className="content-area-cards">
      {paymentStatus !== null ? (
        <UktCard
          paymentDate={paymentDate}
          paymentStatus={paymentStatus}  // Kirimkan status pembayaran ke UktCard
        />
      ) : (
        <p>Loading payment status...</p>
      )}
    </section>
  );
};

export default UktCards;
