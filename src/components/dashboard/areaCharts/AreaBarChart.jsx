import { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ThemeContext } from "../../../context/ThemeContext";
import { LIGHT_THEME } from "../../../constants/themeConstants";
import "./AreaCharts.scss";

const dataIPK = [
  { semester: "Semester 1", ipk: 3.2 },
  { semester: "Semester 2", ipk: 3.4 },
  { semester: "Semester 3", ipk: 3.6 },
  { semester: "Semester 4", ipk: 3.7 },
  { semester: "Semester 5", ipk: 3.8 },
  { semester: "Semester 6", ipk: 3.9 },
  { semester: "Semester 7", ipk: 4.0 },
];

const IPKBarChart = () => {
  const { theme } = useContext(ThemeContext);

  const formatTooltipValue = (value) => {
    return `${value.toFixed(2)} (IPK)`;
  };

  const formatYAxisLabel = (value) => {
    return value.toFixed(1); // Format angka desimal
  };

  return (
    <div className="bar-chart">
      <h5 className="bar-chart-title">IPK Mahasiswa per Semester</h5>
      <div className="bar-chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={dataIPK}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis
              dataKey="semester"
              tick={{ fill: theme === LIGHT_THEME ? "#676767" : "#f3f3f3" }}
            />
            <YAxis
              domain={[1.0, 4.0]} // Range IPK
              tickFormatter={formatYAxisLabel}
              tick={{ fill: theme === LIGHT_THEME ? "#676767" : "#f3f3f3" }}
            />
            <Tooltip formatter={formatTooltipValue} cursor={{ fill: "#eee" }} />
            <Legend iconType="circle" iconSize={10} verticalAlign="top" />
            <Bar
              dataKey="ipk"
              fill="#475be8"
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IPKBarChart;
