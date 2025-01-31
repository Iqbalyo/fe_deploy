import PropTypes from "prop-types";
import CountUp from "react-countup";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import "./GpaCard.scss"

const GpaCard = ({ colors, cardInfo, className }) => {
  // Hitung persentase dari nilai IPK terhadap 4.0
  const gpaPercentage = cardInfo.value ? (cardInfo.value / 4.0) * 100 : 0;

  // Data untuk PieChart: Bagian terisi dan bagian kosong
  const pieData = [
    { name: "Achieved", value: gpaPercentage },
    { name: "Remaining", value: 100 - gpaPercentage },
  ];

  return (
    <div className={`area-card ${className || ""}`}> {/* Tambahkan className */}
      <div className="area-card-info">
        {cardInfo.title && <h5 className="info-title">{cardInfo.title}</h5>} {/* Menampilkan title jika ada */}
        
        {/* Hanya menampilkan nilai jika ada */}
        {cardInfo.value !== undefined && (
          <div className="info-value">
            <CountUp start={0} end={cardInfo.value} decimals={2} duration={2} />
          </div>
        )}
        
        <p className="info-text">{cardInfo.text}</p>
      </div>

      {/* Hanya menampilkan PieChart jika ada nilai value */}
       {/* Bagian kanan untuk PieChart */}
      {cardInfo.value !== undefined && (
        <div className="area-card-chart">
          <PieChart width={100} height={100}>
            <Pie
              data={pieData}
              cx={50}
              cy={50}
              innerRadius={30}
              outerRadius={40}
              dataKey="value"
              startAngle={90} // Mulai dari atas
              endAngle={-270} // Rotasi ke arah sebaliknya
            >
              {/* Cell untuk bagian terisi */}
              <Cell key="achieved" fill={colors[1]} />
              {/* Cell untuk bagian kosong */}
              <Cell key="remaining" fill={colors[0]} />
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      )}
    </div>
  );
};

export default GpaCard;

GpaCard.propTypes = {
  colors: PropTypes.array.isRequired,
  cardInfo: PropTypes.shape({
    title: PropTypes.string,
    value: PropTypes.number,
    text: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string, // Tambahkan propTypes untuk className
};
