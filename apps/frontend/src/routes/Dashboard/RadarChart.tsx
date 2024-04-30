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
        label: "Total Service Request Used",
        data: [100, 50, 30, 20, 10, 70],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        pointStyle: "circle", // Set point style to circle
        pointRadius: 10, // Increase point radius to make the shadow bigger
      },
    ],
  };
  const options = {
    type: "radar" as ChartType,
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2.5,
    plugins: {
      title: {
        display: true,
        text: "Radar Chart of total service request used",
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
