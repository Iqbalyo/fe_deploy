import PropTypes from "prop-types";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import "./AreaCard.scss";

const AreaCard = ({ colors, percentFillValue, cardInfo, studentInfo }) => {
  const filledValue = (percentFillValue / 100) * 360; // 360 degrees for a full circle
  const remainedValue = 360 - filledValue;

  const data = [
    { name: "Remained", value: remainedValue },
    { name: "tidak hadir", value: filledValue },
  ];

  const renderTooltipContent = (value) => {
    return `${((value / 360) * 100).toFixed(2)}%`;
  };

  return (
    <div className="area-card">
      <div className="area-card-info">
        <h5 className="info-title">{cardInfo.title}</h5>
        <div className="info-value">{cardInfo.value}</div>
        <p className="info-text">{cardInfo.text}</p>
        {studentInfo && (
          <div className="student-info">
            <p>
              Nama: <strong>{studentInfo.name}</strong>
            </p>
            <p>
              NIM: <strong>{studentInfo.nim}</strong>
            </p>
          </div>
        )}
      </div>
      <div className="area-card-chart">
        <PieChart width={100} height={100}>
          <Pie
            data={data}
            cx={50}
            cy={45}
            innerRadius={20}
            outerRadius={40}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip formatter={renderTooltipContent} />
        </PieChart>
      </div>
    </div>
  );
};

AreaCard.propTypes = {
  colors: PropTypes.array.isRequired,
  percentFillValue: PropTypes.number.isRequired,
  cardInfo: PropTypes.object.isRequired,
  studentInfo: PropTypes.object, // Optional
};

export default AreaCard;
