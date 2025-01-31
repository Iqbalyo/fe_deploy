import PropTypes from "prop-types";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Ikon check dan times untuk status pembayaran
import "./UktCard.scss"; // Tambahkan styling sesuai kebutuhan

const UktCard = ({ paymentDate, paymentStatus }) => {
  // Menentukan status berdasarkan nilai sts_bayar
  const isLunas = paymentStatus === "Lunas"; // Jika sts_bayar adalah "Lunas"

  return (
    <div className="ukt-card">
      <div className="ukt-card-icon">
        {isLunas ? (
          <FaCheckCircle size={40} color="#4CAF50" /> // Ikon "Lunas"
        ) : (
          <FaTimesCircle size={40} color="#F44336" /> // Ikon "Belum Lunas"
        )}
      </div>
      <div className="ukt-card-info">
        <h5 className="ukt-title">Status Pembayaran UKT</h5>
        <p className="ukt-status">{isLunas ? "Lunas" : "Belum Lunas"}</p> {/* Menampilkan status dinamis */}
        {/* <p className="ukt-date">Tanggal: {paymentDate}</p> */}
      </div>
    </div>
  );
};

export default UktCard;

UktCard.propTypes = {
  paymentDate: PropTypes.string.isRequired,
  paymentStatus: PropTypes.string.isRequired, // Mengubah paymentAmount menjadi paymentStatus
};
