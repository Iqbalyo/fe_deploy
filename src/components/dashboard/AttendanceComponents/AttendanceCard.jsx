import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import "./AttendanceCard.scss";

const AttendancCard = ({ cardInfo, status }) => {
  // Tentukan ikon berdasarkan status
  const getStatusIcon = () => {
    if (status === "Hadir") {
      return (
        <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#4caf50", fontSize: "48px" }} />
      );
    } else if (status === "Tidak Hadir") {
      return (
        <FontAwesomeIcon icon={faTimesCircle} style={{ color: "#f44336", fontSize: "48px" }} />
      );
    } else {
      return (
        <FontAwesomeIcon icon={faExclamationCircle} style={{ color: "#ff9800", fontSize: "48px" }} />
      );
    }
  };

  return (
    <div className="area-card">
      <div className="area-card-info">
        <h5 className="info-title">{cardInfo.title}</h5>
        <div className="info-value">{cardInfo.value}</div>
        <p className="info-text">{cardInfo.text}</p>
      </div>
      <div className="area-card-icon">
        {getStatusIcon()}
      </div>
    </div>
  );
};

AttendancCard.propTypes = {
  cardInfo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  status: PropTypes.oneOf(["Hadir", "Tidak Hadir", "Pending"]).isRequired,
};

export default AttendancCard;
