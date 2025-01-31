import React from "react";
import "./StatusPembayaranUkt.scss"; // Tambahkan styling untuk PaymentCard
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Ikon untuk status "Lunas"
import CancelIcon from "@mui/icons-material/Cancel"; // Ikon untuk status "Belum Lunas"

const StatusPembayaranUkt = ({ paymentInfo }) => {
  const { status, date } = paymentInfo;

  return (
    <div className="payment-card">
    <h3>Informasi Pembayaran Biaya Kuliah</h3>
    <div className="payment-status">
      {status === "Lunas" ? (
        <CheckCircleIcon style={{ color: "green", fontSize: 48 }} />
      ) : (
        <CancelIcon style={{ color: "red", fontSize: 48 }} />
      )}
      <p>Status: <strong>{status}</strong></p>
    </div>
  </div>
  );
};

export default StatusPembayaranUkt;
