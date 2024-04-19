import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { lineChartData } from "@/data/lineChartData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);
function LineGraph() {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2.5,
    elements: {
      line: {
        tension: 0.5,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Line Graph of total users",
      },
    },
  };
  return (
    <>
      <Line options={options} data={lineChartData} />
    </>
  );
}

export default LineGraph;
