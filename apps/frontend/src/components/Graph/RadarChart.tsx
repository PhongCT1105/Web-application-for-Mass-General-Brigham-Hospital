import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  ChartType,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, Tooltip, Legend, RadialLinearScale);

function RadarChart() {
  const data = {
    labels: [
      "Flower Request",
      "Medication Request",
      "Patient Transport Request",
      "Sanitation Request",
      "Security Request",
      "Maintenance Request",
    ],
    datasets: [
      {
        labels: "Request",
        data: [20, 10, 30, 40, 50, 60],
      },
    ],
  };
  const options = {
    type: "bar" as ChartType,
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2.5,
    plugins: {
      title: {
        display: true,
        text: "Bar Chart of total service request used",
      },
    },
  };

  return (
    <>
      <Radar data={data} options={options} />
    </>
  );
}

export default RadarChart;
