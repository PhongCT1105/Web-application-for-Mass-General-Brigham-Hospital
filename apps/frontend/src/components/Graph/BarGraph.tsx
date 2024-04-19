import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { barChartData } from "@/data/barChartData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function BarGraph() {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2.1,
    plugins: {
      title: {
        display: true,
        text: "Bar Chart of total service request used",
      },
    },
  };
  return (
    <>
      <Bar options={options} data={barChartData}></Bar>
    </>
  );
}

export default BarGraph;
